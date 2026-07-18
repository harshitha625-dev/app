import React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Gift, Zap } from "lucide-react-native";
import { LinearGradient } from "expo-linear-gradient";
import { colors, gradients, radius, spacing, typography } from "@/theme";
import { GradientButton, ScreenHeader } from "@/components";
import { useCreditsStore } from "@/store/creditsStore";

export function WalletScreen() {
  const navigation = useNavigation<any>();
  const { balance, ledger } = useCreditsStore();

  return (
    <View style={styles.container}>
      <ScreenHeader title="Wallet" showBack />
      <FlatList
        data={ledger}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        ListHeaderComponent={
          <>
            <LinearGradient colors={gradients.primary} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.balanceCard}>
              <Zap size={22} color={colors.white} fill={colors.white} />
              <Text style={styles.balanceValue}>{balance}</Text>
              <Text style={styles.balanceLabel}>credits available</Text>
            </LinearGradient>

            <View style={styles.actionsRow}>
              <GradientButton label="Recharge" onPress={() => navigation.navigate("Pricing")} style={{ flex: 1 }} />
            </View>

            <View style={styles.promoRow}>
              <Gift size={16} color={colors.accent} />
              <Text style={styles.promoText}>Have a promo code? Enter it in Settings.</Text>
            </View>

            <Text style={styles.sectionTitle}>Transaction history</Text>
          </>
        }
        renderItem={({ item }) => (
          <View style={styles.txRow}>
            <View>
              <Text style={styles.txLabel}>{item.label}</Text>
              <Text style={styles.txDate}>{new Date(item.createdAt).toLocaleDateString()}</Text>
            </View>
            <Text style={[styles.txAmount, { color: item.amount > 0 ? colors.success : colors.textPrimary }]}>
              {item.amount > 0 ? "+" : ""}
              {item.amount}
            </Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  list: { padding: spacing.lg, paddingBottom: spacing.xxxl },
  balanceCard: { borderRadius: radius.lg, padding: spacing.xl, alignItems: "center", marginBottom: spacing.lg },
  balanceValue: { color: colors.white, ...typography.display, marginTop: spacing.sm },
  balanceLabel: { color: "rgba(255,255,255,0.85)", ...typography.caption },
  actionsRow: { flexDirection: "row", gap: spacing.md, marginBottom: spacing.lg },
  promoRow: { flexDirection: "row", alignItems: "center", gap: spacing.sm, marginBottom: spacing.xl },
  promoText: { color: colors.textMuted, ...typography.caption },
  sectionTitle: { color: colors.textPrimary, ...typography.h3, marginBottom: spacing.md },
  txRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingVertical: spacing.md, borderBottomWidth: 1, borderBottomColor: colors.borderSubtle },
  txLabel: { color: colors.textPrimary, ...typography.bodyMedium },
  txDate: { color: colors.textMuted, ...typography.caption, marginTop: 2 },
  txAmount: { ...typography.bodyMedium },
});
