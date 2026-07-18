import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { colors, radius, spacing, typography } from "@/theme";

interface Props {
  label: string;
  subtitle: string;
  icon: React.ReactNode;
  onPress: () => void;
}

export function BigActionButton({ label, subtitle, icon, onPress }: Props) {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress} activeOpacity={0.85}>
      <View style={styles.iconWrap}>{icon}</View>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.subtitle}>{subtitle}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexBasis: "48%",
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.borderSubtle,
    padding: spacing.lg,
    marginBottom: spacing.md,
  },
  iconWrap: {
    width: 40,
    height: 40,
    borderRadius: radius.md,
    backgroundColor: colors.accentMuted,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: spacing.md,
  },
  label: { color: colors.textPrimary, ...typography.bodyMedium, marginBottom: 2 },
  subtitle: { color: colors.textMuted, ...typography.caption },
});
