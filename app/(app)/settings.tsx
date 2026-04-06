import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import { Alert, Platform, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { LanguageSwitcher } from "../../src/components/LanguageSwitcher";
import { applyFetchedUpdate, checkForAppUpdate } from "../../src/lib/appUpdates";
import { UserAvatar } from "../../src/components/UserAvatar";
import { getAuthErrorMessage } from "../../src/lib/authErrorMessages";
import { useAuth } from "../../src/providers/AuthProvider";
import { useLanguage } from "../../src/providers/LanguageProvider";
import { colors } from "../../src/theme/colors";
import { typography } from "../../src/theme/typography";

export default function SettingsScreen() {
  const { profilePhotoUrl, updateProfilePhoto, user } = useAuth();
  const { t } = useLanguage();
  const [isUploading, setIsUploading] = useState(false);
  const [isCheckingUpdates, setIsCheckingUpdates] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);

  const handleChangePhoto = async () => {
    setFeedback(null);

    if (Platform.OS !== "web") {
      const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (!permission.granted) {
        setFeedback(t.settings.photoPermission);
        return;
      }
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.5,
      base64: true,
    });

    if (result.canceled) {
      return;
    }

    const asset = result.assets[0];

    if (!asset?.base64) {
      setFeedback(t.settings.photoFailed);
      return;
    }

    const mimeType = asset.mimeType ?? "image/jpeg";
    const dataUrl = `data:${mimeType};base64,${asset.base64}`;

    setIsUploading(true);

    try {
      await updateProfilePhoto(dataUrl);
      setFeedback(t.settings.photoUpdated);
    } catch (error) {
      setFeedback(getAuthErrorMessage(error, t.auth.errors));
    } finally {
      setIsUploading(false);
    }
  };

  const handleResetPhoto = async () => {
    setIsUploading(true);
    setFeedback(null);

    try {
      await updateProfilePhoto(null);
      setFeedback(t.settings.photoReset);
    } catch (error) {
      setFeedback(getAuthErrorMessage(error, t.auth.errors));
    } finally {
      setIsUploading(false);
    }
  };

  const handleCheckForUpdates = async () => {
    setIsCheckingUpdates(true);
    setFeedback(t.settings.updatesChecking);

    try {
      const result = await checkForAppUpdate();

      if (result === "available") {
        setFeedback(t.settings.updatesAvailable);
        await applyFetchedUpdate();
        return;
      }

      if (result === "upToDate") {
        setFeedback(t.settings.updatesCurrent);
        return;
      }

      setFeedback(t.settings.updatesUnsupported);
    } catch {
      setFeedback(t.settings.updatesFailed);
    } finally {
      setIsCheckingUpdates(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={["left", "right", "bottom"]}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.headerCard}>
          <Text style={styles.eyebrow}>{t.settings.eyebrow}</Text>
          <Text style={styles.title}>{t.settings.title}</Text>
          <Text style={styles.subtitle}>{t.settings.subtitle}</Text>
        </View>

        <View style={styles.card}>
          <View style={styles.row}>
            <Ionicons name="person-circle-outline" size={20} color={colors.teal} />
            <Text style={styles.cardTitle}>{t.settings.account}</Text>
          </View>
          <View style={styles.avatarRow}>
            <UserAvatar photoUrl={profilePhotoUrl} size={84} />
            <View style={styles.avatarActions}>
              <Pressable disabled={isUploading} onPress={handleChangePhoto} style={[styles.primaryButton, isUploading && styles.buttonDisabled]}>
                <Text style={styles.primaryButtonLabel}>{isUploading ? t.settings.photoUpdating : t.settings.changePhoto}</Text>
              </Pressable>
              <Pressable disabled={isUploading || !profilePhotoUrl} onPress={handleResetPhoto} style={[styles.secondaryButton, (isUploading || !profilePhotoUrl) && styles.buttonDisabled]}>
                <Text style={styles.secondaryButtonLabel}>{t.settings.resetPhoto}</Text>
              </Pressable>
            </View>
          </View>
          <Text style={styles.value}>{user?.displayName || t.common.familyFallback}</Text>
          <Text style={styles.valueSecondary}>{user?.email}</Text>
          {feedback ? <Text style={styles.feedback}>{feedback}</Text> : null}
        </View>

        <View style={styles.card}>
          <View style={styles.row}>
            <Ionicons name="language-outline" size={20} color={colors.teal} />
            <Text style={styles.cardTitle}>{t.settings.language}</Text>
          </View>
          <Text style={styles.cardCopy}>{t.settings.languageCopy}</Text>
          <View style={styles.switcherWrap}>
            <LanguageSwitcher />
          </View>
        </View>

        <View style={styles.card}>
          <View style={styles.row}>
            <Ionicons name="cloud-download-outline" size={20} color={colors.teal} />
            <Text style={styles.cardTitle}>{t.settings.updates}</Text>
          </View>
          <Text style={styles.cardCopy}>{t.settings.updatesCopy}</Text>
          <Pressable disabled={isCheckingUpdates} onPress={handleCheckForUpdates} style={[styles.primaryButton, isCheckingUpdates && styles.buttonDisabled]}>
            <Text style={styles.primaryButtonLabel}>{isCheckingUpdates ? t.settings.updatesChecking : t.settings.checkUpdates}</Text>
          </Pressable>
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
    gap: 14,
  },
  headerCard: {
    borderRadius: 28,
    backgroundColor: colors.mist,
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
  card: {
    borderRadius: 24,
    backgroundColor: colors.white,
    padding: 20,
    borderWidth: 1,
    borderColor: "rgba(2, 51, 71, 0.08)",
    gap: 8,
  },
  avatarRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    marginTop: 6,
  },
  avatarActions: {
    flex: 1,
    gap: 10,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  cardTitle: {
    color: colors.navy,
    fontSize: 18,
    fontFamily: typography.heading,
  },
  cardCopy: {
    color: colors.tealSoft,
    fontSize: 15,
    lineHeight: 22,
    fontFamily: typography.body,
  },
  value: {
    color: colors.navy,
    fontSize: 16,
    fontFamily: typography.ui,
  },
  valueSecondary: {
    color: colors.tealSoft,
    fontSize: 14,
    fontFamily: typography.body,
  },
  primaryButton: {
    minHeight: 46,
    borderRadius: 16,
    backgroundColor: colors.teal,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 14,
  },
  primaryButtonLabel: {
    color: colors.white,
    fontSize: 14,
    fontFamily: typography.ui,
  },
  secondaryButton: {
    minHeight: 42,
    borderRadius: 16,
    backgroundColor: colors.mist,
    borderWidth: 1,
    borderColor: "rgba(2, 51, 71, 0.12)",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 14,
  },
  secondaryButtonLabel: {
    color: colors.teal,
    fontSize: 14,
    fontFamily: typography.ui,
  },
  buttonDisabled: {
    opacity: 0.55,
  },
  feedback: {
    color: colors.teal,
    fontSize: 14,
    lineHeight: 20,
    marginTop: 6,
    fontFamily: typography.body,
  },
  switcherWrap: {
    paddingTop: 6,
  },
});