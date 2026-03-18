import React, { useState } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import type { RouteProp } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Text, Button } from '../../components/ui';
import ImageCarousel from '../../components/packages/ImageCarousel';
import TierSelector from '../../components/packages/TierSelector';
import { usePackageById } from '../../hooks/usePackages';
import { useBookingStore } from '../../stores/bookingStore';
import { colors, spacing } from '../../theme';
import type { PackagesStackParamList } from '../../navigation/types';
import type { RootStackParamList } from '../../navigation/types';

type Route = RouteProp<PackagesStackParamList, 'PackageDetail'>;

export default function PackageDetailScreen() {
  const { params } = useRoute<Route>();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { pkg, loading } = usePackageById(params.id);
  const [selectedTier, setSelectedTier] = useState(0);
  const { setPackage, setTier } = useBookingStore();

  if (loading || !pkg) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color={colors.gold} />
      </View>
    );
  }

  const handleBookNow = () => {
    setPackage(pkg);
    setTier(pkg.tiers[selectedTier]);
    navigation.navigate('Booking');
  };

  return (
    <View style={styles.container}>
      <ScrollView bounces={false} contentContainerStyle={styles.scroll}>
        <ImageCarousel images={pkg.images} />

        <View style={styles.body}>
          <Text variant="h2">{pkg.name}</Text>
          <View style={styles.metaRow}>
            <Text variant="bodySmall">{pkg.destination?.name}</Text>
            <Text variant="bodySmall">{pkg.duration}</Text>
          </View>

          <Text variant="body" style={styles.description}>{pkg.description}</Text>

          {pkg.highlights.length > 0 && (
            <View style={styles.highlightsSection}>
              <Text variant="h3" style={styles.sectionTitle}>Highlights</Text>
              {pkg.highlights.map((h, i) => (
                <View key={i} style={styles.highlightRow}>
                  <Text variant="bodySmall" color={colors.gold}>{'✦ '}</Text>
                  <Text variant="bodySmall" style={styles.highlightText}>{h}</Text>
                </View>
              ))}
            </View>
          )}
        </View>

        <View style={styles.tierSection}>
          <Text variant="h3" style={styles.tierTitle}>Choose Your Experience</Text>
          <TierSelector
            tiers={pkg.tiers}
            selectedIndex={selectedTier}
            onSelect={setSelectedTier}
          />
        </View>

        <View style={styles.bottomSpacer} />
      </ScrollView>

      <View style={styles.ctaContainer}>
        <Button title="Book Now" onPress={handleBookNow} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.cream,
  },
  scroll: {
    paddingBottom: 100,
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.cream,
  },
  body: {
    padding: spacing.lg,
  },
  metaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: spacing.xs,
    marginBottom: spacing.md,
  },
  description: {
    lineHeight: 26,
  },
  highlightsSection: {
    marginTop: spacing.lg,
  },
  sectionTitle: {
    marginBottom: spacing.md,
  },
  highlightRow: {
    flexDirection: 'row',
    marginBottom: spacing.sm,
  },
  highlightText: {
    flex: 1,
  },
  tierSection: {
    paddingBottom: spacing.lg,
  },
  tierTitle: {
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.sm,
  },
  bottomSpacer: {
    height: spacing.xl,
  },
  ctaContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: colors.white,
    padding: spacing.md,
    paddingBottom: spacing.lg,
    borderTopWidth: 1,
    borderTopColor: colors.creamDark,
  },
});
