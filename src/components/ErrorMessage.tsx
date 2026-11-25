import { Pressable, StyleSheet, Text, View } from "react-native";

interface ErrorMessageProps {
  message: string;
  onRetry: () => void;
}

// MODUL 3 - Komponen pesan error (tampil saat Promise di-reject)
export function ErrorMessage({ message, onRetry }: ErrorMessageProps) {
  return (
    <View style={localStyles.wrapper}>
      <Text style={localStyles.title}>Oops, terjadi masalah</Text>
      <Text style={localStyles.message}>{message}</Text>
      <Pressable style={localStyles.button} onPress={onRetry}>
        <Text style={localStyles.buttonText}>Coba Lagi</Text>
      </Pressable>
    </View>
  );
}

const localStyles = StyleSheet.create({
  wrapper: {
    backgroundColor: "#fef2f2",
    borderRadius: 16,
    padding: 20,
    alignItems: "center",
    marginTop: 16,
  },
  title: { fontSize: 16, fontWeight: "bold", color: "#b91c1c" },
  message: {
    fontSize: 13,
    color: "#7f1d1d",
    marginTop: 6,
    textAlign: "center",
  },
  button: {
    backgroundColor: "#dc2626",
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: 10,
    marginTop: 14,
  },
  buttonText: { color: "#ffffff", fontWeight: "bold" },
});
