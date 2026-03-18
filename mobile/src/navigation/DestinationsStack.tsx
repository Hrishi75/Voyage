import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { colors, fonts } from '../theme';
import DestinationsScreen from '../screens/destinations/DestinationsScreen';
import DestinationDetailScreen from '../screens/destinations/DestinationDetailScreen';
import PackageDetailScreen from '../screens/packages/PackageDetailScreen';
import type { DestinationsStackParamList } from './types';

const Stack = createNativeStackNavigator<DestinationsStackParamList>();

export default function DestinationsStack() {
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
        name="DestinationsList"
        component={DestinationsScreen}
        options={{ headerTitle: 'Destinations' }}
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
