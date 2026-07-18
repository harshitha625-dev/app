import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { colors, spacing, typography } from "@/theme";

interface Props {
  icon: React.ReactNode;
  title: string;
  body: string;
  action?: React.ReactNode;
}

export function EmptyState({ icon, title, body, action }: Props) {
  return (
    <View style={styles.container}>
      {icon}
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.body}>{body}</Text>
      {action}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { alignItems: "center", justifyContent: "center", paddingVertical: spacing.xxxl, paddingHorizontal: spacing.xl },
  title: { color: colors.textPrimary, ...typography.h3, marginTop: spacing.lg, marginBottom: spacing.xs, textAlign: "center" },
  body: { color: colors.textMuted, ...typography.body, textAlign: "center", marginBottom: spacing.lg },
});
