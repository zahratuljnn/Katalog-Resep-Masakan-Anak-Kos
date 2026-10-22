import { View, Text } from "react-native";
import { pageStyles } from "../../styles";

export default function DocsPage() {
  return (
    <View style={pageStyles.container}>
      <Text style={pageStyles.title}>Documentation</Text>

      <Text style={pageStyles.description}>
        Welcome to the documentation page!
      </Text>
    </View>
  );
}
