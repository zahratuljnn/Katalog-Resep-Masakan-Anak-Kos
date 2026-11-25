import { Image } from "expo-image";
import { useState } from "react";
import { Pressable, Text, View } from "react-native";

import { styles } from "../constants/styles";
import { OnlineRecipe } from "../types/recipe";
import { formatRupiah } from "../utils/format";

export function OnlineRecipeCard({ recipe }: { recipe: OnlineRecipe }) {
  const [showSteps, setShowSteps] = useState(false);

  return (
    <View style={styles.card}>
      {recipe.imageUrl ? (
        <Image
          source={{ uri: recipe.imageUrl }}
          style={styles.cardImage}
          contentFit="cover"
          transition={200}
        />
      ) : null}

      <Text style={styles.cardTitle}>{recipe.name}</Text>
      <Text style={styles.cardInfo}>
        {recipe.category.toUpperCase()} • {recipe.cookTime} menit •{" "}
        {formatRupiah(recipe.price)}
      </Text>

      <Text style={styles.sectionLabel}>Bahan:</Text>
      {recipe.ingredients.map((item, index) => (
        <Text key={index} style={styles.ingredient}>
          • {item}
        </Text>
      ))}

      {showSteps ? (
        <>
          <Text style={styles.sectionLabel}>Cara memasak:</Text>
          {recipe.steps.map((step, index) => (
            <Text key={index} style={styles.ingredient}>
              {index + 1}. {step}
            </Text>
          ))}
        </>
      ) : null}

      {recipe.note ? (
        <Text style={styles.note}>Tips: {recipe.note}</Text>
      ) : null}

      <Pressable style={styles.button} onPress={() => setShowSteps(!showSteps)}>
        <Text style={styles.buttonText}>
          {showSteps ? "Sembunyikan Cara Memasak" : "Lihat Cara Memasak"}
        </Text>
      </Pressable>
    </View>
  );
}
