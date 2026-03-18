import React from 'react';
import {
  View,
  FlatList,
  TouchableOpacity,
  RefreshControl,
  StyleSheet,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Image } from 'expo-image';
import { Text, Card } from '../../components/ui';
import { usePackages } from '../../hooks/usePackages';
import { colors, spacing, borderRadius } from '../../theme';
import type { PackagesStackParamList } from '../../navigation/types';
import { Package } from '../../types';

type Nav = NativeStackNavigationProp<PackagesStackParamList, 'PackagesList'>;

function PackageListCard({ pkg, onPress }: { pkg: Package; onPress: () => void }) {
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
        <View style={styles.content}>
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

export default function PackagesScreen() {
  const navigation = useNavigation<Nav>();
  const { packages, loading, refetch } = usePackages();

  return (
    <View style={styles.container}>
      <FlatList
        data={packages}
        keyExtractor={(item) => item._id}
        contentContainerStyle={styles.list}
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={refetch} tintColor={colors.gold} />
        }
        renderItem={({ item }) => (
          <PackageListCard
            pkg={item}
            onPress={() => navigation.navigate('PackageDetail', { id: item._id })}
          />
        )}
        ItemSeparatorComponent={() => <View style={{ height: spacing.md }} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.cream,
  },
  list: {
    padding: spacing.lg,
  },
  card: {
    overflow: 'hidden',
  },
  imageWrapper: {
    height: 180,
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
  content: {
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
