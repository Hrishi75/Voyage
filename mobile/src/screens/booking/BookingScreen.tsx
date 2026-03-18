import React, { useState } from 'react';
import {
  View,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
  StyleSheet,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Text, Button, StepIndicator } from '../../components/ui';
import StepConfirmation from '../../components/booking/StepConfirmation';
import StepTravelDetails from '../../components/booking/StepTravelDetails';
import StepPersonalInfo from '../../components/booking/StepPersonalInfo';
import StepSpecialRequests from '../../components/booking/StepSpecialRequests';
import StepReview from '../../components/booking/StepReview';
import { useBookingStore } from '../../stores/bookingStore';
import api from '../../lib/api';
import { colors, spacing } from '../../theme';
import type { RootStackParamList } from '../../navigation/types';

type Nav = NativeStackNavigationProp<RootStackParamList, 'Booking'>;

const STEP_TITLES = [
  'Confirm Selection',
  'Travel Details',
  'Your Information',
  'Special Requests',
  'Review & Submit',
];

export default function BookingScreen() {
  const navigation = useNavigation<Nav>();
  const { selectedPackage: pkg, selectedTier, form, currentStep, setStep, reset } = useBookingStore();
  const [submitting, setSubmitting] = useState(false);

  const canAdvance = () => {
    switch (currentStep) {
      case 0: return !!pkg && !!selectedTier;
      case 1: return !!form.travelDates.from && !!form.travelDates.to && form.travelers >= 1;
      case 2: return !!form.fullName.trim() && !!form.email.trim() && !!form.phone.trim();
      case 3: return true;
      case 4: return true;
      default: return false;
    }
  };

  const handleNext = () => {
    if (currentStep < 4) {
      setStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    if (!pkg || !selectedTier) return;

    setSubmitting(true);
    try {
      await api.post('/inquiries', {
        packageId: pkg._id,
        tierName: selectedTier.name,
        fullName: form.fullName,
        email: form.email,
        phone: form.phone,
        travelDates: {
          from: form.travelDates.from?.toISOString(),
          to: form.travelDates.to?.toISOString(),
        },
        travelers: form.travelers,
        specialRequests: form.specialRequests || undefined,
      });

      reset();
      navigation.replace('BookingConfirmation');
    } catch (error: any) {
      Alert.alert('Error', error.response?.data?.message || 'Failed to submit inquiry. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0: return <StepConfirmation />;
      case 1: return <StepTravelDetails />;
      case 2: return <StepPersonalInfo />;
      case 3: return <StepSpecialRequests />;
      case 4: return <StepReview />;
      default: return null;
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={styles.container}>
        <StepIndicator totalSteps={5} currentStep={currentStep} />

        <ScrollView
          contentContainerStyle={styles.scroll}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.card}>
            <Text variant="h2" style={styles.stepTitle}>
              {STEP_TITLES[currentStep]}
            </Text>
            {renderStep()}
          </View>
        </ScrollView>

        <View style={styles.navRow}>
          <Button
            title="Back"
            onPress={handleBack}
            variant="ghost"
            disabled={currentStep === 0}
            style={styles.navBtn}
          />
          {currentStep < 4 ? (
            <Button
              title="Next"
              onPress={handleNext}
              disabled={!canAdvance()}
              style={styles.navBtn}
            />
          ) : (
            <Button
              title={submitting ? 'Submitting...' : 'Submit Inquiry'}
              onPress={handleSubmit}
              loading={submitting}
              style={styles.navBtn}
            />
          )}
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  container: {
    flex: 1,
    backgroundColor: colors.cream,
  },
  scroll: {
    padding: spacing.lg,
    paddingTop: spacing.sm,
  },
  card: {
    backgroundColor: colors.white,
    borderRadius: 20,
    padding: spacing.lg,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  stepTitle: {
    marginBottom: spacing.lg,
  },
  navRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: spacing.md,
    paddingBottom: spacing.lg,
    backgroundColor: colors.white,
    borderTopWidth: 1,
    borderTopColor: colors.creamDark,
  },
  navBtn: {
    minWidth: 120,
  },
});
