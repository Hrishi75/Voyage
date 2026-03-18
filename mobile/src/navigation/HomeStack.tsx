import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { colors, fonts } from '../theme';
import HomeScreen from '../screens/home/HomeScreen';
import DestinationDetailScreen from '../screens/destinations/DestinationDetailScreen';
import PackageDetailScreen from '../screens/packages/PackageDetailScreen';
import type { HomeStackParamList } from './types';

const Stack = createNativeStackNavigator<HomeStackParamList>();

export default function HomeStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: colors.cream },
        headerTintColor: colors.charcoal,
        headerTitleStyle: { fontFamily: fonts.heading, fontSize: 18 },
        headerShadowVisible: false,
      }}
    >
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="DestinationDetail"
        component={DestinationDetailScreen}
        options={{ headerTitle: '' }}
      />
      <Stack.Screen
        name="PackageDetail"
        component={PackageDetailScreen}
        options={{ headerTitle: '' }}
      />
    </Stack.Navigator>
  );
}
