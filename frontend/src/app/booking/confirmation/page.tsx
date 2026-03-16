'use client';

import { Suspense } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useSession } from 'next-auth/react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { HiCheck } from 'react-icons/hi';

function ConfirmationContent() {
  const { data: session } = useSession();

  return (
    <section className="py-24 bg-cream min-h-screen flex items-center">
      <div className="max-w-lg mx-auto px-4 text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
          className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-8"
        >
          <HiCheck className="text-white text-4xl" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h1 className="font-serif text-3xl md:text-4xl font-bold text-charcoal mb-4">
            Thank You!
          </h1>
          <p className="text-slate font-light text-lg mb-2">
            We&apos;ve received your travel inquiry.
          </p>
          <p className="text-slate font-light mb-8">
            Our luxury travel consultant will contact you within <span className="font-semibold text-charcoal">24 hours</span> to
            discuss your trip details and finalize your booking.
          </p>

          <div className="bg-white rounded-2xl p-6 shadow-sm mb-8">
            <p className="text-sm text-slate mb-2">What happens next?</p>
            <ul className="text-left space-y-3">
              {[
                'A travel consultant will review your preferences',
                'You\'ll receive a detailed itinerary via email',
                'We\'ll customize everything to your liking',
                'Confirm and get ready for your dream trip!',
              ].map((step, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-gold/10 text-gold flex items-center justify-center flex-shrink-0 text-xs font-semibold">
                    {i + 1}
                  </span>
                  <span className="text-sm text-charcoal font-light">{step}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/"
              className="bg-gold text-white rounded-xl py-3 px-8 font-medium hover:bg-gold-dark transition-colors"
            >
              Back to Home
            </Link>
            {session && (
              <Link
                href="/dashboard"
                className="border-2 border-gold text-gold rounded-xl py-3 px-8 font-medium hover:bg-gold hover:text-white transition-all"
              >
                View Dashboard
              </Link>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default function ConfirmationPage() {
  return (
    <>
      <Navbar />
      <Suspense fallback={<div className="min-h-screen bg-cream" />}>
        <ConfirmationContent />
      </Suspense>
      <Footer />
    </>
  );
}
