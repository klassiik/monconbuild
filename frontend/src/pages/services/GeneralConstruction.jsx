import React from 'react';

import { Helmet } from 'react-helmet-async';
import { Button } from '../../components/ui/button';
import FAQSection from '../../components/FAQSection';
import { generalConstructionFAQs } from '../../data/faqs';
import { CheckCircle2, Phone, Mail, Building2, Award } from 'lucide-react';

const GeneralConstruction = () => {
  // Service Schema
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": "General Construction",
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
      { "@type": "City", "name": "Truckee, CA" }
    ],
    "description": "Full-service general construction services including new construction, remodels, additions, and complete project management in Placer and Nevada Counties.",
    "url": "https://www.monconbuild.com/services/general-construction",
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "General Construction Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "New Construction Projects"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Foundation to Finish Builds"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Structural Framing & Repairs"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Site Preparation & Grading"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Concrete & Masonry Work"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Complete Project Management"
          }
        }
      ]
    }
  };

  const features = [
    "New construction projects",
    "Foundation to finish builds",
    "Structural framing and repairs",
    "Site preparation and grading",
    "Concrete and masonry work",
    "Complete project management"
  ];

  const serviceAreas = [
    "Colfax, CA",
    "Auburn, CA", 
    "Grass Valley, CA",
    "Nevada City, CA",
    "Truckee, CA",
    "All of Placer & Nevada Counties"
  ];

  return (
    <div className="min-h-screen">
      <Helmet>
        <title>General Contracting | Colfax CA</title>
        <meta name="description" content="Full-service general construction in Placer County. New homes, remodels, additions & more. Licensed contractor #801602." />
        <link rel="canonical" href="https://www.monconbuild.com/services/general-construction" />
        <meta property="og:title" content="General Contracting | Colfax CA" />
        <meta property="og:description" content="Full-service general construction in Placer County. New homes, remodels, additions & more. Licensed contractor #801602." />
        <meta property="og:url" content="https://www.monconbuild.com/services/general-construction" />
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
              General Construction Services in Colfax, California
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-200">
              Licensed general contractor providing complete construction solutions in Placer & Nevada Counties
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
            <h2 className="text-3xl font-bold mb-6 text-gray-900">Full-Service General Contracting</h2>
            <p className="text-lg text-gray-700 mb-6">
              Monument Construction is your trusted general contractor in Colfax, CA, offering comprehensive construction 
              services for residential and commercial projects throughout Placer County and Nevada County.
            </p>
            <p className="text-lg text-gray-700 mb-8">
              From ground breaking to final inspection, we manage every aspect of your construction project with professional 
              expertise and attention to detail. California Contractor License #801602.
            </p>

            <div className="bg-green-50 p-8 rounded-lg mb-12">
              <h3 className="text-2xl font-bold mb-6 text-gray-900">Complete General Contracting Services</h3>
              <p className="text-gray-700 mb-4">
                As a licensed general contractor, Monument Construction handles the full scope of residential construction projects. Whether you're building a new home, adding to an existing one, or completely remodeling, we manage every phase with expertise and attention to detail.
              </p>
              <p className="text-gray-700">
                Our general contracting services include site preparation, structural framing, roofing, siding, coordination of specialized trades (electrical, plumbing, HVAC), and complete interior finishing. We serve as the central point of contact and project manager for your entire construction process.
              </p>
            </div>

            <h3 className="text-2xl font-bold mb-4 text-gray-900">Our Construction Services</h3>
            <div className="grid md:grid-cols-2 gap-4 mb-12">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start">
                  <CheckCircle2 className="w-6 h-6 text-green-700 mr-3 flex-shrink-0 mt-1" />
                  <span className="text-gray-700">{feature}</span>
                </div>
              ))}
            </div>

            <div className="bg-green-50 p-8 rounded-lg mb-12">
              <div className="flex items-start mb-4">
                <Award className="w-8 h-8 text-green-800 mr-4 flex-shrink-0" />
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Licensed & Experienced Contractor</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li>• California Contractor <a href="https://www.cslb.ca.gov/801602" target="_blank" rel="noopener noreferrer" className="text-green-700 hover:text-blue-800 underline">License #801602</a></li>
                    <li>• 25+ years construction experience</li>
                    <li>• Featured on DIY Network</li>
                    <li>• Fully insured and bonded</li>
                    <li>• Serving Placer & Nevada Counties</li>
                  </ul>
                </div>
              </div>
            </div>

            <h3 className="text-2xl font-bold mb-4 text-gray-900">Areas We Serve</h3>
            <p className="text-lg text-gray-700 mb-4">
              Professional general construction services throughout Northern California:
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
              <h3 className="text-xl font-bold mb-3 text-gray-900">Complete Remodeling</h3>
              <p className="text-gray-700 mb-4">Full-scope remodeling projects transforming entire homes.</p>
              <a href="/services/complete-remodeling" className="text-green-700 hover:text-blue-800 font-semibold">
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
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Start Your Construction Project Today</h2>
          <p className="text-xl mb-8 text-gray-200 max-w-2xl mx-auto">
            Contact Monument Construction for expert general contracting services in Colfax and throughout Placer County.
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
        faqs={generalConstructionFAQs} 
        title="Frequently Asked Questions About General Construction in Placer County"
      />

      {/* Final CTA Section */}
      <section className="py-16 bg-gradient-to-r from-green-700 to-green-900 text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-6">
            Ready to Start Your Construction Project?
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

export default GeneralConstruction;


