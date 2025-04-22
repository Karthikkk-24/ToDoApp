import { StyleSheet, View, Text, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';

// Component for a single task item
const TaskItem = ({ text }: { text: string }) => {
  return (
    <View style={styles.taskItem}>
      <TouchableOpacity style={styles.taskCheckbox}>
        <View style={styles.checkbox} />
      </TouchableOpacity>
      <Text style={styles.taskText}>{text}</Text>
    </View>
  );
};

// Component for a task section (Today, This week, Upcoming)
const TaskSection = ({ title, tasks }: { title: string, tasks: string[] }) => {
  return (
    <View style={styles.sectionContainer}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>{title} :</Text>
      </View>
      {tasks.map((task, index) => (
        <TaskItem key={index} text={task} />
      ))}
    </View>
  );
};

export default function TasksScreen() {
  // Sample data for the app
  const todayTasks = ['Code Today', 'Post Blogs', 'Post JS content'];
  const weekTasks = ['Finish client project', 'Complete JS course', 'Research about the upcoming AI tools'];
  const upcomingTasks = ['Seek out for higher paying corporate Jobs', 'Increase social media reach'];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      <View style={styles.header}>
        <TouchableOpacity>
          <FontAwesome name="bars" size={24} color="#CBFF00" />
        </TouchableOpacity>
        <TouchableOpacity>
          <FontAwesome name="search" size={24} color="#CBFF00" />
        </TouchableOpacity>
      </View>
      
      <ScrollView style={styles.scrollView}>
        <TaskSection title="Today" tasks={todayTasks} />
        <TaskSection title="This week" tasks={weekTasks} />
        <TaskSection title="Upcoming" tasks={upcomingTasks} />
      </ScrollView>
      
      <TouchableOpacity style={styles.addButton}>
        <FontAwesome name="plus" size={24} color="#000" />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    paddingHorizontal: 15,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 15,
    borderBottomWidth: 0.2,
    borderBottomColor: '#333',
  },
  scrollView: {
    flex: 1,
  },
  sectionContainer: {
    marginTop: 20,
  },
  sectionHeader: {
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#CBFF00',
  },
  taskItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  taskCheckbox: {
    marginRight: 15,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#CBFF00',
  },
  taskText: {
    fontSize: 16,
    color: '#fff',
  },
  addButton: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#CBFF00',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#CBFF00',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
});
