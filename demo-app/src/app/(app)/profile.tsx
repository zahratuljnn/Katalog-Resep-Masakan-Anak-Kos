import { useCallback, useEffect, useState } from "react";
import { ActivityIndicator, Pressable, ScrollView, Text, View } from "react-native";

import { styles } from "../../constants/styles";
import { useAuth } from "../../context/AuthContext";
import { getSecureItem, SESSION_KEY, storageLabel } from "../../lib/secureStorage";
import { signOut } from "../../services/authService";

// MODUL 4 - Layar Profil: data pengguna (AuthContext), bukti token tersimpan
// aman (SecureStore), dan tombol Keluar (Sign Out).
export default function Profile() {
  const { user, session } = useAuth();
  const [storedToken, setStoredToken] = useState<string | null>(null);
  const [checking, setChecking] = useState(true);
  const [signingOut, setSigningOut] = useState(false);

  // Baca ulang token langsung dari SecureStore (bukti bahwa sesi benar-benar tersimpan)
  const checkStorage = useCallback(async () => {
    setChecking(true);
    try {
      setStoredToken(await getSecureItem(SESSION_KEY));
    } catch {
      setStoredToken(null);
    } finally {
      setChecking(false);
    }
  }, []);

  useEffect(() => {
    checkStorage();
  }, [checkStorage, session]);

  const handleSignOut = async () => {
    if (signingOut) return;
    setSigningOut(true);
    await signOut(); // AuthContext menerima SIGNED_OUT, route guard mengarahkan ke login
    setSigningOut(false);
  };

  const displayName = (user?.user_metadata?.display_name as string | undefined) ?? "-";
  const tokenPreview = session ? session.access_token.slice(0, 12) + "..." : "-";

  return (
    <ScrollView style={{ backgroundColor: "#fff7ed" }} contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Profil</Text>
        <Text style={styles.subtitle}>Akun dan keamanan sesimu</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionLabel}>Akun</Text>
        <Text style={styles.cardTitle}>{displayName}</Text>
        <Text style={styles.cardInfo}>{user?.email ?? "-"}</Text>
        <Text style={styles.note}>ID: {user?.id ?? "-"}</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionLabel}>Penyimpanan Token Aman</Text>
        <Text style={styles.ingredient}>Lokasi: {storageLabel}</Text>
        {checking ? (
          <ActivityIndicator style={{ alignSelf: "flex-start", marginTop: 6 }} color="#ea580c" />
        ) : (
          <Text style={styles.ingredient}>
            Status:{" "}
            {storedToken ? `Tersimpan (${storedToken.length} karakter)` : "Tidak ada token"}
          </Text>
        )}
        <Text style={styles.ingredient}>Awal token akses: {tokenPreview}</Text>
        <Text style={styles.note}>
          Token disimpan terenkripsi, bukan di AsyncStorage. Tutup lalu buka lagi aplikasi:
          kamu tetap masuk.
        </Text>
        <Pressable style={styles.buttonOutline} onPress={checkStorage}>
          <Text style={styles.buttonOutlineText}>Cek Ulang Penyimpanan</Text>
        </Pressable>
      </View>

      <Pressable
        style={[styles.button, signingOut && { opacity: 0.7 }]}
        onPress={handleSignOut}
        disabled={signingOut}
      >
        {signingOut ? (
          <ActivityIndicator color="#ffffff" />
        ) : (
          <Text style={styles.buttonText}>Keluar</Text>
        )}
      </Pressable>
    </ScrollView>
  );
}
