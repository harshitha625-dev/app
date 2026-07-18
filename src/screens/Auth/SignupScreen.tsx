import React, { useState } from "react";
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { colors, radius, spacing, typography } from "@/theme";
import { GradientButton, ScreenHeader } from "@/components";

export function SignupScreen() {
  const navigation = useNavigation<any>();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignup = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigation.navigate("OtpVerification", { email });
    }, 700);
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === "ios" ? "padding" : undefined}>
      <ScreenHeader title="Create account" showBack />
      <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">
        <View style={styles.field}>
          <Text style={styles.label}>Full name</Text>
          <TextInput style={styles.input} placeholder="Your name" placeholderTextColor={colors.textMuted} value={name} onChangeText={setName} />
        </View>
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
        <View style={styles.field}>
          <Text style={styles.label}>Password</Text>
          <TextInput
            style={styles.input}
            placeholder="At least 8 characters"
            placeholderTextColor={colors.textMuted}
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
        </View>

        <GradientButton label="Create Account" onPress={handleSignup} loading={loading} style={{ marginTop: spacing.md }} />

        <View style={styles.footerRow}>
          <Text style={styles.footerText}>Already have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <Text style={styles.link}>Log in</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  scroll: { padding: spacing.xl },
  field: { marginBottom: spacing.lg },
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
  link: { color: colors.accent, ...typography.captionMedium },
  footerRow: { flexDirection: "row", justifyContent: "center", marginTop: spacing.xl },
  footerText: { color: colors.textSecondary, ...typography.body },
});
