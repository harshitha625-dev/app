// Signature element: a rotating gradient ring that stands in for VEYTRIX's
// core action — turning a prompt into motion. Used on the Splash screen (slow,
// ambient spin) and the Generation Progress screen (faster spin + percentage),
// so the one visual idea threads through the app's most important moments.

import React, { useEffect, useRef } from "react";
import { Animated, Easing, StyleSheet, Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { colors, typography } from "@/theme";

interface Props {
  size?: number;
  thickness?: number;
  progress?: number; // 0-100, shown as center label when provided
  speedMs?: number;
}

export function GradientRing({ size = 120, thickness = 6, progress, speedMs = 2200 }: Props) {
  const spin = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const loop = Animated.loop(
      Animated.timing(spin, { toValue: 1, duration: speedMs, easing: Easing.linear, useNativeDriver: true })
    );
    loop.start();
    return () => loop.stop();
  }, [spin, speedMs]);

  const rotate = spin.interpolate({ inputRange: [0, 1], outputRange: ["0deg", "360deg"] });

  return (
    <View style={{ width: size, height: size, alignItems: "center", justifyContent: "center" }}>
      <Animated.View style={{ transform: [{ rotate }] }}>
        <LinearGradient
          colors={[colors.gradientStart, colors.info, colors.gradientEnd, colors.gradientStart]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={{ width: size, height: size, borderRadius: size / 2 }}
        />
      </Animated.View>
      <View
        style={[
          styles.mask,
          {
            width: size - thickness * 2,
            height: size - thickness * 2,
            borderRadius: (size - thickness * 2) / 2,
          },
        ]}
      >
        {progress !== undefined && <Text style={styles.progressText}>{Math.round(progress)}%</Text>}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mask: {
    position: "absolute",
    backgroundColor: colors.background,
    alignItems: "center",
    justifyContent: "center",
  },
  progressText: { color: colors.textPrimary, ...typography.h2 },
});
