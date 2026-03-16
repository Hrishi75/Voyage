'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import api from '@/lib/api';
import { Package } from '@/types';
import { HiClock, HiLocationMarker } from 'react-icons/hi';

export default function FeaturedPackages() {
  const [packages, setPackages] = useState<Package[]>([]);

  useEffect(() => {
    api.get('/packages/featured').then((res) => setPackages(res.data.data)).catch(() => {});
  }, []);

  if (packages.length === 0) return null;

  return (
    <section className="py-24 bg-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-gold tracking-[0.3em] uppercase text-sm font-medium mb-3">
            Curated Experiences
          </p>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-charcoal">
            Popular Packages
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {packages.map((pkg, i) => {
            const lowestPrice = Math.min(...pkg.tiers.map((t) => t.price));
            return (
              <motion.div
                key={pkg._id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
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
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>

        <div className="text-center mt-12">
          <Link
            href="/packages"
            className="inline-block border-2 border-gold text-gold rounded-full py-3 px-8 font-medium hover:bg-gold hover:text-white transition-all"
          >
            View All Packages
          </Link>
        </div>
      </div>
    </section>
  );
}
