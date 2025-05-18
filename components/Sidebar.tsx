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
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type SidebarProps = {
    isOpen: boolean;
    onClose: () => void;
};

const SCREEN_WIDTH = Dimensions.get("window").width;
const SIDEBAR_WIDTH = SCREEN_WIDTH * 0.7;

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
    
    return (
        <View style={[styles.container, { opacity: isOpen ? 1 : 0, pointerEvents: isOpen ? 'auto' : 'none' }]}>
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
                                <FontAwesome name={item.icon} size={20} color="#CBFF00" />
                                <Text style={styles.navigationText}>{item.name}</Text>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                    
                    {/* Logout button at the bottom */}
                    <TouchableOpacity style={styles.logoutButton} onPress={() => console.log("Logout")}>
                        <FontAwesome name="power-off" size={20} color="#FF5252" />
                        <Text style={styles.logoutText}>Logout</Text>
                    </TouchableOpacity>
                </SafeAreaView>
            </Animated.View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 9999,
        elevation: 9999,
    },
    backdrop: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    sidebar: {
        position: "absolute",
        top: 0,
        left: 0,
        bottom: 0,
        width: SIDEBAR_WIDTH,
        backgroundColor: "#111",
        borderRightWidth: 1,
        borderRightColor: "#333",
        zIndex: 9999,
        elevation: 9999,
    },
    sidebarContent: {
        flex: 1,
        paddingVertical: 20,
    },
    header: {
        paddingHorizontal: 20,
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: "#333",
        marginBottom: 20,
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
        paddingVertical: 15,
        paddingHorizontal: 20,
    },
    navigationText: {
        fontSize: 16,
        color: "#fff",
        marginLeft: 15,
    },
    logoutButton: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 15,
        paddingHorizontal: 20,
        borderTopWidth: 1,
        borderTopColor: "#333",
        marginTop: 10,
    },
    logoutText: {
        fontSize: 16,
        color: "#FF5252",
        marginLeft: 15,
    },

});

export default Sidebar;
