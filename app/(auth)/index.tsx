import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import {
  ActivityIndicator,
  Image,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { LanguageSwitcher } from "../../src/components/LanguageSwitcher";
import { getAuthErrorMessage } from "../../src/lib/authErrorMessages";
import { firebaseEnabled } from "../../src/lib/firebase";
import { useAuth } from "../../src/providers/AuthProvider";
import { useLanguage } from "../../src/providers/LanguageProvider";
import { colors } from "../../src/theme/colors";
import { typography } from "../../src/theme/typography";

type AuthMode = "login" | "signup";

export default function AuthScreen() {
  const { signIn, signUp, resendVerificationEmail } = useAuth();
  const { t } = useLanguage();
  const [mode, setMode] = useState<AuthMode>("login");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const heading =
    mode === "login" ? t.auth.headingLogin : t.auth.headingSignup;

  const handleSubmit = async () => {
    if (!firebaseEnabled) {
      setFeedback(t.auth.configMissing);
      return;
    }

    if (!email.trim() || !password.trim()) {
      setFeedback(t.auth.enterEmailPassword);
      return;
    }

    if (mode === "signup") {
      if (!fullName.trim()) {
        setFeedback(t.auth.enterFullName);
        return;
      }

      if (password.length < 6) {
        setFeedback(t.auth.choosePassword);
        return;
      }

      if (password !== confirmPassword) {
        setFeedback(t.auth.passwordMismatch);
        return;
      }
    }

    setIsSubmitting(true);
    setFeedback(null);
    setIsSuccess(false);

    try {
      if (mode === "login") {
        await signIn({ email: email.trim(), password });
      } else {
        await signUp({
          email: email.trim(),
          password,
          fullName: fullName.trim(),
        });
        setFeedback(t.auth.accountCreated);
        setIsSuccess(true);
        setMode("login");
        setFullName("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
      }
    } catch (error) {
      const message = getAuthErrorMessage(error, t.auth.errors);
      setFeedback(message);
      setIsSuccess(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResendVerification = async () => {
    if (!firebaseEnabled) {
      setFeedback(t.auth.configMissing);
      return;
    }

    if (!email.trim() || !password.trim()) {
      setFeedback(t.auth.resendPrompt);
      return;
    }

    setIsSubmitting(true);
    setFeedback(null);
    setIsSuccess(false);

    try {
      await resendVerificationEmail({
        email: email.trim(),
        password,
      });
      setFeedback(t.auth.verificationResent);
      setIsSuccess(true);
    } catch (error) {
      const message = getAuthErrorMessage(error, t.auth.errors);
      setFeedback(message);
      setIsSuccess(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <LinearGradient colors={[colors.cream, colors.sand, colors.mint]} start={{ x: 0.05, y: 0 }} end={{ x: 1, y: 1 }} style={styles.gradient}>
      <SafeAreaView style={styles.safeArea}>
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : undefined} style={styles.flex}>
          <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
            <View style={styles.heroCard}>
              <LanguageSwitcher />

              <View style={styles.badge}>
                <Text style={styles.badgeText}>{t.common.registeredFamiliesOnly}</Text>
              </View>

              <Image source={require("../../bollini.png")} style={styles.logo} resizeMode="contain" />

              <Text style={styles.title}>Bollini Daycare</Text>
              <Text style={styles.subtitle}>{heading}</Text>
              <Text style={styles.supportingCopy}>{t.auth.supportingCopy}</Text>

              <View style={styles.modeSwitcher}>
                <Pressable
                  accessibilityRole="button"
                  onPress={() => {
                    setMode("login");
                    setFeedback(null);
                    setIsSuccess(false);
                  }}
                  style={[styles.modeButton, mode === "login" && styles.modeButtonActive]}
                >
                  <Text style={[styles.modeLabel, mode === "login" && styles.modeLabelActive]}>{t.auth.loginTab}</Text>
                </Pressable>

                <Pressable
                  accessibilityRole="button"
                  onPress={() => {
                    setMode("signup");
                    setFeedback(null);
                    setIsSuccess(false);
                  }}
                  style={[styles.modeButton, mode === "signup" && styles.modeButtonActive]}
                >
                  <Text style={[styles.modeLabel, mode === "signup" && styles.modeLabelActive]}>{t.auth.createAccountTab}</Text>
                </Pressable>
              </View>

              <View style={styles.form}>
                {mode === "signup" ? (
                  <TextInput
                    autoCapitalize="words"
                    onChangeText={setFullName}
                    placeholder={t.auth.fullNamePlaceholder}
                    placeholderTextColor="#8b6a59"
                    style={styles.input}
                    value={fullName}
                  />
                ) : null}

                <TextInput
                  autoCapitalize="none"
                  autoComplete="email"
                  keyboardType="email-address"
                  onChangeText={setEmail}
                  placeholder={t.auth.emailPlaceholder}
                  placeholderTextColor="#8b6a59"
                  style={styles.input}
                  value={email}
                />

                <TextInput
                  autoCapitalize="none"
                  autoComplete={mode === "login" ? "current-password" : "new-password"}
                  onChangeText={setPassword}
                  placeholder={t.auth.passwordPlaceholder}
                  placeholderTextColor="#8b6a59"
                  secureTextEntry
                  style={styles.input}
                  value={password}
                />

                {mode === "signup" ? (
                  <TextInput
                    autoCapitalize="none"
                    onChangeText={setConfirmPassword}
                    placeholder={t.auth.confirmPasswordPlaceholder}
                    placeholderTextColor="#8b6a59"
                    secureTextEntry
                    style={styles.input}
                    value={confirmPassword}
                  />
                ) : null}

                {feedback ? <Text style={[styles.feedback, isSuccess && styles.feedbackSuccess]}>{feedback}</Text> : null}

                <Pressable disabled={isSubmitting} onPress={handleSubmit} style={[styles.submitButton, isSubmitting && styles.submitButtonDisabled]}>
                  {isSubmitting ? (
                    <ActivityIndicator color={colors.white} />
                  ) : (
                    <Text style={styles.submitLabel}>{mode === "login" ? t.auth.loginButton : t.auth.createAccountButton}</Text>
                  )}
                </Pressable>

                {mode === "login" ? (
                  <Pressable disabled={isSubmitting} onPress={handleResendVerification} style={[styles.secondaryButton, isSubmitting && styles.submitButtonDisabled]}>
                    <Text style={styles.secondaryButtonLabel}>{t.auth.resendVerificationButton}</Text>
                  </Pressable>
                ) : null}
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  flex: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
    paddingVertical: 28,
  },
  heroCard: {
    borderRadius: 32,
    backgroundColor: "rgba(250, 245, 238, 0.94)",
    paddingHorizontal: 22,
    paddingVertical: 26,
    borderWidth: 1,
    borderColor: "rgba(2, 51, 71, 0.08)",
    shadowColor: colors.navy,
    shadowOpacity: 0.12,
    shadowRadius: 22,
    shadowOffset: {
      width: 0,
      height: 12,
    },
    elevation: 10,
  },
  badge: {
    alignSelf: "flex-start",
    borderRadius: 999,
    backgroundColor: colors.mint,
    paddingHorizontal: 12,
    paddingVertical: 7,
    marginBottom: 18,
  },
  badgeText: {
    color: colors.teal,
    fontSize: 12,
    fontFamily: typography.ui,
    letterSpacing: 0.4,
    textTransform: "uppercase",
  },
  logo: {
    width: 88,
    height: 88,
    borderRadius: 24,
    marginBottom: 18,
  },
  title: {
    color: colors.navy,
    fontSize: 32,
    fontFamily: typography.headingStrong,
    letterSpacing: -0.8,
  },
  subtitle: {
    color: colors.tealSoft,
    fontSize: 18,
    fontFamily: typography.heading,
    marginTop: 10,
  },
  supportingCopy: {
    color: colors.tealSoft,
    fontSize: 15,
    lineHeight: 23,
    marginTop: 10,
    fontFamily: typography.body,
  },
  modeSwitcher: {
    flexDirection: "row",
    backgroundColor: colors.mist,
    borderRadius: 18,
    padding: 5,
    marginTop: 24,
  },
  modeButton: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    borderRadius: 14,
  },
  modeButtonActive: {
    backgroundColor: colors.white,
  },
  modeLabel: {
    color: colors.tealSoft,
    fontSize: 15,
    fontFamily: typography.ui,
  },
  modeLabelActive: {
    color: colors.navy,
  },
  form: {
    gap: 12,
    marginTop: 20,
  },
  input: {
    borderRadius: 18,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.peach,
    color: colors.navy,
    fontSize: 16,
    fontFamily: typography.body,
    paddingHorizontal: 16,
    paddingVertical: 15,
  },
  feedback: {
    color: colors.coral,
    fontSize: 14,
    lineHeight: 20,
    fontFamily: typography.bodyMedium,
  },
  feedbackSuccess: {
    color: colors.teal,
  },
  submitButton: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 18,
    backgroundColor: colors.coral,
    minHeight: 54,
    marginTop: 6,
  },
  submitButtonDisabled: {
    opacity: 0.7,
  },
  submitLabel: {
    color: colors.white,
    fontSize: 16,
    fontFamily: typography.uiStrong,
    letterSpacing: 0.3,
  },
  secondaryButton: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 18,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.tealSoft,
    minHeight: 50,
  },
  secondaryButtonLabel: {
    color: colors.teal,
    fontSize: 15,
    fontFamily: typography.ui,
  },
});