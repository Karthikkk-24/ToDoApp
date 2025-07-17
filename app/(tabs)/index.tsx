import { FontAwesome } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { StatusBar } from "expo-status-bar";
import { useEffect, useRef, useState } from "react";
import {
    Animated,
    Dimensions,
    KeyboardAvoidingView,
    Modal,
    PanResponder,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Sidebar from "../../components/Sidebar";

// Component for a single task item
const TaskItem = ({
    title,
    description,
    onToggle,
    isChecked,
}: {
    title: string;
    description?: string;
    onToggle: () => void;
    isChecked: boolean;
}) => {
    return (
        <View style={styles.taskItem}>
            <TouchableOpacity style={styles.taskCheckbox} onPress={onToggle}>
                <View style={[styles.checkbox, isChecked && styles.checkboxChecked]}>
                    {isChecked && <FontAwesome name="check" size={12} color="#000" />}
                </View>
            </TouchableOpacity>
            <View style={styles.taskContent}>
                <Text style={[styles.taskTitle, isChecked && styles.taskTitleChecked]}>{title}</Text>
                {description && (
                    <Text style={[styles.taskDescription, isChecked && styles.taskDescriptionChecked]}>
                        {description}
                    </Text>
                )}
            </View>
        </View>
    );
};

// Component for a task section (Today, This week, Upcoming)
const TaskSection = ({
    title,
    tasks,
    checkedTasks,
    onToggleTask,
}: {
    title: string;
    tasks: { title: string; description?: string }[];
    checkedTasks: { [key: string]: boolean };
    onToggleTask: (taskId: string) => void;
}) => {
    return (
        <View style={styles.sectionContainer}>
            <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>{title}</Text>
                <View style={styles.sectionDivider} />
            </View>
            {tasks.map((task, index) => {
                const taskId = `${title.toLowerCase()}-${index}`;
                return (
                    <TaskItem
                        key={taskId}
                        title={task.title}
                        description={task.description}
                        isChecked={!!checkedTasks[taskId]}
                        onToggle={() => onToggleTask(taskId)}
                    />
                );
            })}
        </View>
    );
};

// Task priority options
const PRIORITIES = [
    { id: "p1", label: "P1 - Highest", color: "#FF5252" },
    { id: "p2", label: "P2 - High", color: "#FF9800" },
    { id: "p3", label: "P3 - Medium", color: "#FFEB3B" },
    { id: "p4", label: "P4 - Low", color: "#8BC34A" },
];

// Categories/Tags for tasks
const CATEGORIES = ["JavaScript", "Client Work", "Personal", "Learning", "Health"];

// Projects list
const PROJECTS = ["DSA", "Masters Cybersecurity", "Autism DB", "Personal Website"];

// Component for the Add Task Modal
const AddTaskModal = ({
    visible,
    onClose,
    onAddTask,
}: {
    visible: boolean;
    onClose: () => void;
    onAddTask: (task: any) => void;
}) => {
    const [taskText, setTaskText] = useState("");
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState("");
    const [selectedProject, setSelectedProject] = useState("");
    const [selectedPriority, setSelectedPriority] = useState("p4");

    const animatedHeight = useRef(new Animated.Value(0)).current;
    const screenHeight = Dimensions.get("window").height;
    const modalHeight = screenHeight * 0.6; // Adjusted modal height for better usability

    // Make modal scrollable if content exceeds height
    const scrollViewRef = useRef(null);

    // Pan responder for the pull-down gesture
    const panResponder = useRef(
        PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onPanResponderMove: (_, gestureState) => {
                if (gestureState.dy > 0) {
                    // Only react to downward swipes
                    // Follow the finger
                    animatedHeight.setValue(modalHeight - gestureState.dy);
                }
            },
            onPanResponderRelease: (_, gestureState) => {
                if (gestureState.dy > 50) {
                    // If pulled down more than 50px
                    // Close the modal
                    Animated.timing(animatedHeight, {
                        toValue: 0,
                        duration: 250,
                        useNativeDriver: false,
                    }).start(() => onClose());
                } else {
                    // Revert to open position
                    Animated.spring(animatedHeight, {
                        toValue: modalHeight,
                        useNativeDriver: false,
                    }).start();
                }
            },
        })
    ).current;

    useEffect(() => {
        if (visible) {
            // Animate the modal coming up from the bottom
            Animated.timing(animatedHeight, {
                toValue: modalHeight,
                duration: 300,
                useNativeDriver: false,
            }).start();
        } else {
            // Animate the modal going down
            Animated.timing(animatedHeight, {
                toValue: 0,
                duration: 300,
                useNativeDriver: false,
            }).start();
        }
    }, [visible]);

    const handleAddTask = () => {
        if (taskText.trim() === "") return;

        onAddTask({
            text: taskText,
            date: selectedDate,
            category: selectedCategory,
            project: selectedProject,
            priority: selectedPriority,
        });

        // Reset form
        setTaskText("");
        setSelectedDate(new Date());
        setSelectedCategory("");
        setSelectedProject("");
        setSelectedPriority("p4");

        onClose();
    };

    const formatDate = (date: Date) => {
        return date.toLocaleDateString("en-US", {
            weekday: "short",
            month: "short",
            day: "numeric",
        });
    };

    const incrementDate = () => {
        const newDate = new Date(selectedDate);
        newDate.setDate(newDate.getDate() + 1);
        setSelectedDate(newDate);
    };

    const decrementDate = () => {
        const newDate = new Date(selectedDate);
        newDate.setDate(newDate.getDate() - 1);
        setSelectedDate(newDate);
    };

    const onDateChange = (event: any, selectedDate?: Date) => {
        if (Platform.OS === "android") {
            setShowDatePicker(false);
        }
        if (selectedDate) {
            setSelectedDate(selectedDate);
            // On iOS, we need to explicitly close the date picker
            if (Platform.OS === "ios") {
                setShowDatePicker(false);
            }
        }
    };

    return (
        <Modal visible={visible} transparent animationType="none" onRequestClose={onClose}>
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={styles.modalContainer}
            >
                <TouchableOpacity style={styles.modalOverlay} activeOpacity={1} onPress={onClose} />

                <Animated.View
                    style={[styles.modalContent, { height: animatedHeight }]}
                    {...panResponder.panHandlers}
                >
                    <ScrollView
                        ref={scrollViewRef}
                        style={styles.modalScrollView}
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={styles.modalScrollViewContent}
                    >
                        <View style={styles.modalHandle} />

                        <Text style={styles.modalTitle}>Add New Task</Text>

                        <TextInput
                            style={styles.taskInput}
                            placeholder="What do you need to do?"
                            placeholderTextColor="#666"
                            value={taskText}
                            onChangeText={setTaskText}
                            autoFocus
                        />

                        <View style={styles.dateSelector}>
                            <Text style={styles.sectionLabel}>Date:</Text>
                            <TouchableOpacity
                                style={styles.datePickerContainer}
                                onPress={() => setShowDatePicker(true)}
                            >
                                <Text style={styles.dateText}>{formatDate(selectedDate)}</Text>
                                <FontAwesome name="calendar" size={16} color="#CBFF00" />
                            </TouchableOpacity>
                        </View>

                        {showDatePicker && (
                            <DateTimePicker
                                value={selectedDate}
                                mode="date"
                                display={Platform.OS === "ios" ? "spinner" : "default"}
                                onChange={onDateChange}
                                minimumDate={new Date()}
                                themeVariant="dark"
                            />
                        )}

                        <View style={styles.optionSection}>
                            <Text style={styles.sectionLabel}>Category:</Text>
                            <ScrollView
                                horizontal
                                showsHorizontalScrollIndicator={false}
                                style={styles.optionsScrollView}
                            >
                                {CATEGORIES.map((category) => (
                                    <TouchableOpacity
                                        key={category}
                                        style={[
                                            styles.categoryChip,
                                            selectedCategory === category && styles.selectedChip,
                                        ]}
                                        onPress={() => setSelectedCategory(category)}
                                    >
                                        <Text
                                            style={[
                                                styles.categoryChipText,
                                                selectedCategory === category &&
                                                    styles.selectedChipText,
                                            ]}
                                        >
                                            #{category}
                                        </Text>
                                    </TouchableOpacity>
                                ))}
                            </ScrollView>
                        </View>

                        <View style={styles.optionSection}>
                            <Text style={styles.sectionLabel}>Project:</Text>
                            <ScrollView
                                horizontal
                                showsHorizontalScrollIndicator={false}
                                style={styles.optionsScrollView}
                            >
                                {PROJECTS.map((project) => (
                                    <TouchableOpacity
                                        key={project}
                                        style={[
                                            styles.projectChip,
                                            selectedProject === project && styles.selectedChip,
                                        ]}
                                        onPress={() => setSelectedProject(project)}
                                    >
                                        <FontAwesome
                                            name="folder"
                                            size={12}
                                            color={selectedProject === project ? "#000" : "#CBFF00"}
                                            style={styles.chipIcon}
                                        />
                                        <Text
                                            style={[
                                                styles.projectChipText,
                                                selectedProject === project &&
                                                    styles.selectedChipText,
                                            ]}
                                        >
                                            {project}
                                        </Text>
                                    </TouchableOpacity>
                                ))}
                            </ScrollView>
                        </View>

                        <View style={styles.optionSection}>
                            <Text style={styles.sectionLabel}>Priority:</Text>
                            <View style={styles.priorityContainer}>
                                {PRIORITIES.map((priority) => (
                                    <TouchableOpacity
                                        key={priority.id}
                                        style={[
                                            styles.priorityChip,
                                            selectedPriority === priority.id && {
                                                backgroundColor: priority.color,
                                            },
                                        ]}
                                        onPress={() => setSelectedPriority(priority.id)}
                                    >
                                        <Text
                                            style={[
                                                styles.priorityChipText,
                                                selectedPriority === priority.id &&
                                                    styles.selectedPriorityText,
                                            ]}
                                        >
                                            {priority.id.toUpperCase()}
                                        </Text>
                                    </TouchableOpacity>
                                ))}
                            </View>
                        </View>
                    </ScrollView>
                    <TouchableOpacity style={styles.addTaskButton} onPress={handleAddTask}>
                        <Text style={styles.addTaskButtonText}>Add Task</Text>
                    </TouchableOpacity>
                </Animated.View>
            </KeyboardAvoidingView>
        </Modal>
    );
};

export default function TasksScreen() {
    // State for all tasks with titles and descriptions (some without descriptions for comparison)
    const [todayTasks, setTodayTasks] = useState([
        { title: "Review code changes", description: "Go through pull requests and provide feedback on the new authentication system" },
        { title: "Write blog post" }, // No description
        { title: "Team standup meeting", description: "Daily sync with the development team at 10 AM" },
        { title: "Fix critical bug" } // No description
    ]);
    const [weekTasks, setWeekTasks] = useState([
        { title: "Complete project milestone", description: "Finish the user dashboard feature and prepare for demo" },
        { title: "Learn TypeScript advanced patterns" }, // No description
        { title: "Client presentation", description: "Present the new mobile app features to stakeholders" },
        { title: "Code refactoring" } // No description
    ]);
    const [upcomingTasks, setUpcomingTasks] = useState([
        { title: "Plan Q4 roadmap", description: "Define priorities and features for the next quarter" },
        { title: "Attend tech conference" }, // No description
        { title: "Performance optimization", description: "Analyze and improve app loading times and memory usage" }
    ]);

    // State for search functionality
    const [isSearchActive, setIsSearchActive] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState<{
        today: { title: string; description?: string }[];
        week: { title: string; description?: string }[];
        upcoming: { title: string; description?: string }[];
    }>({
        today: [],
        week: [],
        upcoming: [],
    });

    // State for sidebar
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    // Define state for managing the modal visibility and form data
    const [modalVisible, setModalVisible] = useState(false);

    // State to track checked tasks
    const [checkedTasks, setCheckedTasks] = useState<{ [key: string]: boolean }>({});

    // Function to toggle task completion state
    const toggleTask = (taskId: string) => {
        setCheckedTasks((prev) => ({
            ...prev,
            [taskId]: !prev[taskId],
        }));
    };

    // Function to handle search
    const handleSearch = (text: string) => {
        setSearchQuery(text);

        if (text.trim() === "") {
            // Clear search results when query is empty
            setSearchResults({ today: [], week: [], upcoming: [] });
            return;
        }

        // Filter tasks based on search query (search in both title and description)
        const filteredToday = todayTasks.filter((task) =>
            task.title.toLowerCase().includes(text.toLowerCase()) ||
            (task.description && task.description.toLowerCase().includes(text.toLowerCase()))
        );

        const filteredWeek = weekTasks.filter((task) =>
            task.title.toLowerCase().includes(text.toLowerCase()) ||
            (task.description && task.description.toLowerCase().includes(text.toLowerCase()))
        );

        const filteredUpcoming = upcomingTasks.filter((task) =>
            task.title.toLowerCase().includes(text.toLowerCase()) ||
            (task.description && task.description.toLowerCase().includes(text.toLowerCase()))
        );

        setSearchResults({
            today: filteredToday,
            week: filteredWeek,
            upcoming: filteredUpcoming,
        });
    };

    // Toggle search mode
    const toggleSearch = () => {
        setIsSearchActive(!isSearchActive);
        if (isSearchActive) {
            // Clear search when closing
            setSearchQuery("");
            setSearchResults({ today: [], week: [], upcoming: [] });
        }
    };

    // Function to add a new task
    const addTask = (task: any) => {
        const today = new Date();
        const oneWeekFromNow = new Date();
        oneWeekFromNow.setDate(today.getDate() + 7);

        // Determine which list to add the task to based on the date
        if (task.date.getTime() === today.setHours(0, 0, 0, 0)) {
            setTodayTasks([...todayTasks, task.text]);
        } else if (task.date >= today && task.date <= oneWeekFromNow) {
            setWeekTasks([...weekTasks, task.text]);
        } else {
            setUpcomingTasks([...upcomingTasks, task.text]);
        }
    };

    return (
        <>
            <SafeAreaView style={styles.container}>
                <StatusBar style="light" />
                <View style={styles.header}>
                    {isSearchActive ? (
                        <View style={styles.searchContainer}>
                            <TextInput
                                style={styles.searchInput}
                                placeholder="Search tasks..."
                                placeholderTextColor="#666"
                                value={searchQuery}
                                onChangeText={handleSearch}
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
                            <TouchableOpacity onPress={toggleSearch}>
                                <FontAwesome name="search" size={24} color="#CBFF00" />
                            </TouchableOpacity>
                        </>
                    )}
                </View>

            <ScrollView style={styles.scrollView}>
                {isSearchActive && searchQuery.trim() !== "" ? (
                    // Show search results
                    <>
                        {searchResults.today.length === 0 &&
                        searchResults.week.length === 0 &&
                        searchResults.upcoming.length === 0 ? (
                            <View style={styles.noResultsContainer}>
                                <Text style={styles.noResultsText}>No matches found</Text>
                            </View>
                        ) : (
                            <>
                                {searchResults.today.length > 0 && (
                                    <TaskSection
                                        title="Today"
                                        tasks={searchResults.today}
                                        checkedTasks={checkedTasks}
                                        onToggleTask={toggleTask}
                                    />
                                )}
                                {searchResults.week.length > 0 && (
                                    <TaskSection
                                        title="This week"
                                        tasks={searchResults.week}
                                        checkedTasks={checkedTasks}
                                        onToggleTask={toggleTask}
                                    />
                                )}
                                {searchResults.upcoming.length > 0 && (
                                    <TaskSection
                                        title="Upcoming"
                                        tasks={searchResults.upcoming}
                                        checkedTasks={checkedTasks}
                                        onToggleTask={toggleTask}
                                    />
                                )}
                            </>
                        )}
                    </>
                ) : (
                    // Show normal task lists
                    <>
                        <TaskSection
                            title="Today"
                            tasks={todayTasks}
                            checkedTasks={checkedTasks}
                            onToggleTask={toggleTask}
                        />
                        <TaskSection
                            title="This week"
                            tasks={weekTasks}
                            checkedTasks={checkedTasks}
                            onToggleTask={toggleTask}
                        />
                        <TaskSection
                            title="Upcoming"
                            tasks={upcomingTasks}
                            checkedTasks={checkedTasks}
                            onToggleTask={toggleTask}
                        />
                    </>
                )}
            </ScrollView>

            <TouchableOpacity style={styles.addButton} onPress={() => setModalVisible(true)}>
                <FontAwesome name="plus" size={24} color="#000" />
            </TouchableOpacity>

            <AddTaskModal
                visible={modalVisible}
                onClose={() => setModalVisible(false)}
                onAddTask={addTask}
            />
        </SafeAreaView>
            
            {/* Render Sidebar last to ensure it's on top of everything */}
            <Sidebar 
                isOpen={isSidebarOpen} 
                onClose={() => setIsSidebarOpen(false)} 
            />
        </>
    );
}

const styles = StyleSheet.create({
    searchContainer: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "rgba(255, 255, 255, 0.05)",
        borderRadius: 12,
        flex: 1,
        paddingLeft: 12,
        paddingRight: 8,
        borderWidth: 1,
        borderColor: "rgba(203, 255, 0, 0.2)",
    },
    searchInput: {
        flex: 1,
        height: 44,
        color: "#fff",
        fontSize: 15,
        padding: 8,
    },
    noResultsContainer: {
        padding: 40,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 20,
    },
    noResultsText: {
        color: "rgba(255, 255, 255, 0.5)",
        fontSize: 15,
        fontWeight: "500",
    },
    modalScrollView: {
        flex: 1,
        width: "100%",
    },
    modalScrollViewContent: {
        paddingBottom: 20,
    },

    // Modal styles
    modalContainer: {
        flex: 1,
        justifyContent: "flex-end",
    },
    modalOverlay: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    modalContent: {
        backgroundColor: "#111",
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: 20,
        paddingBottom: 10,
        width: "100%",
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,
        elevation: 6,
    },
    modalHandle: {
        width: 40,
        height: 5,
        backgroundColor: "#333",
        borderRadius: 3,
        alignSelf: "center",
        marginBottom: 15,
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#CBFF00",
        marginBottom: 15,
    },
    taskInput: {
        backgroundColor: "#222",
        borderRadius: 8,
        color: "#fff",
        padding: 12,
        marginVertical: 10,
        fontSize: 16,
    },
    dateSelector: {
        marginVertical: 10,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    sectionLabel: {
        fontSize: 14,
        fontWeight: "bold",
        color: "#fff",
        marginRight: 10,
        width: 70,
    },
    datePickerContainer: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: "#222",
        borderRadius: 10,
        paddingHorizontal: 15,
        paddingVertical: 10,
    },
    dateText: {
        fontSize: 14,
        color: "#fff",
    },
    optionSection: {
        marginTop: 12,
        marginBottom: 0,
        flexDirection: "row",
        alignItems: "center",
    },
    optionsScrollView: {
        marginTop: 10,
        paddingBottom: 5,
    },
    categoryChip: {
        backgroundColor: "#222",
        borderRadius: 15,
        paddingHorizontal: 10,
        paddingVertical: 5,
        marginRight: 8,
    },
    categoryChipText: {
        color: "#CBFF00",
        fontSize: 12,
    },
    projectChip: {
        backgroundColor: "#222",
        borderRadius: 15,
        paddingHorizontal: 10,
        paddingVertical: 5,
        marginRight: 8,
        flexDirection: "row",
        alignItems: "center",
    },
    chipIcon: {
        marginRight: 5,
    },
    projectChipText: {
        color: "#CBFF00",
        fontSize: 12,
    },
    selectedChip: {
        backgroundColor: "#CBFF00",
    },
    selectedChipText: {
        color: "#000",
    },
    priorityContainer: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
    },
    priorityChip: {
        backgroundColor: "#222",
        borderRadius: 15,
        paddingHorizontal: 10,
        paddingVertical: 5,
        marginRight: 8,
    },
    priorityChipText: {
        color: "#fff",
        fontSize: 12,
        fontWeight: "bold",
    },
    selectedPriorityText: {
        color: "#000",
    },
    addTaskButton: {
        backgroundColor: "#CBFF00",
        paddingVertical: 12,
        borderRadius: 8,
        alignItems: "center",
        marginTop: 15,
        marginBottom: 5,
    },
    addTaskButtonText: {
        color: "#000",
        fontSize: 16,
        fontWeight: "bold",
    },
    container: {
        flex: 1,
        backgroundColor: "#000",
        paddingHorizontal: 15,
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: 20,
        paddingHorizontal: 4,
        borderBottomWidth: 1,
        borderBottomColor: "rgba(203, 255, 0, 0.1)",
    },
    scrollView: {
        flex: 1,
    },
    sectionContainer: {
        marginTop: 25,
        marginBottom: 10,
    },
    sectionHeader: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 20,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: "600",
        color: "#CBFF00",
        marginRight: 12,
    },
    sectionDivider: {
        flex: 1,
        height: 1,
        backgroundColor: "rgba(203, 255, 0, 0.2)",
    },
    taskItem: {
        flexDirection: "row",
        alignItems: "flex-start",
        marginBottom: 18,
        paddingHorizontal: 4,
        paddingVertical: 8,
        borderRadius: 12,
        backgroundColor: "rgba(255, 255, 255, 0.02)",
    },
    taskCheckbox: {
        marginRight: 12,
        marginTop: 2,
    },
    checkbox: {
        width: 18,
        height: 18,
        borderRadius: 9,
        borderWidth: 1.5,
        borderColor: "#CBFF00",
        alignItems: "center",
        justifyContent: "center",
    },
    checkboxChecked: {
        backgroundColor: "#CBFF00",
        borderColor: "#CBFF00",
    },
    taskContent: {
        flex: 1,
    },
    taskTitle: {
        fontSize: 15,
        fontWeight: "500",
        color: "#fff",
        lineHeight: 20,
    },
    taskTitleChecked: {
        color: "#777",
        textDecorationLine: "line-through",
    },
    taskDescription: {
        fontSize: 13,
        color: "rgba(255, 255, 255, 0.7)",
        marginTop: 4,
        lineHeight: 18,
    },
    taskDescriptionChecked: {
        color: "rgba(119, 119, 119, 0.8)",
        textDecorationLine: "line-through",
    },
    taskText: {
        fontSize: 16,
        color: "#fff",
    },
    taskTextChecked: {
        color: "#777",
        textDecorationLine: "line-through",
    },
    addButton: {
        position: "absolute",
        bottom: 35,
        right: 25,
        width: 56,
        height: 56,
        borderRadius: 28,
        backgroundColor: "#CBFF00",
        justifyContent: "center",
        alignItems: "center",
        elevation: 8,
        shadowColor: "#CBFF00",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.25,
        shadowRadius: 8,
    },
});
