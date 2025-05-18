import { FontAwesome } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import React from "react";
import { Platform, TouchableOpacity, View } from "react-native";

import { HapticTab } from "@/components/HapticTab";
import { IconSymbol } from "@/components/ui/IconSymbol";
import TabBarBackground from "@/components/ui/TabBarBackground";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";

export default function TabLayout() {
    const colorScheme = useColorScheme();

    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: "#CBFF00", // Neon green from the design
                tabBarInactiveTintColor: "#444", // Darker inactive icons
                headerShown: false,
                tabBarShowLabel: true, // Show labels below icons
                tabBarStyle: {
                    height: 80,
                    backgroundColor: "#000", // Pure black background
                    borderTopWidth: 0,
                    paddingTop: 5,
                    paddingBottom: 25,
                },
                tabBarLabelStyle: {
                    fontSize: 10,
                    marginBottom: 5,
                    paddingBottom: 2,
                },
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: "Home",
                    tabBarIcon: ({ color }) => <FontAwesome name="home" size={24} color={color} />,
                }}
            />
            <Tabs.Screen
                name="browse"
                options={{
                    title: "Browse",
                    tabBarIcon: ({ color }) => <FontAwesome name="list" size={24} color={color} />,
                }}
            />
            <Tabs.Screen
                name="settings"
                options={{
                    title: "Settings",
                    tabBarIcon: ({ color }) => <FontAwesome name="cog" size={24} color={color} />,
                }}
            />
        </Tabs>
    );
}
