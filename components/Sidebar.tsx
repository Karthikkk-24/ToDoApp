import { FontAwesome } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import {
    Animated,
    Dimensions,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Portal } from 'react-native-portalize';

type SidebarProps = {
    isOpen: boolean;
    onClose: () => void;
};

const SCREEN_WIDTH = Dimensions.get("window").width;
const SIDEBAR_WIDTH = SCREEN_WIDTH * 0.7;

// Create a portal for the sidebar to ensure it renders at the root level
const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
    
    // Animation value for the sidebar
    const [animation] = React.useState(new Animated.Value(0));
    
    React.useEffect(() => {
        Animated.timing(animation, {
            toValue: isOpen ? 1 : 0,
            duration: 300,
            useNativeDriver: true,
        }).start();
    }, [isOpen]);
    
    // Calculate the translateX for the sidebar
    const translateX = animation.interpolate({
        inputRange: [0, 1],
        outputRange: [-SIDEBAR_WIDTH, 0],
    });
    
    // Handle navigation
    const navigateTo = (route: "/(tabs)" | "/(tabs)/browse" | "/(tabs)/settings") => {
        onClose();
        router.push(route);
    };
    
    // Navigation items with icons and routes
    const navigationItems = [
        { name: "Home", icon: "home" as const, route: "/(tabs)" as const },
        { name: "Browse", icon: "list" as const, route: "/(tabs)/browse" as const },
        { name: "Profile", icon: "user" as const, route: "/(tabs)/settings" as const },
        { name: "Settings", icon: "cog" as const, route: "/(tabs)/settings" as const },
    ];
    
    // Don't return null when closed, just make it invisible
    // This ensures animations work properly
    
    if (!isOpen) return null; // Force the sidebar to unmount when not visible
    
    return (
        <Portal>
            <View style={styles.container}>
            {/* Backdrop - closes sidebar when clicked */}
            <TouchableOpacity style={styles.backdrop} onPress={onClose} activeOpacity={1} />
            
            {/* Sidebar content */}
            <Animated.View style={[styles.sidebar, { transform: [{ translateX }] }]}>
                <SafeAreaView style={styles.sidebarContent}>
                    {/* Header */}
                    <View style={styles.header}>
                        <Text style={styles.appName}>ZenTodo</Text>
                    </View>
                    
                    {/* Navigation links */}
                    <ScrollView style={styles.navigationContainer}>
                        {navigationItems.map((item) => (
                            <TouchableOpacity
                                key={item.name}
                                style={styles.navigationItem}
                                onPress={() => navigateTo(item.route)}
                            >
                                <View style={styles.iconContainer}>
                                    <FontAwesome name={item.icon} size={18} color="#CBFF00" />
                                </View>
                                <Text style={styles.navigationText}>{item.name}</Text>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                    
                    {/* Logout button at the bottom */}
                    <TouchableOpacity style={styles.logoutButton} onPress={() => console.log("Logout")}>
                        <View style={styles.logoutIconContainer}>
                            <FontAwesome name="power-off" size={18} color="#FF5252" />
                        </View>
                        <Text style={styles.logoutText}>Logout</Text>
                    </TouchableOpacity>
                </SafeAreaView>
            </Animated.View>
            </View>
        </Portal>
    );
};

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        width: '100%',
        height: '100%',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        // Extreme z-index values to force it on top of everything
        zIndex: 999999,
        elevation: 999999,
    },
    backdrop: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: '100%',
        height: '100%',
        backgroundColor: "rgba(0, 0, 0, 0.7)", // Slightly darker for better visibility
        zIndex: 999998,
        elevation: 999998,
    },
    sidebar: {
        position: "absolute",
        top: 0,
        left: 0,
        bottom: 0,
        width: SIDEBAR_WIDTH,
        backgroundColor: "#0F0F0F",
        borderRightWidth: 1,
        borderRightColor: "rgba(203, 255, 0, 0.1)",
        zIndex: 999999,
        elevation: 999999,
        shadowColor: "#000",
        shadowOffset: { width: 2, height: 0 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
    },
    sidebarContent: {
        flex: 1,
        paddingVertical: 20,
    },
    header: {
        paddingHorizontal: 20,
        paddingVertical: 20,
        borderBottomWidth: 1,
        borderBottomColor: "rgba(203, 255, 0, 0.1)",
        marginBottom: 20,
        backgroundColor: "rgba(203, 255, 0, 0.03)",
    },
    appName: {
        fontSize: 22,
        fontWeight: "bold",
        color: "#CBFF00",
    },
    navigationContainer: {
        flex: 1,
    },
    navigationItem: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 12,
        paddingHorizontal: 20,
        marginHorizontal: 10,
        marginVertical: 4,
        backgroundColor: "rgba(203, 255, 0, 0.08)",
        borderRadius: 16,
        borderWidth: 1,
        borderColor: "rgba(203, 255, 0, 0.15)",
    },
    navigationText: {
        fontSize: 16,
        color: "#fff",
        fontWeight: "500",
    },
    logoutButton: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 12,
        paddingHorizontal: 20,
        marginHorizontal: 10,
        marginTop: 10,
        backgroundColor: "rgba(255, 82, 82, 0.08)",
        borderRadius: 16,
        borderWidth: 1,
        borderColor: "rgba(255, 82, 82, 0.15)",
    },
    logoutText: {
        fontSize: 16,
        color: "#FF5252",
        marginLeft: 15,
        fontWeight: "500",
    },
    iconContainer: {
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: "rgba(203, 255, 0, 0.12)",
        alignItems: "center",
        justifyContent: "center",
        marginRight: 15,
    },
    logoutIconContainer: {
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: "rgba(255, 82, 82, 0.12)",
        alignItems: "center",
        justifyContent: "center",
        marginRight: 15,
    },

});

export default Sidebar;
