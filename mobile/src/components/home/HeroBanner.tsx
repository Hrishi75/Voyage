import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { Text, Button } from '../ui';
import { colors, spacing } from '../../theme';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

interface HeroBannerProps {
  onExplore: () => void;
  onViewPackages: () => void;
}

export default function HeroBanner({ onExplore, onViewPackages }: HeroBannerProps) {
  return (
    <View style={styles.container}>
      <Image
        source={{ uri: 'https://images.unsplash.com/photo-1506929562872-bb421503ef21?w=1200&q=80' }}
        style={StyleSheet.absoluteFill}
        contentFit="cover"
      />
      <LinearGradient
        colors={['rgba(0,0,0,0.3)', 'rgba(0,0,0,0.2)', 'rgba(0,0,0,0.6)']}
        style={StyleSheet.absoluteFill}
      />
      <View style={styles.content}>
        <Text variant="caption" color={colors.gold} style={styles.tagline}>
          LUXURY TRAVEL REDEFINED
        </Text>
        <Text variant="h1" color={colors.white} style={styles.heading}>
          Experience the World{'\n'}
          <Text variant="h1" color={colors.gold}>in Luxury</Text>
        </Text>
        <Text variant="bodySmall" color="rgba(255,255,255,0.8)" style={styles.subtitle}>
          Discover handcrafted travel packages to India's finest destinations and beyond.
        </Text>
        <View style={styles.buttons}>
          <Button title="Explore Destinations" onPress={onExplore} />
          <Button title="View Packages" onPress={onViewPackages} variant="outline" style={styles.outlineBtn} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: SCREEN_HEIGHT * 0.5,
    justifyContent: 'flex-end',
  },
  content: {
    padding: spacing.lg,
    paddingBottom: spacing.xl,
  },
  tagline: {
    letterSpacing: 4,
    fontSize: 11,
    marginBottom: spacing.sm,
  },
  heading: {
    fontSize: 28,
    lineHeight: 36,
    marginBottom: spacing.md,
  },
  subtitle: {
    marginBottom: spacing.lg,
    lineHeight: 22,
  },
  buttons: {
    gap: spacing.sm,
  },
  outlineBtn: {
    borderColor: 'rgba(255,255,255,0.4)',
  },
});
