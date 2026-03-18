import React from 'react';
import { View, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { Image } from 'expo-image';
import { Text, Card } from '../ui';
import { Package } from '../../types';
import { colors, spacing, borderRadius } from '../../theme';

interface FeaturedPackagesProps {
  packages: Package[];
  onPackagePress: (id: string) => void;
  onSeeAll: () => void;
}

function PackageCard({ pkg, onPress }: { pkg: Package; onPress: () => void }) {
  const lowestPrice = Math.min(...pkg.tiers.map((t) => t.price));

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.9}>
      <Card padded={false} style={styles.card}>
        <View style={styles.imageWrapper}>
          <Image
            source={{ uri: pkg.images[0] }}
            style={styles.image}
            contentFit="cover"
            transition={300}
          />
          <View style={styles.priceBadge}>
            <Text variant="caption" color={colors.gold} style={styles.priceText}>
              From {'\u20B9'}{lowestPrice.toLocaleString('en-IN')}
            </Text>
          </View>
        </View>
        <View style={styles.cardContent}>
          <View style={styles.meta}>
            <Text variant="caption">{pkg.destination?.name}</Text>
            <Text variant="caption">{pkg.duration}</Text>
          </View>
          <Text variant="h3" numberOfLines={1}>{pkg.name}</Text>
          <Text variant="bodySmall" numberOfLines={2} style={styles.desc}>
            {pkg.description}
          </Text>
        </View>
      </Card>
    </TouchableOpacity>
  );
}

export default function FeaturedPackages({
  packages,
  onPackagePress,
  onSeeAll,
}: FeaturedPackagesProps) {
  if (packages.length === 0) return null;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text variant="caption" color={colors.gold} style={styles.sectionTag}>
            CURATED EXPERIENCES
          </Text>
          <Text variant="h2">Popular Packages</Text>
        </View>
        <TouchableOpacity onPress={onSeeAll}>
          <Text variant="bodySmall" color={colors.gold} style={styles.seeAll}>
            See All
          </Text>
        </TouchableOpacity>
      </View>

      <FlatList
        horizontal
        data={packages}
        keyExtractor={(item) => item._id}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.list}
        snapToInterval={296}
        decelerationRate="fast"
        renderItem={({ item }) => (
          <PackageCard pkg={item} onPress={() => onPackagePress(item._id)} />
        )}
        ItemSeparatorComponent={() => <View style={{ width: spacing.md }} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: spacing.xl,
    backgroundColor: colors.cream,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.lg,
  },
  sectionTag: {
    letterSpacing: 3,
    fontSize: 11,
    marginBottom: spacing.xs,
  },
  seeAll: {
    fontWeight: '600',
  },
  list: {
    paddingHorizontal: spacing.lg,
  },
  card: {
    width: 280,
    overflow: 'hidden',
  },
  imageWrapper: {
    height: 160,
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  priceBadge: {
    position: 'absolute',
    top: spacing.sm,
    right: spacing.sm,
    backgroundColor: 'rgba(255,255,255,0.92)',
    borderRadius: borderRadius.full,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
  },
  priceText: {
    fontWeight: '600',
  },
  cardContent: {
    padding: spacing.md,
  },
  meta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.xs,
  },
  desc: {
    marginTop: spacing.xs,
  },
});
