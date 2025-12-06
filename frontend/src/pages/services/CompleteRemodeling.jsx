import React from 'react';

import { Helmet } from 'react-helmet-async';
import { Button } from '../../components/ui/button';
import FAQSection from '../../components/FAQSection';
import { completeRemodelingFAQs } from '../../data/faqs';
import { CheckCircle2, Phone, Mail, Wrench, Award } from 'lucide-react';

const CompleteRemodeling = () => {
  // Service Schema
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": "Complete Remodeling",
    "provider": {
      "@type": "GeneralContractor",
      "name": "Monument Construction",
      "telephone": "(916) 607-1972",
      "email": "monumentconstruction@comcast.net"
    },
    "areaServed": [
      { "@type": "City", "name": "Colfax, CA" },
      { "@type": "City", "name": "Auburn, CA" },
      { "@type": "City", "name": "Grass Valley, CA" },
      { "@type": "City", "name": "Nevada City, CA" },
      { "@type": "City", "name": "Truckee, CA" },
      { "@type": "City", "name": "Sacramento, CA" },
      { "@type": "City", "name": "Elk Grove, CA" },
      { "@type": "City", "name": "Folsom, CA" },
      { "@type": "City", "name": "Citrus Heights, CA" },
      { "@type": "City", "name": "Rancho Cordova, CA" },
      { "@type": "City", "name": "Davis, CA" },
      { "@type": "City", "name": "Woodland, CA" },
      { "@type": "City", "name": "West Sacramento, CA" },
      { "@type": "City", "name": "El Dorado Hills, CA" },
      { "@type": "City", "name": "South Lake Tahoe, CA" },
      { "@type": "City", "name": "Placerville, CA" }
    ],
    "description": "Full-service home remodeling and renovation services including whole-house transformations, kitchen and bathroom remodels in Placer, Nevada, Sacramento, Yolo, and El Dorado Counties.",
    "url": "https://www.monconbuild.com/services/complete-remodeling",
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Complete Remodeling Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Whole-house Renovations"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Kitchen & Bathroom Remodels"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Interior & Exterior Updates"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Structural Modifications"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Design & Planning Services"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Turnkey Remodeling Solutions"
          }
        }
      ]
    }
  };

  const features = [
    "Whole-house renovations",
    "Kitchen and bathroom remodels",
    "Interior and exterior updates",
    "Structural modifications",
    "Design and planning services",
    "Turnkey remodeling solutions"
  ];

  const serviceAreas = [
    "Colfax, CA",
    "Auburn, CA",
    "Grass Valley, CA",
    "Nevada City, CA",
    "Truckee, CA",
    "Sacramento, CA",
    "Elk Grove, CA",
    "Folsom, CA",
    "Davis, CA",
    "Woodland, CA",
    "El Dorado Hills, CA",
    "South Lake Tahoe, CA",
    "All of Placer, Nevada, Sacramento, Yolo & El Dorado Counties"
  ];

  return (
    <div className="min-h-screen">
      <Helmet>
        <title>Home Remodeling | Colfax CA</title>
        <meta name="description" content="Full-service home remodeling in Colfax & Placer County. Complete transformations with expert craftsmanship & attention." />
        <link rel="canonical" href="https://www.monconbuild.com/services/complete-remodeling" />
        <meta property="og:title" content="Home Remodeling | Colfax CA" />
        <meta property="og:description" content="Full-service home remodeling in Colfax & Placer County. Complete transformations with expert craftsmanship & attention." />
        <meta property="og:url" content="https://www.monconbuild.com/services/complete-remodeling" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://www.monconbuild.com/hero.webp" />
        
        {/* Service Schema */}
        <script type="application/ld+json">
          {JSON.stringify(serviceSchema)}
        </script>
      </Helmet>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-green-900 via-green-800 to-emerald-900 text-white py-24 md:py-32">
        <div className="container mx-auto px-6 md:px-12">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Complete Home Remodeling in Colfax, California
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-200">
              Full-service remodeling and renovation for Placer & Nevada County homeowners
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/contact">
                <Button size="lg" className="bg-green-700 hover:bg-green-800 text-lg px-8 py-6">
                  Get Free Estimate
                </Button>
              </a>
              <a href="tel:9166071972">
                <Button size="lg" variant="outline" className="text-lg px-8 py-6 border-white text-white hover:bg-white hover:text-green-900">
                  <Phone className="mr-2 h-5 w-5" />
                  (916) 607-1972
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Service Details */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6 md:px-12">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-6 text-gray-900">Transform Your Home with Expert Remodeling</h2>
            <p className="text-lg text-gray-700 mb-6">
              Monument Construction provides comprehensive remodeling services in Colfax and throughout Placer County, 
              transforming outdated spaces into beautiful, functional homes that meet modern living standards.
            </p>
            <p className="text-lg text-gray-700 mb-8">
              From minor updates to complete renovations, we manage every phase of your remodeling project with 
              professional expertise and meticulous attention to detail. California Contractor <a href="https://www.cslb.ca.gov/801602" target="_blank" rel="noopener noreferrer" className="text-green-700 hover:text-blue-800 underline">License #801602</a>.
            </p>

            <div className="bg-green-50 p-8 rounded-lg mb-12">
              <h3 className="text-2xl font-bold mb-6 text-gray-900">What is a Complete Home Remodel?</h3>
              <p className="text-gray-700 mb-4">
                A complete home remodel goes beyond simple cosmetic updates. It's a comprehensive transformation that can involve structural changes, system upgrades (electrical, plumbing, HVAC), new layouts, and complete aesthetic redesigns. Whether your home is 20 or 50 years old, remodeling lets you modernize it completely - updating outdated systems, improving energy efficiency, and creating the home you've always wanted.
              </p>
              <p className="text-gray-700">
                Complete remodeling projects can include kitchen and bathroom renovations, flooring replacement, interior redesigns, exterior updates, and more. The result is a home that's not only more beautiful and functional but also more valuable and efficient. With our 25+ years of experience, we make the entire remodeling process smooth and stress-free.
              </p>
            </div>

            <h3 className="text-2xl font-bold mb-4 text-gray-900">Remodeling Services</h3>
            <div className="grid md:grid-cols-2 gap-4 mb-12">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start">
                  <CheckCircle2 className="w-6 h-6 text-green-700 mr-3 flex-shrink-0 mt-1" />
                  <span className="text-gray-700">{feature}</span>
                </div>
              ))}
            </div>

            <h3 className="text-2xl font-bold mb-6 text-gray-900">Our Complete Remodeling Process</h3>
            <div className="grid md:grid-cols-2 gap-6 mb-12">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-lg">
                <div className="flex items-start mb-3">
                  <div className="bg-green-700 text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 mr-3 font-bold">1</div>
                  <h4 className="text-lg font-semibold text-gray-900">Vision & Planning</h4>
                </div>
                <p className="text-gray-700 text-sm">
                  We start by understanding your complete vision for your remodeled home. Our team discusses your priorities, lifestyle, aesthetic preferences, and budget. We may suggest design improvements and share examples of successful remodels. Detailed plans and design visualizations show exactly how your new space will look and function.
                </p>
              </div>
              <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-lg">
                <div className="flex items-start mb-3">
                  <div className="bg-green-600 text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 mr-3 font-bold">2</div>
                  <h4 className="text-lg font-semibold text-gray-900">Design & Permits</h4>
                </div>
                <p className="text-gray-700 text-sm">
                  Our designers create detailed architectural plans and specifications. We handle all permitting with Placer County, ensuring full code compliance. We manage inspections at key stages, from foundation and framing to final completion. Our experience means fewer surprises and better results.
                </p>
              </div>
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-lg">
                <div className="flex items-start mb-3">
                  <div className="bg-green-700 text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 mr-3 font-bold">3</div>
                  <h4 className="text-lg font-semibold text-gray-900">Skilled Execution</h4>
                </div>
                <p className="text-gray-700 text-sm">
                  Our team coordinates all trades - demolition, framing, electrical, plumbing, HVAC, tile work, cabinetry, and more. We keep work sites clean and organized and minimize disruption to your household. We'll keep you updated throughout the entire process.
                </p>
              </div>
              <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-lg">
                <div className="flex items-start mb-3">
                  <div className="bg-green-600 text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 mr-3 font-bold">4</div>
                  <h4 className="text-lg font-semibold text-gray-900">Completion & Enjoyment</h4>
                </div>
                <p className="text-gray-700 text-sm">
                  We complete all finishing details - paint, flooring, hardware, fixtures, and final touches. Final inspections verify code compliance. We walk through everything with you, fix any final items, and give you all the documentation. Then you get to enjoy your beautiful new home!
                </p>
              </div>
            </div>

            <div className="bg-green-50 p-8 rounded-lg mb-12">
              <div className="flex items-start mb-4">
                <Award className="w-8 h-8 text-green-800 mr-4 flex-shrink-0" />
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Your Remodeling Partner</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li>• Licensed California Contractor <a href="https://www.cslb.ca.gov/801602" target="_blank" rel="noopener noreferrer" className="text-green-700 hover:text-blue-800 underline">#801602</a></li>
                    <li>• Featured on DIY Network TV</li>
                    <li>• 25+ years remodeling experience</li>
                    <li>• Complete project management</li>
                    <li>• Serving Colfax, Placer & Nevada Counties</li>
                  </ul>
                </div>
              </div>
            </div>

            <h3 className="text-2xl font-bold mb-4 text-gray-900">Service Areas</h3>
            <p className="text-lg text-gray-700 mb-4">
              Complete remodeling services throughout Northern California:
            </p>
            <div className="grid md:grid-cols-3 gap-4 mb-12">
              {serviceAreas.map((area, index) => (
                <div key={index} className="flex items-center text-gray-700">
                  <CheckCircle2 className="w-5 h-5 text-green-600 mr-2" />
                  {area}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Related Services Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6 md:px-12">
          <h2 className="text-3xl font-bold mb-12 text-gray-900 text-center">Explore Our Other Services</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-bold mb-3 text-gray-900">Finish Carpentry</h3>
              <p className="text-gray-700 mb-4">Expert finish carpentry including custom trim, molding, and built-ins.</p>
              <a href="/services/finish-carpentry" className="text-green-700 hover:text-blue-800 font-semibold">
                Learn More →
              </a>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-bold mb-3 text-gray-900">General Construction</h3>
              <p className="text-gray-700 mb-4">Complete residential construction services from groundwork to final touches.</p>
              <a href="/services/general-construction" className="text-green-700 hover:text-blue-800 font-semibold">
                Learn More →
              </a>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-bold mb-3 text-gray-900">Home Additions</h3>
              <p className="text-gray-700 mb-4">Expert room additions and extensions to expand your living space.</p>
              <a href="/services/home-additions" className="text-green-700 hover:text-blue-800 font-semibold">
                Learn More →
              </a>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-bold mb-3 text-gray-900">Custom Woodwork</h3>
              <p className="text-gray-700 mb-4">Bespoke woodwork and cabinetry tailored to your unique vision.</p>
              <a href="/services/custom-woodwork" className="text-green-700 hover:text-blue-800 font-semibold">
                Learn More →
              </a>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-bold mb-3 text-gray-900">Residential Projects</h3>
              <p className="text-gray-700 mb-4">Comprehensive residential project management and execution.</p>
              <a href="/services/residential-projects" className="text-green-700 hover:text-blue-800 font-semibold">
                Learn More →
              </a>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-bold mb-3 text-gray-900">All Services</h3>
              <p className="text-gray-700 mb-4">View our complete range of construction and carpentry services.</p>
              <a href="/services" className="text-green-700 hover:text-blue-800 font-semibold">
                View All Services →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-green-900 text-white py-16">
        <div className="container mx-auto px-6 md:px-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Remodel Your Home?</h2>
          <p className="text-xl mb-8 text-gray-200 max-w-2xl mx-auto">
            Contact Monument Construction for expert remodeling services in Colfax and throughout Placer County.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/contact">
              <Button size="lg" className="bg-green-700 hover:bg-green-800 text-lg px-8 py-6">
                Request Free Consultation
              </Button>
            </a>
            <a href="mailto:monumentconstruction@comcast.net">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-green-900 text-lg px-8 py-6">
                <Mail className="mr-2 h-5 w-5" />
                Email Us
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <FAQSection 
        faqs={completeRemodelingFAQs} 
        title="Frequently Asked Questions About Home Remodeling in Placer County"
      />

      {/* Final CTA Section */}
      <section className="py-16 bg-gradient-to-r from-green-700 to-green-900 text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-6">
            Ready to Transform Your Home?
          </h2>
          <p className="text-xl mb-8">
            Contact Monument Construction today for your free consultation
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/contact">
              <Button size="lg" className="bg-green-700 hover:bg-green-800 text-lg px-8 py-6">
                Request Free Consultation
              </Button>
            </a>
            <a href="mailto:monumentconstruction@comcast.net">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-green-900 text-lg px-8 py-6">
                <Mail className="mr-2 h-5 w-5" />
                Email Us
              </Button>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CompleteRemodeling;


