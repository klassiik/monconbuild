import React from 'react';

import { Helmet } from 'react-helmet-async';
import { Button } from '../../components/ui/button';
import FAQSection from '../../components/FAQSection';
import { customWoodworkFAQs } from '../../data/faqs';
import { CheckCircle2, Phone, Mail, Hammer, Award } from 'lucide-react';

const CustomWoodwork = () => {
  const features = [
    "Custom cabinetry and built-ins",
    "Handcrafted furniture pieces",
    "Decorative mantels and shelving",
    "Custom doors and entry features",
    "Ornamental trim and moldings",
    "Specialty woodworking projects"
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
        <title>Custom Woodwork | Colfax CA</title>
        <meta name="description" content="Artisan custom cabinetry & woodwork in Colfax, CA. Hand-crafted furniture & built-ins. Featured on DIY Network." />
        <link rel="canonical" href="https://www.monconbuild.com/services/custom-woodwork" />
        <meta property="og:title" content="Custom Woodwork | Colfax CA" />
        <meta property="og:description" content="Artisan custom cabinetry & woodwork in Colfax, CA. Hand-crafted furniture & built-ins. Featured on DIY Network." />
        <meta property="og:url" content="https://www.monconbuild.com/services/custom-woodwork" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://www.monconbuild.com/hero.webp" />
      </Helmet>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-green-900 via-green-800 to-emerald-900 text-white py-24 md:py-32">
        <div className="container mx-auto px-6 md:px-12">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Custom Woodwork & Cabinetry in Colfax, CA
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-200">
              Master craftsmanship in custom wood design for Placer & Nevada County homes
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
            <h2 className="text-3xl font-bold mb-6 text-gray-900">Artisan Custom Woodwork</h2>
            <p className="text-lg text-gray-700 mb-6">
              Monument Construction brings decades of woodworking expertise to every custom project in Colfax and throughout 
              Placer County. Our master craftsmen create one-of-a-kind pieces that add character and value to your home.
            </p>
            <p className="text-lg text-gray-700 mb-8">
              Whether you need custom cabinetry, built-in furniture, or unique decorative elements, we combine traditional 
              craftsmanship with modern techniques to deliver exceptional results. Licensed contractor <a href="https://www.cslb.ca.gov/801602" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 underline">#801602</a>.
            </p>

            <div className="bg-blue-50 p-8 rounded-lg mb-12">
              <h3 className="text-2xl font-bold mb-6 text-gray-900">What is Custom Woodwork?</h3>
              <p className="text-gray-700 mb-4">
                Custom woodwork represents the pinnacle of interior craftsmanship. Unlike standard, mass-produced cabinetry and furniture, custom woodwork is specifically designed and hand-crafted for your space and style preferences. Every piece is unique, tailored to your exact measurements, aesthetic preferences, and functional needs.
              </p>
              <p className="text-gray-700">
                From bespoke kitchen cabinetry that maximizes storage and functionality, to stunning library shelving that becomes a room's focal point, custom woodwork combines artistry with practicality. Our master woodworkers select premium materials, use time-honored techniques, and pay close attention to detail - creating pieces that get treasured for generations.
              </p>
            </div>

            <h3 className="text-2xl font-bold mb-4 text-gray-900">Custom Woodwork Services</h3>
            <div className="grid md:grid-cols-2 gap-4 mb-12">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start">
                  <CheckCircle2 className="w-6 h-6 text-blue-600 mr-3 flex-shrink-0 mt-1" />
                  <span className="text-gray-700">{feature}</span>
                </div>
              ))}
            </div>

            <h3 className="text-2xl font-bold mb-6 text-gray-900">Our Custom Woodwork Process</h3>
            <div className="grid md:grid-cols-2 gap-6 mb-12">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-lg">
                <div className="flex items-start mb-3">
                  <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 mr-3 font-bold">1</div>
                  <h4 className="text-lg font-semibold text-gray-900">Consultation & Design</h4>
                </div>
                <p className="text-gray-700 text-sm">
                  We meet with you to understand your vision, style preferences, and functional requirements. Our design team creates detailed plans and 3D renderings, showing exactly how your custom piece will look and fit in your space. We discuss wood choices, finishes, and budget.
                </p>
              </div>
              <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-lg">
                <div className="flex items-start mb-3">
                  <div className="bg-green-600 text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 mr-3 font-bold">2</div>
                  <h4 className="text-lg font-semibold text-gray-900">Material Selection</h4>
                </div>
                <p className="text-gray-700 text-sm">
                  We source premium hardwoods and materials, ensuring quality and longevity. Our craftsmen understand wood grain, movement, and finishing properties. We help you select materials that match your design vision and performance needs, whether you need durable oak, elegant walnut, or specialty woods.
                </p>
              </div>
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-lg">
                <div className="flex items-start mb-3">
                  <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 mr-3 font-bold">3</div>
                  <h4 className="text-lg font-semibold text-gray-900">Expert Craftsmanship</h4>
                </div>
                <p className="text-gray-700 text-sm">
                  Our master woodworkers hand-craft your piece using both traditional techniques and modern precision tools. Every joint is carefully fitted, every surface hand-finished, and every detail checked for perfection. We take pride in the quality that shows in every piece.
                </p>
              </div>
              <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-lg">
                <div className="flex items-start mb-3">
                  <div className="bg-green-600 text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 mr-3 font-bold">4</div>
                  <h4 className="text-lg font-semibold text-gray-900">Installation & Finishing</h4>
                </div>
                <p className="text-gray-700 text-sm">
                  We expertly install your custom piece, ensuring perfect alignment and secure mounting. Final finishing touches include hardware installation, staining, and protection. You'll receive a beautiful, functional work of art built to last for decades.
                </p>
              </div>
            </div>

            <div className="bg-green-50 p-8 rounded-lg mb-12">
              <div className="flex items-start mb-4">
                <Award className="w-8 h-8 text-green-800 mr-4 flex-shrink-0" />
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Master Craftsmanship</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li>• California Contractor <a href="https://www.cslb.ca.gov/801602" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 underline">License #801602</a></li>
                    <li>• Featured on DIY Network TV</li>
                    <li>• 25+ years woodworking experience</li>
                    <li>• Custom designs and consultation</li>
                    <li>• Serving Placer & Nevada Counties</li>
                  </ul>
                </div>
              </div>
            </div>

            <h3 className="text-2xl font-bold mb-4 text-gray-900">Service Areas</h3>
            <p className="text-lg text-gray-700 mb-4">
              Custom woodwork services throughout Northern California:
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
              <a href="/services/finish-carpentry" className="text-blue-600 hover:text-blue-800 font-semibold">
                Learn More →
              </a>
            </div>
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
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Create Something Beautiful</h2>
          <p className="text-xl mb-8 text-gray-200 max-w-2xl mx-auto">
            Let's discuss your custom woodwork project in Colfax or anywhere in Placer County.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/contact">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-lg px-8 py-6">
                Start Your Project
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
        faqs={customWoodworkFAQs} 
        title="Frequently Asked Questions About Custom Woodwork in Colfax, CA"
      />

      {/* Final CTA Section */}
      <section className="py-16 bg-gradient-to-r from-green-700 to-green-900 text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-6">
            Ready for Artisan Woodwork?
          </h2>
          <p className="text-xl mb-8">
            Contact Monument Construction today for your free consultation
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/contact">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-lg px-8 py-6">
                Start Your Project
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

export default CustomWoodwork;
