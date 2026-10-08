// ANGGOTA 1 - Type & Interface
// Union type: category hanya boleh salah satu dari nilai ini
export type RecipeCategory = "nasi" | "mie" | "telur" | "sayur" | "camilan";

// Interface: bentuk/struktur satu objek resep
export interface Recipe {
  readonly id: string; // readonly = tidak bisa diubah setelah dibuat
  name: string;
  category: RecipeCategory;
  price: number; // estimasi biaya (Rupiah)
  cookTime: number; // lama memasak (menit)
  ingredients: string[]; // daftar bahan
  note?: string; // opsional (tanda "?")
}
