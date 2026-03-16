'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import DestinationSelector from '@/components/destinations/DestinationSelector';
import api from '@/lib/api';
import { Destination } from '@/types';

export default function DestinationsPage() {
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [activeTab, setActiveTab] = useState<'indian' | 'foreign'>('indian');

  useEffect(() => {
    api.get('/destinations').then((res) => setDestinations(res.data.data)).catch(() => {});
  }, []);

  const filtered = destinations.filter((d) => d.type === activeTab);

  return (
    <>
      <Navbar />
      <main>
        {/* Hero Banner */}
        <section className="relative h-72 md:h-96 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage:
                'url(https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1920&q=80)',
            }}
          />
          <div className="absolute inset-0 bg-black/50" />
          <div className="relative z-10 text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="font-serif text-4xl md:text-5xl font-bold text-white mb-4"
            >
              Destinations
            </motion.h1>
            <p className="text-white/80 font-light text-lg">
              Explore our handpicked collection of extraordinary places
            </p>
          </div>
        </section>

        {/* Selector */}
        <section className="py-12 bg-cream">
          <div className="max-w-7xl mx-auto px-4">
            <DestinationSelector />
          </div>
        </section>

        {/* Tabs + Grid */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-center gap-4 mb-12">
              {(['indian', 'foreign'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`py-3 px-8 rounded-full font-medium transition-all ${
                    activeTab === tab
                      ? 'bg-gold text-white shadow-md'
                      : 'bg-cream text-charcoal hover:bg-cream-dark'
                  }`}
                >
                  {tab === 'indian' ? 'India' : 'International'}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {filtered.map((dest, i) => (
                <motion.div
                  key={dest._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                >
                  <Link href={`/destinations/${dest.slug}`}>
                    <div className="group relative h-80 rounded-2xl overflow-hidden cursor-pointer">
                      <Image
                        src={dest.image}
                        alt={dest.name}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                      <div className="absolute bottom-0 left-0 right-0 p-6">
                        <h3 className="font-serif text-xl font-semibold text-white mb-1">
                          {dest.name}
                        </h3>
                        <p className="text-white/70 text-sm font-light">{dest.country}</p>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
