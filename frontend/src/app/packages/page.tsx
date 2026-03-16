'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import api from '@/lib/api';
import { Package } from '@/types';
import { HiClock, HiLocationMarker } from 'react-icons/hi';

export default function PackagesPage() {
  const [packages, setPackages] = useState<Package[]>([]);

  useEffect(() => {
    api.get('/packages').then((res) => setPackages(res.data.data)).catch(() => {});
  }, []);

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
                'url(https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=1920&q=80)',
            }}
          />
          <div className="absolute inset-0 bg-black/50" />
          <div className="relative z-10 text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="font-serif text-4xl md:text-5xl font-bold text-white mb-4"
            >
              Travel Packages
            </motion.h1>
            <p className="text-white/80 font-light text-lg">
              Curated luxury experiences for every kind of traveler
            </p>
          </div>
        </section>

        {/* Packages Grid */}
        <section className="py-16 bg-cream">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {packages.length === 0 ? (
              <p className="text-slate font-light text-center py-12">Loading packages...</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {packages.map((pkg, i) => {
                  const lowestPrice = Math.min(...pkg.tiers.map((t) => t.price));
                  return (
                    <motion.div
                      key={pkg._id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: i * 0.05 }}
                    >
                      <Link href={`/packages/${pkg._id}`}>
                        <div className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                          <div className="relative h-56 overflow-hidden">
                            <Image
                              src={pkg.images[0] || '/images/placeholder.jpg'}
                              alt={pkg.name}
                              fill
                              className="object-cover transition-transform duration-500 group-hover:scale-110"
                              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                            />
                            <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full py-1.5 px-4">
                              <span className="text-gold font-semibold text-sm">
                                From &#8377;{lowestPrice.toLocaleString('en-IN')}
                              </span>
                            </div>
                          </div>
                          <div className="p-6">
                            <div className="flex items-center gap-4 text-sm text-slate mb-3">
                              <span className="flex items-center gap-1">
                                <HiLocationMarker className="text-gold" />
                                {pkg.destination?.name}
                              </span>
                              <span className="flex items-center gap-1">
                                <HiClock className="text-gold" />
                                {pkg.duration}
                              </span>
                            </div>
                            <h3 className="font-serif text-xl font-semibold text-charcoal mb-2">
                              {pkg.name}
                            </h3>
                            <p className="text-slate text-sm font-light line-clamp-2">
                              {pkg.description}
                            </p>
                            <div className="flex gap-2 mt-4">
                              {pkg.tiers.map((tier) => (
                                <span
                                  key={tier.name}
                                  className="text-xs bg-cream rounded-full py-1 px-3 text-slate capitalize"
                                >
                                  {tier.name.replace('-', ' ')}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </Link>
                    </motion.div>
                  );
                })}
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
