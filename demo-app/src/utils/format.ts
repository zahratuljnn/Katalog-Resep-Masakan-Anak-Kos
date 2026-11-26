// Format angka jadi Rupiah (contoh 8000 -> "Rp 8.000")
export const formatRupiah = (price: number): string => {
  return "Rp " + price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};
