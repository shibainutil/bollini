import { Slot } from "expo-router";
import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { AppBottomNav } from "../../src/components/AppBottomNav";
import { AppTopNav } from "../../src/components/AppTopNav";
import { colors } from "../../src/theme/colors";

export default function ProtectedLayout() {
  return (
    <SafeAreaView style={styles.safeArea} edges={["top"]}>
      <View style={styles.container}>
        <View style={styles.topLayer}>
          <AppTopNav />
        </View>
        <View style={styles.navLayer}>
          <AppBottomNav />
        </View>
        <View style={styles.content}>
          <Slot />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.cream,
  },
  container: {
    flex: 1,
    backgroundColor: colors.cream,
  },
  topLayer: {
    position: "relative",
    zIndex: 50,
    elevation: 50,
  },
  navLayer: {
    zIndex: 40,
    elevation: 40,
  },
  content: {
    flex: 1,
    zIndex: 1,
  },
});