import React from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { ChevronRight, LogOut, Settings as SettingsIcon, User as UserIcon, Wallet2 } from "lucide-react-native";
import { colors, radius, spacing, typography } from "@/theme";
import { Card } from "@/components";
import { useAuthStore } from "@/store/authStore";
import { useCreditsStore } from "@/store/creditsStore";

export function ProfileScreen() {
  const navigation = useNavigation<any>();
  const { user, logout } = useAuthStore();
  const balance = useCreditsStore((s) => s.balance);

  const rows = [
    { label: "Wallet", icon: Wallet2, onPress: () => navigation.navigate("Wallet") },
    { label: "Settings", icon: SettingsIcon, onPress: () => navigation.navigate("Settings") },
  ];

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <View style={styles.avatar}>
          <UserIcon size={28} color={colors.accent} />
        </View>
        <Text style={styles.name}>{user?.fullName}</Text>
        <Text style={styles.email}>{user?.email}</Text>
      </View>

      <Card style={styles.planCard}>
        <View>
          <Text style={styles.planLabel}>Current plan</Text>
          <Text style={styles.planName}>{user?.plan ? user.plan[0].toUpperCase() + user.plan.slice(1) : "Free"}</Text>
        </View>
        <View style={{ alignItems: "flex-end" }}>
          <Text style={styles.planLabel}>Credits</Text>
          <Text style={styles.planName}>{balance}</Text>
        </View>
      </Card>

      <View style={styles.list}>
        {rows.map((row) => {
          const Icon = row.icon;
          return (
            <TouchableOpacity key={row.label} style={styles.row} onPress={row.onPress} activeOpacity={0.8}>
              <Icon size={18} color={colors.textSecondary} />
              <Text style={styles.rowLabel}>{row.label}</Text>
              <ChevronRight size={18} color={colors.textMuted} />
            </TouchableOpacity>
          );
        })}
        <TouchableOpacity style={styles.row} onPress={logout} activeOpacity={0.8}>
          <LogOut size={18} color={colors.error} />
          <Text style={[styles.rowLabel, { color: colors.error }]}>Logout</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: { padding: spacing.lg, paddingBottom: spacing.xxxl },
  header: { alignItems: "center", marginBottom: spacing.xl, marginTop: spacing.lg },
  avatar: { width: 72, height: 72, borderRadius: 36, backgroundColor: colors.accentMuted, alignItems: "center", justifyContent: "center", marginBottom: spacing.md },
  name: { color: colors.textPrimary, ...typography.h2 },
  email: { color: colors.textMuted, ...typography.caption },
  planCard: { flexDirection: "row", justifyContent: "space-between", marginBottom: spacing.xl },
  planLabel: { color: colors.textMuted, ...typography.caption },
  planName: { color: colors.textPrimary, ...typography.h3 },
  list: { gap: spacing.sm },
  row: { flexDirection: "row", alignItems: "center", gap: spacing.md, backgroundColor: colors.surface, borderRadius: radius.md, borderWidth: 1, borderColor: colors.borderSubtle, padding: spacing.lg },
  rowLabel: { flex: 1, color: colors.textPrimary, ...typography.bodyMedium },
});
