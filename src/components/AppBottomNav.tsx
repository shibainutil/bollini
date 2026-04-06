import { Ionicons } from "@expo/vector-icons";
import { Href, usePathname, useRouter } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { useLanguage } from "../providers/LanguageProvider";
import { colors } from "../theme/colors";
import { typography } from "../theme/typography";

type NavItem = {
  key: string;
  href: Href;
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  isActive: boolean;
};

export function AppBottomNav() {
  const { t } = useLanguage();
  const pathname = usePathname();
  const router = useRouter();

  const items: NavItem[] = [
    { key: "home", href: "/home", icon: "home-outline", label: t.nav.home, isActive: pathname === "/home" },
    { key: "children", href: "/children", icon: "people-outline", label: t.nav.children, isActive: pathname === "/children" },
    { key: "invoices", href: "/invoices", icon: "receipt-outline", label: t.nav.invoices, isActive: pathname === "/invoices" },
    { key: "announcements", href: "/announcements", icon: "megaphone-outline", label: t.nav.announcements, isActive: pathname === "/announcements" },
    { key: "chat", href: "/chat", icon: "chatbubble-ellipses-outline", label: t.nav.chat, isActive: pathname === "/chat" },
  ];

  return (
    <View style={styles.wrapper}>
      <View style={styles.inner}>
        {items.map((item) => (
          <Pressable
            key={item.key}
            onPress={() => router.replace(item.href)}
            style={[styles.item, item.isActive && styles.itemActive]}
          >
            <Ionicons
              name={item.icon}
              size={20}
              color={item.isActive ? colors.white : colors.teal}
            />
            {item.isActive ? <Text style={styles.itemLabel}>{item.label}</Text> : null}
          </Pressable>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: colors.cream,
    paddingHorizontal: 12,
    paddingTop: 10,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(2, 51, 71, 0.08)",
  },
  inner: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 8,
  },
  item: {
    minWidth: 48,
    minHeight: 48,
    borderRadius: 999,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: "rgba(2, 51, 71, 0.08)",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 14,
    flexDirection: "row",
    gap: 8,
  },
  itemActive: {
    backgroundColor: colors.teal,
    borderColor: colors.teal,
  },
  itemLabel: {
    color: colors.white,
    fontSize: 13,
    fontFamily: typography.ui,
  },
});