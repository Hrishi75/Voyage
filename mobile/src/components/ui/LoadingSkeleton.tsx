import React, { useEffect, useRef } from 'react';
import { Animated, ViewStyle, StyleSheet } from 'react-native';
import { colors, borderRadius } from '../../theme';

interface LoadingSkeletonProps {
  width: number | string;
  height: number;
  borderRadiusSize?: number;
  style?: ViewStyle;
}

export default function LoadingSkeleton({
  width,
  height,
  borderRadiusSize = borderRadius.md,
  style,
}: LoadingSkeletonProps) {
  const opacity = useRef(new Animated.Value(0.3)).current;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 0.7,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0.3,
          duration: 800,
          useNativeDriver: true,
        }),
      ])
    );
    animation.start();
    return () => animation.stop();
  }, []);

  return (
    <Animated.View
      style={[
        {
          width: width as any,
          height,
          borderRadius: borderRadiusSize,
          backgroundColor: colors.creamDark,
          opacity,
        },
        style,
      ]}
    />
  );
}
