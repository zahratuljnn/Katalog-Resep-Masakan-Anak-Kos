import { Stack } from "expo-router";
import { FavoritesProvider } from "../context/FavoritesContext";

export default function RootLayout() {
  return (
    <FavoritesProvider>
      <Stack>
        <Stack.Screen name="index" options={{ title: "Resep Anak Kos" }} />
        <Stack.Screen name="recipe/[id]" options={{ title: "Detail Resep" }} />
      </Stack>
    </FavoritesProvider>
  );
}
