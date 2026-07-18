import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { CreateStackParamList } from "./types";
import { CreateHubScreen } from "@/screens/Create/CreateHubScreen";
import { AIVideoGenerationScreen } from "@/screens/Create/AIVideoGenerationScreen";
import { ImageToVideoScreen } from "@/screens/Create/ImageToVideoScreen";
import { ReferenceVideoScreen } from "@/screens/Create/ReferenceVideoScreen";
import { ManualEditScreen } from "@/screens/Create/ManualEditScreen";
import { GenerationProgressScreen } from "@/screens/Create/GenerationProgressScreen";
import { colors } from "@/theme";

const Stack = createNativeStackNavigator<CreateStackParamList>();

export function CreateStackNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false, contentStyle: { backgroundColor: colors.background } }}>
      <Stack.Screen name="CreateHub" component={CreateHubScreen} />
      <Stack.Screen name="AIVideoGeneration" component={AIVideoGenerationScreen} />
      <Stack.Screen name="ImageToVideo" component={ImageToVideoScreen} />
      <Stack.Screen name="ReferenceVideo" component={ReferenceVideoScreen} />
      <Stack.Screen name="ManualEdit" component={ManualEditScreen} />
      <Stack.Screen name="GenerationProgress" component={GenerationProgressScreen} />
    </Stack.Navigator>
  );
}
