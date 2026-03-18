import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { colors, fonts } from '../theme';
import PackagesScreen from '../screens/packages/PackagesScreen';
import PackageDetailScreen from '../screens/packages/PackageDetailScreen';
import type { PackagesStackParamList } from './types';

const Stack = createNativeStackNavigator<PackagesStackParamList>();

export default function PackagesStack() {
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
        name="PackagesList"
        component={PackagesScreen}
        options={{ headerTitle: 'Packages' }}
      />
      <Stack.Screen
        name="PackageDetail"
        component={PackageDetailScreen}
        options={{ headerTitle: '' }}
      />
    </Stack.Navigator>
  );
}
