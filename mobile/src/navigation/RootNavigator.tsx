import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text, StyleSheet } from 'react-native';
import { colors, fonts } from '../theme';
import HomeStack from './HomeStack';
import DestinationsStack from './DestinationsStack';
import PackagesStack from './PackagesStack';
import ProfileStack from './ProfileStack';
import BookingScreen from '../screens/booking/BookingScreen';
import ConfirmationScreen from '../screens/booking/ConfirmationScreen';
import type { TabParamList, RootStackParamList } from './types';

const Tab = createBottomTabNavigator<TabParamList>();
const RootStack = createNativeStackNavigator<RootStackParamList>();

function TabIcon({ label, focused }: { label: string; focused: boolean }) {
  const icons: Record<string, string> = {
    Home: '🏠',
    Destinations: '🌍',
    Packages: '✈️',
    Profile: '👤',
  };
  return (
    <Text style={[styles.tabIcon, focused && styles.tabIconFocused]}>
      {icons[label] || '●'}
    </Text>
  );
}

function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: {
          backgroundColor: colors.white,
          borderTopColor: colors.creamDark,
          height: 60,
          paddingBottom: 8,
          paddingTop: 8,
        },
        tabBarActiveTintColor: colors.gold,
        tabBarInactiveTintColor: colors.slate,
        tabBarLabelStyle: {
          fontFamily: fonts.bodySemiBold,
          fontSize: 11,
        },
        tabBarIcon: ({ focused }) => (
          <TabIcon label={route.name} focused={focused} />
        ),
      })}
    >
      <Tab.Screen name="Home" component={HomeStack} />
      <Tab.Screen name="Destinations" component={DestinationsStack} />
      <Tab.Screen name="Packages" component={PackagesStack} />
      <Tab.Screen name="Profile" component={ProfileStack} />
    </Tab.Navigator>
  );
}

export default function RootNavigator() {
  return (
    <RootStack.Navigator>
      <RootStack.Screen
        name="Tabs"
        component={TabNavigator}
        options={{ headerShown: false }}
      />
      <RootStack.Screen
        name="Booking"
        component={BookingScreen}
        options={{
          presentation: 'modal',
          headerTitle: 'Book Your Trip',
          headerStyle: { backgroundColor: colors.cream },
          headerTintColor: colors.charcoal,
          headerTitleStyle: { fontFamily: fonts.heading, fontSize: 18 },
          headerShadowVisible: false,
        }}
      />
      <RootStack.Screen
        name="BookingConfirmation"
        component={ConfirmationScreen}
        options={{
          headerShown: false,
          presentation: 'modal',
        }}
      />
    </RootStack.Navigator>
  );
}

const styles = StyleSheet.create({
  tabIcon: {
    fontSize: 20,
    opacity: 0.5,
  },
  tabIconFocused: {
    opacity: 1,
  },
});
