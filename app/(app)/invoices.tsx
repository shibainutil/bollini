import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { getDaycareData } from "../../src/lib/daycareData";
import { useLanguage } from "../../src/providers/LanguageProvider";
import { colors } from "../../src/theme/colors";
import { typography } from "../../src/theme/typography";

export default function InvoicesScreen() {
  const { language, t } = useLanguage();
  const { invoices } = getDaycareData(language);

  const getStatusLabel = (status: "paid" | "open" | "dueSoon") => {
    if (status === "paid") {
      return t.invoices.statuses.paid;
    }

    if (status === "dueSoon") {
      return t.invoices.statuses.dueSoon;
    }

    return t.invoices.statuses.open;
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={["left", "right", "bottom"]}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.headerCard}>
          <Text style={styles.eyebrow}>{t.invoices.eyebrow}</Text>
          <Text style={styles.title}>{t.invoices.title}</Text>
          <Text style={styles.subtitle}>{t.invoices.subtitle}</Text>
        </View>

        {invoices.map((invoice) => (
          <View key={invoice.id} style={styles.invoiceCard}>
            <View style={styles.invoiceTopRow}>
              <Text style={styles.invoiceMonth}>{invoice.month}</Text>
              <View style={[styles.statusBadge, invoice.status === "paid" ? styles.statusPaid : invoice.status === "dueSoon" ? styles.statusSoon : styles.statusOpen]}>
                <Text style={styles.statusLabel}>{getStatusLabel(invoice.status)}</Text>
              </View>
            </View>
            <Text style={styles.invoiceAmount}>{invoice.amount}</Text>
            <Text style={styles.invoiceDueDate}>{t.invoices.dueDateLabel}: {invoice.dueDate}</Text>
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
    backgroundColor: colors.sand,
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
  invoiceCard: {
    borderRadius: 24,
    backgroundColor: colors.white,
    padding: 20,
    borderWidth: 1,
    borderColor: "rgba(2, 51, 71, 0.08)",
  },
  invoiceTopRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 12,
  },
  invoiceMonth: {
    color: colors.navy,
    fontSize: 20,
    fontFamily: typography.heading,
    flex: 1,
  },
  statusBadge: {
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 7,
  },
  statusPaid: {
    backgroundColor: colors.mint,
  },
  statusOpen: {
    backgroundColor: colors.peach,
  },
  statusSoon: {
    backgroundColor: colors.skyTint,
  },
  statusLabel: {
    color: colors.teal,
    fontFamily: typography.ui,
  },
  invoiceAmount: {
    color: colors.coral,
    fontSize: 24,
    fontFamily: typography.heading,
    marginTop: 14,
  },
  invoiceDueDate: {
    color: colors.tealSoft,
    fontSize: 15,
    marginTop: 8,
    fontFamily: typography.body,
  },
});