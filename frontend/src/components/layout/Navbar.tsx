'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiMenuAlt3, HiX } from 'react-icons/hi';
import clsx from 'clsx';

export default function Navbar() {
  const { data: session } = useSession();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '/destinations', label: 'Destinations' },
    { href: '/packages', label: 'Packages' },
  ];

  return (
    <>
      <nav
        className={clsx(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
          scrolled
            ? 'bg-white/95 backdrop-blur-md shadow-sm'
            : 'bg-transparent'
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <Link
              href="/"
              className={clsx(
                'font-serif text-2xl font-bold tracking-[0.25em] transition-colors',
                scrolled ? 'text-charcoal' : 'text-white'
              )}
            >
              VOYAGE
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={clsx(
                    'font-light tracking-wide transition-colors hover:text-gold',
                    scrolled ? 'text-charcoal' : 'text-white'
                  )}
                >
                  {link.label}
                </Link>
              ))}
              {session ? (
                <div className="flex items-center gap-4">
                  <Link
                    href="/dashboard"
                    className={clsx(
                      'font-light tracking-wide transition-colors hover:text-gold',
                      scrolled ? 'text-charcoal' : 'text-white'
                    )}
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={() => signOut()}
                    className="bg-gold/10 text-gold border border-gold/30 rounded-full py-2 px-5 text-sm font-medium hover:bg-gold hover:text-white transition-all"
                  >
                    Sign Out
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-3">
                  <Link
                    href="/auth/login"
                    className={clsx(
                      'font-light tracking-wide transition-colors hover:text-gold',
                      scrolled ? 'text-charcoal' : 'text-white'
                    )}
                  >
                    Login
                  </Link>
                  <Link
                    href="/auth/signup"
                    className="bg-gold text-white rounded-full py-2 px-5 text-sm font-medium hover:bg-gold-dark transition-colors"
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </div>

            {/* Mobile Toggle */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className={clsx('md:hidden text-2xl', scrolled ? 'text-charcoal' : 'text-white')}
            >
              {mobileOpen ? <HiX /> : <HiMenuAlt3 />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed inset-y-0 right-0 w-72 bg-white shadow-2xl z-50 p-8 md:hidden"
          >
            <button onClick={() => setMobileOpen(false)} className="text-2xl text-charcoal mb-8">
              <HiX />
            </button>
            <div className="flex flex-col gap-6">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="font-serif text-lg text-charcoal hover:text-gold transition-colors"
                >
                  {link.label}
                </Link>
              ))}
              {session ? (
                <>
                  <Link
                    href="/dashboard"
                    onClick={() => setMobileOpen(false)}
                    className="font-serif text-lg text-charcoal hover:text-gold transition-colors"
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={() => { signOut(); setMobileOpen(false); }}
                    className="bg-gold text-white rounded-xl py-3 px-4 font-medium text-center"
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/auth/login"
                    onClick={() => setMobileOpen(false)}
                    className="font-serif text-lg text-charcoal hover:text-gold transition-colors"
                  >
                    Login
                  </Link>
                  <Link
                    href="/auth/signup"
                    onClick={() => setMobileOpen(false)}
                    className="bg-gold text-white rounded-xl py-3 px-4 font-medium text-center"
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
