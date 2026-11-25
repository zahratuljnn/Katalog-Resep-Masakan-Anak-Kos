<<<<<<< HEAD
export type RecipeCategory = "nasi" | "mie" | "telur" | "sayur" | "camilan";

=======
// ANGGOTA 1 - Type & Interface
// Union type: category hanya boleh salah satu dari nilai ini
export type RecipeCategory = "nasi" | "mie" | "telur" | "sayur" | "camilan";

import { ImageSourcePropType } from "react-native";

// Interface: bentuk/struktur satu objek resep
>>>>>>> d79b845 (Update aplikasi)
export interface Recipe {
  readonly id: string;
  name: string;
  category: RecipeCategory;
<<<<<<< HEAD
  price: number;
  cookTime: number;
  ingredients: string[];
  deskripsi: string;
  image: number;
  note?: string;
}
=======
  price: number; // estimasi biaya (Rupiah)
  cookTime: number; // lama memasak (menit)
  ingredients: string[]; // daftar bahan
  image: ImageSourcePropType; // foto masakan (file lokal di assets/images)
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
>>>>>>> d79b845 (Update aplikasi)
