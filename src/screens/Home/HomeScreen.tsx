import React from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Bell, Film, ImageIcon, Scissors, Video } from "lucide-react-native";
import { colors, spacing, typography } from "@/theme";
import { BigActionButton, CreditBadge, ProjectCard } from "@/components";
import { useAuthStore } from "@/store/authStore";
import { useProjectsStore } from "@/store/projectsStore";
import { useNotificationsStore } from "@/store/notificationsStore";
import { TRENDING_TEMPLATES } from "@/services/mockData";

export function HomeScreen() {
  const navigation = useNavigation<any>();
  const user = useAuthStore((s) => s.user);
  const projects = useProjectsStore((s) => s.projects);
  const unreadCount = useNotificationsStore((s) => s.unreadCount);
  const recent = projects.slice(0, 3);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
      <View style={styles.headerRow}>
        <View>
          <Text style={styles.greeting}>Hi, {user?.fullName?.split(" ")[0] ?? "there"}</Text>
          <Text style={styles.subGreeting}>What are we creating today?</Text>
        </View>
        <View style={styles.headerActions}>
          <CreditBadge />
          <TouchableOpacity onPress={() => navigation.navigate("Notifications")} style={styles.bellButton}>
            <Bell size={20} color={colors.textPrimary} />
            {unreadCount > 0 && <View style={styles.dot} />}
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.grid}>
        <BigActionButton
          label="Generate Video"
          subtitle="Prompt to video"
          icon={<Video size={20} color={colors.accent} />}
          onPress={() => navigation.navigate("CreateStack", { screen: "AIVideoGeneration" })}
        />
        <BigActionButton
          label="Image to Video"
          subtitle="Animate a photo"
          icon={<ImageIcon size={20} color={colors.accent} />}
          onPress={() => navigation.navigate("CreateStack", { screen: "ImageToVideo" })}
        />
        <BigActionButton
          label="Reference Video"
          subtitle="Restyle a clip"
          icon={<Film size={20} color={colors.accent} />}
          onPress={() => navigation.navigate("CreateStack", { screen: "ReferenceVideo" })}
        />
        <BigActionButton
          label="Manual Edit"
          subtitle="Trim & polish"
          icon={<Scissors size={20} color={colors.accent} />}
          onPress={() => navigation.navigate("CreateStack", { screen: "ManualEdit" })}
        />
      </View>

      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Recent creations</Text>
        <TouchableOpacity onPress={() => navigation.navigate("Projects")}>
          <Text style={styles.sectionLink}>See all</Text>
        </TouchableOpacity>
      </View>
      {recent.map((project) => (
        <ProjectCard key={project.id} project={project} onPress={() => navigation.navigate("Projects")} />
      ))}

      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Trending templates</Text>
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: spacing.xl }}>
        {TRENDING_TEMPLATES.map((template) => (
          <View key={template.id} style={styles.templateCard}>
            <Text style={styles.templateTitle}>{template.title}</Text>
          </View>
        ))}
      </ScrollView>

      <View style={styles.announcement}>
        <Text style={styles.announcementTitle}>New: Reference strength control</Text>
        <Text style={styles.announcementBody}>Fine-tune how closely output follows your reference clip.</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: { padding: spacing.lg, paddingBottom: spacing.xxxl },
  headerRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start", marginBottom: spacing.xl },
  greeting: { color: colors.textPrimary, ...typography.h1 },
  subGreeting: { color: colors.textMuted, ...typography.body, marginTop: 2 },
  headerActions: { flexDirection: "row", alignItems: "center", gap: spacing.md },
  bellButton: { width: 36, height: 36, borderRadius: 18, backgroundColor: colors.surface, alignItems: "center", justifyContent: "center" },
  dot: { position: "absolute", top: 6, right: 8, width: 7, height: 7, borderRadius: 4, backgroundColor: colors.error },
  grid: { flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between" },
  sectionHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: spacing.md, marginBottom: spacing.md },
  sectionTitle: { color: colors.textPrimary, ...typography.h3 },
  sectionLink: { color: colors.accent, ...typography.captionMedium },
  templateCard: {
    width: 160,
    height: 90,
    borderRadius: 14,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.borderSubtle,
    marginRight: spacing.md,
    padding: spacing.md,
    justifyContent: "flex-end",
  },
  templateTitle: { color: colors.textPrimary, ...typography.captionMedium },
  announcement: { backgroundColor: colors.accentMuted, borderRadius: 14, padding: spacing.lg },
  announcementTitle: { color: colors.textPrimary, ...typography.bodyMedium, marginBottom: 4 },
  announcementBody: { color: colors.textSecondary, ...typography.caption },
});
