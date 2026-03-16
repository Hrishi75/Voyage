import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import HeroSection from '@/components/home/HeroSection';
import FeaturedDestinations from '@/components/home/FeaturedDestinations';
import FeaturedPackages from '@/components/home/FeaturedPackages';
import Testimonials from '@/components/home/Testimonials';

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <FeaturedDestinations />
        <FeaturedPackages />
        <Testimonials />
      </main>
      <Footer />
    </>
  );
}
