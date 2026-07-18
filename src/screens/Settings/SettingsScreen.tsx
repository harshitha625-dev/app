import React, { useState } from "react";
import { ScrollView, StyleSheet, Switch, Text, TouchableOpacity, View } from "react-native";
import { ChevronRight } from "lucide-react-native";
import { colors, radius, spacing, typography } from "@/theme";
import { ScreenHeader } from "@/components";
import { useAuthStore } from "@/store/authStore";

export function SettingsScreen() {
  const logout = useAuthStore((s) => s.logout);
  const [darkTheme, setDarkTheme] = useState(true);
  const [notifications, setNotifications] = useState(true);

  const links = ["Privacy", "About VEYTRIX", "Change password"];

  return (
    <View style={styles.container}>
      <ScreenHeader title="Settings" showBack />
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.sectionTitle}>Preferences</Text>
        <View style={styles.row}>
          <Text style={styles.rowLabel}>Dark theme</Text>
          <Switch value={darkTheme} onValueChange={setDarkTheme} trackColor={{ true: colors.accent }} />
        </View>
        <View style={styles.row}>
          <Text style={styles.rowLabel}>Push notifications</Text>
          <Switch value={notifications} onValueChange={setNotifications} trackColor={{ true: colors.accent }} />
        </View>
        <View style={styles.row}>
          <Text style={styles.rowLabel}>Language</Text>
          <Text style={styles.rowValue}>English</Text>
        </View>

        <Text style={styles.sectionTitle}>Account</Text>
        {links.map((link) => (
          <TouchableOpacity key={link} style={styles.row} activeOpacity={0.8}>
            <Text style={styles.rowLabel}>{link}</Text>
            <ChevronRight size={18} color={colors.textMuted} />
          </TouchableOpacity>
        ))}

        <TouchableOpacity style={styles.dangerButton} onPress={logout}>
          <Text style={styles.dangerText}>Delete account</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: { padding: spacing.lg, paddingBottom: spacing.xxxl },
  sectionTitle: { color: colors.textMuted, ...typography.captionMedium, textTransform: "uppercase", marginTop: spacing.xl, marginBottom: spacing.md },
  row: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", backgroundColor: colors.surface, borderRadius: radius.md, borderWidth: 1, borderColor: colors.borderSubtle, padding: spacing.lg, marginBottom: spacing.sm },
  rowLabel: { color: colors.textPrimary, ...typography.bodyMedium },
  rowValue: { color: colors.textMuted, ...typography.body },
  dangerButton: { marginTop: spacing.xl, alignItems: "center", padding: spacing.lg },
  dangerText: { color: colors.error, ...typography.bodyMedium },
});
