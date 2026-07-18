import React, { useState } from "react";
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { FileVideo } from "lucide-react-native";
import { colors, radius, spacing, typography } from "@/theme";
import { GradientButton, ScreenHeader, SliderRow } from "@/components";
import { GENERATION_COSTS } from "@/constants";
import { createGeneration } from "@/services/generationService";
import { useCreditsStore } from "@/store/creditsStore";
import { useProjectsStore } from "@/store/projectsStore";

export function ReferenceVideoScreen() {
  const navigation = useNavigation<any>();
  const addProject = useProjectsStore((s) => s.addProject);
  const spend = useCreditsStore((s) => s.spend);
  const balance = useCreditsStore((s) => s.balance);

  const [videoSelected, setVideoSelected] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [strength, setStrength] = useState(60);
  const [duration, setDuration] = useState(8);
  const [loading, setLoading] = useState(false);

  const cost = GENERATION_COSTS.reference_video;
  const canGenerate = videoSelected && balance >= cost && !loading;

  const handleGenerate = async () => {
    setLoading(true);
    const project = await createGeneration({ type: "reference_video", prompt, aspectRatio: "9:16", durationSeconds: duration });
    spend(cost, project.title);
    addProject(project);
    setLoading(false);
    navigation.navigate("GenerationProgress", { projectId: project.id });
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === "ios" ? "padding" : undefined}>
      <ScreenHeader title="Reference Video" showBack />
      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        <TouchableOpacity style={styles.uploadBox} onPress={() => setVideoSelected(true)} activeOpacity={0.85}>
          <FileVideo size={28} color={colors.accent} />
          <Text style={styles.uploadText}>{videoSelected ? "Video selected \u2014 tap to change" : "Upload video"}</Text>
        </TouchableOpacity>

        <Text style={styles.label}>Prompt</Text>
        <TextInput
          style={styles.promptInput}
          placeholder="Describe how to restyle the reference..."
          placeholderTextColor={colors.textMuted}
          multiline
          value={prompt}
          onChangeText={setPrompt}
        />

        <SliderRow label="Reference strength" value={strength} min={0} max={100} step={5} unit="%" onChange={setStrength} />
        <SliderRow label="Duration" value={duration} min={3} max={20} step={1} unit="s" onChange={setDuration} />
      </ScrollView>
      <View style={styles.footer}>
        <GradientButton label={loading ? "Starting\u2026" : `Generate \u00b7 ${cost} credits`} onPress={handleGenerate} disabled={!canGenerate} loading={loading} />
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: { padding: spacing.lg, paddingBottom: spacing.xxxl },
  uploadBox: {
    height: 160,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderStyle: "dashed",
    borderColor: colors.border,
    backgroundColor: colors.surface,
    alignItems: "center",
    justifyContent: "center",
    gap: spacing.sm,
    marginBottom: spacing.lg,
  },
  uploadText: { color: colors.textSecondary, ...typography.caption },
  label: { color: colors.textSecondary, ...typography.captionMedium, marginBottom: spacing.sm },
  promptInput: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.borderSubtle,
    borderRadius: radius.md,
    padding: spacing.lg,
    minHeight: 90,
    color: colors.textPrimary,
    textAlignVertical: "top",
    ...typography.body,
    marginBottom: spacing.lg,
  },
  footer: { padding: spacing.lg, borderTopWidth: 1, borderTopColor: colors.borderSubtle },
});
