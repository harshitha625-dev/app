import React, { useState } from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { FileVideo, Layers, Scissors, SlidersHorizontal, Sparkles } from "lucide-react-native";
import { colors, radius, spacing, typography } from "@/theme";
import { GradientButton, ScreenHeader } from "@/components";

const TOOLS = [
  { key: "trim", label: "Trim", icon: Scissors },
  { key: "effects", label: "Effects", icon: Sparkles },
  { key: "transitions", label: "Transitions", icon: Layers },
  { key: "filters", label: "Filters", icon: SlidersHorizontal },
];

export function ManualEditScreen() {
  const navigation = useNavigation<any>();
  const [videoSelected, setVideoSelected] = useState(false);
  const [activeTool, setActiveTool] = useState<string | null>(null);

  return (
    <View style={styles.container}>
      <ScreenHeader title="Manual Edit" showBack />
      <ScrollView contentContainerStyle={styles.content}>
        <TouchableOpacity style={styles.uploadBox} onPress={() => setVideoSelected(true)} activeOpacity={0.85}>
          <FileVideo size={28} color={colors.accent} />
          <Text style={styles.uploadText}>{videoSelected ? "Video loaded" : "Upload video to edit"}</Text>
        </TouchableOpacity>

        <Text style={styles.label}>Editing tools</Text>
        <View style={styles.toolsGrid}>
          {TOOLS.map((tool) => {
            const Icon = tool.icon;
            const active = activeTool === tool.key;
            return (
              <TouchableOpacity
                key={tool.key}
                style={[styles.tool, active && styles.toolActive]}
                onPress={() => setActiveTool(tool.key)}
                activeOpacity={0.85}
              >
                <Icon size={20} color={active ? colors.accent : colors.textSecondary} />
                <Text style={[styles.toolLabel, active && { color: colors.accent }]}>{tool.label}</Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {activeTool && (
          <View style={styles.panel}>
            <Text style={styles.panelTitle}>{TOOLS.find((t) => t.key === activeTool)?.label} controls</Text>
            <Text style={styles.panelBody}>
              Full {activeTool} controls are available here \u2014 advanced multi-track editing stays on the VEYTRIX web
              studio.
            </Text>
          </View>
        )}
      </ScrollView>
      <View style={styles.footer}>
        <GradientButton label="Export" onPress={() => {}} disabled={!videoSelected} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: { padding: spacing.lg, paddingBottom: spacing.xxxl },
  uploadBox: {
    height: 180,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderStyle: "dashed",
    borderColor: colors.border,
    backgroundColor: colors.surface,
    alignItems: "center",
    justifyContent: "center",
    gap: spacing.sm,
    marginBottom: spacing.xl,
  },
  uploadText: { color: colors.textSecondary, ...typography.caption },
  label: { color: colors.textSecondary, ...typography.captionMedium, marginBottom: spacing.md },
  toolsGrid: { flexDirection: "row", flexWrap: "wrap", gap: spacing.md },
  tool: {
    width: "47%",
    paddingVertical: spacing.lg,
    borderRadius: radius.md,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.borderSubtle,
    alignItems: "center",
    gap: spacing.sm,
  },
  toolActive: { borderColor: colors.accent, backgroundColor: colors.accentMuted },
  toolLabel: { color: colors.textSecondary, ...typography.captionMedium },
  panel: { marginTop: spacing.xl, backgroundColor: colors.surface, borderRadius: radius.md, borderWidth: 1, borderColor: colors.borderSubtle, padding: spacing.lg },
  panelTitle: { color: colors.textPrimary, ...typography.bodyMedium, marginBottom: spacing.xs },
  panelBody: { color: colors.textMuted, ...typography.caption },
  footer: { padding: spacing.lg, borderTopWidth: 1, borderTopColor: colors.borderSubtle },
});
