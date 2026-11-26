// MODUL 4 - Supabase client (singleton): satu client dipakai seluruh aplikasi.
// URL dan Anon Key dibaca dari file .env (JANGAN ditulis langsung di kode).
import "react-native-url-polyfill/auto";

import { createClient } from "@supabase/supabase-js";
import { AppState } from "react-native";

import { ExpoSecureStoreAdapter, SESSION_KEY } from "./secureStorage";

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL ?? "";
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY ?? "";

// false jika file .env belum diisi -> layar login menampilkan peringatan
export const isSupabaseConfigured = supabaseUrl !== "" && supabaseAnonKey !== "";

export const supabase = createClient(
  // Alamat cadangan agar aplikasi tidak crash saat .env belum ada
  supabaseUrl || "https://belum-diisi.supabase.co",
  supabaseAnonKey || "belum-diisi",
  {
    auth: {
      storage: ExpoSecureStoreAdapter, // sesi/token disimpan di SecureStore
      storageKey: SESSION_KEY,
      autoRefreshToken: true, // token akses diperbarui otomatis
      persistSession: true, // sesi tetap ada setelah aplikasi ditutup
      detectSessionInUrl: false, // tidak dipakai di aplikasi mobile
    },
  }
);

// Hemat baterai: refresh token hanya berjalan saat aplikasi sedang dibuka
AppState.addEventListener("change", (state) => {
  if (state === "active") {
    supabase.auth.startAutoRefresh();
  } else {
    supabase.auth.stopAutoRefresh();
  }
});
