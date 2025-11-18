import React, { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Button } from './ui/button';
import { Menu, X, Phone } from 'lucide-react';
import { CONTACT_INFO } from '../utils/constants';
import ErrorBoundary from './ErrorBoundary';
import { handleError } from '../utils/errorHandler';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  try {
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
      <ErrorBoundary>
        <header className="bg-white shadow-md sticky top-0 z-50">
          <div className="container mx-auto px-6 md:px-12">
            <div className="flex items-center justify-between py-4">
              {/* Logo */}
              <Link to="/" className="flex items-center" aria-label="Monument Construction Home">
                <img 
                  src="/logo.svg" 
                  alt="Monument Construction - Licensed Contractor Colfax CA" 
                  className="h-16 md:h-20 w-auto"
                  onError={(e) => {
                    handleError(new Error('Failed to load logo image'), 'IMAGE_LOAD_ERROR', 'LOW', {
                      component: 'Header',
                      imageSource: '/logo.svg'
                    });
                  }}
                />
              </Link>

              {/* Desktop Navigation */}
              <nav className="hidden lg:flex items-center gap-8">
                {navItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`text-base font-medium transition-colors duration-300 hover:text-green-700 ${
                      isActive(item.path) ? 'text-green-700 font-bold' : 'text-gray-700'
                    }`}
                  >
                    {item.name}
                  </Link>
                ))}
              </nav>

              {/* Desktop CTA */}
              <div className="hidden lg:flex items-center gap-4">
                <a 
                  href={`tel:${CONTACT_INFO.PHONE}`} 
                  className="text-green-700 font-semibold hover:text-blue-700 transition-colors duration-300"
                  aria-label={`Call ${CONTACT_INFO.FORMATTED_PHONE}`}
                >
                  {CONTACT_INFO.FORMATTED_PHONE}
                </a>
                <Button 
                  className="bg-green-700 hover:bg-green-800 text-white transition-all duration-300"
                  asChild
                >
                  <Link to="/contact">Get Quote</Link>
                </Button>
              </div>

              {/* Mobile Menu Button */}
              <button
                className="lg:hidden text-gray-700 hover:text-green-700 transition-colors duration-300"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-expanded={isMenuOpen}
                aria-controls="mobile-menu"
                aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              >
                {isMenuOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
              </button>
            </div>

            {/* Mobile Navigation */}
            {isMenuOpen && (
              <nav id="mobile-menu" className="lg:hidden py-6 border-t border-gray-200">
                <div className="flex flex-col gap-4">
                  {navItems.map((item) => (
                    <Link
                      key={item.path}
                      to={item.path}
                      className={`text-lg font-medium transition-colors duration-300 hover:text-green-700 py-2 ${
                        isActive(item.path) ? 'text-green-700 font-bold' : 'text-gray-700'
                      }`}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  ))}
                  <a 
                    href={`tel:${CONTACT_INFO.PHONE}`}
                    className="flex items-center gap-2 text-lg font-semibold text-green-700 py-2"
                    aria-label={`Call ${CONTACT_INFO.FORMATTED_PHONE}`}
                  >
                    <Phone className="w-5 h-5" />
                    {CONTACT_INFO.FORMATTED_PHONE}
                  </a>
                  <Button 
                    className="bg-green-700 hover:bg-green-800 text-white w-full transition-all duration-300"
                    asChild
                  >
                    <Link to="/contact" onClick={() => setIsMenuOpen(false)}>Get Free Quote</Link>
                  </Button>
                </div>
              </nav>
            )}
          </div>
        </header>
      </ErrorBoundary>
    );
  } catch (error) {
    handleError(error, 'COMPONENT_RENDER_ERROR', 'HIGH', {
      component: 'Header',
      state: { isMenuOpen }
    });
    
    // Fallback minimal header in case of error
    return (
      <header className="bg-white shadow-md sticky top-0 z-50">
        <div className="container mx-auto px-6 md:px-12">
          <div className="flex items-center justify-between py-4">
            <Link to="/" className="flex items-center">
              <img 
                src="/logo.svg" 
                alt="Monument Construction - Licensed Contractor Colfax CA" 
                className="h-16 md:h-20 w-auto"
              />
            </Link>
            <div className="flex items-center gap-4">
              <a 
                href={`tel:${CONTACT_INFO.PHONE}`}
                className="text-green-700 font-semibold"
              >
                {CONTACT_INFO.FORMATTED_PHONE}
              </a>
              <Button asChild>
                <Link to="/contact">Get Quote</Link>
              </Button>
            </div>
          </div>
        </div>
      </header>
    );
  }
};

export default Header;
