// components/AuthGuard.tsx
import React from 'react';
import { View } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import { useValidity } from '../hooks/useValidity';

interface ValidityGuardProps {
  children: React.ReactNode;
}

export const ValidityGuard: React.FC<ValidityGuardProps> = ({ children }) => {
  const { validity } = useValidity();

  // Show loading indicator while checking authentication
  if (validity === null) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#2322F0" />
      </View>
    );
  }

  // Don't render protected content if not authenticated
  // Navigation to Login already happened in the hook
  if (!validity) {
    return null;
  }

  // Render protected content when authenticated
  return <>{children}</>;
};