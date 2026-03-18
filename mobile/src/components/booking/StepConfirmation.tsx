import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Card, TabPill } from '../ui';
import { useBookingStore } from '../../stores/bookingStore';
import { colors, spacing } from '../../theme';

const tierLabels: Record<string, string> = {
  deluxe: 'Deluxe',
  luxury: 'Luxury',
  'ultra-luxury': 'Ultra Luxury',
};

export default function StepConfirmation() {
  const { selectedPackage: pkg, selectedTier, setTier } = useBookingStore();

  if (!pkg || !selectedTier) return null;

  const tierNames = pkg.tiers.map((t) => tierLabels[t.name] || t.name);
  const activeIndex = pkg.tiers.findIndex((t) => t.name === selectedTier.name);

  return (
    <View style={styles.container}>
      <Card style={styles.infoCard}>
        <Text variant="caption" color={colors.slate}>Package</Text>
        <Text variant="h3">{pkg.name}</Text>
        <Text variant="bodySmall">
          {pkg.destination?.name} · {pkg.duration}
        </Text>
      </Card>

      <Card style={styles.infoCard}>
        <Text variant="caption" color={colors.slate}>Selected Tier</Text>
        <Text variant="h3" style={styles.tierName}>
          {tierLabels[selectedTier.name] || selectedTier.name}
        </Text>
        <View style={styles.priceRow}>
          <Text variant="h2" color={colors.gold}>
            {'\u20B9'}{selectedTier.price.toLocaleString('en-IN')}
          </Text>
          <Text variant="caption"> / {selectedTier.priceLabel}</Text>
        </View>
      </Card>

      <Card style={styles.infoCard}>
        <Text variant="caption" color={colors.slate} style={styles.changeTierLabel}>
          Change Tier
        </Text>
        <TabPill
          tabs={tierNames}
          activeTab={activeIndex >= 0 ? activeIndex : 0}
          onTabChange={(i) => setTier(pkg.tiers[i])}
        />
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: spacing.md,
  },
  infoCard: {
    backgroundColor: colors.cream,
  },
  tierName: {
    textTransform: 'capitalize',
    marginTop: spacing.xs,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginTop: spacing.xs,
  },
  changeTierLabel: {
    marginBottom: spacing.sm,
  },
});
