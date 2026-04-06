import {
  PlusJakartaSans_700Bold,
  PlusJakartaSans_800ExtraBold,
} from "@expo-google-fonts/plus-jakarta-sans";
import {
  InstrumentSans_400Regular,
  InstrumentSans_500Medium,
  InstrumentSans_600SemiBold,
  InstrumentSans_700Bold,
} from "@expo-google-fonts/instrument-sans";
import { useFonts } from "expo-font";
import { Stack, usePathname, useRouter } from "expo-router";
import { useEffect } from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { AuthProvider, useAuth } from "../src/providers/AuthProvider";
import { LanguageProvider } from "../src/providers/LanguageProvider";
import { colors } from "../src/theme/colors";

function AppNavigator() {
  const { isLoading, user } = useAuth();
  const [fontsLoaded] = useFonts({
    PlusJakartaSans_700Bold,
    PlusJakartaSans_800ExtraBold,
    InstrumentSans_400Regular,
    InstrumentSans_500Medium,
    InstrumentSans_600SemiBold,
    InstrumentSans_700Bold,
  });
  const pathname = usePathname();
  const router = useRouter();
  const isAuthenticated = Boolean(user?.emailVerified);

  useEffect(() => {
    if (isLoading) {
      return;
    }

    const isOnPublicRoute = pathname === "/";

    if (!isAuthenticated && !isOnPublicRoute) {
      router.replace("/");
      return;
    }

    if (isAuthenticated && isOnPublicRoute) {
      router.replace("/home");
    }
  }, [isAuthenticated, isLoading, pathname, router]);

  if (isLoading || !fontsLoaded) {
    return (
      <View style={styles.loadingScreen}>
        <ActivityIndicator size="large" color={colors.coral} />
      </View>
    );
  }

  return <Stack screenOptions={{ headerShown: false }} />;
}

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <LanguageProvider>
        <AuthProvider>
          <AppNavigator />
        </AuthProvider>
      </LanguageProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  loadingScreen: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.cream,
  },
});