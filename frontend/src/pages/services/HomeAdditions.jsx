import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../../components/ui/button';
import { CheckCircle2, Phone, Mail, PlusCircle, Award } from 'lucide-react';

const HomeAdditions = () => {
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
    "All of Placer & Nevada Counties"
  ];

  return (
    <div className="min-h-screen">
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
            <h2 className="text-3xl font-bold mb-6 text-gray-900">Professional Home Addition Services</h2>
            <p className="text-lg text-gray-700 mb-6">
              Monument Construction specializes in home additions throughout Colfax and Placer County, helping homeowners 
              expand their living space with quality construction and seamless integration with existing structures.
            </p>
            <p className="text-lg text-gray-700 mb-8">
              From second-story additions to accessory dwelling units (ADUs), we handle every aspect of your home expansion 
              project with expert craftsmanship and attention to detail. California Contractor <a href="https://www.cslb.ca.gov/801602" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 underline">License #801602</a>.
            </p>

            <h3 className="text-2xl font-bold mb-4 text-gray-900">Addition Services We Offer</h3>
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
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Why Choose Us for Your Addition?</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li>• Licensed California Contractor <a href="https://www.cslb.ca.gov/801602" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 underline">#801602</a></li>
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
            <Link to="/contact">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-lg px-8 py-6">
                Request Free Consultation
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

export default HomeAdditions;
