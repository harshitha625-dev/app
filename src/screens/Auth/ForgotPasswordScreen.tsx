import React, { useState } from "react";
import { KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { colors, radius, spacing, typography } from "@/theme";
import { GradientButton, ScreenHeader } from "@/components";

export function ForgotPasswordScreen() {
  const navigation = useNavigation<any>();
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === "ios" ? "padding" : undefined}>
      <ScreenHeader title="Reset password" showBack />
      <View style={styles.content}>
        {!sent ? (
          <>
            <Text style={styles.body}>Enter the email linked to your account and we'll send a reset link.</Text>
            <View style={styles.field}>
              <Text style={styles.label}>Email</Text>
              <TextInput
                style={styles.input}
                placeholder="you@example.com"
                placeholderTextColor={colors.textMuted}
                autoCapitalize="none"
                keyboardType="email-address"
                value={email}
                onChangeText={setEmail}
              />
            </View>
            <GradientButton label="Send Reset Link" onPress={() => setSent(true)} />
          </>
        ) : (
          <>
            <Text style={styles.body}>Check your inbox \u2014 if an account exists for {email || "that address"}, a reset link is on its way.</Text>
            <GradientButton label="Back to Login" onPress={() => navigation.navigate("Login")} />
          </>
        )}
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: { padding: spacing.xl },
  body: { color: colors.textSecondary, ...typography.body, marginBottom: spacing.xl },
  field: { marginBottom: spacing.xl },
  label: { color: colors.textSecondary, ...typography.caption, marginBottom: spacing.xs },
  input: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.borderSubtle,
    borderRadius: radius.md,
    paddingHorizontal: spacing.lg,
    height: 50,
    color: colors.textPrimary,
    ...typography.body,
  },
});
