import { StyleSheet } from "react-native";

// External style (Modul 1). Style tambahan Modul 2 ada di bagian bawah.
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff7ed",
    paddingHorizontal: 16,
  },
  header: { marginBottom: 16, paddingTop: 16 },
  title: { fontSize: 26, fontWeight: "bold", color: "#9a3412" },
  subtitle: { fontSize: 14, color: "#78716c", marginTop: 4 },
  summaryBox: {
    backgroundColor: "#ffedd5",
    padding: 12,
    borderRadius: 12,
    marginTop: 12,
  },
  summaryText: { fontSize: 13, color: "#7c2d12" },
  card: {
    backgroundColor: "#ffffff",
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
    elevation: 3,
    shadowColor: "#000",
  },
  cardTitle: { fontSize: 18, fontWeight: "bold", color: "#0f172a" },
  cardInfo: { fontSize: 13, color: "#64748b", marginTop: 2 },
  badge: {
    alignSelf: "flex-start",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
    marginTop: 8,
  },
  badgeText: { color: "white", fontSize: 12, fontWeight: "bold" },
  sectionLabel: {
    fontSize: 13,
    fontWeight: "bold",
    color: "#9a3412",
    marginTop: 10,
  },
  ingredient: { fontSize: 13, color: "#334155" },
  note: { fontSize: 12, fontStyle: "italic", color: "#a16207", marginTop: 8 },
  button: {
    backgroundColor: "#ea580c",
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 12,
  },
  buttonText: { color: "#ffffff", fontWeight: "bold" },

  // ---- Modul 2 ----
  searchInput: {
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#fdba74",
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginTop: 12,
  },
<<<<<<< HEAD
  resultText: { fontSize: 12, color: "#78716c", marginTop: 8 },
  emptyText: { textAlign: "center", color: "#78716c", marginTop: 24 },

  // Gambar di kartu: selebar kartu, tinggi tetap, di-crop (cover)
  recipeImage: {
    width: "100%",
    height: 130, // lebih pendek (sebelumnya 180)
    borderRadius: 12,
    marginBottom: 10,
    resizeMode: "contain", // zoom out: seluruh foto terlihat, tidak terpotong
    backgroundColor: "#ffedd5", // warna latar supaya sisi kosong terlihat rapi
  },

  recipeImageBox: {
    width: "100%",
    height: 130,
    borderRadius: 12,
    overflow: "hidden",
    marginBottom: 10,
    backgroundColor: "#ffedd5",
  },
  recipeImageFill: { width: "100%", height: "100%" },
  // Chip filter kategori
  chipRow: { flexDirection: "row", flexWrap: "wrap", gap: 8, marginTop: 12 },
  chip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    backgroundColor: "#ffedd5",
  },
  chipActive: { backgroundColor: "#ea580c" },
  chipText: { fontSize: 12, color: "#9a3412", textTransform: "capitalize" },
  chipTextActive: { color: "#ffffff", fontWeight: "bold" },

  // Baris tombol: detail + favorit
  buttonRow: { flexDirection: "row", gap: 8, marginTop: 12 },
  buttonMain: {
    flex: 1,
    backgroundColor: "#ea580c",
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 12,
  },
  favButton: {
    width: 44,
    marginTop: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ea580c",
    alignItems: "center",
    justifyContent: "center",
  },
  favText: { fontSize: 20, color: "#ea580c" },
  buttonSecondary: {
=======

  // MODUL 3 - style tambahan untuk layar Resep Online
  cardImage: {
    width: "100%",
    height: 160,
    borderRadius: 12,
    marginBottom: 12,
    backgroundColor: "#ffedd5",
  },
  buttonOutline: {
    borderWidth: 1.5,
    borderColor: "#ea580c",
>>>>>>> d79b845 (Update aplikasi)
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 8,
<<<<<<< HEAD
    borderWidth: 1,
    borderColor: "#ea580c",
  },
  buttonSecondaryText: { color: "#ea580c", fontWeight: "bold" },

  // Halaman detail: konten dibatasi 600px dan di tengah (nyaman di web)
  detailScroll: { flex: 1, backgroundColor: "#fff7ed" },
  detailContent: {
    width: "100%",
    maxWidth: 600,
    alignSelf: "center",
    padding: 16,
  },
  detailContainer: {
    flex: 1,
    backgroundColor: "#fff7ed",
    padding: 16,
    width: "100%",
    maxWidth: 600,
    alignSelf: "center",
  },
  detailTitle: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#9a3412",
    marginBottom: 12,
  },
  detailImageBox: {
    width: "100%",
    height: 200,
    borderRadius: 16,
    overflow: "hidden", // memotong bagian yang melebihi kotak
    marginBottom: 12,
    backgroundColor: "#ffedd5",
  },
  detailImageFill: {
    width: "100%",
    height: "100%",
  },
  detailText: { fontSize: 15, color: "#334155", marginBottom: 6 },
=======
  },
  buttonOutlineText: {
    color: "#ea580c",
    fontWeight: "bold",
  },
  searchRow: {
    flexDirection: "row",
    gap: 8,
    marginTop: 12,
  },
  searchInput: {
    flex: 1,
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#fed7aa",
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 14,
    color: "#0f172a",
  },
  searchButton: {
    backgroundColor: "#ea580c",
    borderRadius: 10,
    paddingHorizontal: 16,
    justifyContent: "center",
  },
  chipRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginTop: 10,
  },
  chip: {
    backgroundColor: "#ffedd5",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  chipActive: {
    backgroundColor: "#ea580c",
  },
  chipText: {
    fontSize: 12,
    color: "#7c2d12",
  },
  chipTextActive: {
    color: "#ffffff",
    fontWeight: "bold",
  },
  emptyText: {
    textAlign: "center",
    color: "#78716c",
    marginTop: 40,
  },
>>>>>>> d79b845 (Update aplikasi)
});
