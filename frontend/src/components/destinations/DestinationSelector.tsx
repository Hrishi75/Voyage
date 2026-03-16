'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import api from '@/lib/api';
import { Destination } from '@/types';
import { HiChevronDown } from 'react-icons/hi';

export default function DestinationSelector() {
  const router = useRouter();
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [type, setType] = useState<'indian' | 'foreign' | ''>('');
  const [selectedSlug, setSelectedSlug] = useState('');

  useEffect(() => {
    if (!type) return;
    api.get(`/destinations?type=${type}`).then((res) => setDestinations(res.data.data)).catch(() => {});
  }, [type]);

  const handleGo = () => {
    if (selectedSlug) router.push(`/destinations/${selectedSlug}`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-2xl shadow-lg p-8 max-w-2xl mx-auto"
    >
      <h3 className="font-serif text-xl font-semibold text-charcoal mb-6 text-center">
        Find Your Dream Destination
      </h3>
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <select
            value={type}
            onChange={(e) => { setType(e.target.value as any); setSelectedSlug(''); }}
            className="w-full appearance-none border border-gray-200 rounded-xl py-3 px-4 pr-10 text-charcoal bg-white focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold transition-colors"
          >
            <option value="">Select Region</option>
            <option value="indian">India</option>
            <option value="foreign">International</option>
          </select>
          <HiChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-slate pointer-events-none" />
        </div>

        <div className="relative flex-1">
          <select
            value={selectedSlug}
            onChange={(e) => setSelectedSlug(e.target.value)}
            disabled={!type}
            className="w-full appearance-none border border-gray-200 rounded-xl py-3 px-4 pr-10 text-charcoal bg-white focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold transition-colors disabled:opacity-50"
          >
            <option value="">Select Destination</option>
            {destinations.map((d) => (
              <option key={d._id} value={d.slug}>{d.name}</option>
            ))}
          </select>
          <HiChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-slate pointer-events-none" />
        </div>

        <button
          onClick={handleGo}
          disabled={!selectedSlug}
          className="bg-gold text-white rounded-xl py-3 px-8 font-medium hover:bg-gold-dark transition-colors disabled:opacity-50"
        >
          Explore
        </button>
      </div>
    </motion.div>
  );
}
