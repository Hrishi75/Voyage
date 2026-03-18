import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Card, Badge } from '../ui';
import { Inquiry } from '../../types';
import { colors, spacing } from '../../theme';

const tierLabels: Record<string, string> = {
  deluxe: 'Deluxe',
  luxury: 'Luxury',
  'ultra-luxury': 'Ultra Luxury',
};

interface InquiryCardProps {
  inquiry: Inquiry;
}

export default function InquiryCard({ inquiry }: InquiryCardProps) {
  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  return (
    <Card style={styles.card}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Text variant="h3" numberOfLines={1} style={styles.packageName}>
            {typeof inquiry.package === 'object' ? inquiry.package.name : 'Travel Package'}
          </Text>
          <Text variant="caption" style={styles.tierText}>
            {tierLabels[inquiry.tierName] || inquiry.tierName}
          </Text>
        </View>
        <Badge status={inquiry.status} />
      </View>

      <View style={styles.details}>
        <View style={styles.detailRow}>
          <Text variant="caption">Dates</Text>
          <Text variant="bodySmall">
            {formatDate(inquiry.travelDates.from)} - {formatDate(inquiry.travelDates.to)}
          </Text>
        </View>
        <View style={styles.detailRow}>
          <Text variant="caption">Travelers</Text>
          <Text variant="bodySmall">{inquiry.travelers}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text variant="caption">Booked</Text>
          <Text variant="bodySmall">{formatDate(inquiry.createdAt)}</Text>
        </View>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: spacing.md,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing.md,
  },
  headerLeft: {
    flex: 1,
    marginRight: spacing.sm,
  },
  packageName: {
    marginBottom: spacing.xs,
  },
  tierText: {
    textTransform: 'capitalize',
  },
  details: {
    borderTopWidth: 1,
    borderTopColor: colors.creamDark,
    paddingTop: spacing.sm,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: spacing.xs,
  },
});
