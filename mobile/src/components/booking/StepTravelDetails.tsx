import React, { useState } from 'react';
import { View, TouchableOpacity, Platform, StyleSheet } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Text, Card } from '../ui';
import { useBookingStore } from '../../stores/bookingStore';
import { colors, spacing, borderRadius, fonts } from '../../theme';

export default function StepTravelDetails() {
  const { form, updateForm } = useBookingStore();
  const [showFromPicker, setShowFromPicker] = useState(false);
  const [showToPicker, setShowToPicker] = useState(false);

  const formatDate = (date: Date | null) => {
    if (!date) return 'Select date';
    return date.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.dateRow}>
        <View style={styles.dateField}>
          <Text variant="label">Travel From</Text>
          <TouchableOpacity
            style={styles.dateButton}
            onPress={() => setShowFromPicker(true)}
          >
            <Text
              variant="body"
              color={form.travelDates.from ? colors.charcoal : colors.slate}
            >
              {formatDate(form.travelDates.from)}
            </Text>
          </TouchableOpacity>
          {showFromPicker && (
            <DateTimePicker
              value={form.travelDates.from || new Date()}
              mode="date"
              minimumDate={new Date()}
              onChange={(_, date) => {
                setShowFromPicker(Platform.OS === 'ios');
                if (date) updateForm({ travelDates: { ...form.travelDates, from: date } });
              }}
            />
          )}
        </View>

        <View style={styles.dateField}>
          <Text variant="label">Travel To</Text>
          <TouchableOpacity
            style={styles.dateButton}
            onPress={() => setShowToPicker(true)}
          >
            <Text
              variant="body"
              color={form.travelDates.to ? colors.charcoal : colors.slate}
            >
              {formatDate(form.travelDates.to)}
            </Text>
          </TouchableOpacity>
          {showToPicker && (
            <DateTimePicker
              value={form.travelDates.to || new Date()}
              mode="date"
              minimumDate={form.travelDates.from || new Date()}
              onChange={(_, date) => {
                setShowToPicker(Platform.OS === 'ios');
                if (date) updateForm({ travelDates: { ...form.travelDates, to: date } });
              }}
            />
          )}
        </View>
      </View>

      <View style={styles.travelersSection}>
        <Text variant="label">Number of Travelers</Text>
        <View style={styles.counter}>
          <TouchableOpacity
            style={styles.counterBtn}
            onPress={() => updateForm({ travelers: Math.max(1, form.travelers - 1) })}
          >
            <Text variant="h3" color={colors.charcoal}>-</Text>
          </TouchableOpacity>
          <Text variant="h2" style={styles.counterValue}>{form.travelers}</Text>
          <TouchableOpacity
            style={styles.counterBtn}
            onPress={() => updateForm({ travelers: form.travelers + 1 })}
          >
            <Text variant="h3" color={colors.charcoal}>+</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: spacing.lg,
  },
  dateRow: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  dateField: {
    flex: 1,
  },
  dateButton: {
    marginTop: spacing.xs,
    height: 48,
    borderWidth: 1,
    borderColor: colors.creamDark,
    borderRadius: borderRadius.md,
    paddingHorizontal: spacing.md,
    justifyContent: 'center',
    backgroundColor: colors.white,
  },
  travelersSection: {
    marginTop: spacing.sm,
  },
  counter: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: spacing.sm,
    gap: spacing.lg,
  },
  counterBtn: {
    width: 44,
    height: 44,
    borderRadius: borderRadius.md,
    backgroundColor: colors.creamDark,
    alignItems: 'center',
    justifyContent: 'center',
  },
  counterValue: {
    width: 40,
    textAlign: 'center',
  },
});
