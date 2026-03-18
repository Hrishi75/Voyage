import React from 'react';
import { View, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { Text, ImageCard } from '../ui';
import { Destination } from '../../types';
import { colors, spacing } from '../../theme';

interface FeaturedDestinationsProps {
  destinations: Destination[];
  onDestinationPress: (slug: string) => void;
  onSeeAll: () => void;
}

export default function FeaturedDestinations({
  destinations,
  onDestinationPress,
  onSeeAll,
}: FeaturedDestinationsProps) {
  if (destinations.length === 0) return null;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text variant="caption" color={colors.gold} style={styles.sectionTag}>
            HANDPICKED FOR YOU
          </Text>
          <Text variant="h2">Featured Destinations</Text>
        </View>
        <TouchableOpacity onPress={onSeeAll}>
          <Text variant="bodySmall" color={colors.gold} style={styles.seeAll}>
            See All
          </Text>
        </TouchableOpacity>
      </View>

      <FlatList
        horizontal
        data={destinations}
        keyExtractor={(item) => item._id}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.list}
        snapToInterval={296}
        decelerationRate="fast"
        renderItem={({ item }) => (
          <ImageCard
            imageUrl={item.image}
            title={item.name}
            subtitle={item.country}
            width={280}
            height={200}
            onPress={() => onDestinationPress(item.slug)}
          />
        )}
        ItemSeparatorComponent={() => <View style={{ width: spacing.md }} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: spacing.xl,
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
});
