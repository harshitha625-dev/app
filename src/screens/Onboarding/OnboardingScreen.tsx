import React, { useRef, useState } from "react";
import { Dimensions, FlatList, StyleSheet, Text, View, ViewToken } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { colors, radius, spacing, typography } from "@/theme";
import { GradientButton } from "@/components";
import { ONBOARDING_SLIDES } from "@/constants";
import { useAuthStore } from "@/store/authStore";

const { width } = Dimensions.get("window");

export function OnboardingScreen() {
  const navigation = useNavigation<any>();
  const completeOnboarding = useAuthStore((s) => s.completeOnboarding);
  const [index, setIndex] = useState(0);
  const listRef = useRef<FlatList>(null);

  const onViewableItemsChanged = useRef(({ viewableItems }: { viewableItems: ViewToken[] }) => {
    if (viewableItems[0]?.index !== null && viewableItems[0]?.index !== undefined) {
      setIndex(viewableItems[0].index);
    }
  }).current;

  const finish = () => {
    completeOnboarding();
    navigation.replace("Auth");
  };

  const next = () => {
    if (index < ONBOARDING_SLIDES.length - 1) {
      listRef.current?.scrollToIndex({ index: index + 1 });
    } else {
      finish();
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        ref={listRef}
        data={ONBOARDING_SLIDES}
        keyExtractor={(item) => item.key}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={{ itemVisiblePercentThreshold: 60 }}
        renderItem={({ item }) => (
          <View style={[styles.slide, { width }]}>
            <View style={styles.artPlaceholder} />
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.body}>{item.body}</Text>
          </View>
        )}
      />
      <View style={styles.dots}>
        {ONBOARDING_SLIDES.map((s, i) => (
          <View key={s.key} style={[styles.dot, i === index && styles.dotActive]} />
        ))}
      </View>
      <View style={styles.footer}>
        <Text style={styles.skip} onPress={finish}>
          Skip
        </Text>
        <GradientButton
          label={index === ONBOARDING_SLIDES.length - 1 ? "Start Creating" : "Next"}
          onPress={next}
          style={{ flex: 1, marginLeft: spacing.lg }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  slide: { alignItems: "center", justifyContent: "center", paddingHorizontal: spacing.xxl },
  artPlaceholder: {
    width: 220,
    height: 220,
    borderRadius: radius.xl,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.borderSubtle,
    marginBottom: spacing.xxl,
  },
  title: { color: colors.textPrimary, ...typography.h1, textAlign: "center", marginBottom: spacing.sm },
  body: { color: colors.textSecondary, ...typography.body, textAlign: "center" },
  dots: { flexDirection: "row", justifyContent: "center", gap: 6, marginBottom: spacing.xl },
  dot: { width: 6, height: 6, borderRadius: 3, backgroundColor: colors.border },
  dotActive: { backgroundColor: colors.accent, width: 18 },
  footer: { flexDirection: "row", alignItems: "center", paddingHorizontal: spacing.xl, paddingBottom: spacing.xxl },
  skip: { color: colors.textMuted, ...typography.bodyMedium },
});
