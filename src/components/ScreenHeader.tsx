import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { ChevronLeft } from "lucide-react-native";
import { useNavigation } from "@react-navigation/native";
import { colors, spacing, typography } from "@/theme";

interface Props {
  title: string;
  showBack?: boolean;
  right?: React.ReactNode;
}

export function ScreenHeader({ title, showBack, right }: Props) {
  const navigation = useNavigation();
  return (
    <View style={styles.row}>
      <View style={styles.side}>
        {showBack && (
          <TouchableOpacity onPress={() => navigation.goBack()} hitSlop={12}>
            <ChevronLeft color={colors.textPrimary} size={24} />
          </TouchableOpacity>
        )}
      </View>
      <Text style={styles.title} numberOfLines={1}>
        {title}
      </Text>
      <View style={[styles.side, { alignItems: "flex-end" }]}>{right}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },
  side: { width: 44 },
  title: {
    flex: 1,
    textAlign: "center",
    color: colors.textPrimary,
    ...typography.h3,
  },
});
