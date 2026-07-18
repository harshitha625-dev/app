import React from "react";
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Download, Share2, Trash2 } from "lucide-react-native";
import { colors, radius, spacing, typography } from "@/theme";
import { EmptyState, ScreenHeader } from "@/components";
import { useProjectsStore } from "@/store/projectsStore";

export function DownloadsScreen() {
  const completed = useProjectsStore((s) => s.projects.filter((p) => p.status === "completed"));

  return (
    <View style={styles.container}>
      <ScreenHeader title="Downloads" />
      <FlatList
        data={completed}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <View style={styles.row}>
            <View style={styles.thumb} />
            <View style={styles.info}>
              <Text style={styles.title} numberOfLines={1}>
                {item.title}
              </Text>
              <Text style={styles.meta}>
                {item.durationSeconds}s \u00b7 {item.aspectRatio}
              </Text>
            </View>
            <View style={styles.actions}>
              <TouchableOpacity style={styles.iconBtn}>
                <Share2 size={17} color={colors.textSecondary} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.iconBtn}>
                <Trash2 size={17} color={colors.error} />
              </TouchableOpacity>
            </View>
          </View>
        )}
        ListEmptyComponent={
          <EmptyState
            icon={<Download size={40} color={colors.textMuted} />}
            title="No downloads yet"
            body="Videos you download will be stored here for offline viewing."
          />
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  list: { padding: spacing.lg },
  row: { flexDirection: "row", alignItems: "center", gap: spacing.md, backgroundColor: colors.surface, borderRadius: radius.lg, borderWidth: 1, borderColor: colors.borderSubtle, padding: spacing.md, marginBottom: spacing.md },
  thumb: { width: 48, height: 48, borderRadius: radius.md, backgroundColor: colors.accentMuted },
  info: { flex: 1 },
  title: { color: colors.textPrimary, ...typography.bodyMedium },
  meta: { color: colors.textMuted, ...typography.caption },
  actions: { flexDirection: "row", gap: spacing.sm },
  iconBtn: { width: 34, height: 34, borderRadius: 17, backgroundColor: colors.surfaceRaised, alignItems: "center", justifyContent: "center" },
});
