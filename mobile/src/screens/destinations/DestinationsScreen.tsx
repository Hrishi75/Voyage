import React, { useState, useMemo } from 'react';
import {
  View,
  FlatList,
  RefreshControl,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { TabPill, ImageCard } from '../../components/ui';
import { useDestinations } from '../../hooks/useDestinations';
import { colors, spacing } from '../../theme';
import type { DestinationsStackParamList } from '../../navigation/types';

type Nav = NativeStackNavigationProp<DestinationsStackParamList, 'DestinationsList'>;

const TABS = ['India', 'International'];
const CARD_GAP = spacing.md;
const SCREEN_WIDTH = Dimensions.get('window').width;
const CARD_WIDTH = (SCREEN_WIDTH - spacing.lg * 2 - CARD_GAP) / 2;

export default function DestinationsScreen() {
  const navigation = useNavigation<Nav>();
  const { destinations, loading, refetch } = useDestinations();
  const [activeTab, setActiveTab] = useState(0);

  const filtered = useMemo(() => {
    const type = activeTab === 0 ? 'indian' : 'foreign';
    return destinations.filter((d) => d.type === type);
  }, [destinations, activeTab]);

  return (
    <View style={styles.container}>
      <TabPill tabs={TABS} activeTab={activeTab} onTabChange={setActiveTab} />

      <FlatList
        data={filtered}
        keyExtractor={(item) => item._id}
        numColumns={2}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.list}
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={refetch} tintColor={colors.gold} />
        }
        renderItem={({ item }) => (
          <ImageCard
            imageUrl={item.image}
            title={item.name}
            subtitle={item.country}
            width={CARD_WIDTH}
            height={180}
            onPress={() => navigation.navigate('DestinationDetail', { slug: item.slug })}
          />
        )}
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
    paddingTop: spacing.sm,
  },
  row: {
    gap: CARD_GAP,
    marginBottom: CARD_GAP,
  },
});
