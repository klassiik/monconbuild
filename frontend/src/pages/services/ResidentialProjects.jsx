import React from 'react';

import { Helmet } from 'react-helmet-async';
import { Button } from '../../components/ui/button';
import FAQSection from '../../components/FAQSection';
import { residentialProjectsFAQs } from '../../data/faqs';
import { CheckCircle2, Phone, Mail, Home, Award } from 'lucide-react';

const ResidentialProjects = () => {
  // Service Schema
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": "Residential Construction",
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
    "description": "Complete residential construction and remodeling services including new home construction, renovations, and home improvement projects in Placer County.",
    "url": "https://www.monconbuild.com/services/residential-projects",
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Residential Construction Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "New Home Construction"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Kitchen & Bathroom Renovations"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Room Additions & Expansions"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Deck & Patio Construction"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Interior & Exterior Upgrades"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Whole-house Remodels"
          }
        }
      ]
    }
  };

  const features = [
    "New home construction",
    "Kitchen and bathroom renovations",
    "Room additions and expansions",
    "Deck and patio construction",
    "Interior and exterior upgrades",
    "Whole-house remodels"
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
        <title>Residential Construction Projects</title>
        <meta name="description" content="Complete residential construction & remodeling projects in Placer County. Quality craftsmanship from ground to finish." />
        <link rel="canonical" href="https://www.monconbuild.com/services/residential-projects" />
        <meta property="og:title" content="Residential Construction Projects" />
        <meta property="og:description" content="Complete residential construction & remodeling projects in Placer County. Quality craftsmanship from ground to finish." />
        <meta property="og:url" content="https://www.monconbuild.com/services/residential-projects" />
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
              Residential Construction Projects in Colfax, CA
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-200">
              Expert residential construction and remodeling services for Placer & Nevada County homeowners
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/contact">
                <Button size="lg" className="bg-green-700 hover:bg-green-800 text-lg px-8 py-6">
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
            <h2 className="text-3xl font-bold mb-6 text-gray-900">Professional Residential Construction</h2>
            <p className="text-lg text-gray-700 mb-6">
              Monument Construction specializes in residential projects throughout Colfax and Placer County, delivering 
              quality craftsmanship and personalized service on every home improvement project.
            </p>
            <p className="text-lg text-gray-700 mb-8">
              Whether you're building a new home, renovating your kitchen, or adding a new room, our experienced team 
              manages your project from start to finish with professionalism and care. Licensed contractor #801602.
            </p>

            <div className="bg-green-50 p-8 rounded-lg mb-12">
              <h3 className="text-2xl font-bold mb-6 text-gray-900">Comprehensive Residential Project Management</h3>
              <p className="text-gray-700 mb-4">
                Residential construction projects require careful planning, precise execution, and constant attention to detail. Our team brings 25+ years of experience managing projects of all sizes - from targeted renovations to complete home transformations - making sure every project meets our high standards for quality, safety, and customer satisfaction.
              </p>
              <p className="text-gray-700">
                We handle the full scope of residential work: coordinating all trades, managing permits and inspections, sourcing quality materials, and maintaining clear communication with you throughout the project. Whether it's a kitchen remodel, bathroom renovation, room addition, or complete home remodel, we bring the same dedication and expertise to every project.
              </p>
            </div>

            <h3 className="text-2xl font-bold mb-4 text-gray-900">Residential Services</h3>
            <div className="grid md:grid-cols-2 gap-4 mb-12">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start">
                  <CheckCircle2 className="w-6 h-6 text-green-700 mr-3 flex-shrink-0 mt-1" />
                  <span className="text-gray-700">{feature}</span>
                </div>
              ))}
            </div>

            <h3 className="text-2xl font-bold mb-6 text-gray-900">Our Residential Project Process</h3>
            <div className="grid md:grid-cols-2 gap-6 mb-12">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-lg">
                <div className="flex items-start mb-3">
                  <div className="bg-green-700 text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 mr-3 font-bold">1</div>
                  <h4 className="text-lg font-semibold text-gray-900">Initial Consultation</h4>
                </div>
                <p className="text-gray-700 text-sm">
                  We meet with you to understand your vision, needs, and budget. We ask questions, listen carefully, and provide professional recommendations based on our years of experience. This consultation helps us create accurate estimates and detailed project plans tailored to your specific goals.
                </p>
              </div>
              <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-lg">
                <div className="flex items-start mb-3">
                  <div className="bg-green-600 text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 mr-3 font-bold">2</div>
                  <h4 className="text-lg font-semibold text-gray-900">Planning & Permitting</h4>
                </div>
                <p className="text-gray-700 text-sm">
                  We develop detailed plans and handle all permitting requirements with Placer County authorities. Our expertise with local building codes ensures your project complies with all regulations and passes inspections on the first try. We manage the permitting process so you don't have to.
                </p>
              </div>
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-lg">
                <div className="flex items-start mb-3">
                  <div className="bg-green-700 text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 mr-3 font-bold">3</div>
                  <h4 className="text-lg font-semibold text-gray-900">Expert Construction</h4>
                </div>
                <p className="text-gray-700 text-sm">
                  Our skilled team executes your project with precision and professionalism. We coordinate all trades - electrical, plumbing, HVAC, carpentry, and more - so everything works together smoothly and efficiently. We keep you in the loop throughout the whole project.
                </p>
              </div>
              <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-lg">
                <div className="flex items-start mb-3">
                  <div className="bg-green-600 text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 mr-3 font-bold">4</div>
                  <h4 className="text-lg font-semibold text-gray-900">Quality Completion</h4>
                </div>
                <p className="text-gray-700 text-sm">
                  We complete all finishing work, conduct thorough inspections, and ensure everything passes final code review. We'll walk through your completed project with you, address any final questions, and provide documentation. Your satisfaction is our priority.
                </p>
              </div>
            </div>

            <div className="bg-green-50 p-8 rounded-lg mb-12">
              <div className="flex items-start mb-4">
                <Award className="w-8 h-8 text-green-800 mr-4 flex-shrink-0" />
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Trusted by Homeowners</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li>• California <a href="https://www.cslb.ca.gov/801602" target="_blank" rel="noopener noreferrer" className="text-green-700 hover:text-blue-800 underline">License #801602</a></li>
                    <li>• 25+ years residential experience</li>
                    <li>• Featured on DIY Network</li>
                    <li>• Referral-based business</li>
                    <li>• Local to Colfax & Placer County</li>
                  </ul>
                </div>
              </div>
            </div>

            <h3 className="text-2xl font-bold mb-4 text-gray-900">Service Areas</h3>
            <p className="text-lg text-gray-700 mb-4">
              Residential construction services throughout Northern California:
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
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Improve Your Home?</h2>
          <p className="text-xl mb-8 text-gray-200 max-w-2xl mx-auto">
            Get a free consultation for your residential project in Colfax or anywhere in Placer County.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/contact">
              <Button size="lg" className="bg-green-700 hover:bg-green-800 text-lg px-8 py-6">
                Request Free Estimate
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
        faqs={residentialProjectsFAQs} 
        title="Frequently Asked Questions About Residential Construction in Placer County"
      />

      {/* Final CTA Section */}
      <section className="py-16 bg-gradient-to-r from-green-700 to-green-900 text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-6">
            Ready to Start Your Residential Project?
          </h2>
          <p className="text-xl mb-8 text-gray-200 max-w-2xl mx-auto">
            Get a free consultation for your residential project in Colfax or anywhere in Placer County.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/contact">
              <Button size="lg" className="bg-green-700 hover:bg-green-800 text-lg px-8 py-6">
                Request Free Estimate
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

export default ResidentialProjects;


