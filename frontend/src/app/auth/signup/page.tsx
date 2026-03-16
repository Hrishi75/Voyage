'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { FcGoogle } from 'react-icons/fc';
import api from '@/lib/api';

export default function SignupPage() {
  const router = useRouter();
  const [form, setForm] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    if (form.password.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }

    setLoading(true);

    try {
      await api.post('/auth/register', {
        name: form.name,
        email: form.email,
        password: form.password,
      });

      const result = await signIn('credentials', {
        email: form.email,
        password: form.password,
        redirect: false,
      });

      if (result?.error) {
        toast.error('Account created but could not sign in. Please login manually.');
        router.push('/auth/login');
      } else {
        toast.success('Welcome to Voyage!');
        router.push('/');
      }
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-cream px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-8">
          <Link href="/" className="font-serif text-3xl font-bold text-charcoal tracking-widest">
            VOYAGE
          </Link>
          <p className="text-slate mt-2 font-light">Begin your luxury travel journey</p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h2 className="font-serif text-2xl font-semibold text-charcoal mb-6">Create Account</h2>

          <button
            onClick={() => signIn('google', { callbackUrl: '/' })}
            className="w-full flex items-center justify-center gap-3 border border-gray-200 rounded-xl py-3 px-4 hover:bg-gray-50 transition-colors mb-6"
          >
            <FcGoogle className="text-xl" />
            <span className="text-charcoal font-medium">Continue with Google</span>
          </button>

          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-white px-4 text-slate">or sign up with email</span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-charcoal mb-1">Full Name</label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                className="w-full border border-gray-200 rounded-xl py-3 px-4 text-charcoal focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold transition-colors"
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
                required
                className="w-full border border-gray-200 rounded-xl py-3 px-4 text-charcoal focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold transition-colors"
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-charcoal mb-1">Password</label>
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                required
                className="w-full border border-gray-200 rounded-xl py-3 px-4 text-charcoal focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold transition-colors"
                placeholder="At least 6 characters"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-charcoal mb-1">Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                value={form.confirmPassword}
                onChange={handleChange}
                required
                className="w-full border border-gray-200 rounded-xl py-3 px-4 text-charcoal focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold transition-colors"
                placeholder="Confirm your password"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gold text-white rounded-xl py-3 px-4 font-medium hover:bg-gold-dark transition-colors disabled:opacity-50"
            >
              {loading ? 'Creating account...' : 'Create Account'}
            </button>
          </form>

          <p className="text-center text-slate text-sm mt-6">
            Already have an account?{' '}
            <Link href="/auth/login" className="text-gold font-medium hover:text-gold-dark">
              Sign In
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
