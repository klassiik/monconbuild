import React from 'react';

import { Helmet } from 'react-helmet-async';
import Breadcrumb from '../../components/Breadcrumb';
import { Button } from '../../components/ui/button';
import { CheckCircle2, Phone, Mail, Hammer, Award } from 'lucide-react';

const FinishCarpentry = () => {
  // Breadcrumb data
  const breadcrumbItems = [
    { name: 'Services', url: 'https://www.monconbuild.com/services' },
    { name: 'Finish Carpentry', url: 'https://www.monconbuild.com/services/finish-carpentry' }
  ];

  // Service Schema
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": "Finish Carpentry",
    "provider": {
      "@type": "GeneralContractor",
      "name": "Monument Construction",
      "telephone": "(916) 607-1972",
      "email": "monumentconstruction@comcast.net",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Colfax",
        "addressRegion": "CA",
        "postalCode": "95713",
        "addressCountry": "US"
      },
      "hasCredential": {
        "@type": "EducationalOccupationalCredential",
        "credentialCategory": "license",
        "name": "California Contractor License #801602"
      }
    },
    "areaServed": [
      { "@type": "City", "name": "Colfax, CA" },
      { "@type": "City", "name": "Auburn, CA" },
      { "@type": "City", "name": "Grass Valley, CA" },
      { "@type": "City", "name": "Nevada City, CA" },
      { "@type": "City", "name": "Truckee, CA" }
    ],
    "description": "Expert finish carpentry services including custom trim work, crown molding, built-ins, and decorative woodwork in Colfax and Placer County.",
    "url": "https://www.monconbuild.com/services/finish-carpentry"
  };

  const features = [
    "Custom crown molding and baseboards",
    "Built-in cabinets and shelving",
    "Window and door trim installation",
    "Wainscoting and paneling",
    "Custom mantels and fireplace surrounds",
    "Coffered ceilings and decorative beams"
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
      {/* SEO Meta Tags and Schema */}
      <Helmet>
        <title>Finish Carpentry | Colfax CA</title>
        <meta name="description" content="Expert finish carpentry in Colfax, CA. Custom trim, molding, built-ins & woodwork. Licensed contractor #801602." />
        <link rel="canonical" href="https://www.monconbuild.com/services/finish-carpentry" />
        <meta property="og:title" content="Expert Finish Carpentry in Colfax, CA | Monument Construction" />
        <meta property="og:description" content="Professional finish carpentry services in Colfax and Placer County. Custom trim, molding, and woodwork." />
        <meta property="og:url" content="https://www.monconbuild.com/services/finish-carpentry" />
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
              Expert Finish Carpentry in Colfax, CA
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-200">
              Professional custom woodwork, trim, moldings, and built-ins serving Placer & Nevada Counties
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/contact">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-lg px-8 py-6">
                  Get Free Quote
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
            <h2 className="text-3xl font-bold mb-6 text-gray-900">Premium Finish Carpentry Services</h2>
            <p className="text-lg text-gray-700 mb-6">
              Monument Construction brings decades of expertise to every finish carpentry project in Colfax and throughout Placer County. 
              Our master craftsmen specialize in custom woodwork that adds beauty, value, and functionality to your home.
            </p>
            <p className="text-lg text-gray-700 mb-8">
              Whether you're looking for custom crown molding, built-in cabinetry, or decorative trim work, we deliver meticulous 
              attention to detail and superior craftsmanship on every project. Licensed contractor #801602.
            </p>

            <div className="bg-blue-50 p-8 rounded-lg mb-12">
              <h3 className="text-2xl font-bold mb-6 text-gray-900">What is Finish Carpentry?</h3>
              <p className="text-gray-700 mb-4">
                Finish carpentry is the art of adding the final touches to a space - the details that transform a room from basic to beautiful. Unlike rough carpentry (framing and structural work), finish carpentry focuses on the visible elements that define a room's character and elegance.
              </p>
              <p className="text-gray-700">
                This includes crown molding, baseboards, window and door casings, wainscoting, built-in cabinetry, custom mantels, coffered ceilings, and decorative woodwork. These elements require precision, craftsmanship, and an eye for design to ensure they enhance the room while maintaining structural integrity.
              </p>
            </div>

            <h3 className="text-2xl font-bold mb-4 text-gray-900">Our Finish Carpentry Process</h3>
            <div className="grid md:grid-cols-2 gap-6 mb-12">
              <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-blue-600">
                <h4 className="text-lg font-bold mb-3 text-gray-900">Consultation & Design</h4>
                <p className="text-gray-700">We meet with you to understand your vision, discuss design options, and provide recommendations based on your home's architecture and your personal style.</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-blue-600">
                <h4 className="text-lg font-bold mb-3 text-gray-900">Material Selection</h4>
                <p className="text-gray-700">We help you choose the right materials - wood types, finishes, and hardware - that match your design vision and budget.</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-green-600">
                <h4 className="text-lg font-bold mb-3 text-gray-900">Expert Installation</h4>
                <p className="text-gray-700">Our craftsmen install with precision, ensuring perfect measurements, clean joints, and flawless finishes that last for decades.</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-green-600">
                <h4 className="text-lg font-bold mb-3 text-gray-900">Quality Finishing</h4>
                <p className="text-gray-700">We handle all finishing work - staining, painting, sealing - to create a professional appearance that looks great in your entire space.</p>
              </div>
            </div>

            <h3 className="text-2xl font-bold mb-4 text-gray-900">What We Offer</h3>
            <div className="grid md:grid-cols-2 gap-4 mb-12">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start">
                  <CheckCircle2 className="w-6 h-6 text-blue-600 mr-3 flex-shrink-0 mt-1" />
                  <span className="text-gray-700">{feature}</span>
                </div>
              ))}
            </div>

            <div className="bg-green-50 p-8 rounded-lg mb-12">
              <div className="flex items-start mb-4">
                <Award className="w-8 h-8 text-green-800 mr-4 flex-shrink-0" />
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Why Choose Monument Construction?</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li>• Licensed California Contractor <a href="https://www.cslb.ca.gov/801602" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 underline">#801602</a></li>
                    <li>• Featured on DIY Network TV</li>
                    <li>• 25+ years of finish carpentry experience</li>
                    <li>• Serving Placer & Nevada Counties</li>
                    <li>• Referral-based reputation for quality</li>
                  </ul>
                </div>
              </div>
            </div>

            <h3 className="text-2xl font-bold mb-4 text-gray-900">Service Areas</h3>
            <p className="text-lg text-gray-700 mb-4">
              We provide professional finish carpentry services throughout Northern California:
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
              <h3 className="text-xl font-bold mb-3 text-gray-900">General Construction</h3>
              <p className="text-gray-700 mb-4">Complete residential construction services from groundwork to final touches.</p>
              <a href="/services/general-construction" className="text-blue-600 hover:text-blue-800 font-semibold">
                Learn More →
              </a>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-bold mb-3 text-gray-900">Home Additions</h3>
              <p className="text-gray-700 mb-4">Expert room additions and extensions to expand your living space.</p>
              <a href="/services/home-additions" className="text-blue-600 hover:text-blue-800 font-semibold">
                Learn More →
              </a>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-bold mb-3 text-gray-900">Custom Woodwork</h3>
              <p className="text-gray-700 mb-4">Bespoke woodwork and cabinetry tailored to your unique vision.</p>
              <a href="/services/custom-woodwork" className="text-blue-600 hover:text-blue-800 font-semibold">
                Learn More →
              </a>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-bold mb-3 text-gray-900">Residential Projects</h3>
              <p className="text-gray-700 mb-4">Comprehensive residential project management and execution.</p>
              <a href="/services/residential-projects" className="text-blue-600 hover:text-blue-800 font-semibold">
                Learn More →
              </a>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-bold mb-3 text-gray-900">Complete Remodeling</h3>
              <p className="text-gray-700 mb-4">Full-scope remodeling projects transforming entire homes.</p>
              <a href="/services/complete-remodeling" className="text-blue-600 hover:text-blue-800 font-semibold">
                Learn More →
              </a>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-bold mb-3 text-gray-900">All Services</h3>
              <p className="text-gray-700 mb-4">View our complete range of construction and carpentry services.</p>
              <a href="/services" className="text-blue-600 hover:text-blue-800 font-semibold">
                View All Services →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-green-900 text-white py-16">
        <div className="container mx-auto px-6 md:px-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Transform Your Home?</h2>
          <p className="text-xl mb-8 text-gray-200 max-w-2xl mx-auto">
            Get a free consultation and quote for your finish carpentry project in Colfax or anywhere in Placer County.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/contact">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-lg px-8 py-6">
                Request Free Quote
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

export default FinishCarpentry;
