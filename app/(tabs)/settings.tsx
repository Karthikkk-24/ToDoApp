import { FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Sidebar from "../../components/Sidebar";
import { useAuth } from "@/contexts/AuthContext";
import { router } from "expo-router";

// Component for settings option item
const SettingsOption = ({
    title,
    iconName,
    onPress,
    isLogout = false,
}: {
    title: string;
    iconName: "chevron-right" | "chevron-down" | "cog" | "bell" | "user" | "sign-out";
    onPress?: () => void;
    isLogout?: boolean;
}) => {
    return (
        <TouchableOpacity style={[styles.settingsOption, isLogout && styles.logoutOption]} onPress={onPress}>
            <View style={[styles.settingsIconContainer, isLogout && styles.logoutIconContainer]}>
                <FontAwesome name={iconName} size={16} color={isLogout ? "#FF5252" : "#CBFF00"} />
            </View>
            <Text style={[styles.settingsOptionText, isLogout && styles.logoutText]}>{title}</Text>
            <FontAwesome name="chevron-right" size={14} color="#666" />
        </TouchableOpacity>
    );
};

export default function SettingsScreen() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isSearchActive, setIsSearchActive] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const { user, logout } = useAuth();

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
            
            <SafeAreaView style={styles.container}>
                <StatusBar style="light" />

                <View style={styles.header}>
                    {isSearchActive ? (
                        <View style={styles.searchContainer}>
                            <TextInput
                                style={styles.searchInput}
                                placeholder="Search settings..."
                                placeholderTextColor="#666"
                                value={searchQuery}
                                onChangeText={setSearchQuery}
                                autoFocus
                            />
                            <TouchableOpacity onPress={toggleSearch}>
                                <FontAwesome name="times" size={20} color="#CBFF00" />
                            </TouchableOpacity>
                        </View>
                    ) : (
                        <>
                            <TouchableOpacity onPress={() => setIsSidebarOpen(true)}>
                                <FontAwesome name="bars" size={24} color="#CBFF00" />
                            </TouchableOpacity>
                            <Text style={styles.headerText}>ZenSettings</Text>
                            <TouchableOpacity onPress={toggleSearch}>
                                <FontAwesome name="search" size={24} color="#CBFF00" />
                            </TouchableOpacity>
                        </>
                    )}
                </View>

                <View style={styles.profileContainer}>
                    <View style={styles.avatarContainer}>
                        <View style={styles.avatarCircle}>
                            <FontAwesome name="user" size={32} color="#CBFF00" />
                        </View>
                    </View>

                    <Text style={styles.userName}>{user?.name || "User"}</Text>
                    <Text style={styles.userEmail}>{user?.email || "user@example.com"}</Text>

                    <View style={styles.statsContainer}>
                        <View style={styles.statItem}>
                            <Text style={styles.statNumber}>99</Text>
                            <Text style={styles.statLabel}>Completed</Text>
                        </View>
                        <View style={styles.statDivider} />
                        <View style={styles.statItem}>
                            <Text style={styles.statNumber}>12</Text>
                            <Text style={styles.statLabel}>Pending</Text>
                        </View>
                        <View style={styles.statDivider} />
                        <View style={styles.statItem}>
                            <Text style={styles.statNumber}>7</Text>
                            <Text style={styles.statLabel}>Projects</Text>
                        </View>
                    </View>
                </View>

                <View style={styles.settingsContainer}>
                    <Text style={styles.sectionTitle}>Preferences</Text>
                    <View style={styles.settingsGroup}>
                        <SettingsOption title="Notifications" iconName="bell" />
                        <SettingsOption title="Theme" iconName="cog" />
                        <SettingsOption title="Weekly Goal" iconName="chevron-right" />
                    </View>

                    <Text style={styles.sectionTitle}>Account</Text>
                    <View style={styles.settingsGroup}>
                        <SettingsOption title="Change Avatar" iconName="user" />
                        <SettingsOption title="Change Nickname" iconName="chevron-right" />
                    </View>

                    <View style={styles.logoutContainer}>
                        <SettingsOption 
                            title="Logout" 
                            iconName="sign-out" 
                            onPress={handleLogout}
                            isLogout={true}
                        />
                    </View>
                </View>
            </SafeAreaView>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#000",
        paddingHorizontal: 15,
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 15,
        paddingVertical: 15,
        borderBottomWidth: 0.2,
        borderBottomColor: "#333",
    },
    searchContainer: {
        flexDirection: "row",
        alignItems: "center",
        flex: 1,
        justifyContent: "space-between",
    },
    searchInput: {
        flex: 1,
        color: "#fff",
        fontSize: 16,
        marginRight: 10,
    },
    headerText: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#fff",
    },
    profileContainer: {
        alignItems: "center",
        marginTop: 20,
        marginBottom: 30,
        backgroundColor: "rgba(203, 255, 0, 0.05)",
        borderRadius: 20,
        padding: 24,
        borderWidth: 1,
        borderColor: "rgba(203, 255, 0, 0.1)",
    },
    avatarContainer: {
        marginBottom: 16,
    },
    avatarCircle: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: "rgba(203, 255, 0, 0.1)",
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 2,
        borderColor: "rgba(203, 255, 0, 0.2)",
    },
    userName: {
        fontSize: 24,
        fontWeight: "600",
        color: "#fff",
        marginBottom: 4,
    },
    userEmail: {
        fontSize: 14,
        color: "#999",
        marginBottom: 20,
    },
    statsContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-around",
        width: "100%",
        paddingTop: 16,
        borderTopWidth: 1,
        borderTopColor: "rgba(203, 255, 0, 0.1)",
    },
    statItem: {
        alignItems: "center",
        flex: 1,
    },
    statNumber: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#CBFF00",
        marginBottom: 4,
    },
    statLabel: {
        fontSize: 12,
        color: "#999",
        textAlign: "center",
    },
    statDivider: {
        width: 1,
        height: 40,
        backgroundColor: "rgba(203, 255, 0, 0.1)",
        marginHorizontal: 16,
    },
    settingsContainer: {
        flex: 1,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: "600",
        color: "#CBFF00",
        marginBottom: 12,
        marginTop: 20,
        paddingHorizontal: 4,
    },
    settingsGroup: {
        backgroundColor: "rgba(203, 255, 0, 0.05)",
        borderRadius: 16,
        marginBottom: 8,
        borderWidth: 1,
        borderColor: "rgba(203, 255, 0, 0.1)",
        overflow: "hidden",
    },
    settingsOption: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 16,
        paddingHorizontal: 16,
        borderBottomWidth: 0.5,
        borderBottomColor: "rgba(203, 255, 0, 0.1)",
    },
    settingsIconContainer: {
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: "rgba(203, 255, 0, 0.1)",
        justifyContent: "center",
        alignItems: "center",
        marginRight: 12,
    },
    logoutIconContainer: {
        backgroundColor: "rgba(255, 82, 82, 0.1)",
    },
    settingsOptionText: {
        fontSize: 16,
        color: "#fff",
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
});
