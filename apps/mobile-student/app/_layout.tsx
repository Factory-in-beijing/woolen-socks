import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { fontAssets } from "@/theme/fonts";

// Unexpected render errors in any screen end up here (expo-router picks this export up).
export { AppErrorBoundary as ErrorBoundary } from "@/components/AppErrorBoundary";

export default function RootLayout() {
  const [fontsLoaded, fontError] = useFonts(fontAssets);
  // A font failure must not leave a blank screen: fall back to the system font.
  if (!fontsLoaded && !fontError) return null;
  return (
    <>
      <StatusBar style="dark" />
      <Stack screenOptions={{ headerShown: false, animation: "slide_from_right" }} />
    </>
  );
}
