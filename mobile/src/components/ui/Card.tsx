import React from 'react';
import { View, ViewProps, StyleSheet } from 'react-native';
import { colors, borderRadius, spacing } from '../../theme';

interface CardProps extends ViewProps {
  padded?: boolean;
}

export default function Card({ padded = true, style, children, ...props }: CardProps) {
  return (
    <View style={[styles.card, padded && styles.padded, style]} {...props}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.lg,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  padded: {
    padding: spacing.md,
  },
});
