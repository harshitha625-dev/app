import React from "react";
import { NavigationContainer, DarkTheme } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RootStackParamList } from "./types";
import { SplashScreen } from "@/screens/Splash/SplashScreen";
import { OnboardingScreen } from "@/screens/Onboarding/OnboardingScreen";
import { AuthNavigator } from "./AuthNavigator";
import { MainTabNavigator } from "./MainTabNavigator";
import { WalletScreen } from "@/screens/Wallet/WalletScreen";
import { PricingScreen } from "@/screens/Pricing/PricingScreen";
import { NotificationsScreen } from "@/screens/Notifications/NotificationsScreen";
import { SettingsScreen } from "@/screens/Settings/SettingsScreen";
import { CreateStackNavigator } from "./CreateStackNavigator";
import { colors } from "@/theme";

const Stack = createNativeStackNavigator<RootStackParamList>();

const navTheme = {
  ...DarkTheme,
  colors: { ...DarkTheme.colors, background: colors.background, card: colors.surface, border: colors.borderSubtle, primary: colors.accent, text: colors.textPrimary },
};

export function RootNavigator() {
  return (
    <NavigationContainer theme={navTheme}>
      <Stack.Navigator initialRouteName="Main" screenOptions={{ headerShown: false, contentStyle: { backgroundColor: colors.background } }}>
        <Stack.Screen name="Main" component={MainTabNavigator} />
        <Stack.Screen name="CreateStack" component={CreateStackNavigator} options={{ presentation: "modal" }} />
        <Stack.Screen name="Wallet" component={WalletScreen} options={{ presentation: "modal" }} />
        <Stack.Screen name="Pricing" component={PricingScreen} options={{ presentation: "modal" }} />
        <Stack.Screen name="Notifications" component={NotificationsScreen} options={{ presentation: "modal" }} />
        <Stack.Screen name="Settings" component={SettingsScreen} options={{ presentation: "modal" }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
