import { Recipe } from "../types/recipe";

// ANGGOTA 1 - Array of Objects
// Setiap elemen harus mengikuti struktur interface Recipe
export const recipes: Recipe[] = [
  {
    id: "1",
    name: "Nasi Goreng Telur",
    category: "nasi",
    price: 8000,
    cookTime: 10,
    ingredients: ["Nasi sisa semalam", "Telur", "Bawang putih", "Kecap manis"],
    note: "Pakai nasi dingin supaya tidak lembek",
  },
  {
    id: "2",
    name: "Mie Instan Kuah Sayur",
    category: "mie",
    price: 6000,
    cookTime: 8,
    ingredients: ["Mie instan", "Sawi", "Telur", "Cabai rawit"],
  },
  {
    id: "3",
    name: "Telur Dadar Kecap",
    category: "telur",
    price: 4000,
    cookTime: 5,
    ingredients: ["Telur", "Kecap manis", "Bawang merah", "Garam"],
    note: "Cocok untuk tanggal tua",
  },
  {
    id: "4",
    name: "Tumis Kangkung",
    category: "sayur",
    price: 5000,
    cookTime: 7,
    ingredients: ["Kangkung", "Bawang putih", "Cabai", "Saus tiram"],
  },
  {
    id: "5",
    name: "Pisang Goreng",
    category: "camilan",
    price: 7000,
    cookTime: 15,
    ingredients: ["Pisang", "Tepung terigu", "Gula", "Minyak goreng"],
  },
  {
    id: "6",
    name: "Nasi Telur Ceplok Sambal",
    category: "nasi",
    price: 9000,
    cookTime: 10,
    ingredients: ["Nasi putih", "Telur", "Cabai", "Tomat", "Bawang merah"],
  },
];
