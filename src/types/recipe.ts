export type RecipeCategory = "nasi" | "mie" | "telur" | "sayur" | "camilan";

export interface Recipe {
  readonly id: string;
  name: string;
  category: RecipeCategory;
  price: number;
  cookTime: number;
  ingredients: string[];
  deskripsi: string;
  image: number;
  note?: string;
}