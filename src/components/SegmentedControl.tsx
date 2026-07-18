import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { colors, radius, spacing, typography } from "@/theme";

interface Props {
  options: string[];
  value: string;
  onChange: (value: string) => void;
}

export function SegmentedControl({ options, value, onChange }: Props) {
  return (
    <View style={styles.row}>
      {options.map((option) => {
        const active = option === value;
        return (
          <TouchableOpacity
            key={option}
            style={[styles.segment, active && styles.segmentActive]}
            onPress={() => onChange(option)}
            activeOpacity={0.8}
          >
            <Text style={[styles.text, active && styles.textActive]}>{option}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: "row", backgroundColor: colors.surface, borderRadius: radius.md, padding: 4, borderWidth: 1, borderColor: colors.borderSubtle },
  segment: { flex: 1, paddingVertical: spacing.sm, alignItems: "center", borderRadius: radius.sm },
  segmentActive: { backgroundColor: colors.accentMuted },
  text: { color: colors.textMuted, ...typography.captionMedium },
  textActive: { color: colors.accent },
});
