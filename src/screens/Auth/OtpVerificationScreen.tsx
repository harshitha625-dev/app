import React, { useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { colors, radius, spacing, typography } from "@/theme";
import { GradientButton, ScreenHeader } from "@/components";
import { useAuthStore } from "@/store/authStore";

export function OtpVerificationScreen() {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const login = useAuthStore((s) => s.login);
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const email = route.params?.email ?? "your email";

  const verify = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      login();
    }, 600);
  };

  return (
    <View style={styles.container}>
      <ScreenHeader title="Verify code" showBack />
      <View style={styles.content}>
        <Text style={styles.body}>Enter the 6-digit code we sent to {email}.</Text>
        <TextInput
          style={styles.otpInput}
          placeholder="000000"
          placeholderTextColor={colors.textMuted}
          keyboardType="number-pad"
          maxLength={6}
          value={code}
          onChangeText={setCode}
        />
        <GradientButton label="Verify" onPress={verify} loading={loading} disabled={code.length < 6} />
        <Text style={styles.resend}>Didn't get a code? Resend</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: { padding: spacing.xl },
  body: { color: colors.textSecondary, ...typography.body, marginBottom: spacing.xl },
  otpInput: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.borderSubtle,
    borderRadius: radius.md,
    height: 56,
    color: colors.textPrimary,
    textAlign: "center",
    ...typography.h2,
    letterSpacing: 8,
    marginBottom: spacing.xl,
  },
  resend: { color: colors.accent, ...typography.captionMedium, textAlign: "center", marginTop: spacing.lg },
});
