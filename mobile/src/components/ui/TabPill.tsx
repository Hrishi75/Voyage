import React from 'react';
import { ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import Text from './Text';
import { colors, borderRadius, spacing, fonts } from '../../theme';

interface TabPillProps {
  tabs: string[];
  activeTab: number;
  onTabChange: (index: number) => void;
}

export default function TabPill({ tabs, activeTab, onTabChange }: TabPillProps) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      {tabs.map((tab, i) => (
        <TouchableOpacity
          key={tab}
          onPress={() => onTabChange(i)}
          style={[styles.pill, i === activeTab && styles.activePill]}
          activeOpacity={0.7}
        >
          <Text
            style={[styles.text, i === activeTab && styles.activeText]}
          >
            {tab}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    gap: spacing.sm,
  },
  pill: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.full,
    backgroundColor: colors.creamDark,
  },
  activePill: {
    backgroundColor: colors.gold,
  },
  text: {
    fontFamily: fonts.bodySemiBold,
    fontSize: 14,
    color: colors.slate,
  },
  activeText: {
    color: colors.white,
  },
});
