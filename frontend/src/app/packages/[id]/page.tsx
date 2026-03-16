'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import TierSelector from '@/components/packages/TierSelector';
import api from '@/lib/api';
import { Package } from '@/types';
import { HiClock, HiLocationMarker, HiSparkles } from 'react-icons/hi';

export default function PackageDetailPage() {
  const { id } = useParams();
  const [pkg, setPkg] = useState<Package | null>(null);

  useEffect(() => {
    if (!id) return;
    api.get(`/packages/${id}`).then((res) => setPkg(res.data.data)).catch(() => {});
  }, [id]);

  if (!pkg) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center bg-cream">
          <div className="animate-pulse text-slate font-light">Loading...</div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main>
        {/* Hero */}
        <section className="relative h-72 md:h-[28rem]">
          <Image
            src={pkg.images[0] || '/images/placeholder.jpg'}
            alt={pkg.name}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <Link
                  href={`/destinations/${pkg.destination?.slug}`}
                  className="text-gold tracking-widest uppercase text-sm mb-2 inline-block hover:text-gold-light"
                >
                  {pkg.destination?.name}, {pkg.destination?.country}
                </Link>
                <h1 className="font-serif text-3xl md:text-5xl font-bold text-white mb-3">
                  {pkg.name}
                </h1>
                <div className="flex items-center gap-6 text-white/80">
                  <span className="flex items-center gap-2">
                    <HiClock className="text-gold" />
                    {pkg.duration}
                  </span>
                  <span className="flex items-center gap-2">
                    <HiLocationMarker className="text-gold" />
                    {pkg.destination?.name}
                  </span>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Content */}
        <section className="py-16 bg-cream">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              {/* Left: Description + Highlights */}
              <div className="lg:col-span-1">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <h2 className="font-serif text-2xl font-bold text-charcoal mb-4">
                    About This Package
                  </h2>
                  <p className="text-slate font-light leading-relaxed mb-8">
                    {pkg.description}
                  </p>

                  <h3 className="font-serif text-xl font-semibold text-charcoal mb-4 flex items-center gap-2">
                    <HiSparkles className="text-gold" />
                    Highlights
                  </h3>
                  <ul className="space-y-3">
                    {pkg.highlights.map((h, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <span className="w-6 h-6 rounded-full bg-gold/10 text-gold flex items-center justify-center flex-shrink-0 text-xs font-semibold mt-0.5">
                          {i + 1}
                        </span>
                        <span className="text-charcoal font-light">{h}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </div>

              {/* Right: Tier Selection */}
              <div className="lg:col-span-2">
                <TierSelector tiers={pkg.tiers} packageId={pkg._id} />
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
