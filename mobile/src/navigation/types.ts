import type { NavigatorScreenParams } from '@react-navigation/native';

export type HomeStackParamList = {
  HomeScreen: undefined;
  DestinationDetail: { slug: string };
  PackageDetail: { id: string };
};

export type DestinationsStackParamList = {
  DestinationsList: undefined;
  DestinationDetail: { slug: string };
  PackageDetail: { id: string };
};

export type PackagesStackParamList = {
  PackagesList: undefined;
  PackageDetail: { id: string };
};

export type ProfileStackParamList = {
  Dashboard: undefined;
  Login: undefined;
  Signup: undefined;
};

export type TabParamList = {
  Home: NavigatorScreenParams<HomeStackParamList>;
  Destinations: NavigatorScreenParams<DestinationsStackParamList>;
  Packages: NavigatorScreenParams<PackagesStackParamList>;
  Profile: NavigatorScreenParams<ProfileStackParamList>;
};

export type RootStackParamList = {
  Tabs: NavigatorScreenParams<TabParamList>;
  Booking: undefined;
  BookingConfirmation: undefined;
};
