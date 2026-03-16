'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import api from '@/lib/api';
import { Inquiry } from '@/types';
import { HiCalendar, HiUsers, HiClipboardList } from 'react-icons/hi';
import clsx from 'clsx';

const statusColors: Record<string, string> = {
  pending: 'bg-yellow-100 text-yellow-800',
  contacted: 'bg-blue-100 text-blue-800',
  confirmed: 'bg-green-100 text-green-800',
  cancelled: 'bg-red-100 text-red-800',
};

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/login');
    }
  }, [status, router]);

  useEffect(() => {
    if (!session) return;
    const token = (session as any)?.accessToken;
    api
      .get('/inquiries/mine', { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => setInquiries(res.data.data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [session]);

  if (status === 'loading' || status === 'unauthenticated') {
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
      <main className="min-h-screen bg-cream pt-28 pb-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="font-serif text-3xl md:text-4xl font-bold text-charcoal mb-2">
              Welcome back, {session?.user?.name?.split(' ')[0]}
            </h1>
            <p className="text-slate font-light mb-10">
              Track your travel inquiries and upcoming trips
            </p>
          </motion.div>

          {loading ? (
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-white rounded-2xl p-6 animate-pulse">
                  <div className="h-4 bg-cream-dark rounded w-1/3 mb-3" />
                  <div className="h-3 bg-cream-dark rounded w-1/2" />
                </div>
              ))}
            </div>
          ) : inquiries.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-white rounded-2xl p-12 text-center shadow-sm"
            >
              <HiClipboardList className="text-5xl text-slate/30 mx-auto mb-4" />
              <h2 className="font-serif text-xl font-semibold text-charcoal mb-2">
                No inquiries yet
              </h2>
              <p className="text-slate font-light mb-6">
                Start planning your dream trip — explore our curated packages!
              </p>
              <a
                href="/packages"
                className="inline-block bg-gold text-white rounded-xl py-3 px-8 font-medium hover:bg-gold-dark transition-colors"
              >
                Browse Packages
              </a>
            </motion.div>
          ) : (
            <div className="space-y-4">
              {inquiries.map((inquiry, i) => (
                <motion.div
                  key={inquiry._id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <h3 className="font-serif text-lg font-semibold text-charcoal">
                        {typeof inquiry.package === 'object' ? inquiry.package.name : 'Travel Package'}
                      </h3>
                      <div className="flex flex-wrap items-center gap-4 mt-2 text-sm text-slate">
                        <span className="capitalize flex items-center gap-1">
                          <span className="w-2 h-2 rounded-full bg-gold" />
                          {inquiry.tierName.replace('-', ' ')}
                        </span>
                        <span className="flex items-center gap-1">
                          <HiCalendar className="text-gold" />
                          {new Date(inquiry.travelDates.from).toLocaleDateString()} — {new Date(inquiry.travelDates.to).toLocaleDateString()}
                        </span>
                        <span className="flex items-center gap-1">
                          <HiUsers className="text-gold" />
                          {inquiry.travelers} traveler(s)
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span
                        className={clsx(
                          'text-xs font-medium py-1.5 px-4 rounded-full capitalize',
                          statusColors[inquiry.status] || 'bg-gray-100 text-gray-800'
                        )}
                      >
                        {inquiry.status}
                      </span>
                      <span className="text-xs text-slate">
                        {new Date(inquiry.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
