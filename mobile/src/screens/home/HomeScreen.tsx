import React, { useCallback } from 'react';
import { ScrollView, RefreshControl, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { SafeAreaView } from 'react-native-safe-area-context';
import HeroBanner from '../../components/home/HeroBanner';
import FeaturedDestinations from '../../components/home/FeaturedDestinations';
import FeaturedPackages from '../../components/home/FeaturedPackages';
import { useFeatured } from '../../hooks/useFeatured';
import { colors } from '../../theme';
import type { HomeStackParamList } from '../../navigation/types';

type Nav = NativeStackNavigationProp<HomeStackParamList, 'HomeScreen'>;

export default function HomeScreen() {
  const navigation = useNavigation<Nav>();
  const { destinations, packages, loading, refetch } = useFeatured();

  const goToDestinations = useCallback(() => {
    navigation.getParent()?.navigate('Destinations', { screen: 'DestinationsList' });
  }, [navigation]);

  const goToPackages = useCallback(() => {
    navigation.getParent()?.navigate('Packages', { screen: 'PackagesList' });
  }, [navigation]);

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView
        style={styles.scroll}
        refreshControl={
          <RefreshControl
            refreshing={loading}
            onRefresh={refetch}
            tintColor={colors.gold}
          />
        }
      >
        <HeroBanner
          onExplore={goToDestinations}
          onViewPackages={goToPackages}
        />

        <FeaturedDestinations
          destinations={destinations}
          onDestinationPress={(slug) => navigation.navigate('DestinationDetail', { slug })}
          onSeeAll={goToDestinations}
        />

        <FeaturedPackages
          packages={packages}
          onPackagePress={(id) => navigation.navigate('PackageDetail', { id })}
          onSeeAll={goToPackages}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  scroll: {
    flex: 1,
  },
});
