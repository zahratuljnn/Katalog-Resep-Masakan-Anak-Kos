import { useLocalSearchParams, useRouter } from "expo-router";
import { Image, Pressable, ScrollView, Text, View } from "react-native";

import { styles } from "../../constants/styles";
import { useFavorites } from "../../context/FavoritesContext";
import { recipes } from "../../data/recipes";

// MODUL 2 - Dynamic Route (hlm 25): file [id].tsx melayani /recipe/1, /recipe/2, dst.
const formatRupiah = (price: number): string => {
  return "Rp " + price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};

export default function RecipeDetail() {
  const router = useRouter();

  const { id } = useLocalSearchParams<{ id: string }>();

  const { isFavorite, toggleFavorite } = useFavorites();

  const recipe = recipes.find((item) => item.id === id);

  const goBack = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace("/");
    }
  };
  
  if (!recipe) {
    return (
      <View style={styles.detailContainer}>
        <Text style={styles.detailTitle}>Resep tidak ditemukan</Text>
        <Pressable
          style={styles.buttonMain}
          onPress={() => router.replace("/")}
        >
          <Text style={styles.buttonText}>Ke Beranda</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.detailScroll}
      contentContainerStyle={styles.detailContent}
    >
      {recipe.image ? (
        <View style={styles.detailImageBox}>
          <Image
            source={recipe.image}
            style={styles.detailImageFill}
            resizeMode="cover"
          />
        </View>
      ) : null}

      <Text style={styles.cardInfo}>{recipe.category.toUpperCase()}</Text>

      <View style={styles.card}>
        <Text style={styles.detailText}>
          Estimasi biaya: {formatRupiah(recipe.price)}
        </Text>
        <Text style={styles.detailText}>
          Waktu memasak: {recipe.cookTime} menit
        </Text>

        <Text style={styles.sectionLabel}>Bahan-bahan</Text>
        {recipe.ingredients.map((ingredient, index) => (
          <Text key={`${recipe.id}-${index}`} style={styles.ingredient}>
            {"• " + ingredient}
          </Text>
        ))}

        {recipe.note ? (
          <Text style={styles.note}>Tips: {recipe.note}</Text>
        ) : null}
      </View>

      <Pressable
        style={styles.buttonMain}
        onPress={() => toggleFavorite(recipe.id)}
      >
        <Text style={styles.buttonText}>
          {isFavorite(recipe.id)
            ? "♥ Hapus dari Favorit"
            : "♡ Tambah ke Favorit"}
        </Text>
      </Pressable>

      <Pressable style={styles.buttonSecondary} onPress={goBack}>
        <Text style={styles.buttonSecondaryText}>Kembali</Text>
      </Pressable>
    </ScrollView>
  );
}
