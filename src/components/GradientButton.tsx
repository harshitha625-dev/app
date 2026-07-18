import React from "react";
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, ViewStyle } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { colors, gradients, radius, spacing, typography } from "@/theme";

interface Props {
  label: string;
  onPress: () => void;
  loading?: boolean;
  disabled?: boolean;
  icon?: React.ReactNode;
  style?: ViewStyle;
  fullWidth?: boolean;
}

export function GradientButton({ label, onPress, loading, disabled, icon, style, fullWidth = true }: Props) {
  return (
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={onPress}
      disabled={disabled || loading}
      style={[fullWidth && { width: "100%" }, style]}
    >
      <LinearGradient
        colors={disabled ? [colors.border, colors.border] : gradients.primary}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.button}
      >
        {loading ? (
          <ActivityIndicator color={colors.white} />
        ) : (
          <>
            {icon}
            <Text style={styles.label}>{label}</Text>
          </>
        )}
      </LinearGradient>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    height: 52,
    borderRadius: radius.lg,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: spacing.sm,
    paddingHorizontal: spacing.xl,
  },
  label: {
    color: colors.white,
    ...typography.bodyMedium,
  },
});
