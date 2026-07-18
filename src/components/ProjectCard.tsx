import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Film, ImageIcon, Scissors, Video } from "lucide-react-native";
import { colors, radius, spacing, typography } from "@/theme";
import { Project } from "@/types";
import { StatusPill } from "./StatusPill";

const ICONS: Record<Project["type"], React.ComponentType<any>> = {
  text_to_video: Video,
  image_to_video: ImageIcon,
  reference_video: Film,
  manual_edit: Scissors,
};

interface Props {
  project: Project;
  onPress?: () => void;
}

export function ProjectCard({ project, onPress }: Props) {
  const Icon = ICONS[project.type];
  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.85}>
      <View style={styles.thumb}>
        <Icon size={22} color={colors.accent} />
      </View>
      <View style={styles.info}>
        <Text style={styles.title} numberOfLines={1}>
          {project.title}
        </Text>
        <Text style={styles.meta}>
          {project.durationSeconds}s \u00b7 {project.aspectRatio} \u00b7 {project.creditsCost} credits
        </Text>
        <StatusPill status={project.status} />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    gap: spacing.md,
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.borderSubtle,
    padding: spacing.md,
    marginBottom: spacing.md,
  },
  thumb: {
    width: 56,
    height: 56,
    borderRadius: radius.md,
    backgroundColor: colors.accentMuted,
    alignItems: "center",
    justifyContent: "center",
  },
  info: { flex: 1, gap: 4 },
  title: { color: colors.textPrimary, ...typography.bodyMedium },
  meta: { color: colors.textMuted, ...typography.caption },
});
