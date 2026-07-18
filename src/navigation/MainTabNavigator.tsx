import React from "react";
import { StyleSheet, View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Download, Home as HomeIcon, PlusCircle, User, Video } from "lucide-react-native";
import { MainTabParamList } from "./types";
import { HomeScreen } from "@/screens/Home/HomeScreen";
import { ProjectsScreen } from "@/screens/Projects/ProjectsScreen";
import { CreateStackNavigator } from "./CreateStackNavigator";
import { DownloadsScreen } from "@/screens/Downloads/DownloadsScreen";
import { ProfileScreen } from "@/screens/Profile/ProfileScreen";
import { colors } from "@/theme";

const Tab = createBottomTabNavigator<MainTabParamList>();

export function MainTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.accent,
        tabBarInactiveTintColor: colors.textMuted,
        tabBarStyle: { backgroundColor: colors.surface, borderTopColor: colors.borderSubtle, height: 64, paddingBottom: 10, paddingTop: 8 },
        tabBarLabelStyle: { fontSize: 11, fontWeight: "600" },
      }}
    >
      <Tab.Screen name="Home" component={HomeScreen} options={{ tabBarIcon: ({ color, size }) => <HomeIcon color={color} size={size} /> }} />
      <Tab.Screen name="Projects" component={ProjectsScreen} options={{ tabBarIcon: ({ color, size }) => <Video color={color} size={size} /> }} />
      <Tab.Screen
        name="Create"
        component={CreateStackNavigator}
        options={{
          tabBarIcon: ({ color, size }) => (
            <View style={styles.createIconWrap}>
              <PlusCircle color={colors.white} size={size + 6} fill={colors.accent} />
            </View>
          ),
          tabBarLabel: "",
        }}
      />
      <Tab.Screen name="Downloads" component={DownloadsScreen} options={{ tabBarIcon: ({ color, size }) => <Download color={color} size={size} /> }} />
      <Tab.Screen name="Profile" component={ProfileScreen} options={{ tabBarIcon: ({ color, size }) => <User color={color} size={size} /> }} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  createIconWrap: { alignItems: "center", justifyContent: "center", marginTop: -4 },
});
