
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, Home, Calendar, Video, Contact, User, Login } from 'lucide-react';

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { name: 'Home', icon: Home, href: '#home' },
    { name: 'Classes', icon: Calendar, href: '#classes' },
    { name: 'Videos', icon: Video, href: '#videos' },
    { name: 'Contact', icon: Contact, href: '#contact' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-martial-dark/95 backdrop-blur-sm border-b border-martial-gray">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <h1 className="text-2xl font-bold text-white">
              Martial Arts <span className="text-martial-purple">Academy</span>
            </h1>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-gray-300 hover:text-martial-purple px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300 flex items-center gap-2"
                >
                  <item.icon size={16} />
                  {item.name}
                </a>
              ))}
            </div>
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="ghost" className="text-gray-300 hover:text-martial-purple">
              <Login size={16} className="mr-2" />
              Login
            </Button>
            <Button className="btn-primary">
              Sign Up
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-300 hover:text-martial-purple"
            >
              <Menu size={24} />
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-gray-300 hover:text-martial-purple block px-3 py-2 rounded-md text-base font-medium transition-colors duration-300 flex items-center gap-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <item.icon size={16} />
                  {item.name}
                </a>
              ))}
              <div className="pt-4 space-y-2">
                <Button variant="ghost" className="w-full text-gray-300 hover:text-martial-purple">
                  <Login size={16} className="mr-2" />
                  Login
                </Button>
                <Button className="w-full btn-primary">
                  Sign Up
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
