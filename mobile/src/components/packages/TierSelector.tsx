import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { TabPill } from '../ui';
import TierCard from './TierCard';
import { Tier } from '../../types';

interface TierSelectorProps {
  tiers: Tier[];
  selectedIndex?: number;
  onSelect?: (index: number) => void;
}

const tierLabels: Record<string, string> = {
  deluxe: 'Deluxe',
  luxury: 'Luxury',
  'ultra-luxury': 'Ultra Luxury',
};

export default function TierSelector({ tiers, selectedIndex, onSelect }: TierSelectorProps) {
  const [internalIndex, setInternalIndex] = useState(0);
  const activeIndex = selectedIndex ?? internalIndex;
  const handleChange = onSelect ?? setInternalIndex;

  const tabNames = tiers.map((t) => tierLabels[t.name] || t.name);

  return (
    <View>
      <TabPill tabs={tabNames} activeTab={activeIndex} onTabChange={handleChange} />
      {tiers[activeIndex] && <TierCard tier={tiers[activeIndex]} />}
    </View>
  );
}
