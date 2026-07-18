import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Film, ImageIcon, Scissors, Video } from "lucide-react-native";
import { colors, spacing, typography } from "@/theme";
import { BigActionButton, ScreenHeader } from "@/components";

export function CreateHubScreen() {
  const navigation = useNavigation<any>();
  return (
    <View style={styles.container}>
      <ScreenHeader title="Create" />
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.subtitle}>Pick a way to start</Text>
        <View style={styles.grid}>
          <BigActionButton
            label="Generate Video"
            subtitle="Prompt to video"
            icon={<Video size={20} color={colors.accent} />}
            onPress={() => navigation.navigate("AIVideoGeneration")}
          />
          <BigActionButton
            label="Image to Video"
            subtitle="Animate a photo"
            icon={<ImageIcon size={20} color={colors.accent} />}
            onPress={() => navigation.navigate("ImageToVideo")}
          />
          <BigActionButton
            label="Reference Video"
            subtitle="Restyle a clip"
            icon={<Film size={20} color={colors.accent} />}
            onPress={() => navigation.navigate("ReferenceVideo")}
          />
          <BigActionButton
            label="Manual Edit"
            subtitle="Trim & polish"
            icon={<Scissors size={20} color={colors.accent} />}
            onPress={() => navigation.navigate("ManualEdit")}
          />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: { padding: spacing.lg },
  subtitle: { color: colors.textMuted, ...typography.body, marginBottom: spacing.lg },
  grid: { flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between" },
});
