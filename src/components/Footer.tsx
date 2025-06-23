
import { Mail, User } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-martial-gray border-t border-martial-dark py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="md:col-span-2">
            <h3 className="text-2xl font-bold text-white mb-4">
              Martial Arts <span className="text-martial-purple">Academy</span>
            </h3>
            <p className="text-gray-300 mb-6 max-w-md">
              Empowering students through discipline, skill, and community. 
              Join us on your journey to martial arts mastery.
            </p>
            <div className="flex space-x-4">
              <div className="w-10 h-10 bg-martial-purple/20 rounded-full flex items-center justify-center hover:bg-martial-purple/30 transition-colors cursor-pointer">
                <User className="w-5 h-5 text-martial-purple" />
              </div>
              <div className="w-10 h-10 bg-martial-purple/20 rounded-full flex items-center justify-center hover:bg-martial-purple/30 transition-colors cursor-pointer">
                <Mail className="w-5 h-5 text-martial-purple" />
              </div>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Quick Links</h4>
            <ul className="space-y-3">
              <li><a href="#home" className="text-gray-300 hover:text-martial-purple transition-colors">Home</a></li>
              <li><a href="#classes" className="text-gray-300 hover:text-martial-purple transition-colors">Classes</a></li>
              <li><a href="#videos" className="text-gray-300 hover:text-martial-purple transition-colors">Videos</a></li>
              <li><a href="#contact" className="text-gray-300 hover:text-martial-purple transition-colors">Contact</a></li>
            </ul>
          </div>
          
          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Contact Info</h4>
            <div className="space-y-3 text-gray-300">
              <p>123 Martial Arts Street</p>
              <p>Training City, TC 12345</p>
              <p>Phone: (555) 123-4567</p>
              <p>Email: info@martialarts.academy</p>
            </div>
          </div>
        </div>
        
        <div className="border-t border-martial-dark mt-12 pt-8 text-center">
          <p className="text-gray-300">
            © 2024 Martial Arts Academy. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
