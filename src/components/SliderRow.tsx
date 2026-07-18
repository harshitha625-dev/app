import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { colors, spacing, typography } from "@/theme";

interface Props {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  unit?: string;
  onChange: (value: number) => void;
}

// Lightweight stepper (avoids pulling in @react-native-community/slider so the
// scaffold has zero native-module dependencies beyond what's already listed).
export function SliderRow({ label, value, min, max, step, unit = "", onChange }: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.labelRow}>
        <Text style={styles.label}>{label}</Text>
        <Text style={styles.value}>
          {value}
          {unit}
        </Text>
      </View>
      <View style={styles.controls}>
        <TouchableOpacity style={styles.btn} onPress={() => onChange(Math.max(min, value - step))}>
          <Text style={styles.btnText}>\u2212</Text>
        </TouchableOpacity>
        <View style={styles.track}>
          <View style={[styles.fill, { width: `${((value - min) / (max - min)) * 100}%` }]} />
        </View>
        <TouchableOpacity style={styles.btn} onPress={() => onChange(Math.min(max, value + step))}>
          <Text style={styles.btnText}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginBottom: spacing.lg },
  labelRow: { flexDirection: "row", justifyContent: "space-between", marginBottom: spacing.sm },
  label: { color: colors.textSecondary, ...typography.caption },
  value: { color: colors.textPrimary, ...typography.captionMedium },
  controls: { flexDirection: "row", alignItems: "center", gap: spacing.md },
  btn: { width: 32, height: 32, borderRadius: 16, backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border, alignItems: "center", justifyContent: "center" },
  btnText: { color: colors.textPrimary, ...typography.bodyMedium },
  track: { flex: 1, height: 6, borderRadius: 3, backgroundColor: colors.border, overflow: "hidden" },
  fill: { height: "100%", backgroundColor: colors.accent },
});
