import React, { useState } from "react";
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { colors, radius, spacing, typography } from "@/theme";
import { GradientButton, ScreenHeader, SegmentedControl, SliderRow } from "@/components";
import { GENERATION_COSTS } from "@/constants";
import { createGeneration } from "@/services/generationService";
import { useCreditsStore } from "@/store/creditsStore";
import { useProjectsStore } from "@/store/projectsStore";

const ASPECT_RATIOS = ["9:16", "1:1", "16:9"] as const;
const QUALITIES = ["Standard", "High", "Ultra"];

export function AIVideoGenerationScreen() {
  const navigation = useNavigation<any>();
  const addProject = useProjectsStore((s) => s.addProject);
  const spend = useCreditsStore((s) => s.spend);
  const balance = useCreditsStore((s) => s.balance);

  const [prompt, setPrompt] = useState("");
  const [aspectRatio, setAspectRatio] = useState<(typeof ASPECT_RATIOS)[number]>("9:16");
  const [quality, setQuality] = useState("High");
  const [duration, setDuration] = useState(6);
  const [loading, setLoading] = useState(false);

  const cost = GENERATION_COSTS.text_to_video;
  const estimatedSeconds = duration * 8;
  const canGenerate = prompt.trim().length > 0 && balance >= cost && !loading;

  const handleGenerate = async () => {
    setLoading(true);
    const project = await createGeneration({ type: "text_to_video", prompt, aspectRatio, durationSeconds: duration });
    spend(cost, project.title);
    addProject(project);
    setLoading(false);
    navigation.navigate("GenerationProgress", { projectId: project.id });
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === "ios" ? "padding" : undefined}>
      <ScreenHeader title="AI Video Generation" showBack />
      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        <Text style={styles.label}>Prompt</Text>
        <TextInput
          style={styles.promptInput}
          placeholder="Describe the video you want to create..."
          placeholderTextColor={colors.textMuted}
          multiline
          value={prompt}
          onChangeText={setPrompt}
        />

        <Text style={styles.label}>Aspect ratio</Text>
        <SegmentedControl options={[...ASPECT_RATIOS]} value={aspectRatio} onChange={(v) => setAspectRatio(v as any)} />

        <View style={{ height: spacing.lg }} />
        <Text style={styles.label}>Quality</Text>
        <SegmentedControl options={QUALITIES} value={quality} onChange={setQuality} />

        <View style={{ height: spacing.lg }} />
        <SliderRow label="Duration" value={duration} min={2} max={15} step={1} unit="s" onChange={setDuration} />

        <View style={styles.summaryCard}>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Credits required</Text>
            <Text style={styles.summaryValue}>{cost}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Estimated time</Text>
            <Text style={styles.summaryValue}>~{estimatedSeconds}s</Text>
          </View>
        </View>
      </ScrollView>
      <View style={styles.footer}>
        <GradientButton label={loading ? "Starting\u2026" : "Generate"} onPress={handleGenerate} disabled={!canGenerate} loading={loading} />
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: { padding: spacing.lg, paddingBottom: spacing.xxxl },
  label: { color: colors.textSecondary, ...typography.captionMedium, marginBottom: spacing.sm, marginTop: spacing.md },
  promptInput: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.borderSubtle,
    borderRadius: radius.md,
    padding: spacing.lg,
    minHeight: 110,
    color: colors.textPrimary,
    textAlignVertical: "top",
    ...typography.body,
  },
  summaryCard: { backgroundColor: colors.surface, borderRadius: radius.md, borderWidth: 1, borderColor: colors.borderSubtle, padding: spacing.lg, marginTop: spacing.lg, gap: spacing.sm },
  summaryRow: { flexDirection: "row", justifyContent: "space-between" },
  summaryLabel: { color: colors.textMuted, ...typography.caption },
  summaryValue: { color: colors.textPrimary, ...typography.captionMedium },
  footer: { padding: spacing.lg, borderTopWidth: 1, borderTopColor: colors.borderSubtle },
});
