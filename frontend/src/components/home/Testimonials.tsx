'use client';

import { motion } from 'framer-motion';
import { HiStar } from 'react-icons/hi';

const testimonials = [
  {
    name: 'Priya Sharma',
    destination: 'Maldives',
    text: 'An absolutely magical experience! The overwater villa was breathtaking, and every detail was perfectly arranged. Voyage made our honeymoon truly unforgettable.',
    rating: 5,
  },
  {
    name: 'Rahul Mehta',
    destination: 'Rajasthan',
    text: 'The Royal Rajasthan Circuit exceeded all expectations. From the palace stays to the desert safari, everything was curated with impeccable taste. Will definitely book again!',
    rating: 5,
  },
  {
    name: 'Ananya Patel',
    destination: 'Switzerland',
    text: 'The Swiss Alps package was a dream come true. First-class train rides, stunning mountain views, and luxurious hotels. Voyage handles everything so you just enjoy.',
    rating: 5,
  },
];

export default function Testimonials() {
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
            Traveler Stories
          </p>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-charcoal">
            What Our Guests Say
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="bg-cream rounded-2xl p-8"
            >
              <div className="flex gap-1 mb-4">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <HiStar key={j} className="text-gold text-lg" />
                ))}
              </div>
              <p className="text-charcoal font-light leading-relaxed mb-6 italic">
                &ldquo;{t.text}&rdquo;
              </p>
              <div>
                <p className="font-semibold text-charcoal">{t.name}</p>
                <p className="text-sm text-slate">Traveled to {t.destination}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
