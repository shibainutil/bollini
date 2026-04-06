import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { useState } from "react";

import { useAuth } from "../providers/AuthProvider";
import { useLanguage } from "../providers/LanguageProvider";
import { colors } from "../theme/colors";
import { typography } from "../theme/typography";
import { UserAvatar } from "./UserAvatar";

export function AppTopNav() {
  const { profilePhotoUrl, signOut } = useAuth();
  const { t } = useLanguage();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);

  const openSettings = () => {
    setMenuOpen(false);
    router.push("/settings");
  };

  const handleSignOut = async () => {
    setMenuOpen(false);
    await signOut();
  };

  return (
    <View style={styles.wrapper}>
      <View style={styles.topRow}>
        <View style={styles.brandBlock}>
          <Image source={require("../../arc.png")} style={styles.brandMark} resizeMode="contain" />
          <View>
            <Text style={styles.brand}>Bollini</Text>
            <Text style={styles.subline}>{t.nav.subline}</Text>
          </View>
        </View>

        <View style={styles.profileWrap}>
          <Pressable onPress={() => setMenuOpen((current) => !current)} style={styles.profileButton}>
            <UserAvatar photoUrl={profilePhotoUrl} size={48} />
          </Pressable>

          {menuOpen ? (
            <View style={styles.menu}>
              <Pressable onPress={openSettings} style={styles.menuItem}>
                <Ionicons name="settings-outline" size={18} color={colors.teal} />
                <Text style={styles.menuText}>{t.settings.title}</Text>
              </Pressable>
              <Pressable onPress={handleSignOut} style={styles.menuItem}>
                <Ionicons name="log-out-outline" size={18} color={colors.coral} />
                <Text style={styles.menuText}>{t.common.signOut}</Text>
              </Pressable>
            </View>
          ) : null}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    position: "relative",
    zIndex: 60,
    elevation: 60,
    backgroundColor: colors.cream,
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(2, 51, 71, 0.08)",
  },
  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 12,
  },
  brandBlock: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  brandMark: {
    width: 60,
    height: 60,
  },
  brand: {
    color: colors.navy,
    fontSize: 18,
    fontFamily: typography.brand,
  },
  subline: {
    color: colors.tealSoft,
    fontSize: 13,
    marginTop: 4,
    fontFamily: typography.body,
  },
  profileWrap: {
    position: "relative",
    zIndex: 70,
  },
  profileButton: {
    width: 52,
    height: 52,
    borderRadius: 999,
    borderWidth: 2,
    borderColor: colors.white,
    backgroundColor: colors.mint,
    alignItems: "center",
    justifyContent: "center",
  },
  menu: {
    position: "absolute",
    top: 60,
    right: 0,
    minWidth: 180,
    borderRadius: 18,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: "rgba(2, 51, 71, 0.08)",
    paddingVertical: 8,
    shadowColor: colors.navy,
    shadowOpacity: 0.12,
    shadowRadius: 16,
    shadowOffset: {
      width: 0,
      height: 10,
    },
    elevation: 8,
    zIndex: 100,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  menuText: {
    color: colors.navy,
    fontSize: 14,
    fontFamily: typography.ui,
  },
});