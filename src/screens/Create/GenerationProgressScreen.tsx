import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { colors, spacing, typography } from "@/theme";
import { GradientButton, GradientRing } from "@/components";
import { useProjectsStore } from "@/store/projectsStore";

const STAGES = ["Queued\u2026", "Uploading\u2026", "AI Rendering\u2026", "Processing\u2026", "Almost Ready\u2026"];

export function GenerationProgressScreen() {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const projectId = route.params?.projectId;
  const updateProject = useProjectsStore((s) => s.updateProject);
  const project = useProjectsStore((s) => s.projects.find((p) => p.id === projectId));

  const [progress, setProgress] = useState(0);

  useEffect(() => {
    updateProject(projectId, { status: "processing" });
    const interval = setInterval(() => {
      setProgress((prev) => {
        const next = Math.min(100, prev + 7);
        if (next >= 100) {
          clearInterval(interval);
          updateProject(projectId, { status: "completed", progress: 100 });
        } else {
          updateProject(projectId, { progress: next });
        }
        return next;
      });
    }, 350);
    return () => clearInterval(interval);
  }, [projectId]);

  const stageIndex = Math.min(STAGES.length - 1, Math.floor((progress / 100) * STAGES.length));

  return (
    <View style={styles.container}>
      <GradientRing size={160} progress={progress} speedMs={1400} />
      <Text style={styles.stage}>{progress >= 100 ? "Video ready" : STAGES[stageIndex]}</Text>
      <Text style={styles.subtitle}>{project?.title}</Text>

      <View style={styles.footer}>
        {progress >= 100 ? (
          <GradientButton label="View Project" onPress={() => navigation.navigate("Projects")} />
        ) : (
          <GradientButton
            label="Cancel Generation"
            onPress={() => {
              updateProject(projectId, { status: "failed" });
              navigation.goBack();
            }}
            style={{ backgroundColor: "transparent" }}
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background, alignItems: "center", justifyContent: "center", padding: spacing.xl },
  stage: { color: colors.textPrimary, ...typography.h2, marginTop: spacing.xl },
  subtitle: { color: colors.textMuted, ...typography.body, marginTop: spacing.xs, textAlign: "center" },
  footer: { position: "absolute", bottom: spacing.xxxl, left: spacing.xl, right: spacing.xl },
});
