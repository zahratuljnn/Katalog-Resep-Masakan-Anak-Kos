import AppTabs from '@/components/app-tabs';

// Grup (app): area yang hanya bisa dibuka setelah login (dijaga di app/_layout.tsx)
export default function AppLayout() {
  return <AppTabs />;
}
