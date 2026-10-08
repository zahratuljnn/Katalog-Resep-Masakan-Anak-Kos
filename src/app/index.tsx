import { View, Text, FlatList, Pressable, Alert } from "react-native";
import { styles } from "../constants/styles";
import { recipes } from "../data/recipes";
import { Recipe } from "../types/recipe";

// ANGGOTA 3 - Custom Function & Loop

// Custom function 1: format angka jadi Rupiah (contoh 8000 -> "Rp 8.000")
const formatRupiah = (price: number): string => {
  return "Rp " + price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};

// Custom function 2: kondisi (if / else) untuk menentukan label hemat
const getBudgetLabel = (price: number): string => {
  if (price <= 5000) {
    return "Super Hemat";
  } else if (price <= 8000) {
    return "Hemat";
  } else {
    return "Standar";
  }
};

// Custom function 3: dipanggil saat tombol ditekan (memakai built-in Alert)
const showRecipe = (recipe: Recipe) => {
  Alert.alert(recipe.name, "Bahan: " + recipe.ingredients.join(", "));
};

// Custom function 4: membuat satu kartu resep dari data (parameter -> komponen)
const renderRecipeCard = (recipe: Recipe) => {
  return (
    <View style={styles.card}>
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

export default function Index() {
  // LOOP 2: primitive loop (for) dijalankan SEBELUM return untuk menghitung total
  let totalPrice = 0;
  for (let i = 0; i < recipes.length; i++) {
    totalPrice = totalPrice + recipes[i].price;
  }
  const averagePrice = Math.round(totalPrice / recipes.length);

  return (
    <View style={styles.container}>
      {/* LOOP 3: FlatList untuk menampilkan daftar resep */}
      <FlatList
        data={recipes}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => renderRecipeCard(item)}
        ListHeaderComponent={
          <View style={styles.header}>
            <Text style={styles.title}>Resep Anak Kos</Text>
            <Text style={styles.subtitle}>
              Masak enak, dompet aman, tanggal tua pun tenang
            </Text>
            <View style={styles.summaryBox}>
              <Text style={styles.summaryText}>
                Total resep: {recipes.length} • Rata-rata biaya:{" "}
                {formatRupiah(averagePrice)}
              </Text>
            </View>
          </View>
        }
      />
    </View>
  );
}
