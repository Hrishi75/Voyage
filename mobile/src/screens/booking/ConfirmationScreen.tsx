import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Text, Button } from '../../components/ui';
import { colors, spacing } from '../../theme';
import type { RootStackParamList } from '../../navigation/types';

type Nav = NativeStackNavigationProp<RootStackParamList, 'BookingConfirmation'>;

export default function ConfirmationScreen() {
  const navigation = useNavigation<Nav>();

  return (
    <View style={styles.container}>
      <View style={styles.checkCircle}>
        <Text style={styles.checkMark}>{'✓'}</Text>
      </View>

      <Text variant="h1" style={styles.title}>Booking Confirmed!</Text>

      <Text variant="body" style={styles.subtitle}>
        Thank you for your inquiry. Our travel experts will contact you within 24 hours to finalize your luxury journey.
      </Text>

      <View style={styles.buttons}>
        <Button
          title="Back to Home"
          onPress={() => navigation.navigate('Tabs', { screen: 'Home', params: { screen: 'HomeScreen' } })}
        />
        <Button
          title="View My Inquiries"
          onPress={() => navigation.navigate('Tabs', { screen: 'Profile', params: { screen: 'Dashboard' } })}
          variant="outline"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.cream,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.xl,
  },
  checkCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.gold,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.xl,
  },
  checkMark: {
    color: colors.white,
    fontSize: 36,
    fontWeight: 'bold',
  },
  title: {
    textAlign: 'center',
    marginBottom: spacing.md,
  },
  subtitle: {
    textAlign: 'center',
    color: colors.slate,
    lineHeight: 24,
    marginBottom: spacing.xl,
  },
  buttons: {
    width: '100%',
    gap: spacing.md,
  },
});
