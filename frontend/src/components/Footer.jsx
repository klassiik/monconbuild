import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
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
              <a href="https://www.cslb.ca.gov/801602" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-colors">License #801602</a>
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-bold text-lg mb-6">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="hover:text-blue-400 transition-colors duration-300">Home</Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-blue-400 transition-colors duration-300">Services</Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-blue-400 transition-colors duration-300">About Us</Link>
              </li>
              <li>
                <Link to="/portfolio" className="hover:text-blue-400 transition-colors duration-300">Portfolio</Link>
              </li>
              <li>
                <Link to="/service-areas" className="hover:text-blue-400 transition-colors duration-300">Service Areas</Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-blue-400 transition-colors duration-300">Contact</Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-white font-bold text-lg mb-6">Our Services</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/services/finish-carpentry" className="hover:text-blue-400 transition-colors duration-300">Finish Carpentry</Link>
              </li>
              <li>
                <Link to="/services/general-construction" className="hover:text-blue-400 transition-colors duration-300">General Construction</Link>
              </li>
              <li>
                <Link to="/services/residential-projects" className="hover:text-blue-400 transition-colors duration-300">Residential Projects</Link>
              </li>
              <li>
                <Link to="/services/home-additions" className="hover:text-blue-400 transition-colors duration-300">Home Additions</Link>
              </li>
              <li>
                <Link to="/services/custom-woodwork" className="hover:text-blue-400 transition-colors duration-300">Custom Woodwork</Link>
              </li>
              <li>
                <Link to="/services/complete-remodeling" className="hover:text-blue-400 transition-colors duration-300">Complete Remodeling</Link>
              </li>
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
                <a href="tel:9166071972" className="hover:text-blue-400 transition-colors duration-300">
                  (916) 607-1972
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-blue-400 flex-shrink-0" />
                <a href="mailto:monumentconstruction@comcast.net" className="hover:text-blue-400 transition-colors duration-300 break-all">
                  monumentconstruction@comcast.net
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
  );
};

export default Footer;