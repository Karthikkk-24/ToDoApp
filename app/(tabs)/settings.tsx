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
            <Text style={[styles.settingsOptionText, isLogout && styles.logoutText]}>{title}</Text>
            <FontAwesome name={iconName} size={18} color={isLogout ? "#ff4757" : "#CBFF00"} />
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
                        <FontAwesome name="user-circle" size={80} color="#CBFF00" />
                    </View>

                    <Text style={styles.userName}>{user?.name || "User"}</Text>

                    <View style={styles.profileInfoContainer}>
                        <Text style={styles.profileLabel}>
                            Nickname : <Text style={styles.profileValue}>{user?.name?.split(' ')[0] || "User"}</Text>
                        </Text>
                        <Text style={styles.profileLabel}>
                            Email ID : <Text style={styles.profileValue}>{user?.email || "user@example.com"}</Text>
                        </Text>
                        <Text style={styles.profileLabel}>
                            Total tasks completed : <Text style={styles.profileValue}>99</Text>
                        </Text>
                    </View>
                </View>

                <View style={styles.settingsContainer}>
                    <SettingsOption title="Notifications" iconName="chevron-right" />
                    <SettingsOption title="Theme" iconName="chevron-right" />
                    <SettingsOption title="Change Avatar" iconName="chevron-right" />
                    <SettingsOption title="Change Nickname" iconName="chevron-right" />
                    <SettingsOption title="Weekly Goal" iconName="chevron-right" />
                    <SettingsOption 
                        title="Logout" 
                        iconName="sign-out" 
                        onPress={handleLogout}
                        isLogout={true}
                    />
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
        marginTop: 30,
        marginBottom: 30,
        backgroundColor: "#111",
        borderRadius: 15,
        padding: 20,
    },
    avatarContainer: {
        marginBottom: 15,
    },
    userName: {
        fontSize: 22,
        fontWeight: "bold",
        color: "#fff",
        marginBottom: 15,
    },
    profileInfoContainer: {
        width: "100%",
        marginTop: 10,
    },
    profileLabel: {
        fontSize: 14,
        color: "#fff",
        marginBottom: 8,
    },
    profileValue: {
        color: "#CBFF00",
        fontWeight: "bold",
    },
    settingsContainer: {
        backgroundColor: "#111",
        borderRadius: 15,
    },
    settingsOption: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: 15,
        paddingHorizontal: 20,
        borderBottomWidth: 0.5,
        borderBottomColor: "#333",
    },
    settingsOptionText: {
        fontSize: 16,
        color: "#fff",
    },
    logoutOption: {
        borderTopWidth: 1,
        borderTopColor: "#333",
        marginTop: 10,
    },
    logoutText: {
        color: "#ff4757",
    },
});
