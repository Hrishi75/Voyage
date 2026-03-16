import Link from 'next/link';
import { HiMail, HiPhone, HiLocationMarker } from 'react-icons/hi';

export default function Footer() {
  return (
    <footer className="bg-charcoal text-cream-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <h3 className="font-serif text-2xl font-bold text-white tracking-widest mb-4">
              VOYAGE
            </h3>
            <p className="text-sm font-light leading-relaxed text-gray-400">
              Handcrafted luxury travel experiences that transform your journey into an extraordinary adventure.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-serif text-lg font-semibold text-white mb-4">Explore</h4>
            <ul className="space-y-3">
              {[
                { href: '/destinations', label: 'Destinations' },
                { href: '/packages', label: 'Packages' },
                { href: '/auth/signup', label: 'Create Account' },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 hover:text-gold transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Destinations */}
          <div>
            <h4 className="font-serif text-lg font-semibold text-white mb-4">Top Destinations</h4>
            <ul className="space-y-3">
              {['Maldives', 'Kerala', 'Switzerland', 'Rajasthan', 'Bali', 'Paris'].map((dest) => (
                <li key={dest}>
                  <Link
                    href={`/destinations/${dest.toLowerCase()}`}
                    className="text-sm text-gray-400 hover:text-gold transition-colors"
                  >
                    {dest}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-serif text-lg font-semibold text-white mb-4">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-sm text-gray-400">
                <HiMail className="text-gold" />
                hello@voyagetravel.com
              </li>
              <li className="flex items-center gap-2 text-sm text-gray-400">
                <HiPhone className="text-gold" />
                +91 98765 43210
              </li>
              <li className="flex items-center gap-2 text-sm text-gray-400">
                <HiLocationMarker className="text-gold" />
                Mumbai, India
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-12 pt-8 text-center">
          <p className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()} Voyage. All rights reserved. Crafted with passion for luxury travel.
          </p>
        </div>
      </div>
    </footer>
  );
}
