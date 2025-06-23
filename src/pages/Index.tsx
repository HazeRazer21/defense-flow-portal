
import Navigation from '@/components/Navigation';
import HeroSection from '@/components/HeroSection';
import ServiceCards from '@/components/ServiceCards';
import PhotoGallery from '@/components/PhotoGallery';
import TestimonialsSection from '@/components/TestimonialsSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-martial-dark">
      <Navigation />
      <HeroSection />
      <ServiceCards />
      <PhotoGallery />
      <TestimonialsSection />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default Index;
