import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { Input } from '../ui';
import { useBookingStore } from '../../stores/bookingStore';
import { useAuthStore } from '../../stores/authStore';

export default function StepPersonalInfo() {
  const { form, updateForm } = useBookingStore();
  const user = useAuthStore((s) => s.user);

  useEffect(() => {
    if (user) {
      if (!form.fullName) updateForm({ fullName: user.name });
      if (!form.email) updateForm({ email: user.email });
    }
  }, [user]);

  return (
    <View>
      <Input
        label="Full Name"
        placeholder="John Doe"
        value={form.fullName}
        onChangeText={(fullName) => updateForm({ fullName })}
        autoCapitalize="words"
        autoComplete="name"
      />
      <Input
        label="Email"
        placeholder="you@example.com"
        value={form.email}
        onChangeText={(email) => updateForm({ email })}
        keyboardType="email-address"
        autoCapitalize="none"
        autoComplete="email"
      />
      <Input
        label="Phone"
        placeholder="+91 98765 43210"
        value={form.phone}
        onChangeText={(phone) => updateForm({ phone })}
        keyboardType="phone-pad"
        autoComplete="tel"
      />
    </View>
  );
}
