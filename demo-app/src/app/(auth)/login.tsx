import { useRef, useState } from "react";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

import { isSupabaseConfigured } from "../../lib/supabase";
import { signIn, signUp } from "../../services/authService";

interface Notice {
  type: "error" | "success";
  text: string;
}

// MODUL 4 - Layar Login / Daftar (Supabase Auth Flow)
export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);
  const [loading, setLoading] = useState(false);
  const [notice, setNotice] = useState<Notice | null>(null);
  // Kunci yang berlaku seketika (state baru berubah di render berikutnya),
  // supaya dua ketukan sangat cepat tidak mengirim dua request.
  const submitting = useRef(false);

  const handleAuth = async () => {
    if (submitting.current) return; // cegah multiple submission

    const cleanEmail = email.trim(); // buang spasi tak terlihat dari keyboard

    // Validasi sederhana sebelum menghubungi server
    if (cleanEmail === "" || password === "") {
      setNotice({ type: "error", text: "Email dan kata sandi wajib diisi." });
      return;
    }
    if (isRegistering && displayName.trim() === "") {
      setNotice({ type: "error", text: "Nama panggilan wajib diisi." });
      return;
    }
    if (isRegistering && password.length < 6) {
      setNotice({ type: "error", text: "Kata sandi minimal 6 karakter." });
      return;
    }

    submitting.current = true;
    setLoading(true);
    setNotice(null);

    const result = isRegistering
      ? await signUp(cleanEmail, password, displayName) // Register mode
      : await signIn(cleanEmail, password); // Login mode

    submitting.current = false;
    setLoading(false);

    if (!result.success) {
      setNotice({ type: "error", text: result.message });
      return;
    }

    // Jika login/daftar berhasil dan sesi terbentuk, AuthContext + route guard
    // otomatis memindahkan pengguna ke halaman utama.
    setNotice({ type: "success", text: result.message });
    if (isRegistering) {
      setIsRegistering(false); // kembali ke mode masuk
      setPassword("");
    }
  };

  const switchMode = () => {
    setIsRegistering(!isRegistering);
    setNotice(null);
  };

  return (
    <KeyboardAvoidingView
      style={s.flex}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView
        contentContainerStyle={s.container}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={s.brand}>Mealicious</Text>
        <Text style={s.tagline}>Katalog resep masakan anak kos</Text>

        <View style={s.card}>
          <Text style={s.heading}>
            {isRegistering ? "Buat Akun Baru" : "Masuk ke Akunmu"}
          </Text>

          {!isSupabaseConfigured ? (
            <View style={[s.notice, s.noticeError]}>
              <Text style={s.noticeErrorText}>
                Supabase belum dikonfigurasi. Isi file .env (lihat .env.example) lalu
                jalankan ulang Expo.
              </Text>
            </View>
          ) : null}

          {isRegistering ? (
            <>
              <Text style={s.label}>Nama panggilan</Text>
              <TextInput
                style={s.input}
                value={displayName}
                onChangeText={setDisplayName}
                placeholder="mis. Budi Kos"
                placeholderTextColor="#a8a29e"
                autoCapitalize="words"
                editable={!loading}
              />
            </>
          ) : null}

          <Text style={s.label}>Email</Text>
          <TextInput
            style={s.input}
            value={email}
            onChangeText={setEmail}
            placeholder="nama@email.com"
            placeholderTextColor="#a8a29e"
            keyboardType="email-address" // keyboard langsung menampilkan tombol @
            autoCapitalize="none" // tidak mengubah huruf pertama jadi kapital
            autoCorrect={false}
            editable={!loading}
          />

          <Text style={s.label}>Kata sandi</Text>
          <TextInput
            style={s.input}
            value={password}
            onChangeText={setPassword}
            placeholder="Minimal 6 karakter"
            placeholderTextColor="#a8a29e"
            secureTextEntry
            autoCapitalize="none"
            autoCorrect={false}
            editable={!loading}
            returnKeyType="go"
            onSubmitEditing={handleAuth}
          />

          {notice ? (
            <View
              style={[s.notice, notice.type === "error" ? s.noticeError : s.noticeSuccess]}
            >
              <Text
                style={notice.type === "error" ? s.noticeErrorText : s.noticeSuccessText}
              >
                {notice.text}
              </Text>
            </View>
          ) : null}

          {/* Saat loading: tombol dinonaktifkan dan diganti spinner */}
          <Pressable
            style={[s.button, loading && s.buttonDisabled]}
            onPress={handleAuth}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#ffffff" />
            ) : (
              <Text style={s.buttonText}>{isRegistering ? "Daftar" : "Masuk"}</Text>
            )}
          </Pressable>

          <Pressable onPress={switchMode} disabled={loading}>
            <Text style={s.switchText}>
              {isRegistering ? "Sudah punya akun? " : "Belum punya akun? "}
              <Text style={s.switchLink}>{isRegistering ? "Masuk di sini" : "Daftar di sini"}</Text>
            </Text>
          </Pressable>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const s = StyleSheet.create({
  flex: { flex: 1, backgroundColor: "#fff7ed" },
  container: {
    flexGrow: 1,
    justifyContent: "center",
    padding: 20,
  },
  brand: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#9a3412",
    textAlign: "center",
  },
  tagline: {
    fontSize: 14,
    color: "#78716c",
    textAlign: "center",
    marginTop: 4,
    marginBottom: 24,
  },
  card: {
    backgroundColor: "#ffffff",
    borderRadius: 16,
    padding: 20,
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
  },
  heading: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#0f172a",
    marginBottom: 8,
  },
  label: {
    fontSize: 13,
    fontWeight: "600",
    color: "#9a3412",
    marginTop: 12,
    marginBottom: 4,
  },
  input: {
    borderWidth: 1,
    borderColor: "#fed7aa",
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 15,
    color: "#0f172a",
    backgroundColor: "#fffbf5",
  },
  notice: {
    borderRadius: 10,
    padding: 10,
    marginTop: 14,
  },
  noticeError: { backgroundColor: "#fef2f2" },
  noticeErrorText: { color: "#b91c1c", fontSize: 13 },
  noticeSuccess: { backgroundColor: "#f0fdf4" },
  noticeSuccessText: { color: "#15803d", fontSize: 13 },
  button: {
    backgroundColor: "#ea580c",
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: "center",
    marginTop: 18,
  },
  buttonDisabled: { opacity: 0.7 },
  buttonText: { color: "#ffffff", fontWeight: "bold", fontSize: 16 },
  switchText: {
    textAlign: "center",
    color: "#78716c",
    fontSize: 13,
    marginTop: 16,
  },
  switchLink: { color: "#ea580c", fontWeight: "bold" },
});
