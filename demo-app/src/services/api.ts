// MODUL 3 - Fungsi dasar untuk memanggil External API (API manual di folder /api)
import { API_BASE_URL } from "../constants/config";

const TIMEOUT_MS = 8000;

// Membungkus fetch() ke dalam Promise constructor supaya
// resolve() dan reject() dipanggil secara eksplisit (seperti contoh getUser() di modul).
export function fetchJson<T>(endpoint: string): Promise<T> {
  return new Promise<T>((resolve, reject) => {
    // reject() jika server terlalu lama menjawab
    const timer = setTimeout(() => {
      reject(
        new Error(
          "Server terlalu lama merespons. Pastikan API sudah dijalankan (npm run api).",
        ),
      );
    }, TIMEOUT_MS);

    // fetch() adalah pre-built async function (mengembalikan Promise)
    fetch(API_BASE_URL + endpoint)
      .then((response) => {
        if (response.ok) {
          // resolve() jika HTTP status 200-299
          resolve(response.json() as Promise<T>);
        } else {
          // reject() jika server membalas error (404, 500, dst)
          reject(new Error("Server error (kode " + response.status + ")"));
        }
      })
      .catch(() => {
        // fetch() hanya gagal total kalau server tidak terjangkau
        reject(
          new Error(
            "Tidak bisa terhubung ke API. Cek alamat di config.ts dan WiFi.",
          ),
        );
      })
      .finally(() => clearTimeout(timer));
  });
}
