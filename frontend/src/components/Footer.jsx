import React from 'react';
import { Phone, Mail, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import { CONTACT_INFO } from '../utils/constants';
import ErrorBoundary from './ErrorBoundary';
import { handleError } from '../utils/errorHandler';

const Footer = () => {
  try {
    const currentYear = new Date().getFullYear();
    
    const quickLinks = [
      { name: 'Home', path: '/' },
      { name: 'Services', path: '/services' },
      { name: 'About Us', path: '/about' },
      { name: 'Portfolio', path: '/portfolio' },
      { name: 'Service Areas', path: '/service-areas' },
      { name: 'Contact', path: '/contact' }
    ];
    
    const serviceLinks = [
      { name: 'Finish Carpentry', path: '/services/finish-carpentry' },
      { name: 'General Construction', path: '/services/general-construction' },
      { name: 'Residential Projects', path: '/services/residential-projects' },
      { name: 'Home Additions', path: '/services/home-additions' },
      { name: 'Custom Woodwork', path: '/services/custom-woodwork' },
      { name: 'Complete Remodeling', path: '/services/complete-remodeling' }
    ];

    return (
      <ErrorBoundary>
        <footer className="bg-green-900 text-gray-300">
          <div className="container mx-auto px-6 md:px-12 py-16">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
              {/* Company Info */}
              <div>
                <div className="mb-6">
                  <h3 className="text-2xl font-bold text-white mb-2">Monument Construction</h3>
                  <p className="text-sm text-gray-400">Expert Finish Carpentry & General Construction</p>
                </div>
                <p className="text-sm leading-relaxed mb-4">
                  Professional construction and finish carpentry services serving Placer and Nevada Counties.
                </p>
                <p className="text-sm font-semibold text-white">
                  <a 
                    href="https://www.cslb.ca.gov/801602" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="hover:text-blue-400 transition-colors"
                    aria-label="View California Contractor License #801602"
                  >
                    License #801602
                  </a>
                </p>
              </div>

              {/* Quick Links */}
              <div>
                <h3 className="text-white font-bold text-lg mb-6">Quick Links</h3>
                <ul className="space-y-3">
                  {quickLinks.map((link) => (
                    <li key={link.path}>
                      <Link 
                        to={link.path} 
                        className="hover:text-blue-400 transition-colors duration-300"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Services */}
              <div>
                <h3 className="text-white font-bold text-lg mb-6">Our Services</h3>
                <ul className="space-y-3">
                  {serviceLinks.map((link) => (
                    <li key={link.path}>
                      <Link 
                        to={link.path} 
                        className="hover:text-blue-400 transition-colors duration-300"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Contact Info */}
              <div>
                <h3 className="text-white font-bold text-lg mb-6">Contact Us</h3>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-blue-400 flex-shrink-0 mt-1" />
                    <span>Colfax, CA<br />Serving Placer & Nevada Counties</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-blue-400 flex-shrink-0" />
                    <a 
                      href={`tel:${CONTACT_INFO.PHONE}`} 
                      className="hover:text-blue-400 transition-colors duration-300"
                      aria-label={`Call ${CONTACT_INFO.FORMATTED_PHONE}`}
                    >
                      {CONTACT_INFO.FORMATTED_PHONE}
                    </a>
                  </li>
                  <li className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-blue-400 flex-shrink-0" />
                    <a 
                      href={`mailto:${CONTACT_INFO.EMAIL}`} 
                      className="hover:text-blue-400 transition-colors duration-300 break-all"
                      aria-label={`Email ${CONTACT_INFO.EMAIL}`}
                    >
                      {CONTACT_INFO.EMAIL}
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            <div className="border-t border-gray-700 mt-12 pt-8">
              <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                <p className="text-sm">
                  © {currentYear} Monument Construction. All rights reserved.
                </p>
                <p className="text-sm">
                  Licensed General Contractor #801602 | Colfax, California
                </p>
              </div>
            </div>
          </div>
        </footer>
      </ErrorBoundary>
    );
  } catch (error) {
    handleError(error, 'COMPONENT_RENDER_ERROR', 'HIGH', {
      component: 'Footer',
      timestamp: new Date().toISOString()
    });
    
    // Fallback minimal footer
    return (
      <footer className="bg-green-900 text-gray-300">
        <div className="container mx-auto px-6 md:px-12 py-16">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm mb-4 md:mb-0">
              © {new Date().getFullYear()} Monument Construction. All rights reserved.
            </p>
            <div className="flex items-center gap-4">
              <a href={`tel:${CONTACT_INFO.PHONE}`} className="text-sm">
                {CONTACT_INFO.FORMATTED_PHONE}
              </a>
              <a href={`mailto:${CONTACT_INFO.EMAIL}`} className="text-sm">
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </footer>
    );
  }
};

export default Footer;
