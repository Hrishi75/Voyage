import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { Text } from '../ui';
import { useBookingStore } from '../../stores/bookingStore';
import { colors, spacing, borderRadius, fonts } from '../../theme';

export default function StepSpecialRequests() {
  const { form, updateForm } = useBookingStore();

  return (
    <View>
      <Text variant="label">
        Special Requests{' '}
        <Text variant="caption">(optional)</Text>
      </Text>
      <TextInput
        style={styles.textArea}
        value={form.specialRequests}
        onChangeText={(specialRequests) => updateForm({ specialRequests })}
        placeholder="Dietary requirements, room preferences, accessibility needs, celebration arrangements..."
        placeholderTextColor={colors.slate}
        multiline
        numberOfLines={6}
        textAlignVertical="top"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  textArea: {
    marginTop: spacing.sm,
    height: 140,
    borderWidth: 1,
    borderColor: colors.creamDark,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    fontFamily: fonts.body,
    fontSize: 16,
    color: colors.charcoal,
    backgroundColor: colors.white,
  },
});
