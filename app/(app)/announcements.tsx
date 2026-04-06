import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { getDaycareData } from "../../src/lib/daycareData";
import { useLanguage } from "../../src/providers/LanguageProvider";
import { colors } from "../../src/theme/colors";
import { typography } from "../../src/theme/typography";

export default function AnnouncementsScreen() {
  const { language, t } = useLanguage();
  const { announcements } = getDaycareData(language);

  return (
    <SafeAreaView style={styles.safeArea} edges={["left", "right", "bottom"]}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.headerCard}>
          <Text style={styles.eyebrow}>{t.announcements.eyebrow}</Text>
          <Text style={styles.title}>{t.announcements.title}</Text>
          <Text style={styles.subtitle}>{t.announcements.subtitle}</Text>
        </View>

        {announcements.map((announcement) => (
          <View key={announcement.id} style={styles.announcementCard}>
            <Text style={styles.date}>{announcement.date}</Text>
            <Text style={styles.announcementTitle}>{announcement.title}</Text>
            <Text style={styles.body}>{announcement.body}</Text>
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
    backgroundColor: colors.peach,
    padding: 22,
  },
  eyebrow: {
    color: colors.coral,
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
  announcementCard: {
    borderRadius: 24,
    backgroundColor: colors.white,
    padding: 20,
    borderWidth: 1,
    borderColor: "rgba(2, 51, 71, 0.08)",
  },
  date: {
    color: colors.coral,
    fontSize: 13,
    fontFamily: typography.ui,
  },
  announcementTitle: {
    color: colors.navy,
    fontSize: 22,
    fontFamily: typography.heading,
    marginTop: 8,
  },
  body: {
    color: colors.tealSoft,
    fontSize: 15,
    lineHeight: 22,
    marginTop: 10,
    fontFamily: typography.body,
  },
});