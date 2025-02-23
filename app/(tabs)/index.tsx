import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { useState } from "react";
import { Pressable, ScrollView, View } from "react-native";

interface TodoItem {
    id: string;
    text: string;
    completed: boolean;
}

interface TodoSection {
    title: string;
    todos: TodoItem[];
}

export default function TodoListScreen() {
    const [sections, setSections] = useState<TodoSection[]>([
        {
            title: "Today",
            todos: [
                { id: "1", text: "Buy groceries", completed: false },
                { id: "2", text: "Call mom", completed: true },
                { id: "3", text: "Send email to client", completed: false },
            ],
        },
        {
            title: "This Week",
            todos: [
                { id: "4", text: "Finish project report", completed: false },
                { id: "5", text: "Team meeting on Thursday", completed: false },
                { id: "6", text: "Review quarterly goals", completed: false },
            ],
        },
        {
            title: "Upcoming",
            todos: [
                { id: "7", text: "Doctor's appointment next Monday", completed: false },
                { id: "8", text: "Vacation planning", completed: false },
                { id: "9", text: "Car maintenance", completed: false },
            ],
        },
    ]);

    const toggleTodo = (sectionIndex: number, todoId: string) => {
        setSections(prevSections => {
            const newSections = [...prevSections];
            const section = newSections[sectionIndex];
            const todoIndex = section.todos.findIndex(todo => todo.id === todoId);
            section.todos[todoIndex].completed = !section.todos[todoIndex].completed;
            return newSections;
        });
    };

    return (
        <ThemedView className="flex-1">
            <ThemedView className="flex-row justify-between items-center px-5 pt-16 pb-5">
                <View>
                    <ThemedText className="text-3xl font-bold">Good Morning,</ThemedText>
                    <ThemedText className="text-3xl font-bold">Karthik</ThemedText>
                </View>
                <Pressable className="p-2">
                    <IconSymbol name="plus" size={24} color="#007AFF" />
                </Pressable>
            </ThemedView>

            <ScrollView className="flex-1">
                {sections.map((section, sectionIndex) => (
                    <ThemedView key={section.title} className="px-5 mb-6">
                        <ThemedText className="text-xl font-semibold mb-3">{section.title}</ThemedText>
                        {section.todos.map(todo => (
                            <Pressable
                                key={todo.id}
                                className="py-3 px-4 bg-gray-100 rounded-xl mb-2"
                                onPress={() => toggleTodo(sectionIndex, todo.id)}
                            >
                                <View className="flex-row items-center">
                                    <View className={`w-6 h-6 rounded-full border-2 border-blue-500 mr-3 items-center justify-center ${todo.completed ? 'bg-blue-500' : ''}`}>
                                        {todo.completed && (
                                            <IconSymbol name="checkmark" size={16} color="white" />
                                        )}
                                    </View>
                                    <ThemedText className={`text-base flex-1 ${todo.completed ? 'line-through text-gray-500' : ''}`}>
                                        {todo.text}
                                    </ThemedText>
                                </View>
                            </Pressable>
                        ))}
                    </ThemedView>
                ))}
            </ScrollView>
        </ThemedView>
    );
}
