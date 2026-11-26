// MODUL 4 - Secure Token Storage (expo-secure-store)
// Token sesi Supabase (JWT) disimpan terenkripsi di Keychain (iOS) / Keystore (Android).
// JANGAN simpan token di AsyncStorage: isinya teks biasa.
import * as SecureStore from "expo-secure-store";
import { Platform } from "react-native";

// Nama kunci tempat sesi Supabase disimpan (dipakai juga di lib/supabase.ts)
export const SESSION_KEY = "mealicious_auth_session";

// SecureStore tidak tersedia di web, jadi di browser dipakai localStorage
// (hanya untuk uji coba di laptop, bukan untuk produksi).
const isWeb = Platform.OS === "web";

const webStorage = (): Storage | null => {
  try {
    return typeof localStorage !== "undefined" ? localStorage : null;
  } catch {
    return null;
  }
};

// 1. Simpan nilai terenkripsi
export async function setSecureItem(key: string, value: string): Promise<void> {
  if (isWeb) {
    webStorage()?.setItem(key, value);
    return;
  }
  await SecureStore.setItemAsync(key, value);
}

// 2. Ambil nilai (dipakai saat aplikasi pertama kali dibuka)
export async function getSecureItem(key: string): Promise<string | null> {
  if (isWeb) {
    return webStorage()?.getItem(key) ?? null;
  }
  return await SecureStore.getItemAsync(key);
}

// 3. Hapus nilai (dipakai saat logout)
export async function deleteSecureItem(key: string): Promise<void> {
  if (isWeb) {
    webStorage()?.removeItem(key);
    return;
  }
  await SecureStore.deleteItemAsync(key);
}

// Adapter: "colokan" supaya Supabase memakai SecureStore sebagai tempat menyimpan sesi.
// Bentuknya (getItem / setItem / removeItem) sesuai yang diminta oleh supabase-js.
export const ExpoSecureStoreAdapter = {
  getItem: (key: string) => getSecureItem(key),
  setItem: (key: string, value: string) => setSecureItem(key, value),
  removeItem: (key: string) => deleteSecureItem(key),
};

// Nama tempat penyimpanan, untuk ditampilkan di layar Profil
export const storageLabel: string = isWeb
  ? "localStorage browser (hanya uji coba)"
  : Platform.OS === "ios"
    ? "iOS Keychain (terenkripsi)"
    : "Android Keystore (terenkripsi)";
