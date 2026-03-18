import React from 'react';
import { View, StyleSheet } from 'react-native';
import { colors, spacing } from '../../theme';

interface StepIndicatorProps {
  totalSteps: number;
  currentStep: number;
}

export default function StepIndicator({ totalSteps, currentStep }: StepIndicatorProps) {
  return (
    <View style={styles.container}>
      {Array.from({ length: totalSteps }).map((_, i) => (
        <View
          key={i}
          style={[
            styles.dot,
            i <= currentStep ? styles.active : styles.inactive,
            i < totalSteps - 1 && styles.marginRight,
          ]}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.md,
  },
  dot: {
    height: 8,
    borderRadius: 4,
  },
  active: {
    width: 24,
    backgroundColor: colors.gold,
  },
  inactive: {
    width: 8,
    backgroundColor: colors.creamDark,
  },
  marginRight: {
    marginRight: spacing.sm,
  },
});
