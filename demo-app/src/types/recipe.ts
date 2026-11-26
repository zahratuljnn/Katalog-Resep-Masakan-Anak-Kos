// ANGGOTA 1 - Type & Interface
// Union type: category hanya boleh salah satu dari nilai ini
export type RecipeCategory = "nasi" | "mie" | "telur" | "sayur" | "camilan";

import type { ImageSource } from "expo-image";

// Interface: bentuk/struktur satu objek resep
export interface Recipe {
  readonly id: string; // readonly = tidak bisa diubah setelah dibuat
  name: string;
  category: RecipeCategory;
  price: number; // estimasi biaya (Rupiah)
  cookTime: number; // lama memasak (menit)
  ingredients: string[]; // daftar bahan
  image?: ImageSource | number; // foto masakan (file lokal di assets/images)
  note?: string; // opsional (tanda "?")
}

// MODUL 3 - Interface untuk data resep dari External API
// Data mentah dari server (RecipeDto) dirapikan ke bentuk ini sebelum dipakai UI
export interface OnlineRecipe {
  readonly id: string;
  name: string;
  category: string;
  price: number;
  cookTime: number;
  ingredients: string[];
  steps: string[];
  note?: string; // opsional
  imageUrl?: string; // opsional: resep baru belum tentu punya foto
}
