'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import api from '@/lib/api';
import { Package, Tier } from '@/types';
import toast from 'react-hot-toast';
import { HiCheck, HiArrowLeft, HiArrowRight } from 'react-icons/hi';
import clsx from 'clsx';

const steps = [
  'Confirm Selection',
  'Travel Details',
  'Your Information',
  'Special Requests',
  'Review & Submit',
];

function BookingContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { data: session } = useSession();

  const packageId = searchParams.get('package') || '';
  const tierName = searchParams.get('tier') || '';

  const [pkg, setPkg] = useState<Package | null>(null);
  const [selectedTier, setSelectedTier] = useState<Tier | null>(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [submitting, setSubmitting] = useState(false);

  const [form, setForm] = useState({
    dateFrom: '',
    dateTo: '',
    travelers: 2,
    fullName: '',
    email: '',
    phone: '',
    specialRequests: '',
  });

  useEffect(() => {
    if (!packageId) return;
    api.get(`/packages/${packageId}`).then((res) => {
      const data = res.data.data;
      setPkg(data);
      const tier = data.tiers.find((t: Tier) => t.name === tierName) || data.tiers[0];
      setSelectedTier(tier);
    }).catch(() => {});
  }, [packageId, tierName]);

  useEffect(() => {
    if (session?.user) {
      setForm((prev) => ({
        ...prev,
        fullName: prev.fullName || session.user?.name || '',
        email: prev.email || session.user?.email || '',
      }));
    }
  }, [session]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const canAdvance = () => {
    switch (currentStep) {
      case 0: return !!pkg && !!selectedTier;
      case 1: return !!form.dateFrom && !!form.dateTo && form.travelers >= 1;
      case 2: return !!form.fullName && !!form.email && !!form.phone;
      case 3: return true;
      case 4: return true;
      default: return false;
    }
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      const token = (session as any)?.accessToken;
      const headers: Record<string, string> = {};
      if (token) headers.Authorization = `Bearer ${token}`;

      const res = await api.post('/inquiries', {
        packageId: pkg?._id,
        tierName: selectedTier?.name,
        fullName: form.fullName,
        email: form.email,
        phone: form.phone,
        travelDates: { from: form.dateFrom, to: form.dateTo },
        travelers: form.travelers,
        specialRequests: form.specialRequests,
      }, { headers });

      router.push(`/booking/confirmation?id=${res.data.data._id}`);
    } catch {
      toast.error('Failed to submit inquiry. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (!pkg) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-cream">
        <div className="animate-pulse text-slate font-light">Loading...</div>
      </div>
    );
  }

  const tierLabel = selectedTier?.name.replace('-', ' ') || '';

  return (
    <section className="py-12 bg-cream min-h-screen">
      <div className="max-w-3xl mx-auto px-4">
        {/* Step Indicator */}
        <div className="flex items-center justify-center mb-12">
          {steps.map((step, i) => (
            <div key={i} className="flex items-center">
              <div
                className={clsx(
                  'w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all',
                  i < currentStep
                    ? 'bg-gold text-white'
                    : i === currentStep
                    ? 'bg-gold text-white shadow-lg shadow-gold/30'
                    : 'bg-cream-dark text-slate'
                )}
              >
                {i < currentStep ? <HiCheck /> : i + 1}
              </div>
              {i < steps.length - 1 && (
                <div
                  className={clsx(
                    'w-8 sm:w-16 h-0.5 mx-1',
                    i < currentStep ? 'bg-gold' : 'bg-cream-dark'
                  )}
                />
              )}
            </div>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-2xl shadow-lg p-8"
          >
            <h2 className="font-serif text-2xl font-semibold text-charcoal mb-6">
              {steps[currentStep]}
            </h2>

            {/* Step 0: Confirm Selection */}
            {currentStep === 0 && (
              <div className="space-y-4">
                <div className="bg-cream rounded-xl p-6">
                  <p className="text-sm text-slate mb-1">Package</p>
                  <p className="text-lg font-semibold text-charcoal">{pkg.name}</p>
                  <p className="text-sm text-slate mt-1">{pkg.destination?.name} &middot; {pkg.duration}</p>
                </div>
                <div className="bg-cream rounded-xl p-6">
                  <p className="text-sm text-slate mb-1">Selected Tier</p>
                  <p className="text-lg font-semibold text-charcoal capitalize">{tierLabel}</p>
                  <p className="text-gold font-bold text-xl mt-1">
                    &#8377;{selectedTier?.price.toLocaleString('en-IN')} <span className="text-sm text-slate font-normal">/ {selectedTier?.priceLabel}</span>
                  </p>
                </div>
                <div className="bg-cream rounded-xl p-6">
                  <p className="text-sm text-slate mb-2">Change Tier</p>
                  <div className="flex gap-2">
                    {pkg.tiers.map((tier) => (
                      <button
                        key={tier.name}
                        onClick={() => setSelectedTier(tier)}
                        className={clsx(
                          'py-2 px-4 rounded-xl text-sm font-medium transition-all capitalize',
                          selectedTier?.name === tier.name
                            ? 'bg-gold text-white'
                            : 'bg-white border border-gray-200 text-charcoal hover:border-gold'
                        )}
                      >
                        {tier.name.replace('-', ' ')}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Step 1: Travel Details */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-charcoal mb-1">Travel From</label>
                    <input
                      type="date"
                      name="dateFrom"
                      value={form.dateFrom}
                      onChange={handleChange}
                      className="w-full border border-gray-200 rounded-xl py-3 px-4 text-charcoal focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-charcoal mb-1">Travel To</label>
                    <input
                      type="date"
                      name="dateTo"
                      value={form.dateTo}
                      onChange={handleChange}
                      className="w-full border border-gray-200 rounded-xl py-3 px-4 text-charcoal focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-charcoal mb-1">Number of Travelers</label>
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => setForm({ ...form, travelers: Math.max(1, form.travelers - 1) })}
                      className="w-10 h-10 rounded-xl bg-cream flex items-center justify-center text-charcoal hover:bg-cream-dark transition-colors"
                    >
                      -
                    </button>
                    <span className="text-xl font-semibold text-charcoal w-8 text-center">{form.travelers}</span>
                    <button
                      onClick={() => setForm({ ...form, travelers: form.travelers + 1 })}
                      className="w-10 h-10 rounded-xl bg-cream flex items-center justify-center text-charcoal hover:bg-cream-dark transition-colors"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Your Information */}
            {currentStep === 2 && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-charcoal mb-1">Full Name</label>
                  <input
                    type="text"
                    name="fullName"
                    value={form.fullName}
                    onChange={handleChange}
                    className="w-full border border-gray-200 rounded-xl py-3 px-4 text-charcoal focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-charcoal mb-1">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    className="w-full border border-gray-200 rounded-xl py-3 px-4 text-charcoal focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold"
                    placeholder="you@example.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-charcoal mb-1">Phone</label>
                  <input
                    type="tel"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    className="w-full border border-gray-200 rounded-xl py-3 px-4 text-charcoal focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold"
                    placeholder="+91 98765 43210"
                  />
                </div>
              </div>
            )}

            {/* Step 3: Special Requests */}
            {currentStep === 3 && (
              <div>
                <label className="block text-sm font-medium text-charcoal mb-1">
                  Special Requests <span className="text-slate font-light">(optional)</span>
                </label>
                <textarea
                  name="specialRequests"
                  value={form.specialRequests}
                  onChange={handleChange}
                  rows={5}
                  className="w-full border border-gray-200 rounded-xl py-3 px-4 text-charcoal focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold resize-none"
                  placeholder="Dietary requirements, room preferences, accessibility needs, celebration arrangements..."
                />
              </div>
            )}

            {/* Step 4: Review */}
            {currentStep === 4 && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-cream rounded-xl p-4">
                    <p className="text-xs text-slate uppercase tracking-wider mb-1">Package</p>
                    <p className="font-semibold text-charcoal">{pkg.name}</p>
                  </div>
                  <div className="bg-cream rounded-xl p-4">
                    <p className="text-xs text-slate uppercase tracking-wider mb-1">Tier</p>
                    <p className="font-semibold text-charcoal capitalize">{tierLabel}</p>
                  </div>
                  <div className="bg-cream rounded-xl p-4">
                    <p className="text-xs text-slate uppercase tracking-wider mb-1">Dates</p>
                    <p className="font-semibold text-charcoal">{form.dateFrom} to {form.dateTo}</p>
                  </div>
                  <div className="bg-cream rounded-xl p-4">
                    <p className="text-xs text-slate uppercase tracking-wider mb-1">Travelers</p>
                    <p className="font-semibold text-charcoal">{form.travelers}</p>
                  </div>
                  <div className="bg-cream rounded-xl p-4">
                    <p className="text-xs text-slate uppercase tracking-wider mb-1">Name</p>
                    <p className="font-semibold text-charcoal">{form.fullName}</p>
                  </div>
                  <div className="bg-cream rounded-xl p-4">
                    <p className="text-xs text-slate uppercase tracking-wider mb-1">Contact</p>
                    <p className="font-semibold text-charcoal">{form.email}</p>
                    <p className="text-sm text-slate">{form.phone}</p>
                  </div>
                </div>
                {form.specialRequests && (
                  <div className="bg-cream rounded-xl p-4">
                    <p className="text-xs text-slate uppercase tracking-wider mb-1">Special Requests</p>
                    <p className="text-charcoal font-light">{form.specialRequests}</p>
                  </div>
                )}
                <div className="bg-gold/10 border border-gold/20 rounded-xl p-4 text-center">
                  <p className="text-gold font-bold text-2xl">
                    &#8377;{((selectedTier?.price || 0) * form.travelers).toLocaleString('en-IN')}
                  </p>
                  <p className="text-sm text-slate">Estimated total for {form.travelers} traveler(s)</p>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <div className="flex justify-between mt-8">
          <button
            onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
            disabled={currentStep === 0}
            className="flex items-center gap-2 text-charcoal font-medium hover:text-gold transition-colors disabled:opacity-30"
          >
            <HiArrowLeft /> Back
          </button>
          {currentStep < 4 ? (
            <button
              onClick={() => setCurrentStep(currentStep + 1)}
              disabled={!canAdvance()}
              className="flex items-center gap-2 bg-gold text-white rounded-xl py-3 px-6 font-medium hover:bg-gold-dark transition-colors disabled:opacity-50"
            >
              Next <HiArrowRight />
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={submitting}
              className="bg-gold text-white rounded-xl py-3 px-8 font-medium hover:bg-gold-dark transition-colors disabled:opacity-50"
            >
              {submitting ? 'Submitting...' : 'Submit Inquiry'}
            </button>
          )}
        </div>
      </div>
    </section>
  );
}

export default function BookingPage() {
  return (
    <>
      <Navbar />
      <Suspense fallback={<div className="min-h-screen bg-cream" />}>
        <BookingContent />
      </Suspense>
      <Footer />
    </>
  );
}
