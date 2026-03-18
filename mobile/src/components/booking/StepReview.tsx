import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Card } from '../ui';
import { useBookingStore } from '../../stores/bookingStore';
import { colors, spacing, borderRadius } from '../../theme';

const tierLabels: Record<string, string> = {
  deluxe: 'Deluxe',
  luxury: 'Luxury',
  'ultra-luxury': 'Ultra Luxury',
};

function ReviewItem({ label, value }: { label: string; value: string }) {
  return (
    <Card style={styles.item}>
      <Text variant="caption" color={colors.slate} style={styles.itemLabel}>
        {label}
      </Text>
      <Text variant="label">{value}</Text>
    </Card>
  );
}

export default function StepReview() {
  const { selectedPackage: pkg, selectedTier, form } = useBookingStore();

  if (!pkg || !selectedTier) return null;

  const formatDate = (date: Date | null) =>
    date ? date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) : '';

  const total = selectedTier.price * form.travelers;

  return (
    <View style={styles.container}>
      <View style={styles.grid}>
        <ReviewItem label="PACKAGE" value={pkg.name} />
        <ReviewItem label="TIER" value={tierLabels[selectedTier.name] || selectedTier.name} />
        <ReviewItem
          label="DATES"
          value={`${formatDate(form.travelDates.from)} to ${formatDate(form.travelDates.to)}`}
        />
        <ReviewItem label="TRAVELERS" value={`${form.travelers}`} />
        <ReviewItem label="NAME" value={form.fullName} />
        <ReviewItem label="CONTACT" value={`${form.email}\n${form.phone}`} />
      </View>

      {form.specialRequests ? (
        <ReviewItem label="SPECIAL REQUESTS" value={form.specialRequests} />
      ) : null}

      <View style={styles.totalCard}>
        <Text variant="h2" color={colors.gold}>
          {'\u20B9'}{total.toLocaleString('en-IN')}
        </Text>
        <Text variant="caption">
          Estimated total for {form.travelers} traveler(s)
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: spacing.md,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  item: {
    width: '48%',
    backgroundColor: colors.cream,
  },
  itemLabel: {
    textTransform: 'uppercase',
    letterSpacing: 1,
    fontSize: 10,
    marginBottom: spacing.xs,
  },
  totalCard: {
    backgroundColor: colors.gold + '15',
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.gold + '30',
  },
});
