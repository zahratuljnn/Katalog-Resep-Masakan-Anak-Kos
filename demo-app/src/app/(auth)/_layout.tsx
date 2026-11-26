import { Stack } from 'expo-router';

// Grup (auth): halaman yang boleh dibuka tanpa login
export default function AuthLayout() {
  return <Stack screenOptions={{ headerShown: false }} />;
}
