import React, { useEffect, useState, useCallback } from 'react';
import {
  View,
  FlatList,
  RefreshControl,
  TouchableOpacity,
  Alert,
  StyleSheet,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Text, EmptyState } from '../../components/ui';
import InquiryCard from '../../components/dashboard/InquiryCard';
import { useAuthStore } from '../../stores/authStore';
import api from '../../lib/api';
import { Inquiry } from '../../types';
import { colors, spacing } from '../../theme';
import type { RootStackParamList } from '../../navigation/types';

type Nav = NativeStackNavigationProp<RootStackParamList>;

export default function DashboardScreen() {
  const navigation = useNavigation<Nav>();
  const { user, logout } = useAuthStore();
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchInquiries = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await api.get('/inquiries/mine');
      setInquiries(data.data);
    } catch (error) {
      console.warn('Failed to fetch inquiries:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchInquiries();
  }, [fetchInquiries]);

  const handleLogout = () => {
    Alert.alert('Logout', 'Are you sure you want to sign out?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Sign Out', style: 'destructive', onPress: logout },
    ]);
  };

  return (
    <View style={styles.container}>
      <View style={styles.profileHeader}>
        <View>
          <Text variant="h3">Welcome back,</Text>
          <Text variant="h2" color={colors.gold}>{user?.name || 'Traveler'}</Text>
          <Text variant="caption">{user?.email}</Text>
        </View>
        <TouchableOpacity onPress={handleLogout} style={styles.logoutBtn}>
          <Text variant="bodySmall" color={colors.error}>Sign Out</Text>
        </TouchableOpacity>
      </View>

      <Text variant="h3" style={styles.sectionTitle}>My Inquiries</Text>

      <FlatList
        data={inquiries}
        keyExtractor={(item) => item._id}
        contentContainerStyle={styles.list}
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={fetchInquiries} tintColor={colors.gold} />
        }
        renderItem={({ item }) => <InquiryCard inquiry={item} />}
        ListEmptyComponent={
          !loading ? (
            <EmptyState
              icon="{'✈️'}"
              title="No Inquiries Yet"
              subtitle="Start exploring our luxury travel packages and book your dream trip."
              actionLabel="Browse Packages"
              onAction={() => navigation.navigate('Tabs', { screen: 'Packages', params: { screen: 'PackagesList' } })}
            />
          ) : null
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.cream,
  },
  profileHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    padding: spacing.lg,
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.creamDark,
  },
  logoutBtn: {
    padding: spacing.sm,
  },
  sectionTitle: {
    padding: spacing.lg,
    paddingBottom: spacing.sm,
  },
  list: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xl,
    flexGrow: 1,
  },
});
