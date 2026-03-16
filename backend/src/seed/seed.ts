import mongoose from 'mongoose';
import { config } from '../config/env';
import Destination from '../models/Destination';
import Package from '../models/Package';

const destinations = [
  // Indian Destinations
  {
    name: 'Goa',
    slug: 'goa',
    country: 'India',
    type: 'indian' as const,
    image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=800',
    description: 'Sun-kissed beaches, vibrant nightlife, and Portuguese heritage — Goa is India\'s ultimate coastal paradise.',
    featured: true,
  },
  {
    name: 'Kerala',
    slug: 'kerala',
    country: 'India',
    type: 'indian' as const,
    image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=800',
    description: 'Serene backwaters, lush tea plantations, and Ayurvedic wellness — God\'s Own Country awaits.',
    featured: true,
  },
  {
    name: 'Rajasthan',
    slug: 'rajasthan',
    country: 'India',
    type: 'indian' as const,
    image: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?w=800',
    description: 'Majestic forts, golden deserts, and royal heritage — experience the land of kings.',
    featured: true,
  },
  {
    name: 'Kashmir',
    slug: 'kashmir',
    country: 'India',
    type: 'indian' as const,
    image: 'https://images.unsplash.com/photo-1597074866923-dc0589150a32?w=800',
    description: 'Snow-capped mountains, pristine lakes, and floating gardens — Paradise on Earth.',
    featured: true,
  },
  {
    name: 'Ladakh',
    slug: 'ladakh',
    country: 'India',
    type: 'indian' as const,
    image: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=800',
    description: 'Breathtaking high-altitude landscapes, ancient monasteries, and adventure beyond limits.',
    featured: false,
  },
  {
    name: 'Andaman Islands',
    slug: 'andaman',
    country: 'India',
    type: 'indian' as const,
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800',
    description: 'Crystal-clear waters, pristine coral reefs, and untouched tropical beaches.',
    featured: false,
  },
  {
    name: 'Himachal Pradesh',
    slug: 'himachal-pradesh',
    country: 'India',
    type: 'indian' as const,
    image: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=800',
    description: 'Alpine meadows, charming hill stations, and adventure trails in the Himalayas.',
    featured: false,
  },
  {
    name: 'Uttarakhand',
    slug: 'uttarakhand',
    country: 'India',
    type: 'indian' as const,
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800',
    description: 'Sacred rivers, yoga retreats, and majestic Himalayan peaks — the Dev Bhoomi.',
    featured: false,
  },
  // Foreign Destinations
  {
    name: 'Maldives',
    slug: 'maldives',
    country: 'Maldives',
    type: 'foreign' as const,
    image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=800',
    description: 'Overwater villas, turquoise lagoons, and world-class diving — the ultimate island escape.',
    featured: true,
  },
  {
    name: 'Bali',
    slug: 'bali',
    country: 'Indonesia',
    type: 'foreign' as const,
    image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800',
    description: 'Ancient temples, terraced rice paddies, and vibrant culture — the Island of the Gods.',
    featured: true,
  },
  {
    name: 'Switzerland',
    slug: 'switzerland',
    country: 'Switzerland',
    type: 'foreign' as const,
    image: 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?w=800',
    description: 'Snow-capped Alps, pristine lakes, and charming villages — Europe\'s crown jewel.',
    featured: true,
  },
  {
    name: 'Paris',
    slug: 'paris',
    country: 'France',
    type: 'foreign' as const,
    image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800',
    description: 'The city of lights, love, and haute couture — timeless elegance at every corner.',
    featured: true,
  },
  {
    name: 'Dubai',
    slug: 'dubai',
    country: 'UAE',
    type: 'foreign' as const,
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800',
    description: 'Futuristic skyline, luxury shopping, and desert adventures — where dreams touch the sky.',
    featured: false,
  },
  {
    name: 'Thailand',
    slug: 'thailand',
    country: 'Thailand',
    type: 'foreign' as const,
    image: 'https://images.unsplash.com/photo-1528181304800-259b08848526?w=800',
    description: 'Golden temples, tropical islands, and world-famous cuisine — the Land of Smiles.',
    featured: false,
  },
  {
    name: 'Greece',
    slug: 'greece',
    country: 'Greece',
    type: 'foreign' as const,
    image: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?w=800',
    description: 'Whitewashed villages, azure seas, and ancient ruins — Mediterranean magic.',
    featured: false,
  },
  {
    name: 'Japan',
    slug: 'japan',
    country: 'Japan',
    type: 'foreign' as const,
    image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800',
    description: 'Cherry blossoms, ancient traditions, and cutting-edge modernity — a world apart.',
    featured: false,
  },
];

const createPackages = (destinationId: mongoose.Types.ObjectId, destSlug: string) => {
  const packageTemplates: Record<string, Array<{
    name: string;
    slug: string;
    description: string;
    duration: string;
    highlights: string[];
    featured: boolean;
    tiers: Array<{
      name: 'deluxe' | 'luxury' | 'ultra-luxury';
      price: number;
      priceLabel: string;
      inclusions: string[];
      hotel: string;
      meals: string;
      transport: string;
    }>;
  }>> = {
    goa: [
      {
        name: 'Goa Beach Bliss',
        slug: 'goa-beach-bliss',
        description: 'Experience the best of Goa\'s stunning coastline with luxury beachfront stays, water sports, and vibrant nightlife.',
        duration: '4 Nights / 5 Days',
        highlights: ['Beach hopping tour', 'Sunset cruise', 'Old Goa heritage walk', 'Spice plantation visit', 'Water sports adventure'],
        featured: true,
        tiers: [
          { name: 'deluxe', price: 25000, priceLabel: 'per person', inclusions: ['Airport transfers', 'Daily breakfast', 'Beach tour', 'Sunset cruise'], hotel: 'Cidade de Goa', meals: 'Breakfast included', transport: 'AC sedan transfers' },
          { name: 'luxury', price: 45000, priceLabel: 'per person', inclusions: ['Airport transfers', 'All meals', 'Beach tour', 'Sunset cruise', 'Spa session', 'Water sports'], hotel: 'Taj Fort Aguada', meals: 'All meals included', transport: 'Luxury SUV transfers' },
          { name: 'ultra-luxury', price: 85000, priceLabel: 'per person', inclusions: ['Private jet transfers', 'All meals & drinks', 'Private beach tour', 'Yacht cruise', 'Couple spa', 'All water sports', 'Personal butler'], hotel: 'W Goa', meals: 'All-inclusive dining & drinks', transport: 'Private luxury vehicle with chauffeur' },
        ],
      },
      {
        name: 'Goa Heritage & Culture',
        slug: 'goa-heritage-culture',
        description: 'Discover Goa\'s rich Portuguese heritage, ancient temples, and culinary traditions.',
        duration: '3 Nights / 4 Days',
        highlights: ['Old Goa churches tour', 'Spice plantation lunch', 'Cooking class', 'Fontainhas Latin Quarter walk'],
        featured: false,
        tiers: [
          { name: 'deluxe', price: 18000, priceLabel: 'per person', inclusions: ['Airport transfers', 'Daily breakfast', 'Heritage tour', 'Cooking class'], hotel: 'Country Inn Goa', meals: 'Breakfast included', transport: 'AC sedan' },
          { name: 'luxury', price: 35000, priceLabel: 'per person', inclusions: ['Airport transfers', 'All meals', 'Private heritage tour', 'Cooking class', 'Wine tasting'], hotel: 'Park Hyatt Goa', meals: 'All meals included', transport: 'Luxury sedan' },
          { name: 'ultra-luxury', price: 65000, priceLabel: 'per person', inclusions: ['Private transfers', 'All meals & drinks', 'Private guide', 'Chef\'s table experience', 'Wine cellar tour', 'Spa'], hotel: 'ITC Grand Goa', meals: 'All-inclusive with premium dining', transport: 'Premium SUV with chauffeur' },
        ],
      },
    ],
    kerala: [
      {
        name: 'Kerala Backwater Retreat',
        slug: 'kerala-backwater-retreat',
        description: 'Cruise through tranquil backwaters, explore tea plantations, and rejuvenate with authentic Ayurvedic treatments.',
        duration: '5 Nights / 6 Days',
        highlights: ['Houseboat cruise in Alleppey', 'Munnar tea plantations', 'Ayurvedic spa treatment', 'Kathakali performance', 'Periyar wildlife sanctuary'],
        featured: true,
        tiers: [
          { name: 'deluxe', price: 30000, priceLabel: 'per person', inclusions: ['Airport transfers', 'Breakfast', 'Houseboat stay', 'Tea plantation tour'], hotel: 'Spice Village Thekkady', meals: 'Breakfast included', transport: 'AC sedan' },
          { name: 'luxury', price: 55000, priceLabel: 'per person', inclusions: ['Airport transfers', 'All meals', 'Premium houseboat', 'Tea plantation', 'Ayurvedic spa', 'Wildlife safari'], hotel: 'Taj Kumarakom', meals: 'All meals included', transport: 'Luxury SUV' },
          { name: 'ultra-luxury', price: 110000, priceLabel: 'per person', inclusions: ['Helicopter transfer', 'All meals & drinks', 'Private luxury houseboat', 'Private guide', 'Royal Ayurvedic package', 'Private wildlife tour', 'Cooking class with chef'], hotel: 'Oberoi Motor Vessel Vrinda', meals: 'All-inclusive premium dining', transport: 'Private helicopter & luxury vehicle' },
        ],
      },
    ],
    rajasthan: [
      {
        name: 'Royal Rajasthan Circuit',
        slug: 'royal-rajasthan-circuit',
        description: 'Journey through majestic forts, opulent palaces, and golden desert dunes like royalty.',
        duration: '7 Nights / 8 Days',
        highlights: ['Amber Fort elephant ride', 'Udaipur lake palace visit', 'Desert safari in Jaisalmer', 'Jodhpur blue city tour', 'Royal dinner at palace'],
        featured: true,
        tiers: [
          { name: 'deluxe', price: 40000, priceLabel: 'per person', inclusions: ['Transfers', 'Breakfast', 'Fort tours', 'Desert safari', 'Cultural show'], hotel: 'Heritage haveli hotels', meals: 'Breakfast included', transport: 'AC SUV' },
          { name: 'luxury', price: 75000, priceLabel: 'per person', inclusions: ['All transfers', 'All meals', 'Private fort tours', 'Luxury desert camp', 'Royal dinner', 'Spa'], hotel: 'Taj Lake Palace & Umaid Bhawan', meals: 'All meals included', transport: 'Luxury SUV with guide' },
          { name: 'ultra-luxury', price: 150000, priceLabel: 'per person', inclusions: ['Private charter', 'All meals & drinks', 'Private historian guide', 'Royal tent in desert', 'Palace dinner with folk performance', 'Personal butler', 'Helicopter tour'], hotel: 'Oberoi Udaivilas & Rajvilas', meals: 'All-inclusive royal dining', transport: 'Private aircraft & luxury convoy' },
        ],
      },
    ],
    kashmir: [
      {
        name: 'Kashmir Valley Paradise',
        slug: 'kashmir-valley-paradise',
        description: 'Float on Dal Lake, wander through Mughal gardens, and witness the breathtaking beauty of the Kashmir valley.',
        duration: '5 Nights / 6 Days',
        highlights: ['Shikara ride on Dal Lake', 'Mughal Gardens tour', 'Gulmarg gondola ride', 'Pahalgam valley excursion', 'Saffron field visit'],
        featured: true,
        tiers: [
          { name: 'deluxe', price: 28000, priceLabel: 'per person', inclusions: ['Airport transfers', 'Breakfast', 'Shikara ride', 'Garden tours', 'Gulmarg day trip'], hotel: 'Hotel Grand Mumtaz', meals: 'Breakfast included', transport: 'AC sedan' },
          { name: 'luxury', price: 50000, priceLabel: 'per person', inclusions: ['Airport transfers', 'All meals', 'Private shikara', 'All tours', 'Gondola ride', 'Kashmiri cooking class'], hotel: 'The Lalit Grand Palace', meals: 'All meals with Wazwan dinner', transport: 'Luxury SUV' },
          { name: 'ultra-luxury', price: 95000, priceLabel: 'per person', inclusions: ['Helicopter transfer', 'All meals & drinks', 'Luxury houseboat stay', 'Private guide', 'Gondola & skiing', 'Royal Wazwan feast', 'Saffron & pashmina shopping tour'], hotel: 'Burzin & Vivanta Dal Lake', meals: 'All-inclusive with private chef', transport: 'Helicopter & premium SUV' },
        ],
      },
    ],
    maldives: [
      {
        name: 'Maldives Island Escape',
        slug: 'maldives-island-escape',
        description: 'Indulge in overwater luxury with pristine beaches, world-class diving, and unforgettable sunsets.',
        duration: '4 Nights / 5 Days',
        highlights: ['Overwater villa stay', 'Snorkeling with manta rays', 'Sunset dolphin cruise', 'Underwater restaurant dining', 'Private island picnic'],
        featured: true,
        tiers: [
          { name: 'deluxe', price: 80000, priceLabel: 'per person', inclusions: ['Speedboat transfers', 'Breakfast & dinner', 'Snorkeling trip', 'Sunset cruise'], hotel: 'Adaaran Select Hudhuranfushi', meals: 'Half board', transport: 'Speedboat transfers' },
          { name: 'luxury', price: 150000, priceLabel: 'per person', inclusions: ['Seaplane transfer', 'All meals', 'Diving experience', 'Dolphin cruise', 'Spa treatment', 'Water sports'], hotel: 'Conrad Maldives Rangali Island', meals: 'Full board with premium dining', transport: 'Seaplane transfers' },
          { name: 'ultra-luxury', price: 300000, priceLabel: 'per person', inclusions: ['Private seaplane', 'All-inclusive', 'Private diving guide', 'Private yacht cruise', 'Couple overwater spa', 'Underwater restaurant', 'Private island dinner', 'Personal butler'], hotel: 'Soneva Fushi', meals: 'All-inclusive with fine dining', transport: 'Private seaplane & yacht' },
        ],
      },
    ],
    bali: [
      {
        name: 'Bali Tropical Paradise',
        slug: 'bali-tropical-paradise',
        description: 'Explore ancient temples, lush rice terraces, and pristine beaches in the Island of the Gods.',
        duration: '5 Nights / 6 Days',
        highlights: ['Ubud rice terrace walk', 'Uluwatu temple sunset', 'Mount Batur sunrise trek', 'Balinese cooking class', 'Beach club day'],
        featured: true,
        tiers: [
          { name: 'deluxe', price: 35000, priceLabel: 'per person', inclusions: ['Airport transfers', 'Breakfast', 'Temple tours', 'Rice terrace visit', 'Beach day'], hotel: 'Alila Seminyak', meals: 'Breakfast included', transport: 'AC car transfers' },
          { name: 'luxury', price: 65000, priceLabel: 'per person', inclusions: ['Airport transfers', 'All meals', 'Private temple tours', 'Sunrise trek', 'Cooking class', 'Spa', 'Beach club'], hotel: 'The Mulia Bali', meals: 'All meals included', transport: 'Private luxury car' },
          { name: 'ultra-luxury', price: 130000, priceLabel: 'per person', inclusions: ['Private transfers', 'All meals & drinks', 'Private guide', 'Helicopter tour', 'Private villa with pool', 'Daily spa', 'Private beach dinner', 'Personal concierge'], hotel: 'Four Seasons Sayan', meals: 'All-inclusive with private chef', transport: 'Luxury vehicle & helicopter' },
        ],
      },
    ],
    switzerland: [
      {
        name: 'Swiss Alps Adventure',
        slug: 'swiss-alps-adventure',
        description: 'Journey through the majestic Swiss Alps with scenic train rides, charming villages, and breathtaking mountain views.',
        duration: '6 Nights / 7 Days',
        highlights: ['Jungfraujoch excursion', 'Glacier Express ride', 'Lake Lucerne cruise', 'Interlaken adventure sports', 'Swiss chocolate workshop'],
        featured: true,
        tiers: [
          { name: 'deluxe', price: 90000, priceLabel: 'per person', inclusions: ['Airport transfers', 'Breakfast', 'Swiss Travel Pass', 'Jungfraujoch ticket', 'Lake cruise'], hotel: '3-star Swiss hotels', meals: 'Breakfast included', transport: 'Swiss Travel Pass' },
          { name: 'luxury', price: 160000, priceLabel: 'per person', inclusions: ['Airport transfers', 'All meals', 'First-class Swiss Pass', 'All excursions', 'Chocolate workshop', 'Spa'], hotel: 'Victoria Jungfrau & Beau-Rivage', meals: 'All meals included', transport: 'First-class rail & private transfers' },
          { name: 'ultra-luxury', price: 280000, priceLabel: 'per person', inclusions: ['Private transfers', 'All meals & drinks', 'Private Glacier Express cabin', 'Helicopter Alpine tour', 'Private guide', 'Fondue dinner in chalet', 'Luxury spa', 'Personal concierge'], hotel: 'The Dolder Grand & Badrutt\'s Palace', meals: 'All-inclusive with Michelin dining', transport: 'Private helicopter & chauffeured car' },
        ],
      },
    ],
    paris: [
      {
        name: 'Enchanting Paris',
        slug: 'enchanting-paris',
        description: 'Fall in love with the City of Lights — from the Eiffel Tower to the Louvre, experience Parisian elegance.',
        duration: '4 Nights / 5 Days',
        highlights: ['Eiffel Tower private access', 'Louvre guided tour', 'Seine river cruise', 'Versailles day trip', 'Montmartre walking tour'],
        featured: false,
        tiers: [
          { name: 'deluxe', price: 70000, priceLabel: 'per person', inclusions: ['Airport transfers', 'Breakfast', 'Eiffel Tower ticket', 'Louvre ticket', 'Metro pass'], hotel: 'Hotel Le Comtesse', meals: 'Breakfast included', transport: 'Metro pass & airport transfers' },
          { name: 'luxury', price: 130000, priceLabel: 'per person', inclusions: ['Airport transfers', 'All meals', 'Skip-the-line Eiffel Tower', 'Private Louvre tour', 'Seine cruise', 'Versailles', 'Spa'], hotel: 'Le Bristol Paris', meals: 'All meals with French cuisine', transport: 'Private chauffeur' },
          { name: 'ultra-luxury', price: 250000, priceLabel: 'per person', inclusions: ['Private transfers', 'All meals & champagne', 'Private Eiffel dinner', 'After-hours Louvre', 'Private yacht on Seine', 'Versailles private tour', 'Shopping with stylist', 'Michelin star dining'], hotel: 'Ritz Paris', meals: 'All-inclusive Michelin dining', transport: 'Luxury limousine with chauffeur' },
        ],
      },
    ],
    dubai: [
      {
        name: 'Dubai Luxury Getaway',
        slug: 'dubai-luxury-getaway',
        description: 'Experience the pinnacle of modern luxury with iconic skyscrapers, desert adventures, and world-class entertainment.',
        duration: '4 Nights / 5 Days',
        highlights: ['Burj Khalifa at the top', 'Desert safari with BBQ dinner', 'Dubai Mall & fountain show', 'Dhow cruise dinner', 'Palm Jumeirah tour'],
        featured: false,
        tiers: [
          { name: 'deluxe', price: 45000, priceLabel: 'per person', inclusions: ['Airport transfers', 'Breakfast', 'Burj Khalifa ticket', 'Desert safari', 'City tour'], hotel: 'Hilton Dubai Creek', meals: 'Breakfast included', transport: 'Shared transfers' },
          { name: 'luxury', price: 85000, priceLabel: 'per person', inclusions: ['Airport transfers', 'All meals', 'Burj Khalifa VIP', 'Premium desert safari', 'Dhow cruise', 'Aquaventure'], hotel: 'Atlantis The Palm', meals: 'All meals included', transport: 'Private luxury transfers' },
          { name: 'ultra-luxury', price: 180000, priceLabel: 'per person', inclusions: ['Limousine transfers', 'All meals & drinks', 'Burj Khalifa private lounge', 'Private desert camp', 'Yacht cruise', 'Helicopter tour', 'Personal shopper', 'Butler service'], hotel: 'Burj Al Arab', meals: 'All-inclusive with celebrity chef dining', transport: 'Rolls Royce chauffeur service' },
        ],
      },
    ],
    thailand: [
      {
        name: 'Thailand Explorer',
        slug: 'thailand-explorer',
        description: 'From Bangkok\'s golden temples to Phuket\'s crystal waters — discover the best of the Land of Smiles.',
        duration: '5 Nights / 6 Days',
        highlights: ['Grand Palace tour', 'Phi Phi island day trip', 'Thai cooking class', 'Floating market visit', 'Thai massage experience'],
        featured: false,
        tiers: [
          { name: 'deluxe', price: 30000, priceLabel: 'per person', inclusions: ['Airport transfers', 'Breakfast', 'Temple tours', 'Island day trip', 'Cooking class'], hotel: 'Centara Grand Bangkok & Phuket resort', meals: 'Breakfast included', transport: 'AC minivan' },
          { name: 'luxury', price: 55000, priceLabel: 'per person', inclusions: ['Airport transfers', 'All meals', 'Private temple tour', 'Speedboat island tour', 'Cooking class', 'Spa', 'Floating market'], hotel: 'Mandarin Oriental Bangkok & Banyan Tree Phuket', meals: 'All meals included', transport: 'Private car & speedboat' },
          { name: 'ultra-luxury', price: 110000, priceLabel: 'per person', inclusions: ['Private jet transfer', 'All meals & drinks', 'Private long-tail boat', 'Private island visit', 'Royal Thai spa', 'Private chef dinner on beach', 'Personal guide', 'Luxury yacht day'], hotel: 'Four Seasons Bangkok & Amanpuri Phuket', meals: 'All-inclusive with private dining', transport: 'Private jet & luxury yacht' },
        ],
      },
    ],
    greece: [
      {
        name: 'Greek Island Odyssey',
        slug: 'greek-island-odyssey',
        description: 'Sail through the Aegean Sea, explore ancient ruins, and watch legendary sunsets in Santorini.',
        duration: '6 Nights / 7 Days',
        highlights: ['Santorini sunset', 'Acropolis guided tour', 'Mykonos beach day', 'Wine tasting in Santorini', 'Traditional Greek cooking class'],
        featured: false,
        tiers: [
          { name: 'deluxe', price: 75000, priceLabel: 'per person', inclusions: ['Airport transfers', 'Breakfast', 'Ferry tickets', 'Acropolis tour', 'Wine tasting'], hotel: 'Boutique hotels in Santorini & Athens', meals: 'Breakfast included', transport: 'Ferry & local transfers' },
          { name: 'luxury', price: 140000, priceLabel: 'per person', inclusions: ['All transfers', 'All meals', 'Private Acropolis tour', 'Catamaran cruise', 'Wine tour', 'Cooking class', 'Spa'], hotel: 'Canaves Oia & Hotel Grande Bretagne', meals: 'All meals with Greek cuisine', transport: 'Domestic flights & private transfers' },
          { name: 'ultra-luxury', price: 260000, priceLabel: 'per person', inclusions: ['Private transfers', 'All meals & drinks', 'Private yacht island hopping', 'Helicopter tour', 'Private sunset dinner', 'Personal concierge', 'VIP archaeological tour', 'Luxury spa retreat'], hotel: 'Grace Hotel Santorini & Four Seasons Athens', meals: 'All-inclusive with private chef', transport: 'Private yacht & helicopter' },
        ],
      },
    ],
    japan: [
      {
        name: 'Japan Cultural Journey',
        slug: 'japan-cultural-journey',
        description: 'Experience the perfect blend of ancient tradition and modern innovation across Japan\'s iconic cities.',
        duration: '7 Nights / 8 Days',
        highlights: ['Tokyo Shibuya & Akihabara', 'Mount Fuji day trip', 'Kyoto temples & geisha district', 'Osaka street food tour', 'Bullet train experience'],
        featured: false,
        tiers: [
          { name: 'deluxe', price: 85000, priceLabel: 'per person', inclusions: ['Airport transfers', 'Breakfast', 'JR Rail Pass', 'Temple tours', 'Mt Fuji trip', 'Food tour'], hotel: 'Hotel Gracery Shinjuku & Kyoto Granbell', meals: 'Breakfast included', transport: 'JR Rail Pass' },
          { name: 'luxury', price: 155000, priceLabel: 'per person', inclusions: ['All transfers', 'All meals', 'Green car JR Pass', 'Private temple tours', 'Tea ceremony', 'Sumo experience', 'Spa'], hotel: 'Park Hyatt Tokyo & Ritz-Carlton Kyoto', meals: 'All meals with kaiseki dining', transport: 'Green car JR Pass & private transfers' },
          { name: 'ultra-luxury', price: 300000, priceLabel: 'per person', inclusions: ['Private transfers', 'All meals & sake', 'Private geisha dinner', 'Helicopter Mt Fuji tour', 'Private tea master ceremony', 'Michelin omakase', 'Personal guide', 'Ryokan experience'], hotel: 'Aman Tokyo & Hoshinoya Kyoto', meals: 'All-inclusive with Michelin dining', transport: 'Private car & first-class rail' },
        ],
      },
    ],
    ladakh: [
      {
        name: 'Ladakh Himalayan Explorer',
        slug: 'ladakh-himalayan-explorer',
        description: 'Conquer the highest passes, visit ancient monasteries, and experience the stark beauty of Ladakh.',
        duration: '6 Nights / 7 Days',
        highlights: ['Pangong Lake visit', 'Nubra Valley & Hunder dunes', 'Thiksey Monastery', 'Khardung La pass', 'River rafting on Zanskar'],
        featured: false,
        tiers: [
          { name: 'deluxe', price: 32000, priceLabel: 'per person', inclusions: ['Airport transfers', 'Breakfast', 'Pangong trip', 'Nubra Valley', 'Monastery tours'], hotel: 'Hotel Grand Dragon', meals: 'Breakfast included', transport: 'AC SUV' },
          { name: 'luxury', price: 58000, priceLabel: 'per person', inclusions: ['Airport transfers', 'All meals', 'All excursions', 'River rafting', 'Private guide', 'Oxygen support'], hotel: 'The Grand Dragon & luxury camps', meals: 'All meals included', transport: 'Premium SUV with driver' },
          { name: 'ultra-luxury', price: 120000, priceLabel: 'per person', inclusions: ['Helicopter transfers', 'All meals & drinks', 'Luxury glamping', 'Private guide', 'All adventures', 'Monastery meditation session', 'Personal doctor on call'], hotel: 'TUTC Luxury Camps & Chamba Camp', meals: 'All-inclusive gourmet dining', transport: 'Helicopter & luxury convoy' },
        ],
      },
    ],
    andaman: [
      {
        name: 'Andaman Island Getaway',
        slug: 'andaman-island-getaway',
        description: 'Dive into crystal-clear waters, explore virgin beaches, and discover underwater wonders.',
        duration: '4 Nights / 5 Days',
        highlights: ['Radhanagar Beach', 'Scuba diving at Havelock', 'Ross Island tour', 'Mangrove kayaking', 'Bioluminescence night tour'],
        featured: false,
        tiers: [
          { name: 'deluxe', price: 25000, priceLabel: 'per person', inclusions: ['Airport transfers', 'Breakfast', 'Ferry tickets', 'Beach tours', 'Snorkeling'], hotel: 'SeaShell Havelock', meals: 'Breakfast included', transport: 'Ferry & local transfers' },
          { name: 'luxury', price: 48000, priceLabel: 'per person', inclusions: ['All transfers', 'All meals', 'Scuba diving', 'Island tours', 'Kayaking', 'Glass-bottom boat'], hotel: 'Taj Exotica Andamans', meals: 'All meals included', transport: 'Private speedboat & transfers' },
          { name: 'ultra-luxury', price: 95000, priceLabel: 'per person', inclusions: ['Helicopter transfer', 'All meals & drinks', 'Private diving guide', 'Private island excursion', 'Luxury yacht cruise', 'Beachfront candlelight dinner', 'Personal butler'], hotel: 'Jalakara & private beach villa', meals: 'All-inclusive with seafood specials', transport: 'Helicopter & private yacht' },
        ],
      },
    ],
  };

  return packageTemplates[destSlug] || [];
};

const seed = async () => {
  try {
    await mongoose.connect(config.mongoUri);
    console.log('Connected to MongoDB for seeding...');

    // Clear existing data
    await Destination.deleteMany({});
    await Package.deleteMany({});
    console.log('Cleared existing data.');

    // Insert destinations
    const insertedDestinations = await Destination.insertMany(destinations);
    console.log(`Inserted ${insertedDestinations.length} destinations.`);

    // Insert packages for each destination
    let totalPackages = 0;
    for (const dest of insertedDestinations) {
      const packages = createPackages(dest._id as mongoose.Types.ObjectId, dest.slug);
      if (packages.length > 0) {
        const packagesWithDest = packages.map((pkg) => ({
          ...pkg,
          destination: dest._id,
          images: [dest.image],
        }));
        await Package.insertMany(packagesWithDest);
        totalPackages += packages.length;
      }
    }
    console.log(`Inserted ${totalPackages} packages.`);

    console.log('Seeding complete!');
    process.exit(0);
  } catch (error) {
    console.error('Seeding error:', error);
    process.exit(1);
  }
};

seed();
