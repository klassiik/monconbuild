import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Phone } from 'lucide-react';

const StickyCTA = () => {
  const [visible, setVisible] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 600);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const handlePhoneClick = () => {
    // Track conversion event if GTM is available
    if (window.gtag) {
      window.gtag('event', 'phone_call_click', {
        'event_category': 'engagement',
        'event_label': window.location.pathname
      });
    }
  };
  
  return (
    <div 
      className={`fixed bottom-0 left-0 right-0 bg-green-900 text-white py-4 shadow-2xl z-50 transition-transform duration-300 ${
        visible ? 'translate-y-0' : 'translate-y-full'
      }`}
    >
      <div className="container mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="font-semibold text-lg text-center sm:text-left">
          Ready to start your project? Get a free quote today!
        </p>
        <div className="flex gap-3">
          <a href="/contact">
            <Button className="bg-green-700 hover:bg-green-800 text-white font-semibold">
              Get Free Quote
            </Button>
          </a>
          <a href="tel:9166071972" onClick={handlePhoneClick}>
            <Button variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-green-900 font-semibold">
              <Phone className="mr-2 h-4 w-4" />
              Call Now
            </Button>
          </a>
        </div>
      </div>
    </div>
  );
};

export default StickyCTA;

