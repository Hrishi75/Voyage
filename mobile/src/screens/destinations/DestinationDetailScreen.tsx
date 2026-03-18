import React from 'react';
import {
  View,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import type { RouteProp } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { Text, Card } from '../../components/ui';
import { useDestinationBySlug } from '../../hooks/useDestinations';
import { usePackages } from '../../hooks/usePackages';
import { colors, spacing, borderRadius } from '../../theme';
import type { DestinationsStackParamList } from '../../navigation/types';

type Route = RouteProp<DestinationsStackParamList, 'DestinationDetail'>;
type Nav = NativeStackNavigationProp<DestinationsStackParamList, 'DestinationDetail'>;

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export default function DestinationDetailScreen() {
  const { params } = useRoute<Route>();
  const navigation = useNavigation<Nav>();
  const { destination, loading: destLoading } = useDestinationBySlug(params.slug);
  const { packages, loading: pkgLoading } = usePackages(params.slug);

  if (destLoading || !destination) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color={colors.gold} />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} bounces={false}>
      <View style={styles.hero}>
        <Image
          source={{ uri: destination.image }}
          style={StyleSheet.absoluteFill}
          contentFit="cover"
        />
        <LinearGradient
          colors={['transparent', 'rgba(0,0,0,0.7)']}
          style={styles.gradient}
        >
          <Text variant="h1" color={colors.white}>{destination.name}</Text>
          <Text variant="bodySmall" color="rgba(255,255,255,0.8)">
            {destination.country}
          </Text>
        </LinearGradient>
      </View>

      <View style={styles.body}>
        <Text variant="body" style={styles.description}>
          {destination.description}
        </Text>

        {packages.length > 0 && (
          <View style={styles.packagesSection}>
            <Text variant="h3" style={styles.sectionTitle}>
              Packages in {destination.name}
            </Text>
            {packages.map((pkg) => {
              const lowestPrice = Math.min(...pkg.tiers.map((t) => t.price));
              return (
                <TouchableOpacity
                  key={pkg._id}
                  onPress={() => navigation.navigate('PackageDetail', { id: pkg._id })}
                  activeOpacity={0.9}
                >
                  <Card style={styles.pkgCard}>
                    <Image
                      source={{ uri: pkg.images[0] }}
                      style={styles.pkgImage}
                      contentFit="cover"
                    />
                    <View style={styles.pkgInfo}>
                      <Text variant="h3" numberOfLines={1}>{pkg.name}</Text>
                      <Text variant="caption">{pkg.duration}</Text>
                      <Text variant="bodySmall" color={colors.gold} style={styles.price}>
                        From {'\u20B9'}{lowestPrice.toLocaleString('en-IN')}
                      </Text>
                    </View>
                  </Card>
                </TouchableOpacity>
              );
            })}
          </View>
        )}

        {!pkgLoading && packages.length === 0 && (
          <Text variant="bodySmall" style={styles.noPackages}>
            No packages available for this destination yet.
          </Text>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.cream,
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.cream,
  },
  hero: {
    height: 280,
    width: SCREEN_WIDTH,
  },
  gradient: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    padding: spacing.lg,
  },
  body: {
    padding: spacing.lg,
  },
  description: {
    lineHeight: 26,
    marginBottom: spacing.lg,
  },
  packagesSection: {
    marginTop: spacing.sm,
  },
  sectionTitle: {
    marginBottom: spacing.md,
  },
  pkgCard: {
    flexDirection: 'row',
    padding: 0,
    overflow: 'hidden',
    marginBottom: spacing.md,
  },
  pkgImage: {
    width: 110,
    height: 110,
    borderTopLeftRadius: borderRadius.lg,
    borderBottomLeftRadius: borderRadius.lg,
  },
  pkgInfo: {
    flex: 1,
    padding: spacing.md,
    justifyContent: 'center',
  },
  price: {
    marginTop: spacing.xs,
    fontWeight: '600',
  },
  noPackages: {
    textAlign: 'center',
    marginTop: spacing.xl,
  },
});
