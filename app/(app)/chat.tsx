import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { getDaycareData } from "../../src/lib/daycareData";
import { useLanguage } from "../../src/providers/LanguageProvider";
import { colors } from "../../src/theme/colors";
import { typography } from "../../src/theme/typography";

export default function ChatScreen() {
  const { language, t } = useLanguage();
  const { chatThreads } = getDaycareData(language);

  return (
    <SafeAreaView style={styles.safeArea} edges={["left", "right", "bottom"]}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.headerCard}>
          <Text style={styles.eyebrow}>{t.chat.eyebrow}</Text>
          <Text style={styles.title}>{t.chat.title}</Text>
          <Text style={styles.subtitle}>{t.chat.subtitle}</Text>
        </View>

        {chatThreads.map((thread) => (
          <View key={thread.id} style={styles.threadCard}>
            <View style={styles.threadHeader}>
              <View style={styles.threadIdentity}>
                <Text style={styles.contact}>{thread.contact}</Text>
                <Text style={styles.role}>{thread.role}</Text>
              </View>
              <Text style={styles.timestamp}>{thread.timestamp}</Text>
            </View>
            <Text style={styles.preview}>{thread.preview}</Text>
            {thread.unreadCount > 0 ? (
              <View style={styles.unreadBadge}>
                <Text style={styles.unreadLabel}>{t.chat.unread(thread.unreadCount)}</Text>
              </View>
            ) : null}
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
    backgroundColor: colors.skyTint,
    padding: 22,
  },
  eyebrow: {
    color: colors.tealBright,
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
  threadCard: {
    borderRadius: 24,
    backgroundColor: colors.white,
    padding: 20,
    borderWidth: 1,
    borderColor: "rgba(2, 51, 71, 0.08)",
  },
  threadHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
  },
  threadIdentity: {
    flex: 1,
  },
  contact: {
    color: colors.navy,
    fontSize: 20,
    fontFamily: typography.heading,
  },
  role: {
    color: colors.tealBright,
    fontSize: 14,
    fontFamily: typography.ui,
    marginTop: 6,
  },
  timestamp: {
    color: colors.tealSoft,
    fontSize: 13,
    fontFamily: typography.ui,
  },
  preview: {
    color: colors.tealSoft,
    fontSize: 15,
    lineHeight: 22,
    marginTop: 10,
    fontFamily: typography.body,
  },
  unreadBadge: {
    alignSelf: "flex-start",
    marginTop: 14,
    borderRadius: 999,
    backgroundColor: colors.coral,
    paddingHorizontal: 12,
    paddingVertical: 7,
  },
  unreadLabel: {
    color: colors.white,
    fontFamily: typography.ui,
  },
});