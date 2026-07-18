import React, { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { colors, spacing, typography } from "@/theme";
import { GradientRing } from "@/components";
import { useAuthStore } from "@/store/authStore";

export function SplashScreen() {
  const navigation = useNavigation<any>();
  const { isAuthenticated, hasSeenOnboarding } = useAuthStore();

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!hasSeenOnboarding) {
        navigation.replace("Onboarding");
      } else if (!isAuthenticated) {
        navigation.replace("Auth");
      } else {
        navigation.replace("Main");
      }
    }, 1600);
    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <GradientRing size={96} speedMs={3000} />
      <Text style={styles.logo}>VEYTRIX</Text>
      <Text style={styles.tagline}>AI video, on the go</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background, alignItems: "center", justifyContent: "center", gap: spacing.lg },
  logo: { color: colors.textPrimary, ...typography.display, letterSpacing: 2 },
  tagline: { color: colors.textMuted, ...typography.body },
});
