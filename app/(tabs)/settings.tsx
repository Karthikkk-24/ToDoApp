import React, { useState } from "react";
import {
    Image,
    Platform,
    StyleSheet,
    Switch,
    TouchableOpacity,
    View,
} from "react-native";

import { Collapsible } from "@/components/Collapsible";
import { ExternalLink } from "@/components/ExternalLink";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { IconSymbol } from "@/components/ui/IconSymbol";

export default function SettingsScreen() {
    // State for various settings
    const [darkMode, setDarkMode] = useState(false);
    const [notificationsEnabled, setNotificationsEnabled] = useState(true);
    const [offlineModeEnabled, setOfflineModeEnabled] = useState(false);

    return (
        <ParallaxScrollView
            headerBackgroundColor={{ light: "#D0D0D0", dark: "#353636" }}
            headerImage={
                <IconSymbol
                    size={310}
                    color="#808080"
                    name="settings"
                    style={styles.headerImage}
                />
            }
        >
            <ThemedView style={styles.titleContainer}>
                <ThemedText type="title">Budget Buddy Settings</ThemedText>
            </ThemedView>
            <ThemedText>
                Manage your financial app preferences and customize your
                experience.
            </ThemedText>

            <Collapsible title="Account Management">
                <View style={styles.settingRow}>
                    <ThemedText>Manage Profile</ThemedText>
                    <TouchableOpacity
                        onPress={() => {
                            /* Navigate to profile management */
                        }}
                    >
                        <ThemedText type="link">Edit Profile</ThemedText>
                    </TouchableOpacity>
                </View>
                <View style={styles.settingRow}>
                    <ThemedText>Change Password</ThemedText>
                    <TouchableOpacity
                        onPress={() => {
                            /* Navigate to password change */
                        }}
                    >
                        <ThemedText type="link">Reset</ThemedText>
                    </TouchableOpacity>
                </View>
            </Collapsible>

            <Collapsible title="Notifications">
                <View style={styles.settingRow}>
                    <ThemedText>Enable Notifications</ThemedText>
                    <Switch
                        value={notificationsEnabled}
                        onValueChange={setNotificationsEnabled}
                    />
                </View>
                <ThemedText style={styles.settingDescription}>
                    Receive alerts for bill reminders, budget overruns, and
                    savings goals.
                </ThemedText>
                <TouchableOpacity
                    onPress={() => {
                        /* Navigate to detailed notification settings */
                    }}
                >
                    <ThemedText type="link">
                        Customize Notification Preferences
                    </ThemedText>
                </TouchableOpacity>
            </Collapsible>

            <Collapsible title="Display & Appearance">
                <View style={styles.settingRow}>
                    <ThemedText>Dark Mode</ThemedText>
                    <Switch value={darkMode} onValueChange={setDarkMode} />
                </View>
                <View style={styles.settingRow}>
                    <ThemedText>Currency Preference</ThemedText>
                    <TouchableOpacity
                        onPress={() => {
                            /* Open currency selection */
                        }}
                    >
                        <ThemedText type="link">USD ($)</ThemedText>
                    </TouchableOpacity>
                </View>
            </Collapsible>

            <Collapsible title="Data Management">
                <View style={styles.settingRow}>
                    <ThemedText>Offline Mode</ThemedText>
                    <Switch
                        value={offlineModeEnabled}
                        onValueChange={setOfflineModeEnabled}
                    />
                </View>
                <ThemedText style={styles.settingDescription}>
                    Add expenses offline and sync when internet is available.
                </ThemedText>
                <View style={styles.settingRow}>
                    <ThemedText>Export Data</ThemedText>
                    <TouchableOpacity
                        onPress={() => {
                            /* Trigger data export */
                        }}
                    >
                        <ThemedText type="link">Export to CSV/PDF</ThemedText>
                    </TouchableOpacity>
                </View>
                <View style={styles.settingRow}>
                    <ThemedText>Cloud Backup</ThemedText>
                    <TouchableOpacity
                        onPress={() => {
                            /* Trigger cloud backup */
                        }}
                    >
                        <ThemedText type="link">Backup Now</ThemedText>
                    </TouchableOpacity>
                </View>
            </Collapsible>

            <Collapsible title="Categories Management">
                <TouchableOpacity
                    onPress={() => {
                        /* Navigate to category management */
                    }}
                >
                    <ThemedText type="link">
                        Manage Income & Expense Categories
                    </ThemedText>
                </TouchableOpacity>
            </Collapsible>

            <Collapsible title="About Budget Buddy">
                <ThemedText>
                    App Version:{" "}
                    <ThemedText type="defaultSemiBold">1.0.0</ThemedText>
                </ThemedText>
                <ThemedText>
                    Platform:{" "}
                    <ThemedText type="defaultSemiBold">
                        {Platform.OS}
                    </ThemedText>
                </ThemedText>
                <TouchableOpacity
                    onPress={() => {
                        /* Open changelog or whats new */
                    }}
                >
                    <ThemedText type="link">What's New</ThemedText>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => {
                        /* Open support or feedback */
                    }}
                >
                    <ThemedText type="link">Send Feedback</ThemedText>
                </TouchableOpacity>
            </Collapsible>
        </ParallaxScrollView>
    );
}

const styles = StyleSheet.create({
    headerImage: {
        color: "#808080",
        bottom: -90,  
        left: -35,
        position: "absolute",
    },
    titleContainer: {
        flexDirection: "row",
        gap: 8,
    },
    settingRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginVertical: 8,
    },
    settingDescription: {
        fontSize: 12,
        color: "#888",
        marginBottom: 8,
    },
});
