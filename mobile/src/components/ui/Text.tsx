import React from 'react';
import { Text as RNText, TextProps, StyleSheet } from 'react-native';
import { typography } from '../../theme';

type TextVariant = 'h1' | 'h2' | 'h3' | 'body' | 'bodySmall' | 'caption' | 'label' | 'button';

interface AppTextProps extends TextProps {
  variant?: TextVariant;
  color?: string;
}

export default function Text({ variant = 'body', color, style, ...props }: AppTextProps) {
  return (
    <RNText
      style={[typography[variant], color ? { color } : undefined, style]}
      {...props}
    />
  );
}
