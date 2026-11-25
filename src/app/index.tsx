<<<<<<< HEAD
import { useRouter } from "expo-router";
import { useEffect, useRef, useState } from "react";
import {
  FlatList,
  Image,
  Pressable,
  Text,
  TextInput,
  View,
} from "react-native";

=======
import { View, Text, FlatList, Pressable, Alert, Image } from "react-native";
>>>>>>> d79b845 (Update aplikasi)
import { styles } from "../constants/styles";
import { useFavorites } from "../context/FavoritesContext";
import { recipes } from "../data/recipes";
import { Recipe, RecipeCategory } from "../types/recipe";

// Mengubah angka menjadi format Rupiah
const formatRupiah = (price: number): string => {
  return "Rp " + price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};

// Menentukan label berdasarkan harga
const getBudgetLabel = (price: number): string => {
  if (price <= 5000) {
    return "Super Hemat";
  } else if (price <= 8000) {
    return "Hemat";
  } else {
    return "Standar";
  }
};

<<<<<<< HEAD
// Pilihan filter kategori ("semua" ditambah ke union type RecipeCategory)
type CategoryFilter = RecipeCategory | "semua";
const categories: CategoryFilter[] = [
  "semua",
  "nasi",
  "mie",
  "telur",
  "sayur",
  "camilan",
];
=======
// Custom function 3: dipanggil saat tombol ditekan (memakai built-in Alert)
const showRecipe = (recipe: Recipe) => {
  Alert.alert(recipe.name, "Bahan: " + recipe.ingredients.join(", "));
};

// Custom function 4: membuat satu kartu resep dari data (parameter -> komponen)
const renderRecipeCard = (recipe: Recipe) => {
  return (
    <View style={styles.card}>
      <Image source={recipe.image} style={styles.cardImage} resizeMode="cover" />
      <Text style={styles.cardTitle}>{recipe.name}</Text>
      <Text style={styles.cardInfo}>
        {recipe.category.toUpperCase()} • {recipe.cookTime} menit •{" "}
        {formatRupiah(recipe.price)}
      </Text>

      {/* INLINE STYLE: warna badge berubah sesuai harga (nilai dinamis) */}
      <View
        style={{
          alignSelf: "flex-start",
          backgroundColor: recipe.price <= 5000 ? "#16a34a" : "#f59e0b",
          paddingHorizontal: 10,
          paddingVertical: 4,
          borderRadius: 20,
          marginTop: 8,
        }}
      >
        <Text style={{ color: "white", fontSize: 12, fontWeight: "bold" }}>
          {getBudgetLabel(recipe.price)}
        </Text>
      </View>

      <Text style={styles.sectionLabel}>Bahan:</Text>
      {/* LOOP 1: map() untuk menampilkan setiap bahan */}
      {recipe.ingredients.map((item, index) => (
        <Text key={index} style={styles.ingredient}>
          • {item}
        </Text>
      ))}

      {/* Conditional rendering: catatan hanya tampil kalau ada */}
      {recipe.note ? <Text style={styles.note}>Tips: {recipe.note}</Text> : null}

      <Pressable style={styles.button} onPress={() => showRecipe(recipe)}>
        <Text style={styles.buttonText}>Lihat Bahan</Text>
      </Pressable>
    </View>
  );
};
>>>>>>> d79b845 (Update aplikasi)

export default function Index() {
 
  const router = useRouter();

  
  const { toggleFavorite, isFavorite, favoriteIds } = useFavorites();

  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedCategory, setSelectedCategory] =
    useState<CategoryFilter>("semua");
  const [filteredRecipes, setFilteredRecipes] = useState<Recipe[]>(recipes);


  const listRef = useRef<FlatList<Recipe>>(null);

  useEffect(() => {
    const keyword = searchQuery.trim().toLowerCase();

    const result = recipes.filter((recipe) => {
      const matchKeyword =
        recipe.name.toLowerCase().includes(keyword) ||
        recipe.category.toLowerCase().includes(keyword);
      const matchCategory =
        selectedCategory === "semua" || recipe.category === selectedCategory;
      return matchKeyword && matchCategory;
    });

    setFilteredRecipes(result);
    listRef.current?.scrollToOffset({ offset: 0, animated: true });
  }, [searchQuery, selectedCategory]);


  let totalPrice = 0;
  for (let i = 0; i < recipes.length; i++) {
    totalPrice = totalPrice + recipes[i].price;
  }
  const averagePrice =
    recipes.length > 0 ? Math.round(totalPrice / recipes.length) : 0;

  // Membuat kartu untuk setiap resep
  const renderRecipeCard = ({ item }: { item: Recipe }) => {
    return (
      <View style={styles.card}>
        {item.image ? (
          <View style={styles.recipeImageBox}>
            <Image
              source={item.image}
              style={styles.recipeImageFill}
              resizeMode="cover"
            />
          </View>
        ) : null}

        <Text style={styles.cardTitle}>{item.name}</Text>

        <Text style={styles.cardInfo}>
          {item.category.toUpperCase()} • {item.cookTime} menit •{" "}
          {formatRupiah(item.price)}
        </Text>

        <View
          style={[
            styles.badge,
            { backgroundColor: item.price <= 5000 ? "#16a34a" : "#f59e0b" },
          ]}
        >
          <Text style={styles.badgeText}>{getBudgetLabel(item.price)}</Text>
        </View>

        <Text style={styles.sectionLabel}>Bahan:</Text>
        {item.ingredients.map((ingredient, index) => (
          <Text key={`${item.id}-${index}`} style={styles.ingredient}>
            {"• " + ingredient}
          </Text>
        ))}

        {item.note ? <Text style={styles.note}>Tips: {item.note}</Text> : null}

        <View style={styles.buttonRow}>
          <Pressable
            style={styles.buttonMain}
            onPress={() =>
              router.push({
                pathname: "/recipe/[id]",
                params: { id: item.id },
              })
            }
          >
            <Text style={styles.buttonText}>Lihat Detail Resep</Text>
          </Pressable>

          <Pressable
            style={styles.favButton}
            onPress={() => toggleFavorite(item.id)}
          >
            <Text style={styles.favText}>
              {isFavorite(item.id) ? "♥" : "♡"}
            </Text>
          </Pressable>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        ref={listRef}
        data={filteredRecipes}
        keyExtractor={(item) => item.id}
        renderItem={renderRecipeCard}
        ListHeaderComponent={
          <View style={styles.header}>
            <Text style={styles.title}>MEALICIOUS</Text>
            <Text style={styles.subtitle}>
              Masak enak, dompet aman, tanggal tua pun tenang
            </Text>

            <View style={styles.summaryBox}>
              <Text style={styles.summaryText}>
                Total resep: {recipes.length} • Rata-rata biaya:{" "}
                {formatRupiah(averagePrice)} • Favorit: {favoriteIds.length}
              </Text>
            </View>

            <TextInput
              style={styles.searchInput}
              placeholder="Cari nama atau kategori resep..."
              value={searchQuery}
              onChangeText={setSearchQuery}
            />

            <View style={styles.chipRow}>
              {categories.map((category) => (
                <Pressable
                  key={category}
                  style={[
                    styles.chip,
                    selectedCategory === category && styles.chipActive,
                  ]}
                  onPress={() => setSelectedCategory(category)}
                >
                  <Text
                    style={[
                      styles.chipText,
                      selectedCategory === category && styles.chipTextActive,
                    ]}
                  >
                    {category}
                  </Text>
                </Pressable>
              ))}
            </View>

            <Text style={styles.resultText}>
              Menampilkan {filteredRecipes.length} resep
            </Text>
          </View>
        }
        ListEmptyComponent={
          <Text style={styles.emptyText}>
            Resep tidak ditemukan. Coba kata kunci lain.
          </Text>
        }
      />
    </View>
  );
}
