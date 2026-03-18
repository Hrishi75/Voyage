import React from 'react';
import { View, StyleSheet } from 'react-native';
import Text from './Text';
import { colors, borderRadius, spacing } from '../../theme';

type BadgeStatus = 'pending' | 'contacted' | 'confirmed' | 'cancelled';

interface BadgeProps {
  status: BadgeStatus;
}

const statusLabels: Record<BadgeStatus, string> = {
  pending: 'Pending',
  contacted: 'Contacted',
  confirmed: 'Confirmed',
  cancelled: 'Cancelled',
};

export default function Badge({ status }: BadgeProps) {
  const bgColor = colors.status[status] + '20'; // 20% opacity
  const textColor = colors.status[status];

  return (
    <View style={[styles.badge, { backgroundColor: bgColor }]}>
      <Text variant="caption" color={textColor} style={styles.text}>
        {statusLabels[status]}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.full,
    alignSelf: 'flex-start',
  },
  text: {
    fontWeight: '600',
    fontSize: 11,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
});
