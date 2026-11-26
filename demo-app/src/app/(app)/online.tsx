import { useCallback, useEffect, useRef, useState } from "react";
import { FlatList, Pressable, Text, TextInput, View } from "react-native";

import { ErrorMessage } from "../../components/ErrorMessage";
import { Loading } from "../../components/Loading";
import { OnlineRecipeCard } from "../../components/OnlineRecipeCard";
import { styles } from "../../constants/styles";
import { getOnlineRecipes } from "../../services/recipeService";
import { OnlineRecipe } from "../../types/recipe";
import {useRouter} from "expo-router";

// Filter kategori (value harus sama dengan field category di api/recipes.json)
const CATEGORIES = [
  { label: "Semua", value: "" },
  { label: "Nasi", value: "nasi" },
  { label: "Mie", value: "mie" },
  { label: "Telur", value: "telur" },
  { label: "Sayur", value: "sayur" },
  { label: "Camilan", value: "camilan" },
];

// MODUL 3 - Layar Resep Online: data diambil dari External API (api/server.js)
export default function OnlineRecipes() {
  const router = useRouter();
  const [input, setInput] = useState("");
  const [category, setCategory] = useState("");
  const [recipes, setRecipes] = useState<OnlineRecipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Mencegah hasil request lama menimpa request yang lebih baru
  const latestRequest = useRef(0);

  const loadRecipes = useCallback(
    async (keyword: string, selectedCategory: string) => {
      const requestId = ++latestRequest.current;
      setLoading(true);
      setError(null);

      try {
        const result = await getOnlineRecipes(keyword, selectedCategory); // menunggu Promise selesai
        if (requestId === latestRequest.current) {
          setRecipes(result);
        }
      } catch (e) {
        // Promise di-reject -> masuk ke sini
        if (requestId === latestRequest.current) {
          setRecipes([]);
          setError(e instanceof Error ? e.message : "Terjadi kesalahan.");
        }
      } finally {
        if (requestId === latestRequest.current) {
          setLoading(false);
        }
      }
    },
    [],
  );

  // Ambil data otomatis saat layar pertama kali dibuka
  useEffect(() => {
    loadRecipes("", "");
  }, [loadRecipes]);

  const handleSearch = () => {
    setInput(input.trim());
    loadRecipes(input, category);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Resep Online</Text>
        <Text style={styles.subtitle}>
          Resep dari server API sendiri (12 masakan & camilan)
        </Text>

        <View style={styles.searchRow}>
          <TextInput
            style={styles.searchInput}
            value={input}
            onChangeText={setInput}
            placeholder="Cari resep, mis. telur, tempe"
            placeholderTextColor="#a8a29e"
            returnKeyType="search"
            onSubmitEditing={handleSearch}
            autoCapitalize="none"
          />
          <Pressable style={styles.searchButton} onPress={handleSearch}>
            <Text style={styles.buttonText}>Cari</Text>
          </Pressable>
          
        </View>

        <View style={styles.chipRow}>
          {CATEGORIES.map((item) => {
            const isActive = item.value === category;
            return (
              <Pressable
                key={item.value}
                style={[styles.chip, isActive && styles.chipActive]}
                onPress={() => {
                  setCategory(item.value);
                  loadRecipes(input, item.value);
                }}
              >
                <Text
                  style={[styles.chipText, isActive && styles.chipTextActive]}
                >
                  {item.label}
                </Text>
              </Pressable>
            );
          })}
        </View>
      </View>

      {loading ? (
        <Loading message="Mengambil resep dari server..." />
      ) : error ? (
        <ErrorMessage
          message={error}
          onRetry={() => loadRecipes(input, category)}
        />
      ) : (
        <FlatList
          data={recipes}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <OnlineRecipeCard recipe={item} />}
          keyboardShouldPersistTaps="handled"
          ListEmptyComponent={
            <Text style={styles.emptyText}>Tidak ada resep yang cocok.</Text>
          }
        />
      )}
    </View>
  );
}
