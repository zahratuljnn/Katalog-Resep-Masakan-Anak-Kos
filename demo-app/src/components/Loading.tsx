import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

// MODUL 3 - Komponen indikator loading (dipakai saat menunggu response API)
export function Loading({ message = "Memuat data..." }: { message?: string }) {
  return (
    <View style={localStyles.wrapper}>
      <ActivityIndicator size="large" color="#ea580c" />
      <Text style={localStyles.text}>{message}</Text>
    </View>
  );
}

const localStyles = StyleSheet.create({
  wrapper: { alignItems: "center", paddingVertical: 40 },
  text: { marginTop: 12, color: "#78716c", fontSize: 14 },
});
