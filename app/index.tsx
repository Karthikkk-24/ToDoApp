import React, { useEffect } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { useAuth } from '@/contexts/AuthContext';
import { router, useRootNavigationState } from 'expo-router';

export default function Index() {
  const { user, loading } = useAuth();
  const rootNavigationState = useRootNavigationState();

  useEffect(() => {
    // Only navigate once auth is loaded and navigation is ready
    if (!loading && rootNavigationState?.key) {
      const timeoutId = setTimeout(() => {
        if (user) {
          router.replace('/(tabs)');
        } else {
          router.replace('/login');
        }
      }, 100);

      return () => clearTimeout(timeoutId);
    }
  }, [user, loading, rootNavigationState]);

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#CBFF00" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
});
