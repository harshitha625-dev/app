import React, { useState } from "react";
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { FolderOpen } from "lucide-react-native";
import { colors, spacing, typography } from "@/theme";
import { EmptyState, ProjectCard, ScreenHeader, SegmentedControl } from "@/components";
import { useProjectsStore } from "@/store/projectsStore";
import { ProjectStatus } from "@/types";

const FILTERS = ["All", "Draft", "Processing", "Completed", "Failed"];

export function ProjectsScreen() {
  const projects = useProjectsStore((s) => s.projects);
  const removeProject = useProjectsStore((s) => s.removeProject);
  const duplicateProject = useProjectsStore((s) => s.duplicateProject);
  const [filter, setFilter] = useState("All");

  const statusMap: Record<string, ProjectStatus | null> = {
    All: null,
    Draft: "draft",
    Processing: "processing",
    Completed: "completed",
    Failed: "failed",
  };
  const activeStatus = statusMap[filter];
  const filtered = activeStatus ? projects.filter((p) => p.status === activeStatus) : projects;

  return (
    <View style={styles.container}>
      <ScreenHeader title="Projects" />
      <View style={styles.filterWrap}>
        <SegmentedControl options={FILTERS} value={filter} onChange={setFilter} />
      </View>
      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <View>
            <ProjectCard project={item} />
            <View style={styles.actionsRow}>
              <TouchableOpacity onPress={() => duplicateProject(item.id)}>
                <Text style={styles.actionText}>Duplicate</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => removeProject(item.id)}>
                <Text style={[styles.actionText, { color: colors.error }]}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        ListEmptyComponent={
          <EmptyState
            icon={<FolderOpen size={40} color={colors.textMuted} />}
            title="No projects yet"
            body="Everything you create shows up here \u2014 start your first project from the Create tab."
          />
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  filterWrap: { paddingHorizontal: spacing.lg, marginBottom: spacing.md },
  list: { padding: spacing.lg, paddingTop: 0 },
  actionsRow: { flexDirection: "row", gap: spacing.lg, marginTop: -spacing.sm, marginBottom: spacing.md, paddingHorizontal: spacing.xs },
  actionText: { color: colors.accent, ...typography.captionMedium },
});
