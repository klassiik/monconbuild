import React from 'react';

import { Helmet } from 'react-helmet-async';
import Breadcrumb from '../../components/Breadcrumb';
import { Button } from '../../components/ui/button';
import FAQSection from '../../components/FAQSection';
import { homeAdditionsFAQs } from '../../data/faqs';
import { CheckCircle2, Phone, Mail, PlusCircle, Award } from 'lucide-react';

const HomeAdditions = () => {
  // Breadcrumb data
  const breadcrumbItems = [
    { name: 'Services', url: 'https://www.monconbuild.com/services' },
    { name: 'Home Additions', url: 'https://www.monconbuild.com/services/home-additions' }
  ];

  // Service Schema
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": "Home Additions",
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
    "description": "Professional home additions and room expansions including second-story additions, ADUs, and garage conversions in Placer, Nevada, Sacramento, Yolo, and El Dorado Counties.",
    "url": "https://www.monconbuild.com/services/home-additions",
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Home Addition Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Second Story Additions"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Room Additions & Extensions"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Garage Conversions"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Sunroom & Patio Enclosures"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "In-law Suites & ADUs"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Bump-outs & Expansions"
          }
        }
      ]
    }
  };

  const features = [
    "Second story additions",
    "Room additions and extensions",
    "Garage conversions",
    "Sunroom and patio enclosures",
    "In-law suites and ADUs",
    "Bump-outs and expansions"
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
        <title>Home Additions | Colfax CA</title>
        <meta name="description" content="Expert home additions & room expansions in Placer County. Second-story additions, ADUs & more. Licensed contractor #801602." />
        <link rel="canonical" href="https://www.monconbuild.com/services/home-additions" />
        <meta property="og:title" content="Home Additions | Colfax CA" />
        <meta property="og:description" content="Expert home additions & room expansions in Placer County. Second-story additions, ADUs & more. Licensed contractor #801602." />
        <meta property="og:url" content="https://www.monconbuild.com/services/home-additions" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://www.monconbuild.com/hero.webp" />
        
        {/* Service Schema */}
        <script type="application/ld+json">
          {JSON.stringify(serviceSchema)}
        </script>
      </Helmet>
      
      {/* Breadcrumb Navigation */}
      <Breadcrumb items={breadcrumbItems} />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-green-900 via-green-800 to-emerald-900 text-white py-24 md:py-32">
        <div className="container mx-auto px-6 md:px-12">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Home Additions & Extensions in Colfax, CA
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-200">
              Expert room additions and home expansions for Placer & Nevada County homes
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/contact">
                <Button size="lg" className="bg-green-700 hover:bg-green-800 text-lg px-8 py-6">
                  Get Free Quote
                </Button>
              </a>
              <a href="tel:+19166071972">
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
            <h2 className="text-3xl font-bold mb-6 text-gray-900">Professional Home Addition Services</h2>
            <p className="text-lg text-gray-700 mb-6">
              Monument Construction specializes in home additions throughout Colfax and Placer County, helping homeowners 
              expand their living space with quality construction and seamless integration with existing structures.
            </p>
            <p className="text-lg text-gray-700 mb-8">
              From second-story additions to accessory dwelling units (ADUs), we handle every aspect of your home expansion 
              project with expert craftsmanship and attention to detail. California Contractor <a href="https://www.cslb.ca.gov/801602" target="_blank" rel="noopener noreferrer" className="text-green-700 hover:text-blue-800 underline">License #801602</a>.
            </p>

            <div className="bg-green-50 p-8 rounded-lg mb-12">
              <h3 className="text-2xl font-bold mb-6 text-gray-900">Why Add On vs. Moving?</h3>
              <p className="text-gray-700 mb-4">
                A well-designed home addition is often the perfect solution for growing families or changing needs. Rather than the disruption and expense of selling and buying a new home, an addition lets you expand in place, maintain your community connections, and build equity in your existing property.
              </p>
              <p className="text-gray-700">
                Home additions also add significant value to your property. Unlike many home improvements, a quality addition can add 50-80% of its cost back to your home's value, making it one of the best investments you can make in your property.
              </p>
            </div>

            <h3 className="text-2xl font-bold mb-4 text-gray-900">Addition Services We Offer</h3>
            <div className="grid md:grid-cols-2 gap-4 mb-12">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start">
                  <CheckCircle2 className="w-6 h-6 text-green-700 mr-3 flex-shrink-0 mt-1" />
                  <span className="text-gray-700">{feature}</span>
                </div>
              ))}
            </div>

            <h3 className="text-2xl font-bold mb-6 text-gray-900">Our Home Addition Process</h3>
            <div className="grid md:grid-cols-2 gap-6 mb-12">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-lg">
                <div className="flex items-start mb-3">
                  <div className="bg-green-700 text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 mr-3 font-bold">1</div>
                  <h4 className="text-lg font-semibold text-gray-900">Design & Planning</h4>
                </div>
                <p className="text-gray-700 text-sm">
                  We start by understanding your vision and needs. Our team works with you to develop design concepts, review options, and create detailed plans. We'll discuss budget, timeline, and how the addition will integrate with your existing home's style and structure.
                </p>
              </div>
              <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-lg">
                <div className="flex items-start mb-3">
                  <div className="bg-green-600 text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 mr-3 font-bold">2</div>
                  <h4 className="text-lg font-semibold text-gray-900">Permits & Approvals</h4>
                </div>
                <p className="text-gray-700 text-sm">
                  We handle all permitting and building code compliance. Our licensed contractor expertise ensures your project meets all local requirements in Placer County. We coordinate with inspectors throughout construction to verify quality and safety at each stage.
                </p>
              </div>
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-lg">
                <div className="flex items-start mb-3">
                  <div className="bg-green-700 text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 mr-3 font-bold">3</div>
                  <h4 className="text-lg font-semibold text-gray-900">Expert Construction</h4>
                </div>
                <p className="text-gray-700 text-sm">
                  Our skilled construction team executes your addition with precision. We manage site preparation, foundation work, framing, electrical, plumbing, HVAC, and more. We ensure seamless integration with your existing home's systems and aesthetics.
                </p>
              </div>
              <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-lg">
                <div className="flex items-start mb-3">
                  <div className="bg-green-600 text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 mr-3 font-bold">4</div>
                  <h4 className="text-lg font-semibold text-gray-900">Finishing & Inspections</h4>
                </div>
                <p className="text-gray-700 text-sm">
                  We complete all finishing work including drywall, painting, flooring, cabinetry, and final touches. All work passes final inspections and meets code requirements. We'll walk you through your completed addition and ensure you're completely satisfied.
                </p>
              </div>
            </div>

            <div className="bg-green-50 p-8 rounded-lg mb-12">
              <div className="flex items-start mb-4">
                <Award className="w-8 h-8 text-green-800 mr-4 flex-shrink-0" />
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Why Choose Us for Your Addition?</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li>• Licensed California Contractor <a href="https://www.cslb.ca.gov/801602" target="_blank" rel="noopener noreferrer" className="text-green-700 hover:text-blue-800 underline">#801602</a></li>
                    <li>• 25+ years building experience</li>
                    <li>• Seamless integration with existing home</li>
                    <li>• Full permitting and inspection coordination</li>
                    <li>• Serving Colfax, Placer & Nevada Counties</li>
                  </ul>
                </div>
              </div>
            </div>

            <h3 className="text-2xl font-bold mb-4 text-gray-900">Service Areas</h3>
            <p className="text-lg text-gray-700 mb-4">
              Home addition services throughout Northern California:
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

      {/* CTA Section */}
      <section className="bg-green-900 text-white py-16">
        <div className="container mx-auto px-6 md:px-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Expand Your Living Space Today</h2>
          <p className="text-xl mb-8 text-gray-200 max-w-2xl mx-auto">
            Contact us for a free consultation on your home addition project in Colfax or anywhere in Placer County.
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
        faqs={homeAdditionsFAQs} 
        title="Frequently Asked Questions About Home Additions in Placer County"
      />

      {/* Final CTA Section */}
      <section className="py-16 bg-gradient-to-r from-green-700 to-green-900 text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-6">
            Ready to Expand Your Living Space?
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

export default HomeAdditions;
