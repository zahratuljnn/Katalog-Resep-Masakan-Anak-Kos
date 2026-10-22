import { createContext, useContext, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

// 1. Membuat Context untuk menyimpan tema
type ThemeContextType = {
  darkMode: boolean;
  setDarkMode: (value: boolean) => void;
};

const ThemeContext = createContext<ThemeContextType | null>(null);

// 2. Komponen utama
export default function DarkModePage() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <ThemeContext.Provider value={{ darkMode, setDarkMode }}>
      <Home />
    </ThemeContext.Provider>
  );
}

// 3. Halaman yang menggunakan tema
function Home() {
  const { darkMode, setDarkMode } = useContext(ThemeContext)!;

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: darkMode ? "#222222" : "#ffffff",
        },
      ]}
    >
      <Text style={[styles.title, { color: darkMode ? "#ffffff" : "#222222" }]}>
        Dark Mode Demo
      </Text>

      <Profile />

      <Pressable style={styles.button} onPress={() => setDarkMode(!darkMode)}>
        <Text style={styles.buttonText}>
          {darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
        </Text>
      </Pressable>
    </View>
  );
}

// 4. Komponen turunan
function Profile() {
  return (
    <View style={styles.section}>
      <Text>Profile</Text>
      <UserCard />
    </View>
  );
}

function UserCard() {
  return (
    <View style={styles.section}>
      <Text>User Card</Text>
      <UserName />
    </View>
  );
}

function UserName() {
  const { darkMode } = useContext(ThemeContext)!;

  return (
    <Text style={{ color: darkMode ? "#ffffff" : "#222222" }}>User Name</Text>
  );
}

// 5. Styling
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
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
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
