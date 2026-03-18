import { TextStyle } from 'react-native';

export const colors = {
  cream: '#FAF7F2',
  creamDark: '#F0EBE3',
  gold: '#C5A47E',
  goldLight: '#D4B896',
  goldDark: '#A8885F',
  charcoal: '#2D2D2D',
  charcoalLight: '#4A4A4A',
  slate: '#6B7280',
  white: '#FFFFFF',
  black: '#000000',
  error: '#DC2626',
  success: '#16A34A',
  warning: '#F59E0B',
  info: '#3B82F6',

  status: {
    pending: '#F59E0B',
    contacted: '#3B82F6',
    confirmed: '#16A34A',
    cancelled: '#DC2626',
  },
} as const;

export const fonts = {
  heading: 'PlayfairDisplay_700Bold',
  headingRegular: 'PlayfairDisplay_400Regular',
  body: 'Inter_400Regular',
  bodyMedium: 'Inter_500Medium',
  bodySemiBold: 'Inter_600SemiBold',
  bodyBold: 'Inter_700Bold',
} as const;

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
} as const;

export const borderRadius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  full: 9999,
} as const;

export const typography: Record<string, TextStyle> = {
  h1: { fontFamily: fonts.heading, fontSize: 32, lineHeight: 40, color: colors.charcoal },
  h2: { fontFamily: fonts.heading, fontSize: 24, lineHeight: 32, color: colors.charcoal },
  h3: { fontFamily: fonts.heading, fontSize: 20, lineHeight: 28, color: colors.charcoal },
  body: { fontFamily: fonts.body, fontSize: 16, lineHeight: 24, color: colors.charcoal },
  bodySmall: { fontFamily: fonts.body, fontSize: 14, lineHeight: 20, color: colors.slate },
  caption: { fontFamily: fonts.body, fontSize: 12, lineHeight: 16, color: colors.slate },
  label: { fontFamily: fonts.bodySemiBold, fontSize: 14, lineHeight: 20, color: colors.charcoal },
  button: { fontFamily: fonts.bodySemiBold, fontSize: 16, lineHeight: 24 },
} as const;
