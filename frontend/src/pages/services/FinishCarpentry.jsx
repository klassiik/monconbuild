import React from 'react';
import { Link } from 'react-router-dom';
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
        <title>Expert Finish Carpentry in Colfax, CA | Monument Construction</title>
        <meta name="description" content="Professional finish carpentry services in Colfax, Placer County & Nevada County. Custom trim, molding, built-ins, and woodwork. Licensed contractor #801602. Call (916) 607-1972." />
        <link rel="canonical" href="https://www.monconbuild.com/services/finish-carpentry" />
        <meta property="og:title" content="Expert Finish Carpentry in Colfax, CA | Monument Construction" />
        <meta property="og:description" content="Professional finish carpentry services in Colfax and Placer County. Custom trim, molding, and woodwork." />
        <meta property="og:url" content="https://www.monconbuild.com/services/finish-carpentry" />
        
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
              <Link to="/contact">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-lg px-8 py-6">
                  Get Free Quote
                </Button>
              </Link>
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
                    <li>• Licensed California Contractor <a href="https://www.cslb.ca.gov/OnlineServices/CheckLicenseII/LicenseDetail.aspx?LicNum=801602" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 underline">#801602</a></li>
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

      {/* CTA Section */}
      <section className="bg-green-900 text-white py-16">
        <div className="container mx-auto px-6 md:px-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Transform Your Home?</h2>
          <p className="text-xl mb-8 text-gray-200 max-w-2xl mx-auto">
            Get a free consultation and quote for your finish carpentry project in Colfax or anywhere in Placer County.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-lg px-8 py-6">
                Request Free Quote
              </Button>
            </Link>
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
