import { FontAwesome } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Sidebar from "../../components/Sidebar";

// Category item component
const CategoryItem = ({ title, expanded = false, onToggle }: { title: string; expanded?: boolean; onToggle: () => void }) => {
    return (
        <TouchableOpacity onPress={onToggle}>
            <View style={[styles.categoryItem, expanded && styles.categoryItemExpanded]}>
                <View style={styles.categoryHeader}>
                    <Text style={styles.categoryTitle}>{title}</Text>
                    <FontAwesome
                        name={expanded ? "chevron-down" : "chevron-right"}
                        size={16}
                        color="#CBFF00"
                    />
                </View>
                {expanded && (
                    <View style={styles.categoryContent}>
                        {/* This would be populated with actual category items in a real app */}
                        <Text style={styles.categoryContentText}>No items in this category yet</Text>
                    </View>
                )}
            </View>
        </TouchableOpacity>
    );
};

// Project item component
const ProjectItem = ({ title, expanded = false, onToggle }: { title: string; expanded?: boolean; onToggle: () => void }) => {
    return (
        <TouchableOpacity onPress={onToggle}>
            <View style={[styles.projectItem, expanded && styles.projectItemExpanded]}>
                <View style={styles.projectHeader}>
                    <FontAwesome name="hashtag" size={16} color="#CBFF00" style={styles.projectIcon} />
                    <Text style={styles.projectTitle}>{title}</Text>
                </View>
                {expanded && (
                    <View style={styles.projectContent}>
                        <Text style={styles.projectContentText}>No tasks in this project yet</Text>
                    </View>
                )}
            </View>
        </TouchableOpacity>
    );
};

export default function BrowseScreen() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isSearchActive, setIsSearchActive] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [expandedCategories, setExpandedCategories] = useState<{[key: string]: boolean}>({});
    const [expandedProjects, setExpandedProjects] = useState<{[key: string]: boolean}>({});

    // Toggle search mode
    const toggleSearch = () => {
        setIsSearchActive(!isSearchActive);
        if (isSearchActive) {
            setSearchQuery("");
        }
    };

    // Toggle category expansion
    const toggleCategory = (categoryName: string) => {
        setExpandedCategories(prev => ({
            ...prev,
            [categoryName]: !prev[categoryName]
        }));
    };

    // Toggle project expansion
    const toggleProject = (projectName: string) => {
        setExpandedProjects(prev => ({
            ...prev,
            [projectName]: !prev[projectName]
        }));
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
                                placeholder="Search..."
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
                            <Text style={styles.headerText}>ZenBrowse</Text>
                            <TouchableOpacity onPress={toggleSearch}>
                                <FontAwesome name="search" size={24} color="#CBFF00" />
                            </TouchableOpacity>
                        </>
                    )}
                </View>

                <ScrollView style={styles.scrollView}>
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Tasks :</Text>

                        <TouchableOpacity style={styles.inboxItem}>
                            <Text style={styles.inboxText}>Inbox</Text>
                            <FontAwesome name="plus" size={16} color="#CBFF00" />
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.completedItem}>
                            <Text style={styles.completedText}>Completed Tasks</Text>
                            <FontAwesome name="chevron-right" size={16} color="#CBFF00" />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Tags :</Text>

                        <CategoryItem 
                            title="Javascript" 
                            expanded={expandedCategories['Javascript'] || false}
                            onToggle={() => toggleCategory('Javascript')}
                        />
                        <CategoryItem 
                            title="Client Work" 
                            expanded={expandedCategories['Client Work'] || false}
                            onToggle={() => toggleCategory('Client Work')}
                        />
                    </View>

                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>My Projects :</Text>

                        <ProjectItem 
                            title="DSA" 
                            expanded={expandedProjects['DSA'] || false}
                            onToggle={() => toggleProject('DSA')}
                        />
                        <ProjectItem 
                            title="Masters Cybersecurity" 
                            expanded={expandedProjects['Masters Cybersecurity'] || false}
                            onToggle={() => toggleProject('Masters Cybersecurity')}
                        />
                        <ProjectItem 
                            title="Autism DB" 
                            expanded={expandedProjects['Autism DB'] || false}
                            onToggle={() => toggleProject('Autism DB')}
                        />
                    </View>
                </ScrollView>
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
    scrollView: {
        flex: 1,
    },
    section: {
        marginTop: 25,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#CBFF00",
        marginBottom: 15,
    },
    inboxItem: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "rgba(203, 255, 0, 0.08)",
        borderRadius: 16,
        borderWidth: 1,
        borderColor: "rgba(203, 255, 0, 0.15)",
        padding: 16,
        marginBottom: 10,
    },
    inboxText: {
        fontSize: 16,
        color: "#fff",
        fontWeight: "500",
    },
    completedItem: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "rgba(203, 255, 0, 0.08)",
        borderRadius: 16,
        borderWidth: 1,
        borderColor: "rgba(203, 255, 0, 0.15)",
        padding: 16,
    },
    completedText: {
        fontSize: 16,
        color: "#fff",
        fontWeight: "500",
    },
    categoryItem: {
        backgroundColor: "rgba(203, 255, 0, 0.08)",
        borderRadius: 16,
        borderWidth: 1,
        borderColor: "rgba(203, 255, 0, 0.15)",
        marginBottom: 10,
    },
    categoryItemExpanded: {
        marginBottom: 15,
    },
    categoryHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 16,
    },
    categoryTitle: {
        fontSize: 16,
        color: "#fff",
        fontWeight: "500",
    },
    categoryContent: {
        paddingHorizontal: 16,
        paddingBottom: 12,
    },
    categoryContentText: {
        fontSize: 14,
        color: "rgba(255, 255, 255, 0.6)",
        fontStyle: "italic",
    },
    projectItem: {
        backgroundColor: "rgba(203, 255, 0, 0.08)",
        borderRadius: 16,
        borderWidth: 1,
        borderColor: "rgba(203, 255, 0, 0.15)",
        marginBottom: 10,
    },
    projectItemExpanded: {
        marginBottom: 15,
    },
    projectHeader: {
        flexDirection: "row",
        alignItems: "center",
        padding: 16,
    },
    projectContent: {
        paddingHorizontal: 16,
        paddingBottom: 12,
    },
    projectContentText: {
        fontSize: 14,
        color: "rgba(255, 255, 255, 0.6)",
        fontStyle: "italic",
    },
    projectIcon: {
        marginRight: 12,
        width: 20,
        textAlign: "center",
    },
    projectTitle: {
        fontSize: 16,
        color: "#fff",
        fontWeight: "500",
    },
});
