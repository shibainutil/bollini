import { Pressable, StyleSheet, Text, View } from "react-native";

import { useLanguage } from "../providers/LanguageProvider";
import { colors } from "../theme/colors";
import { typography } from "../theme/typography";

export function LanguageSwitcher() {
  const { language, setLanguage, t } = useLanguage();

  return (
    <View style={styles.container}>
      <Pressable onPress={() => void setLanguage("en")} style={[styles.button, language === "en" && styles.buttonActive]}>
        <Text style={[styles.label, language === "en" && styles.labelActive]}>{t.common.english}</Text>
      </Pressable>
      <Pressable onPress={() => void setLanguage("de")} style={[styles.button, language === "de" && styles.buttonActive]}>
        <Text style={[styles.label, language === "de" && styles.labelActive]}>{t.common.german}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignSelf: "flex-end",
    flexDirection: "row",
    borderRadius: 999,
    backgroundColor: colors.mist,
    padding: 4,
    gap: 4,
  },
  button: {
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  buttonActive: {
    backgroundColor: colors.white,
  },
  label: {
    color: colors.tealSoft,
    fontSize: 13,
    fontFamily: typography.ui,
  },
  labelActive: {
    color: colors.navy,
  },
});