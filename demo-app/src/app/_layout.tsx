import { DarkTheme, DefaultTheme, Stack, ThemeProvider, useRouter, useSegments } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { ActivityIndicator, StyleSheet, useColorScheme, View } from 'react-native';

import { AnimatedSplashOverlay } from '@/components/animated-icon';
import { AuthProvider, useAuth } from '@/context/AuthContext';

SplashScreen.preventAutoHideAsync();

// MODUL 4 - Route Protection Guard
// "Satpam" di pintu masuk: memeriksa status login lalu mengarahkan pengguna.
function AuthGate() {
  const { user, loading } = useAuth();
  const segments = useSegments(); // contoh: ["(auth)", "login"] atau ["(app)"]
  const router = useRouter();

  useEffect(() => {
    // RULE 1: masih memeriksa sesi -> jangan redirect dulu (cegah layar berkedip)
    if (loading) return;

    const inAuthGroup = segments[0] === '(auth)';

    if (!user && !inAuthGroup) {
      // RULE 2 & 4: belum login / sudah logout tapi di area aplikasi -> ke login
      router.replace('/login');
    } else if (user && inAuthGroup) {
      // RULE 3: sudah login tapi masih di halaman login -> ke aplikasi
      router.replace('/');
    }
  }, [user, loading, segments, router]);

  return (
    <>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(auth)" />
        <Stack.Screen name="(app)" />
      </Stack>

      {/* Spinner selama sesi dibaca dari SecureStore */}
      {loading ? (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color="#ea580c" />
        </View>
      ) : null}
    </>
  );
}

export default function RootLayout() {
  const colorScheme = useColorScheme();
  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <AnimatedSplashOverlay />
      <AuthProvider>
        <AuthGate />
      </AuthProvider>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  loadingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff7ed',
  },
});
