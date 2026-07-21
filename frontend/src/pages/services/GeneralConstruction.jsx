import React from 'react';

import { Head } from 'vite-react-ssg';
import Breadcrumb from '../../components/Breadcrumb';
import { Button } from '../../components/ui/button';
import FAQSection from '../../components/FAQSection';
import { generalConstructionFAQs } from '../../data/faqs';
import ServiceAreasBlock from '../../components/ServiceAreasBlock';
import { CheckCircle2, Phone, Mail, Building2, Award } from 'lucide-react';

const GeneralConstruction = () => {
  // Breadcrumb data
  const breadcrumbItems = [
    { name: 'Services', url: 'https://www.monconbuild.com/services' },
    { name: 'General Construction', url: 'https://www.monconbuild.com/services/general-construction' }
  ];

  // Service Schema
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": "General Construction",
    "provider": { "@id": "https://www.monconbuild.com/#organization" },
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
    "description": "Full-service general construction services including new construction, remodels, additions, and complete project management in Placer, Nevada, Sacramento, Yolo, and El Dorado Counties.",
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

  return (
    <div className="min-h-screen">
      <Head>
        <title>General Contractor | Colfax, Auburn & Placer County CA</title>
        <meta name="description" content="Full-service general construction in Placer County. New homes, remodels, additions & more. Licensed contractor #801602." />
        <link rel="canonical" href="https://www.monconbuild.com/services/general-construction" />
        <meta property="og:title" content="General Contractor | Colfax, Auburn & Placer County CA" />
        <meta property="og:description" content="Full-service general construction in Placer County. New homes, remodels, additions & more. Licensed contractor #801602." />
        <meta property="og:url" content="https://www.monconbuild.com/services/general-construction" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://www.monconbuild.com/og-default.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        
        {/* Service Schema */}
        <script type="application/ld+json">
          {JSON.stringify(serviceSchema)}
        </script>
      </Head>

      {/* Breadcrumb Navigation */}
      <Breadcrumb items={breadcrumbItems} />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-green-900 via-green-800 to-emerald-900 text-white py-24 md:py-32">
        <div className="container mx-auto px-6 md:px-12">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              General Construction Services in Colfax, California
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-200">
              Licensed general contractor providing complete construction solutions in Placer, Nevada, Sacramento, Yolo & El Dorado Counties
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

            <h3 className="text-2xl font-bold mb-6 text-gray-900">How a Project Runs With Us</h3>
            <div className="grid md:grid-cols-2 gap-6 mb-12">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-lg">
                <div className="flex items-start mb-3">
                  <div className="bg-green-700 text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 mr-3 font-bold">1</div>
                  <h4 className="text-lg font-semibold text-gray-900">Site Evaluation & Planning</h4>
                </div>
                <p className="text-gray-700 text-sm">
                  Every project starts on the property, not on paper. We walk the site with you, assess existing conditions — soil, slope, access, utilities — and talk honestly about scope, budget, and timeline before anything is drawn. On older homes we look for the structural surprises that tend to surface once walls open up, so they're planned for rather than discovered.
                </p>
              </div>
              <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-lg">
                <div className="flex items-start mb-3">
                  <div className="bg-green-600 text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 mr-3 font-bold">2</div>
                  <h4 className="text-lg font-semibold text-gray-900">Permits & Engineering</h4>
                </div>
                <p className="text-gray-700 text-sm">
                  We prepare and submit plans, coordinate structural engineering where it's required, and manage plan check with whichever authority has jurisdiction — city building departments or the county offices of Placer, Nevada, Sacramento, Yolo, and El Dorado Counties. You don't chase paperwork; we do.
                </p>
              </div>
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-lg">
                <div className="flex items-start mb-3">
                  <div className="bg-green-700 text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 mr-3 font-bold">3</div>
                  <h4 className="text-lg font-semibold text-gray-900">Construction & Trade Coordination</h4>
                </div>
                <p className="text-gray-700 text-sm">
                  From site preparation and foundation work through framing, roofing, and siding, we self-perform the carpentry and schedule the specialized trades — electrical, plumbing, HVAC — around a single coherent timeline. Inspections are booked at each phase so the job never stalls waiting on a sign-off.
                </p>
              </div>
              <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-lg">
                <div className="flex items-start mb-3">
                  <div className="bg-green-600 text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 mr-3 font-bold">4</div>
                  <h4 className="text-lg font-semibold text-gray-900">Finish Work & Final Walkthrough</h4>
                </div>
                <p className="text-gray-700 text-sm">
                  This is where our finish-carpentry background shows. Drywall, flooring, cabinetry, doors, and trim are completed to the standard of a company that built its name on the details, and we close out with a punch list, final inspection, and a walkthrough of everything we built.
                </p>
              </div>
            </div>

            <h3 className="text-2xl font-bold mb-4 text-gray-900">Building From the Valley Floor to the High Sierra</h3>
            <p className="text-lg text-gray-700 mb-6">
              Our five-county service area spans an unusual range of building conditions — from Sacramento Valley neighborhoods near sea level to foothill towns like Colfax and Grass Valley, and on up to Truckee and South Lake Tahoe above 6,000 feet. General construction here isn't one-size-fits-all, and our estimates and plans reflect the site you actually have.
            </p>
            <p className="text-lg text-gray-700 mb-6">
              In the foothills, that means engineering foundations and decks for sloped, wooded lots, managing drainage on hillsides, and building to Wildland-Urban Interface fire standards — enclosed eaves, ember-resistant vents, and non-combustible exterior details where the code requires them. At elevation, roofs and structures are designed for real snow loads and a short building season. Down in the valley, hot-summer climates and expansive clay soils drive material choices and foundation planning, especially on older homes.
            </p>
            <p className="text-lg text-gray-700 mb-8">
              Hiring us as your general contractor means one point of responsibility for all of it: scheduling, materials procurement, subcontractor management, code compliance, and quality control from the first day of groundwork to the last coat of paint. That single-point accountability — backed by 25+ years in these specific communities — is what keeps projects on budget and out of dispute.
            </p>

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
                    <li>• Serving Placer, Nevada, Sacramento, Yolo & El Dorado Counties</li>
                  </ul>
                </div>
              </div>
            </div>

            <ServiceAreasBlock
              heading="Areas We Serve"
              intro="Professional general construction services throughout Northern California:"
            />
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


