// MODUL 3 - Interface untuk response API manual (api/server.js)

// Bungkus response umum: semua endpoint mengembalikan bentuk ini
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message: string;
}

// Satu objek resep persis seperti yang dikirim server (JSON response)
export interface RecipeDto {
  id: string;
  name: string;
  category: string;
  price: number;
  cookTime: number;
  ingredients: string[];
  steps: string[];
  note: string | null;
  imageUrl: string | null; // null jika resep belum punya foto
}
