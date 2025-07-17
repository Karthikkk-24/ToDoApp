import { FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View, Alert, ScrollView, Switch } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Sidebar from "../../components/Sidebar";
import { useAuth } from "@/contexts/AuthContext";
import { useTheme } from "@/contexts/ThemeContext";
import { router } from "expo-router";

// Component for settings option item
const SettingsOption = ({
    title,
    iconName,
    onPress,
    isLogout = false,
    colors,
}: {
    title: string;
    iconName: "chevron-right" | "chevron-down" | "cog" | "bell" | "user" | "sign-out";
    onPress?: () => void;
    isLogout?: boolean;
    colors: any;
}) => {
    return (
        <TouchableOpacity style={[getStyles(colors).settingsOption, isLogout && getStyles(colors).logoutOption]} onPress={onPress}>
            <View style={[getStyles(colors).settingsIconContainer, isLogout && getStyles(colors).logoutIconContainer]}>
                <FontAwesome name={iconName} size={16} color={isLogout ? "#FF5252" : colors.primary} />
            </View>
            <Text style={[getStyles(colors).settingsOptionText, isLogout && getStyles(colors).logoutText]}>{title}</Text>
            <FontAwesome name="chevron-right" size={14} color={colors.secondary} />
        </TouchableOpacity>
    );
};

// Component for theme toggle
const ThemeToggle = ({ colors, theme, toggleTheme }: { colors: any; theme: string; toggleTheme: () => void }) => {
    return (
        <View style={getStyles(colors).settingsOption}>
            <View style={getStyles(colors).settingsIconContainer}>
                <FontAwesome name="adjust" size={16} color={colors.primary} />
            </View>
            <Text style={getStyles(colors).settingsOptionText}>Theme</Text>
            <View style={getStyles(colors).themeToggleContainer}>
                <Text style={[getStyles(colors).themeToggleText, theme === 'light' && getStyles(colors).activeThemeText]}>Light</Text>
                <Switch
                    value={theme === 'dark'}
                    onValueChange={toggleTheme}
                    trackColor={{ false: colors.border, true: colors.primary }}
                    thumbColor={theme === 'dark' ? colors.background : colors.text}
                    style={getStyles(colors).themeSwitch}
                />
                <Text style={[getStyles(colors).themeToggleText, theme === 'dark' && getStyles(colors).activeThemeText]}>Dark</Text>
            </View>
        </View>
    );
};

export default function SettingsScreen() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isSearchActive, setIsSearchActive] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const { user, logout } = useAuth();
    const { theme, colors, toggleTheme } = useTheme();

    // Toggle search mode
    const toggleSearch = () => {
        setIsSearchActive(!isSearchActive);
        if (isSearchActive) {
            setSearchQuery("");
        }
    };

    // Handle logout
    const handleLogout = () => {
        Alert.alert(
            "Logout",
            "Are you sure you want to logout?",
            [
                {
                    text: "Cancel",
                    style: "cancel",
                },
                {
                    text: "Logout",
                    style: "destructive",
                    onPress: async () => {
                        await logout();
                        router.replace("/login");
                    },
                },
            ]
        );
    };

    return (
        <>
            <Sidebar 
                isOpen={isSidebarOpen} 
                onClose={() => setIsSidebarOpen(false)} 
            />
            
            <SafeAreaView style={[getStyles(colors).container]}>
                <StatusBar style={theme === 'dark' ? 'light' : 'dark'} />

                <View style={getStyles(colors).header}>
                    {isSearchActive ? (
                        <View style={getStyles(colors).searchContainer}>
                            <TextInput
                                style={getStyles(colors).searchInput}
                                placeholder="Search settings..."
                                placeholderTextColor={colors.secondary}
                                value={searchQuery}
                                onChangeText={setSearchQuery}
                                autoFocus
                            />
                            <TouchableOpacity onPress={toggleSearch}>
                                <FontAwesome name="times" size={20} color={colors.primary} />
                            </TouchableOpacity>
                        </View>
                    ) : (
                        <>
                            <TouchableOpacity onPress={() => setIsSidebarOpen(true)}>
                                <FontAwesome name="bars" size={24} color={colors.primary} />
                            </TouchableOpacity>
                            <Text style={getStyles(colors).headerText}>ZenSettings</Text>
                            <TouchableOpacity onPress={toggleSearch}>
                                <FontAwesome name="search" size={24} color={colors.primary} />
                            </TouchableOpacity>
                        </>
                    )}
                </View>

                <ScrollView 
                    style={getStyles(colors).scrollContainer}
                    contentContainerStyle={getStyles(colors).scrollContent}
                    showsVerticalScrollIndicator={false}
                >
                    <View style={getStyles(colors).profileContainer}>
                        <View style={getStyles(colors).avatarContainer}>
                            <View style={getStyles(colors).avatarCircle}>
                                <FontAwesome name="user" size={32} color={colors.primary} />
                            </View>
                        </View>

                        <Text style={getStyles(colors).userName}>{user?.name || "User"}</Text>
                        <Text style={getStyles(colors).userEmail}>{user?.email || "user@example.com"}</Text>

                        <View style={getStyles(colors).statsContainer}>
                            <View style={getStyles(colors).statItem}>
                                <Text style={getStyles(colors).statNumber}>99</Text>
                                <Text style={getStyles(colors).statLabel}>Completed</Text>
                            </View>
                            <View style={getStyles(colors).statDivider} />
                            <View style={getStyles(colors).statItem}>
                                <Text style={getStyles(colors).statNumber}>12</Text>
                                <Text style={getStyles(colors).statLabel}>Pending</Text>
                            </View>
                            <View style={getStyles(colors).statDivider} />
                            <View style={getStyles(colors).statItem}>
                                <Text style={getStyles(colors).statNumber}>7</Text>
                                <Text style={getStyles(colors).statLabel}>Projects</Text>
                            </View>
                        </View>
                    </View>

                    <View style={getStyles(colors).settingsContainer}>
                        <Text style={getStyles(colors).sectionTitle}>Preferences</Text>
                        <View style={getStyles(colors).settingsGroup}>
                            <SettingsOption title="Notifications" iconName="bell" colors={colors} />
                            <ThemeToggle colors={colors} theme={theme} toggleTheme={toggleTheme} />
                            <SettingsOption title="Weekly Goal" iconName="chevron-right" colors={colors} />
                        </View>

                        <Text style={getStyles(colors).sectionTitle}>Account</Text>
                        <View style={getStyles(colors).settingsGroup}>
                            <SettingsOption title="Change Avatar" iconName="user" colors={colors} />
                            <SettingsOption title="Change Nickname" iconName="chevron-right" colors={colors} />
                        </View>

                        <View style={getStyles(colors).logoutContainer}>
                            <SettingsOption 
                                title="Logout" 
                                iconName="sign-out" 
                                onPress={handleLogout}
                                isLogout={true}
                                colors={colors}
                            />
                        </View>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </>
    );
}

const getStyles = (colors: any) => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
        paddingHorizontal: 15,
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 15,
        paddingVertical: 15,
        borderBottomWidth: 0.2,
        borderBottomColor: colors.border,
    },
    searchContainer: {
        flexDirection: "row",
        alignItems: "center",
        flex: 1,
        justifyContent: "space-between",
    },
    searchInput: {
        flex: 1,
        color: colors.text,
        fontSize: 16,
        marginRight: 10,
    },
    headerText: {
        fontSize: 20,
        fontWeight: "bold",
        color: colors.text,
    },
    scrollContainer: {
        flex: 1,
    },
    scrollContent: {
        paddingBottom: 20,
    },
    profileContainer: {
        alignItems: "center",
        marginTop: 20,
        marginBottom: 30,
        backgroundColor: `${colors.primary}0D`, // 5% opacity
        borderRadius: 20,
        padding: 24,
        borderWidth: 1,
        borderColor: `${colors.primary}1A`, // 10% opacity
    },
    avatarContainer: {
        marginBottom: 16,
    },
    avatarCircle: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: `${colors.primary}1A`, // 10% opacity
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 2,
        borderColor: `${colors.primary}33`, // 20% opacity
    },
    userName: {
        fontSize: 24,
        fontWeight: "600",
        color: colors.text,
        marginBottom: 4,
    },
    userEmail: {
        fontSize: 14,
        color: colors.secondary,
        marginBottom: 20,
    },
    statsContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-around",
        width: "100%",
        paddingTop: 16,
        borderTopWidth: 1,
        borderTopColor: `${colors.primary}1A`, // 10% opacity
    },
    statItem: {
        alignItems: "center",
        flex: 1,
    },
    statNumber: {
        fontSize: 20,
        fontWeight: "bold",
        color: colors.primary,
        marginBottom: 4,
    },
    statLabel: {
        fontSize: 12,
        color: colors.secondary,
        textAlign: "center",
    },
    statDivider: {
        width: 1,
        height: 40,
        backgroundColor: `${colors.primary}1A`, // 10% opacity
        marginHorizontal: 16,
    },
    settingsContainer: {
        marginBottom: 20,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: "600",
        color: colors.primary,
        marginBottom: 12,
        marginTop: 20,
        paddingHorizontal: 4,
    },
    settingsGroup: {
        backgroundColor: `${colors.primary}0D`, // 5% opacity
        borderRadius: 16,
        marginBottom: 8,
        borderWidth: 1,
        borderColor: `${colors.primary}1A`, // 10% opacity
        overflow: "hidden",
    },
    settingsOption: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 16,
        paddingHorizontal: 16,
        borderBottomWidth: 0.5,
        borderBottomColor: `${colors.primary}1A`, // 10% opacity
    },
    settingsIconContainer: {
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: `${colors.primary}1A`, // 10% opacity
        justifyContent: "center",
        alignItems: "center",
        marginRight: 12,
    },
    logoutIconContainer: {
        backgroundColor: "rgba(255, 82, 82, 0.1)",
    },
    settingsOptionText: {
        fontSize: 16,
        color: colors.text,
        flex: 1,
        fontWeight: "500",
    },
    logoutContainer: {
        marginTop: 20,
        backgroundColor: "rgba(255, 82, 82, 0.05)",
        borderRadius: 16,
        borderWidth: 1,
        borderColor: "rgba(255, 82, 82, 0.1)",
        overflow: "hidden",
    },
    logoutOption: {
        borderBottomWidth: 0,
    },
    logoutText: {
        color: "#FF5252",
        fontWeight: "500",
    },
    themeToggleContainer: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
    },
    themeToggleText: {
        fontSize: 14,
        color: colors.secondary,
        fontWeight: "500",
    },
    activeThemeText: {
        color: colors.primary,
    },
    themeSwitch: {
        marginHorizontal: 4,
    },
});


