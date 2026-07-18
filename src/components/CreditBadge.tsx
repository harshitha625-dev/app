import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Zap } from "lucide-react-native";
import { useNavigation } from "@react-navigation/native";
import { colors, radius, spacing, typography } from "@/theme";
import { useCreditsStore } from "@/store/creditsStore";

export function CreditBadge() {
  const balance = useCreditsStore((s) => s.balance);
  const navigation = useNavigation<any>();
  return (
    <TouchableOpacity style={styles.badge} onPress={() => navigation.navigate("Wallet")} activeOpacity={0.8}>
      <Zap size={14} color={colors.warning} fill={colors.warning} />
      <Text style={styles.text}>{balance}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  badge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: colors.warningMuted,
    paddingHorizontal: spacing.md,
    paddingVertical: 6,
    borderRadius: radius.pill,
  },
  text: { color: colors.textPrimary, ...typography.captionMedium },
});
