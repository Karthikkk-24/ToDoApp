import { FontAwesome } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import React from 'react';
import { Platform, TouchableOpacity, View } from 'react-native';

import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

// Custom tab icon component with rounded background
const TabIcon = ({
    name,
    size = 24,
    color,
    focused,
}: {
    name: any;
    size?: number;
    color: string;
    focused: boolean;
}) => {
    return (
        <View
            style={{
                width: 40,
                height: 40,
                borderRadius: 20,
                backgroundColor: focused ? 'rgba(203, 255, 0, 0.15)' : 'transparent',
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: 4,
            }}
        >
            <FontAwesome name={name} size={size} color={color} />
        </View>
    );
};

export default function TabLayout() {
    const colorScheme = useColorScheme();

    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: '#CBFF00', // Neon green from the design
                tabBarInactiveTintColor: '#666', // Softer inactive icons
                headerShown: false,
                tabBarShowLabel: true, // Show labels below icons
                tabBarStyle: {
                    backgroundColor: '#000', // Pure black to match app background
                    borderTopWidth: 1,
                    borderTopColor: 'rgba(203, 255, 0, 0.15)', // Subtle neon green border
                    paddingTop: 8,
                    paddingBottom: Platform.OS === 'ios' ? 25 : 12, // Platform-specific bottom padding
                    height: Platform.OS === 'ios' ? 83 : 70, // Adjusted height for padding
                    // Set lower z-index to allow sidebar to appear on top
                    zIndex: 1,
                },
                tabBarLabelStyle: {
                    fontSize: 11,
                    marginBottom: 5,
                    paddingBottom: 2,
                    fontWeight: '500',
                },
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: 'Home',
                    tabBarIcon: ({ color, focused }) => (
                        <TabIcon name="home" color={color} focused={focused} />
                    ),
                }}
            />
            <Tabs.Screen
                name="browse"
                options={{
                    title: 'Browse',
                    tabBarIcon: ({ color, focused }) => (
                        <TabIcon name="th-large" color={color} focused={focused} />
                    ),
                }}
            />
            <Tabs.Screen
                name="settings"
                options={{
                    title: 'Settings',
                    tabBarIcon: ({ color, focused }) => (
                        <TabIcon name="cog" color={color} focused={focused} />
                    ),
                }}
            />
        </Tabs>
    );
}
