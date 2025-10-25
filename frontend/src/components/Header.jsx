import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Button } from './ui/button';
import { Menu, X, Phone } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services' },
    { name: 'About', path: '/about' },
    { name: 'Portfolio', path: '/portfolio' },
    { name: 'Service Areas', path: '/service-areas' },
    { name: 'Contact', path: '/contact' }
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <a href="/" className="flex items-center" aria-label="Monument Construction Home">
            <img 
              src="/logo.svg" 
              alt="Monument Construction - Licensed Contractor Colfax CA" 
              className="h-16 md:h-20 w-auto"
            />
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => (
              <a
                key={item.path}
                href={item.path}
                className={`text-base font-medium transition-colors duration-300 hover:text-blue-600 ${
                  isActive(item.path) ? 'text-blue-600 font-bold' : 'text-gray-700'
                }`}
              >
                {item.name}
              </a>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-4">
            <a href="tel:9166071972" className="text-blue-600 font-semibold hover:text-blue-700 transition-colors duration-300">
              (916) 607-1972
            </a>
            <Button 
              className="bg-blue-600 hover:bg-blue-700 text-white transition-all duration-300"
              asChild
            >
              <a href="/contact">Get Quote</a>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden text-gray-700 hover:text-blue-600 transition-colors duration-300"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="lg:hidden py-6 border-t border-gray-200">
            <div className="flex flex-col gap-4">
              {navItems.map((item) => (
                <a
                  key={item.path}
                  href={item.path}
                  className={`text-lg font-medium transition-colors duration-300 hover:text-blue-600 py-2 ${
                    isActive(item.path) ? 'text-blue-600 font-bold' : 'text-gray-700'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </a>
              ))}
              <a 
                href="tel:9166071972" 
                className="flex items-center gap-2 text-lg font-semibold text-blue-600 py-2"
              >
                <Phone className="w-5 h-5" />
                (916) 607-1972
              </a>
              <Button 
                className="bg-blue-600 hover:bg-blue-700 text-white w-full transition-all duration-300"
                asChild
              >
                <a href="/contact" onClick={() => setIsMenuOpen(false)}>Get Free Quote</a>
              </Button>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;