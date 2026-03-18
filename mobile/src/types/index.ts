export interface User {
  _id: string;
  name: string;
  email: string;
  avatar?: string;
  createdAt: string;
}

export interface Destination {
  _id: string;
  name: string;
  slug: string;
  country: string;
  type: 'indian' | 'foreign';
  image: string;
  description: string;
  featured: boolean;
}

export interface Tier {
  name: 'deluxe' | 'luxury' | 'ultra-luxury';
  price: number;
  priceLabel: string;
  inclusions: string[];
  hotel: string;
  meals: string;
  transport: string;
}

export interface Package {
  _id: string;
  destination: Destination;
  name: string;
  slug: string;
  description: string;
  duration: string;
  images: string[];
  highlights: string[];
  featured: boolean;
  tiers: Tier[];
}

export interface Inquiry {
  _id: string;
  user?: string;
  package: Package;
  tierName: string;
  fullName: string;
  email: string;
  phone: string;
  travelDates: {
    from: string;
    to: string;
  };
  travelers: number;
  specialRequests?: string;
  status: 'pending' | 'contacted' | 'confirmed' | 'cancelled';
  createdAt: string;
}
