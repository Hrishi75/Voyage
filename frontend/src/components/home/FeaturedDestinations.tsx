'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import api from '@/lib/api';
import { Destination } from '@/types';

export default function FeaturedDestinations() {
  const [destinations, setDestinations] = useState<Destination[]>([]);

  useEffect(() => {
    api.get('/destinations/featured').then((res) => setDestinations(res.data.data)).catch(() => {});
  }, []);

  if (destinations.length === 0) return null;

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-gold tracking-[0.3em] uppercase text-sm font-medium mb-3">
            Handpicked For You
          </p>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-charcoal">
            Featured Destinations
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {destinations.map((dest, i) => (
            <motion.div
              key={dest._id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
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

        <div className="text-center mt-12">
          <Link
            href="/destinations"
            className="inline-block border-2 border-gold text-gold rounded-full py-3 px-8 font-medium hover:bg-gold hover:text-white transition-all"
          >
            View All Destinations
          </Link>
        </div>
      </div>
    </section>
  );
}
