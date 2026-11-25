// MODUL 3 - Custom async utility
// Mengembalikan Promise yang di-resolve setelah `ms` milidetik.
// Dipakai supaya indikator loading sempat terlihat saat demo.
export function delay(ms: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}
