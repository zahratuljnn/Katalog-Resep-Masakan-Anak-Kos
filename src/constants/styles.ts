import { StyleSheet } from "react-native";

// ANGGOTA 2 - External Styling
// File style terpisah supaya index.tsx tetap bersih dan style bisa dipakai ulang
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff7ed",
    paddingTop: 50,
    paddingHorizontal: 16,
  },
  header: {
    marginBottom: 16,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#9a3412",
  },
  subtitle: {
    fontSize: 14,
    color: "#78716c",
    marginTop: 4,
  },
  summaryBox: {
    backgroundColor: "#ffedd5",
    padding: 12,
    borderRadius: 12,
    marginTop: 12,
  },
  summaryText: {
    fontSize: 13,
    color: "#7c2d12",
  },
  card: {
    backgroundColor: "#ffffff",
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
    elevation: 3,
    shadowColor: "#000",
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#0f172a",
  },
  cardInfo: {
    fontSize: 13,
    color: "#64748b",
    marginTop: 2,
  },
  sectionLabel: {
    fontSize: 13,
    fontWeight: "bold",
    color: "#9a3412",
    marginTop: 10,
  },
  ingredient: {
    fontSize: 13,
    color: "#334155",
  },
  note: {
    fontSize: 12,
    fontStyle: "italic",
    color: "#a16207",
    marginTop: 8,
  },
  button: {
    backgroundColor: "#ea580c",
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 12,
  },
  buttonText: {
    color: "#ffffff",
    fontWeight: "bold",
  },
});
