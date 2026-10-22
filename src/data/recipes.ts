import { Recipe } from "../types/recipe";

export const recipes: Recipe[] = [
  {
    id: "1",
    name: "Nasi Goreng Telur",
    category: "nasi",
    price: 8000,
    cookTime: 10,
    ingredients: ["Nasi sisa semalam", "Telur", "Bawang putih", "Kecap manis"],
    deskripsi:
      "Sebuah resep nasi goreng sederhana yang bisa dibuat dengan bahan-bahan yang ada di kos",
    note: "Pakai nasi dingin supaya tidak lembek",
    image: require("../../assets/images/Nasi-Goreng-telor.jpg"),
  },
  {
    id: "2",
    name: "Mie Instan Kuah Sayur",
    category: "mie",
    price: 6000,
    cookTime: 8,
    ingredients: ["Mie instan", "Sawi", "Telur", "Cabai rawit"],
    deskripsi: "Mie instan kuah sayur, cocok di makan saat hujan",
    image: require("../../assets/images/mie-kuah-sayur-mie-instan-foto-resep-utama.webp"),
  },

  {
    id: "3",
    name: "Telur Dadar Kecap",
    category: "telur",
    price: 4000,
    cookTime: 5,
    ingredients: ["Telur", "Kecap manis", "Bawang merah", "Garam"],
    deskripsi:
      "Telur dadar yang dimasak dengan kecap manis, cocok untuk lauk sederhana",
    note: "Cocok untuk tanggal tua",
    image: require("../../assets/images/telur-dadar-kecap-foto-resep-utama.webp"),
  },
  {
    id: "4",
    name: "Tumis Kangkung",
    category: "sayur",
    price: 5000,
    cookTime: 7,
    ingredients: ["Kangkung", "Bawang putih", "Cabai", "Saus tiram"],
    deskripsi:
      "Tumis kangkung yang cepat dan mudah dibuat, cocok untuk lauk sehari-hari",
    image: require("../../assets/images/tumis-kangkung-foto-resep-utama.webp"),
  },
  {
    id: "5",
    name: "Pisang Goreng",
    category: "camilan",
    price: 7000,
    cookTime: 15,
    ingredients: ["Pisang", "Tepung terigu", "Gula", "Minyak goreng"],
    deskripsi:
      "Pisang goreng renyah yang bisa dinikmati sebagai camilan dengan kopi",
    image: require("../../assets/images/pisang-goreng-foto-resep-utama.webp"),
  },
  {
    id: "6",
    name: "Nasi Telur Ceplok Sambal",
    category: "nasi",
    price: 9000,
    cookTime: 10,
    ingredients: ["Nasi putih", "Telur", "Cabai", "Tomat", "Bawang merah"],
    deskripsi:
      "Nasi dengan telur ceplok dan sambal pedas, cocok untuk sarapan atau makan siang",
    image: require("../../assets/images/nasi-telur-ceplok-sambal-bawang-merah-foto-resep-utama.webp"),
  },
];
