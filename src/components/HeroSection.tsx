import { Button, Link } from '@/components/ui/button';

const HeroSection = () => {
  return (
    <section id="home" className="hero-gradient min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-gradient-to-r from-martial-purple/20 to-martial-blue/20"></div>
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="animate-fade-in">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Welcome to <br />
            <span className="text-martial-purple">Martial Arts Academy</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
            Empowering students through discipline, skill, and community. 
            Master the art of self-defense while building confidence and strength.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Link to="/classes">
              <Button className="btn-primary text-lg px-8 py-4">
                Book a Class Now
              </Button>
            </Link>
            <Link to="/videos">
              <Button className="btn-secondary text-lg px-8 py-4">
                Watch Training Videos
              </Button>
            </Link>
          </div>
          
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-4xl font-bold text-martial-purple mb-2">500+</div>
              <div className="text-gray-300">Students Trained</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-martial-purple mb-2">15+</div>
              <div className="text-gray-300">Years Experience</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-martial-purple mb-2">50+</div>
              <div className="text-gray-300">Video Lessons</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
