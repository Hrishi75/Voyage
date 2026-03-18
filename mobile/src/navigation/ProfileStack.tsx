import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { colors, fonts } from '../theme';
import DashboardScreen from '../screens/profile/DashboardScreen';
import LoginScreen from '../screens/auth/LoginScreen';
import SignupScreen from '../screens/auth/SignupScreen';
import { useAuthStore } from '../stores/authStore';
import type { ProfileStackParamList } from './types';

const Stack = createNativeStackNavigator<ProfileStackParamList>();

export default function ProfileStack() {
  const token = useAuthStore((s) => s.token);

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: colors.cream },
        headerTintColor: colors.charcoal,
        headerTitleStyle: { fontFamily: fonts.heading, fontSize: 18 },
        headerShadowVisible: false,
      }}
    >
      {token ? (
        <Stack.Screen
          name="Dashboard"
          component={DashboardScreen}
          options={{ headerTitle: 'My Dashboard' }}
        />
      ) : (
        <>
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{ headerTitle: 'Sign In' }}
          />
          <Stack.Screen
            name="Signup"
            component={SignupScreen}
            options={{ headerTitle: 'Create Account' }}
          />
        </>
      )}
    </Stack.Navigator>
  );
}
