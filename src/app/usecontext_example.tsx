import { createContext, useContext, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

// 1. Membuat Context
type ThemeContextType = {
  darkMode: boolean;
  setDarkMode: (value: boolean) => void;
};

const ThemeContext = createContext<ThemeContextType | null>(null);

// 2. Komponen utama dan Provider
export default function UseContextExample() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <ThemeContext.Provider value={{ darkMode, setDarkMode }}>
      <Home />
    </ThemeContext.Provider>
  );
}

// 3. Komponen Home
function Home() {
  const { darkMode, setDarkMode } = useContext(ThemeContext)!;

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: darkMode ? "#222222" : "#ffffff" },
      ]}
    >
      <Text style={{ color: darkMode ? "#ffffff" : "#222222" }}>Home</Text>

      <Profile />

      <Pressable style={styles.button} onPress={() => setDarkMode(!darkMode)}>
        <Text style={styles.buttonText}>Toggle Dark Mode</Text>
      </Pressable>
    </View>
  );
}

// 4. Komponen Profile
function Profile() {
  return (
    <View style={styles.section}>
      <Text>Profile</Text>
      <UserCard />
    </View>
  );
}

// 5. Komponen UserCard
function UserCard() {
  return (
    <View style={styles.section}>
      <Text>User Card</Text>
      <UserName />
    </View>
  );
}

// 6. Komponen UserName membaca Context
function UserName() {
  const { darkMode } = useContext(ThemeContext)!;

  return (
    <Text style={{ color: darkMode ? "#ffffff" : "#222222" }}>User Name</Text>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
    gap: 20,
  },
  section: {
    padding: 12,
    gap: 12,
  },
  button: {
    backgroundColor: "#2563eb",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "#ffffff",
    fontWeight: "bold",
  },
});
