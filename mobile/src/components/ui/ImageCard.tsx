import React from 'react';
import { TouchableOpacity, View, StyleSheet, Dimensions } from 'react-native';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import Text from './Text';
import { colors, borderRadius, spacing } from '../../theme';

interface ImageCardProps {
  imageUrl: string;
  title: string;
  subtitle?: string;
  onPress?: () => void;
  width?: number;
  height?: number;
}

const SCREEN_WIDTH = Dimensions.get('window').width;

export default function ImageCard({
  imageUrl,
  title,
  subtitle,
  onPress,
  width = SCREEN_WIDTH * 0.7,
  height = 200,
}: ImageCardProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.9}
      style={[styles.container, { width, height }]}
    >
      <Image
        source={{ uri: imageUrl }}
        style={styles.image}
        contentFit="cover"
        placeholder={{ blurhash: 'LGF5?xYk^6#M@-5c,1J5@[or[Q6.' }}
        transition={300}
      />
      <LinearGradient
        colors={['transparent', 'rgba(0,0,0,0.7)']}
        style={styles.gradient}
      >
        <View style={styles.textContainer}>
          <Text variant="h3" color={colors.white} numberOfLines={1}>
            {title}
          </Text>
          {subtitle && (
            <Text variant="caption" color={colors.creamDark} numberOfLines={1}>
              {subtitle}
            </Text>
          )}
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: borderRadius.lg,
    overflow: 'hidden',
  },
  image: {
    ...StyleSheet.absoluteFillObject,
  },
  gradient: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
  },
  textContainer: {
    padding: spacing.md,
  },
});
