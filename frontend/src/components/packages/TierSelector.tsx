'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Tier } from '@/types';
import { HiCheck, HiStar } from 'react-icons/hi';
import clsx from 'clsx';

interface TierSelectorProps {
  tiers: Tier[];
  packageId: string;
}

const tierConfig = {
  deluxe: { label: 'Deluxe', badge: null, accent: 'border-gray-200' },
  luxury: { label: 'Luxury', badge: 'Most Popular', accent: 'border-gold' },
  'ultra-luxury': { label: 'Ultra Luxury', badge: 'Premium', accent: 'border-gold-dark' },
};

export default function TierSelector({ tiers, packageId }: TierSelectorProps) {
  const router = useRouter();
  const [selectedTier, setSelectedTier] = useState<string>(
    tiers.find((t) => t.name === 'luxury')?.name || tiers[0]?.name || ''
  );

  return (
    <div>
      <h2 className="font-serif text-2xl md:text-3xl font-bold text-charcoal mb-8">
        Choose Your Experience
      </h2>

      {/* Mobile tabs */}
      <div className="flex md:hidden gap-2 mb-6 overflow-x-auto">
        {tiers.map((tier) => {
          const cfg = tierConfig[tier.name];
          return (
            <button
              key={tier.name}
              onClick={() => setSelectedTier(tier.name)}
              className={clsx(
                'py-2 px-4 rounded-full text-sm font-medium whitespace-nowrap transition-all',
                selectedTier === tier.name
                  ? 'bg-gold text-white'
                  : 'bg-cream text-charcoal'
              )}
            >
              {cfg.label}
            </button>
          );
        })}
      </div>

      {/* Desktop: 3-column cards, Mobile: show selected */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {tiers.map((tier, i) => {
          const cfg = tierConfig[tier.name];
          const isSelected = selectedTier === tier.name;
          const isLuxury = tier.name === 'luxury';

          return (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className={clsx(
                'md:block',
                !isSelected && 'hidden'
              )}
            >
              <div
                className={clsx(
                  'relative rounded-2xl border-2 p-6 transition-all cursor-pointer hover:shadow-lg',
                  isSelected ? cfg.accent + ' shadow-lg bg-white' : 'border-gray-100 bg-white',
                  isLuxury && 'md:scale-105 md:z-10'
                )}
                onClick={() => setSelectedTier(tier.name)}
              >
                {cfg.badge && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="bg-gold text-white text-xs font-medium py-1 px-4 rounded-full flex items-center gap-1">
                      <HiStar className="text-xs" />
                      {cfg.badge}
                    </span>
                  </div>
                )}

                <div className="text-center mb-6 pt-2">
                  <h3 className="font-serif text-xl font-semibold text-charcoal mb-1">
                    {cfg.label}
                  </h3>
                  <div className="flex items-baseline justify-center gap-1">
                    <span className="text-3xl font-bold text-gold">
                      &#8377;{tier.price.toLocaleString('en-IN')}
                    </span>
                    <span className="text-sm text-slate">/{tier.priceLabel}</span>
                  </div>
                </div>

                <div className="space-y-2 mb-6">
                  <div className="bg-cream-dark rounded-xl p-3">
                    <p className="text-xs text-slate uppercase tracking-wider mb-1">Hotel</p>
                    <p className="text-sm font-medium text-charcoal">{tier.hotel}</p>
                  </div>
                  <div className="bg-cream-dark rounded-xl p-3">
                    <p className="text-xs text-slate uppercase tracking-wider mb-1">Meals</p>
                    <p className="text-sm font-medium text-charcoal">{tier.meals}</p>
                  </div>
                  <div className="bg-cream-dark rounded-xl p-3">
                    <p className="text-xs text-slate uppercase tracking-wider mb-1">Transport</p>
                    <p className="text-sm font-medium text-charcoal">{tier.transport}</p>
                  </div>
                </div>

                <div className="space-y-2 mb-6">
                  <p className="text-xs text-slate uppercase tracking-wider font-medium">Inclusions</p>
                  {tier.inclusions.map((inc, j) => (
                    <div key={j} className="flex items-start gap-2">
                      <HiCheck className="text-gold mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-charcoal font-light">{inc}</span>
                    </div>
                  ))}
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    router.push(`/booking?package=${packageId}&tier=${tier.name}`);
                  }}
                  className={clsx(
                    'w-full py-3 rounded-xl font-medium transition-all',
                    isSelected || isLuxury
                      ? 'bg-gold text-white hover:bg-gold-dark'
                      : 'bg-cream text-charcoal hover:bg-cream-dark'
                  )}
                >
                  Book {cfg.label}
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
