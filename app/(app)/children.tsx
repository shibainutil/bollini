import { useRouter } from "expo-router";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { getDaycareData } from "../../src/lib/daycareData";
import { useLanguage } from "../../src/providers/LanguageProvider";
import { colors } from "../../src/theme/colors";
import { typography } from "../../src/theme/typography";

export default function ChildrenScreen() {
  const { language, t } = useLanguage();
  const { children } = getDaycareData(language);

  return (
    <SafeAreaView style={styles.safeArea} edges={["left", "right", "bottom"]}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.headerCard}>
          <Text style={styles.eyebrow}>{t.children.eyebrow}</Text>
          <Text style={styles.title}>{t.children.title}</Text>
          <Text style={styles.subtitle}>{t.children.subtitle}</Text>
        </View>

        {children.map((child) => (
          <View key={child.id} style={styles.childCard}>
            <Text style={styles.childName}>{child.name}</Text>
            <Text style={styles.childGroup}>{child.group}</Text>
            <Text style={styles.childDetail}>{t.children.attendanceLabel}: {child.attendance}</Text>
            <Text style={styles.childDetail}>{t.children.pickupContactsLabel}: {child.pickupContacts.join(", ")}</Text>
            <Text style={styles.childNotes}>{child.notes}</Text>
          </View>
        ))}
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
    gap: 14,
  },
  headerCard: {
    borderRadius: 28,
    backgroundColor: colors.mint,
    padding: 22,
  },
  eyebrow: {
    color: colors.teal,
    fontSize: 12,
    textTransform: "uppercase",
    letterSpacing: 0.5,
    fontFamily: typography.uiStrong,
  },
  title: {
    color: colors.navy,
    fontSize: 28,
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
  childCard: {
    borderRadius: 24,
    backgroundColor: colors.white,
    padding: 20,
    borderWidth: 1,
    borderColor: "rgba(2, 51, 71, 0.08)",
  },
  childName: {
    color: colors.navy,
    fontSize: 22,
    fontFamily: typography.heading,
  },
  childGroup: {
    color: colors.coral,
    fontSize: 14,
    fontFamily: typography.ui,
    marginTop: 6,
  },
  childDetail: {
    color: colors.tealSoft,
    fontSize: 15,
    lineHeight: 22,
    marginTop: 10,
    fontFamily: typography.body,
  },
  childNotes: {
    color: colors.teal,
    fontSize: 14,
    lineHeight: 20,
    marginTop: 12,
    fontFamily: typography.bodyMedium,
  },
});