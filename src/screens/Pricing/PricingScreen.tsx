import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { Check } from "lucide-react-native";
import { colors, radius, spacing, typography } from "@/theme";
import { GradientButton, ScreenHeader } from "@/components";
import { PRICING_PLANS } from "@/constants";
import { useCreditsStore } from "@/store/creditsStore";
import { useAuthStore } from "@/store/authStore";

export function PricingScreen() {
  const recharge = useCreditsStore((s) => s.recharge);
  const user = useAuthStore((s) => s.user);

  return (
    <View style={styles.container}>
      <ScreenHeader title="Pricing" showBack />
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.subtitle}>Choose the plan that fits how much you create</Text>
        {PRICING_PLANS.map((plan) => (
          <View key={plan.id} style={[styles.card, plan.highlighted && styles.cardHighlighted]}>
            {plan.highlighted && <Text style={styles.badge}>Most popular</Text>}
            <View style={styles.cardHeader}>
              <Text style={styles.planName}>{plan.name}</Text>
              <Text style={styles.planPrice}>{plan.priceLabel}</Text>
            </View>
            <Text style={styles.planCredits}>{plan.credits} credits / month</Text>
            {plan.perks.map((perk) => (
              <View key={perk} style={styles.perkRow}>
                <Check size={14} color={colors.success} />
                <Text style={styles.perkText}>{perk}</Text>
              </View>
            ))}
            <GradientButton
              label={user?.plan === plan.id ? "Current Plan" : "Upgrade"}
              onPress={() => recharge(plan.credits, `${plan.name} plan purchase`)}
              disabled={user?.plan === plan.id}
              style={{ marginTop: spacing.lg }}
            />
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: { padding: spacing.lg, paddingBottom: spacing.xxxl },
  subtitle: { color: colors.textMuted, ...typography.body, marginBottom: spacing.xl },
  card: { backgroundColor: colors.surface, borderRadius: radius.lg, borderWidth: 1, borderColor: colors.borderSubtle, padding: spacing.lg, marginBottom: spacing.lg },
  cardHighlighted: { borderColor: colors.accent },
  badge: { color: colors.accent, ...typography.tiny, marginBottom: spacing.sm, textTransform: "uppercase" },
  cardHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 4 },
  planName: { color: colors.textPrimary, ...typography.h2 },
  planPrice: { color: colors.textPrimary, ...typography.h2 },
  planCredits: { color: colors.textMuted, ...typography.caption, marginBottom: spacing.md },
  perkRow: { flexDirection: "row", alignItems: "center", gap: spacing.sm, marginBottom: spacing.xs },
  perkText: { color: colors.textSecondary, ...typography.caption },
});
