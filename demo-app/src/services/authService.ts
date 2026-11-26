// MODUL 4 - Supabase Auth Flow: Sign Up, Sign In, Sign Out
// Semua fungsi mengembalikan AuthResult (tidak melempar error), sehingga
// layar login cukup menampilkan message tanpa risiko aplikasi crash.
import { supabase } from "../lib/supabase";

export interface AuthResult {
  success: boolean;
  message: string;
}

// Mengubah pesan error Supabase (Inggris) menjadi pesan yang ramah untuk pengguna
const translateAuthError = (message: string): string => {
  const text = message.toLowerCase();
  if (text.includes("invalid login credentials")) {
    return "Email atau kata sandi salah.";
  }
  if (text.includes("already registered")) {
    return "Email sudah terdaftar. Silakan masuk.";
  }
  if (text.includes("email not confirmed")) {
    return "Email belum dikonfirmasi. Cek kotak masuk emailmu.";
  }
  if (text.includes("at least 6 characters")) {
    return "Kata sandi minimal 6 karakter.";
  }
  if (text.includes("invalid") && text.includes("email")) {
    return "Format email tidak valid.";
  }
  if (text.includes("rate limit")) {
    return "Terlalu banyak percobaan. Tunggu sebentar lalu coba lagi.";
  }
  if (text.includes("network") || text.includes("fetch")) {
    return "Tidak bisa terhubung ke server. Cek koneksi internetmu.";
  }
  return message;
};

// A. Pendaftaran (Sign Up) + metadata nama panggilan
export async function signUp(
  email: string,
  password: string,
  displayName: string
): Promise<AuthResult> {
  try {
    const { data, error } = await supabase.auth.signUp({
      email: email.trim(), // buang spasi tak terlihat dari autocomplete keyboard
      password,
      options: {
        data: { display_name: displayName.trim() }, // metadata kustom
      },
    });

    if (error) {
      return { success: false, message: translateAuthError(error.message) };
    }
    // Jika "Confirm email" masih aktif di Supabase, session belum dibuat
    if (!data.session) {
      return {
        success: true,
        message: "Pendaftaran berhasil! Cek emailmu untuk konfirmasi, lalu masuk.",
      };
    }
    return { success: true, message: "Pendaftaran berhasil! Selamat datang di Mealicious." };
  } catch (e) {
    return { success: false, message: translateAuthError(String(e)) };
  }
}

// B. Masuk (Sign In)
export async function signIn(email: string, password: string): Promise<AuthResult> {
  try {
    const { error } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    });

    if (error) {
      return { success: false, message: translateAuthError(error.message) };
    }
    return { success: true, message: "Berhasil masuk. Selamat datang kembali!" };
  } catch (e) {
    return { success: false, message: translateAuthError(String(e)) };
  }
}

// C. Keluar (Sign Out): membatalkan sesi di cloud dan menghapus token dari SecureStore
export async function signOut(): Promise<AuthResult> {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) {
      return { success: false, message: translateAuthError(error.message) };
    }
    return { success: true, message: "Berhasil keluar." };
  } catch (e) {
    return { success: false, message: translateAuthError(String(e)) };
  }
}
