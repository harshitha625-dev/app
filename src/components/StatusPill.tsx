import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { colors, radius, typography } from "@/theme";
import { ProjectStatus } from "@/types";

const CONFIG: Record<ProjectStatus, { label: string; bg: string; fg: string }> = {
  draft: { label: "Draft", bg: colors.borderSubtle, fg: colors.textSecondary },
  queued: { label: "Queued", bg: colors.warningMuted, fg: colors.warning },
  processing: { label: "Processing", bg: colors.accentMuted, fg: colors.accent },
  rendering: { label: "Rendering", bg: colors.accentMuted, fg: colors.accent },
  completed: { label: "Completed", bg: colors.successMuted, fg: colors.success },
  failed: { label: "Failed", bg: colors.errorMuted, fg: colors.error },
};

export function StatusPill({ status }: { status: ProjectStatus }) {
  const config = CONFIG[status];
  return (
    <View style={[styles.pill, { backgroundColor: config.bg }]}>
      <Text style={[styles.text, { color: config.fg }]}>{config.label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  pill: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: radius.pill, alignSelf: "flex-start" },
  text: { ...typography.tiny, textTransform: "uppercase" },
});
