
import { View, Text } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { pageStyles } from "../../styles";

export default function CatchAllPage() {
  const { slug } = useLocalSearchParams<{ slug: string[] }>();

  return (
    <View style={pageStyles.container}>
      <Text style={pageStyles.title}>Catch-All Page</Text>
      <Text style={pageStyles.description}>
        Slug: {Array.isArray(slug) ? slug.join("/") : slug}
      </Text>
    </View>
  );
}
