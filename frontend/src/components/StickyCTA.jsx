import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Button } from './ui/button';
import { Phone } from 'lucide-react';
import { Link } from 'react-router-dom';
import { CONTACT_INFO } from '../utils/constants';
import ErrorBoundary from './ErrorBoundary';
import { handleError } from '../utils/errorHandler';

const StickyCTA = () => {
  const [visible, setVisible] = useState(false);
  const ticking = useRef(false);
  
  try {
    const handleScroll = useCallback(() => {
      const scrollY = window.scrollY;
      setVisible(scrollY > 600);
    }, []);
    
    useEffect(() => {
      const throttledScroll = () => {
        if (!ticking.current) {
          window.requestAnimationFrame(() => {
            handleScroll();
            ticking.current = false;
          });
          ticking.current = true;
        }
      };
      
      window.addEventListener('scroll', throttledScroll, { passive: true });
      return () => window.removeEventListener('scroll', throttledScroll);
    }, [handleScroll]);
    
    const handlePhoneClick = () => {
      // Track conversion event via GTM dataLayer
      try {
        if (window.dataLayer) {
          window.dataLayer.push({
            event: 'phone_call_click',
            eventCategory: 'engagement',
            eventLabel: window.location.pathname
          });
        }
      } catch (error) {
        handleError(error, 'GTM_TRACKING_ERROR', 'LOW', {
          component: 'StickyCTA',
          event: 'phone_call_click'
        });
      }
    };

    return (
      <ErrorBoundary>
        <div 
          className={`fixed bottom-0 left-0 right-0 bg-green-900 text-white py-4 shadow-2xl z-50 transition-transform duration-300 ${
            visible ? 'translate-y-0' : 'translate-y-full'
          }`}
          role="region"
          aria-label="Contact call-to-action"
        >
          <div className="container mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="font-semibold text-lg text-center sm:text-left">
              Ready to start your project? Get a free quote today!
            </p>
            <div className="flex gap-3">
              <Link to="/contact">
                <Button 
                  className="bg-green-700 hover:bg-green-800 text-white font-semibold"
                  aria-label="Get a free quote"
                >
                  Get Free Quote
                </Button>
              </Link>
              <a 
                href={`tel:${CONTACT_INFO.PHONE}`} 
                onClick={handlePhoneClick}
                aria-label={`Call ${CONTACT_INFO.FORMATTED_PHONE}`}
              >
                <Button 
                  variant="outline" 
                  className="border-2 border-white text-white hover:bg-white hover:text-green-900 font-semibold"
                >
                  <Phone className="mr-2 h-4 w-4" />
                  Call Now
                </Button>
              </a>
            </div>
          </div>
        </div>
      </ErrorBoundary>
    );
  } catch (error) {
    handleError(error, 'COMPONENT_RENDER_ERROR', 'HIGH', {
      component: 'StickyCTA',
      state: { visible, ticking: ticking.current }
    });
    
    // Fallback minimal sticky CTA
    return (
      <div className="fixed bottom-0 left-0 right-0 bg-green-900 text-white py-4 shadow-2xl z-50">
        <div className="container mx-auto px-6 flex items-center justify-center gap-4">
          <a href={`tel:${CONTACT_INFO.PHONE}`}>
            <Button className="bg-green-700 hover:bg-green-800 text-white font-semibold">
              <Phone className="mr-2 h-4 w-4" />
              {CONTACT_INFO.FORMATTED_PHONE}
            </Button>
          </a>
        </div>
      </div>
    );
  }
};

export default StickyCTA;
