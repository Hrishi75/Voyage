import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Card } from '../ui';
import { Tier } from '../../types';
import { colors, spacing } from '../../theme';

interface TierCardProps {
  tier: Tier;
}

const tierLabels: Record<string, string> = {
  deluxe: 'Deluxe',
  luxury: 'Luxury',
  'ultra-luxury': 'Ultra Luxury',
};

export default function TierCard({ tier }: TierCardProps) {
  return (
    <Card style={styles.card}>
      <Text variant="h3" color={colors.gold} style={styles.tierName}>
        {tierLabels[tier.name] || tier.name}
      </Text>

      <View style={styles.priceRow}>
        <Text variant="h2">{'\u20B9'}{tier.price.toLocaleString('en-IN')}</Text>
        <Text variant="caption"> / {tier.priceLabel}</Text>
      </View>

      <View style={styles.detailRow}>
        <Text variant="label">Hotel</Text>
        <Text variant="bodySmall">{tier.hotel}</Text>
      </View>

      <View style={styles.detailRow}>
        <Text variant="label">Meals</Text>
        <Text variant="bodySmall">{tier.meals}</Text>
      </View>

      <View style={styles.detailRow}>
        <Text variant="label">Transport</Text>
        <Text variant="bodySmall">{tier.transport}</Text>
      </View>

      <View style={styles.inclusionsSection}>
        <Text variant="label" style={styles.inclusionsTitle}>Inclusions</Text>
        {tier.inclusions.map((item, i) => (
          <View key={i} style={styles.inclusionRow}>
            <Text variant="bodySmall" color={colors.gold}>{'✓ '}</Text>
            <Text variant="bodySmall" style={styles.inclusionText}>{item}</Text>
          </View>
        ))}
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    marginHorizontal: spacing.lg,
    marginTop: spacing.md,
  },
  tierName: {
    textTransform: 'uppercase',
    letterSpacing: 2,
    fontSize: 14,
    marginBottom: spacing.sm,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: spacing.lg,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.creamDark,
  },
  inclusionsSection: {
    marginTop: spacing.md,
  },
  inclusionsTitle: {
    marginBottom: spacing.sm,
  },
  inclusionRow: {
    flexDirection: 'row',
    marginBottom: spacing.xs,
  },
  inclusionText: {
    flex: 1,
  },
});
