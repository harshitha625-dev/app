import React, { useState } from "react";
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { colors, radius, spacing, typography } from "@/theme";
import { GradientButton } from "@/components";
import * as WebBrowser from "expo-web-browser";
import * as Linking from "expo-linking";
import { supabase } from "@/services/supabase";

WebBrowser.maybeCompleteAuthSession();

export function LoginScreen() {
  const navigation = useNavigation<any>();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      alert("Please enter both email and password.");
      return;
    }
    setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) {
        alert(error.message);
      }
    } catch (err: any) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      const redirectUrl = Linking.createURL("/auth/callback");
      
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: redirectUrl,
        },
      });

      if (error) throw error;

      if (data?.url) {
        const result = await WebBrowser.openAuthSessionAsync(data.url, redirectUrl);
        if (result.type === "success") {
          // Supabase v2: extract tokens from the redirect URL
          const urlFragment = result.url.split("#")[1];
          if (urlFragment) {
            const params = new URLSearchParams(urlFragment);
            const access_token = params.get("access_token");
            const refresh_token = params.get("refresh_token");
            
            if (access_token && refresh_token) {
              await supabase.auth.setSession({ access_token, refresh_token });
            }
          }
        }
      }
    } catch (error) {
      console.error("Google Auth Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === "ios" ? "padding" : undefined}>
      <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">
        <Text style={styles.logo}>VEYTRIX</Text>
        <Text style={styles.title}>Welcome back</Text>
        <Text style={styles.subtitle}>Sign in to keep creating</Text>

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
            placeholder="\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022"
            placeholderTextColor={colors.textMuted}
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
        </View>

        <TouchableOpacity onPress={() => navigation.navigate("ForgotPassword")} style={{ alignSelf: "flex-end", marginBottom: spacing.xl }}>
          <Text style={styles.link}>Forgot password?</Text>
        </TouchableOpacity>

        <GradientButton label="Log In" onPress={handleLogin} loading={loading} />

        <View style={styles.dividerRow}>
          <View style={styles.divider} />
          <Text style={styles.dividerText}>or continue with</Text>
          <View style={styles.divider} />
        </View>

        <View style={styles.socialRow}>
          <TouchableOpacity style={styles.socialButton} onPress={handleGoogleLogin}>
            <Text style={styles.socialText}>Google</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.socialButton} onPress={() => console.warn("GitHub not set up")}>
            <Text style={styles.socialText}>GitHub</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.footerRow}>
          <Text style={styles.footerText}>Don't have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
            <Text style={styles.link}>Sign up</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  scroll: { padding: spacing.xl, paddingTop: spacing.xxxl },
  logo: { color: colors.accent, ...typography.h3, letterSpacing: 2, marginBottom: spacing.xxl },
  title: { color: colors.textPrimary, ...typography.h1, marginBottom: 4 },
  subtitle: { color: colors.textSecondary, ...typography.body, marginBottom: spacing.xxl },
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
  dividerRow: { flexDirection: "row", alignItems: "center", marginVertical: spacing.xl, gap: spacing.md },
  divider: { flex: 1, height: 1, backgroundColor: colors.border },
  dividerText: { color: colors.textMuted, ...typography.caption },
  socialRow: { flexDirection: "row", gap: spacing.md, marginBottom: spacing.xxl },
  socialButton: {
    flex: 1,
    height: 48,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: "center",
    justifyContent: "center",
  },
  socialText: { color: colors.textPrimary, ...typography.bodyMedium },
  footerRow: { flexDirection: "row", justifyContent: "center" },
  footerText: { color: colors.textSecondary, ...typography.body },
});
