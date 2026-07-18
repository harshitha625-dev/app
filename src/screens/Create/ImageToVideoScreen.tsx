import React, { useState } from "react";
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { ImagePlus } from "lucide-react-native";
import * as ImagePicker from "expo-image-picker";
import { colors, radius, spacing, typography } from "@/theme";
import { GradientButton, ScreenHeader, SegmentedControl, SliderRow } from "@/components";
import { GENERATION_COSTS } from "@/constants";
import { createGeneration } from "@/services/generationService";
import { useCreditsStore } from "@/store/creditsStore";
import { useProjectsStore } from "@/store/projectsStore";

const STYLES = ["Realistic", "Cinematic", "Anime"];
const ASPECT_RATIOS = ["9:16", "1:1", "16:9"] as const;

export function ImageToVideoScreen() {
  const navigation = useNavigation<any>();
  const addProject = useProjectsStore((s) => s.addProject);
  const spend = useCreditsStore((s) => s.spend);
  const balance = useCreditsStore((s) => s.balance);

  const [imageUri, setImageUri] = useState<string | null>(null);
  const [prompt, setPrompt] = useState("");
  const [style, setStyle] = useState("Cinematic");
  const [aspectRatio, setAspectRatio] = useState<(typeof ASPECT_RATIOS)[number]>("9:16");
  const [duration, setDuration] = useState(5);
  const [loading, setLoading] = useState(false);

  const cost = GENERATION_COSTS.image_to_video;
  const canGenerate = !!imageUri && balance >= cost && !loading;

  const pickImage = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) return;
    const result = await ImagePicker.launchImageLibraryAsync({ mediaTypes: ImagePicker.MediaTypeOptions.Images, quality: 0.8 });
    if (!result.canceled) setImageUri(result.assets[0].uri);
  };

  const handleGenerate = async () => {
    setLoading(true);
    const project = await createGeneration({ type: "image_to_video", prompt, aspectRatio, durationSeconds: duration });
    spend(cost, project.title);
    addProject(project);
    setLoading(false);
    navigation.navigate("GenerationProgress", { projectId: project.id });
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === "ios" ? "padding" : undefined}>
      <ScreenHeader title="Image to Video" showBack />
      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        <TouchableOpacity style={styles.uploadBox} onPress={pickImage} activeOpacity={0.85}>
          <ImagePlus size={28} color={colors.accent} />
          <Text style={styles.uploadText}>{imageUri ? "Image selected \u2014 tap to change" : "Upload image"}</Text>
        </TouchableOpacity>

        <Text style={styles.label}>Prompt</Text>
        <TextInput
          style={styles.promptInput}
          placeholder="Describe the motion you want..."
          placeholderTextColor={colors.textMuted}
          multiline
          value={prompt}
          onChangeText={setPrompt}
        />

        <Text style={styles.label}>Style</Text>
        <SegmentedControl options={STYLES} value={style} onChange={setStyle} />

        <View style={{ height: spacing.lg }} />
        <Text style={styles.label}>Aspect ratio</Text>
        <SegmentedControl options={[...ASPECT_RATIOS]} value={aspectRatio} onChange={(v) => setAspectRatio(v as any)} />

        <View style={{ height: spacing.lg }} />
        <SliderRow label="Duration" value={duration} min={2} max={12} step={1} unit="s" onChange={setDuration} />
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
  label: { color: colors.textSecondary, ...typography.captionMedium, marginBottom: spacing.sm, marginTop: spacing.md },
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
  },
  footer: { padding: spacing.lg, borderTopWidth: 1, borderTopColor: colors.borderSubtle },
});
