import { Platform } from "react-native";

const webBrandFallback = "'Aptos', 'Segoe UI', 'Helvetica Neue', Arial, sans-serif";
const webBodyFallback = "'Aptos', 'Segoe UI', 'Helvetica Neue', Arial, sans-serif";

function withWebFallback(fontFamily: string, fallback: string) {
  return Platform.OS === "web" ? `${fontFamily}, ${fallback}` : fontFamily;
}

export const typography = {
  brand: withWebFallback("PlusJakartaSans_800ExtraBold", webBrandFallback),
  heading: withWebFallback("PlusJakartaSans_700Bold", webBrandFallback),
  headingStrong: withWebFallback("PlusJakartaSans_800ExtraBold", webBrandFallback),
  ui: withWebFallback("InstrumentSans_600SemiBold", webBodyFallback),
  uiStrong: withWebFallback("InstrumentSans_700Bold", webBodyFallback),
  body: withWebFallback("InstrumentSans_400Regular", webBodyFallback),
  bodyMedium: withWebFallback("InstrumentSans_500Medium", webBodyFallback),
};