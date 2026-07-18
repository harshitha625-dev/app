import React from "react";
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Bell, CreditCard, Megaphone, ShieldAlert, Wrench } from "lucide-react-native";
import { colors, radius, spacing, typography } from "@/theme";
import { EmptyState, ScreenHeader } from "@/components";
import { useNotificationsStore } from "@/store/notificationsStore";
import { AppNotification } from "@/types";

const ICONS: Record<AppNotification["type"], React.ComponentType<any>> = {
  generation: Bell,
  credits: CreditCard,
  updates: Megaphone,
  security: ShieldAlert,
  maintenance: Wrench,
};

export function NotificationsScreen() {
  const { notifications, markAllRead, markRead } = useNotificationsStore();

  return (
    <View style={styles.container}>
      <ScreenHeader
        title="Notifications"
        showBack
        right={
          <TouchableOpacity onPress={markAllRead}>
            <Text style={styles.markAll}>Mark all</Text>
          </TouchableOpacity>
        }
      />
      <FlatList
        data={notifications}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => {
          const Icon = ICONS[item.type];
          return (
            <TouchableOpacity style={[styles.row, !item.read && styles.rowUnread]} onPress={() => markRead(item.id)} activeOpacity={0.8}>
              <View style={styles.iconWrap}>
                <Icon size={18} color={colors.accent} />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.body}>{item.body}</Text>
              </View>
              {!item.read && <View style={styles.dot} />}
            </TouchableOpacity>
          );
        }}
        ListEmptyComponent={
          <EmptyState icon={<Bell size={40} color={colors.textMuted} />} title="You're all caught up" body="New updates will show up here." />
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  markAll: { color: colors.accent, ...typography.captionMedium },
  list: { padding: spacing.lg },
  row: { flexDirection: "row", alignItems: "flex-start", gap: spacing.md, backgroundColor: colors.surface, borderRadius: radius.lg, padding: spacing.md, marginBottom: spacing.md, borderWidth: 1, borderColor: colors.borderSubtle },
  rowUnread: { borderColor: colors.accent },
  iconWrap: { width: 36, height: 36, borderRadius: 18, backgroundColor: colors.accentMuted, alignItems: "center", justifyContent: "center" },
  title: { color: colors.textPrimary, ...typography.bodyMedium, marginBottom: 2 },
  body: { color: colors.textMuted, ...typography.caption },
  dot: { width: 8, height: 8, borderRadius: 4, backgroundColor: colors.accent, marginTop: 6 },
});
