import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

import { getDaycareData } from "../../src/lib/daycareData";
import { useAuth } from "../../src/providers/AuthProvider";
import { useLanguage } from "../../src/providers/LanguageProvider";
import { colors } from "../../src/theme/colors";
import { typography } from "../../src/theme/typography";

export default function HomeScreen() {
  const { user } = useAuth();
  const router = useRouter();
  const { language, t } = useLanguage();
  const { announcements, chatThreads, children, invoices } = getDaycareData(language);

  const metadataName = user?.displayName;
  const displayName =
    typeof metadataName === "string" && metadataName.trim()
      ? metadataName
      : user?.email
        ? user.email.split("@")[0]
        : t.common.familyFallback;

  return (
    <SafeAreaView style={styles.safeArea} edges={["left", "right", "bottom"]}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.headerCard}>
          <Text style={styles.eyebrow}>{t.home.eyebrow}</Text>
          <Text style={styles.title}>{t.home.greeting(displayName)}</Text>
          <Text style={styles.subtitle}>{t.home.subtitle}</Text>
          <Text style={styles.email}>{user?.email}</Text>
        </View>

        <View style={styles.menuGrid}>
          <Pressable onPress={() => router.push("/children")} style={styles.menuCard}>
            <Text style={styles.menuTitle}>{t.home.childrenTitle}</Text>
            <Text style={styles.menuValue}>{children.length}</Text>
            <Text style={styles.menuCopy}>{t.home.childrenCopy}</Text>
          </Pressable>

          <Pressable onPress={() => router.push("/invoices")} style={[styles.menuCard, styles.menuCardSand]}>
            <Text style={styles.menuTitle}>{t.home.invoicesTitle}</Text>
            <Text style={styles.menuValue}>{invoices.length}</Text>
            <Text style={styles.menuCopy}>{t.home.invoicesCopy}</Text>
          </Pressable>

          <Pressable onPress={() => router.push("/announcements")} style={[styles.menuCard, styles.menuCardPeach]}>
            <Text style={styles.menuTitle}>{t.home.announcementsTitle}</Text>
            <Text style={styles.menuValue}>{announcements.length}</Text>
            <Text style={styles.menuCopy}>{t.home.announcementsCopy}</Text>
          </Pressable>

          <Pressable onPress={() => router.push("/chat")} style={[styles.menuCard, styles.menuCardSky]}>
            <Text style={styles.menuTitle}>{t.home.chatTitle}</Text>
            <Text style={styles.menuValue}>{chatThreads.length}</Text>
            <Text style={styles.menuCopy}>{t.home.chatCopy}</Text>
          </Pressable>
        </View>

        <View style={styles.sectionCard}>
          <Text style={styles.sectionEyebrow}>{t.home.nextPayment}</Text>
          <Text style={styles.sectionTitle}>{invoices[0]?.month}</Text>
          <Text style={styles.sectionBody}>{t.home.paymentSummary(invoices[0]?.amount ?? "", invoices[0]?.dueDate ?? "")}</Text>
        </View>

        <View style={styles.sectionCard}>
          <Text style={styles.sectionEyebrow}>{t.home.latestAnnouncement}</Text>
          <Text style={styles.sectionTitle}>{announcements[0]?.title}</Text>
          <Text style={styles.sectionBody}>{announcements[0]?.body}</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.cream,
  },
  container: {
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 32,
    gap: 16,
  },
  headerCard: {
    borderRadius: 28,
    backgroundColor: colors.mint,
    padding: 22,
  },
  eyebrow: {
    color: colors.teal,
    textTransform: "uppercase",
    fontSize: 12,
    letterSpacing: 0.5,
    fontFamily: typography.uiStrong,
  },
  title: {
    color: colors.navy,
    fontSize: 30,
    fontFamily: typography.headingStrong,
    marginTop: 8,
  },
  subtitle: {
    color: colors.tealSoft,
    fontSize: 15,
    lineHeight: 22,
    marginTop: 10,
    fontFamily: typography.body,
  },
  email: {
    color: colors.teal,
    fontSize: 14,
    fontFamily: typography.ui,
    marginTop: 14,
  },
  menuGrid: {
    gap: 12,
  },
  menuCard: {
    borderRadius: 24,
    backgroundColor: colors.white,
    padding: 20,
    borderWidth: 1,
    borderColor: "rgba(2, 51, 71, 0.08)",
  },
  menuCardSand: {
    backgroundColor: colors.sand,
  },
  menuCardPeach: {
    backgroundColor: colors.peach,
  },
  menuCardSky: {
    backgroundColor: colors.skyTint,
  },
  menuTitle: {
    color: colors.teal,
    fontSize: 15,
    fontFamily: typography.ui,
    textTransform: "uppercase",
    letterSpacing: 0.4,
  },
  menuValue: {
    color: colors.navy,
    fontSize: 30,
    fontFamily: typography.headingStrong,
    marginTop: 8,
  },
  menuCopy: {
    color: colors.tealSoft,
    fontSize: 14,
    lineHeight: 20,
    marginTop: 8,
    fontFamily: typography.body,
  },
  sectionCard: {
    borderRadius: 24,
    backgroundColor: colors.white,
    padding: 20,
    borderWidth: 1,
    borderColor: "rgba(2, 51, 71, 0.08)",
  },
  sectionEyebrow: {
    color: colors.coral,
    fontSize: 12,
    fontFamily: typography.uiStrong,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  sectionTitle: {
    color: colors.navy,
    fontSize: 22,
    fontFamily: typography.heading,
    marginTop: 8,
  },
  sectionBody: {
    color: colors.tealSoft,
    fontSize: 15,
    lineHeight: 22,
    marginTop: 8,
    fontFamily: typography.body,
  },
});