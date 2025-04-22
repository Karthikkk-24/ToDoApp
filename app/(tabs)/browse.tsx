import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';

// Category item component
const CategoryItem = ({ title, expanded = false }: { title: string, expanded?: boolean }) => {
  return (
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
        </View>
      )}
    </View>
  );
};

// Project item component
const ProjectItem = ({ title }: { title: string }) => {
  return (
    <View style={styles.projectItem}>
      <FontAwesome name="hashtag" size={16} color="#CBFF00" style={styles.projectIcon} />
      <Text style={styles.projectTitle}>{title}</Text>
    </View>
  );
};

export default function BrowseScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      
      <View style={styles.header}>
        <Text style={styles.headerText}>Browse</Text>
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
          
          <CategoryItem title="Javascript" expanded={true} />
          <CategoryItem title="Client Work" />
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>My Projects :</Text>
          
          <ProjectItem title="DSA" />
          <ProjectItem title="Masters Cybersecurity" />
          <ProjectItem title="Autism DB" />
        </View>
      </ScrollView>
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
    paddingVertical: 15,
    borderBottomWidth: 0.2,
    borderBottomColor: '#333',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  scrollView: {
    flex: 1,
  },
  section: {
    marginTop: 25,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#CBFF00',
    marginBottom: 15,
  },
  inboxItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#111',
    borderRadius: 15,
    padding: 15,
    marginBottom: 10,
  },
  inboxText: {
    fontSize: 16,
    color: '#fff',
  },
  completedItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#111',
    borderRadius: 15,
    padding: 15,
  },
  completedText: {
    fontSize: 16,
    color: '#fff',
  },
  categoryItem: {
    backgroundColor: '#111',
    borderRadius: 15,
    marginBottom: 10,
  },
  categoryItemExpanded: {
    marginBottom: 15,
  },
  categoryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
  },
  categoryTitle: {
    fontSize: 16,
    color: '#fff',
  },
  categoryContent: {
    paddingHorizontal: 15,
    paddingBottom: 10,
  },
  projectItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#111',
    borderRadius: 15,
    padding: 15,
    marginBottom: 10,
  },
  projectIcon: {
    marginRight: 10,
  },
  projectTitle: {
    fontSize: 16,
    color: '#fff',
  },
});
