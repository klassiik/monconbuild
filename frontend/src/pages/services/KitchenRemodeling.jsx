import React, { useState } from 'react';

import { Head } from 'vite-react-ssg';
import Breadcrumb from '../../components/Breadcrumb';
import { Button } from '../../components/ui/button';
import FAQSection from '../../components/FAQSection';
import ImageGallery from '../../components/ImageGallery';
import { kitchenRemodelingFAQs } from '../../data/faqs';
import ServiceAreasBlock from '../../components/ServiceAreasBlock';
import { CheckCircle2, Phone, Mail, Award, Quote } from 'lucide-react';

// Optimized "thumbnails"/"medium" variant paths (see scripts/import-images.mjs).
const optimized = (src, size) => src.replace('/images/', `/images/${size}/`);

// Two real kitchen projects. kitchen-7 is a duplicate of kitchen-5, so it's left out.
const kitchenPhotos = [
  { src: '/images/Kitchens/kitchen-1.webp', alt: 'Remodeled kitchen with white shaker cabinets, navy island and stainless appliances' },
  { src: '/images/Kitchens/kitchen-2.webp', alt: 'White kitchen cabinetry with range hood, subway tile backsplash and farmhouse sink' },
  { src: '/images/Kitchens/kitchen-3.webp', alt: 'Navy kitchen island with quartz countertop beside a farmhouse sink' },
  { src: '/images/Kitchens/kitchen-4.webp', alt: 'Kitchen remodel with navy island seating, white cabinetry and stainless refrigerator' },
  { src: '/images/Kitchens/kitchen-5.webp', alt: 'Built-in dry bar with glass-front cabinets, wine refrigerator and patterned backsplash' },
  { src: '/images/Kitchens/kitchen-6.webp', alt: 'Kitchen remodel with white cabinets, quartz peninsula and hardwood floors' },
  { src: '/images/Kitchens/kitchen-8.webp', alt: 'White kitchen cabinets with glass-front uppers, gray subway tile and stainless appliances' },
];

// Hoisted so the reference is stable across renders (ImageGallery lists `images`
// in its preload effect deps).
const kitchenPhotoSrcs = kitchenPhotos.map((p) => p.src);

const KitchenRemodeling = () => {
  const [gallery, setGallery] = useState({ open: false, index: 0 });

  // Breadcrumb data
  const breadcrumbItems = [
    { name: 'Services', url: 'https://www.monconbuild.com/services' },
    { name: 'Kitchen Remodeling', url: 'https://www.monconbuild.com/services/kitchen-remodeling' }
  ];

  // Service Schema
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": "Kitchen Remodeling",
    "provider": { "@id": "https://www.monconbuild.com/#organization" },
    "areaServed": [
      { "@type": "AdministrativeArea", "name": "Placer County, CA" },
      { "@type": "AdministrativeArea", "name": "Nevada County, CA" },
      { "@type": "AdministrativeArea", "name": "Sacramento County, CA" },
      { "@type": "AdministrativeArea", "name": "Yolo County, CA" },
      { "@type": "AdministrativeArea", "name": "El Dorado County, CA" }
    ],
    "description": "Full kitchen remodels and cabinetry-led kitchen refreshes by a licensed general contractor (#801602) in Placer, Nevada, Sacramento, Yolo, and El Dorado Counties.",
    "url": "https://www.monconbuild.com/services/kitchen-remodeling",
    "image": "https://www.monconbuild.com/images/Kitchens/kitchen-1.webp",
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Kitchen Remodeling Services",
      "itemListElement": [
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Full Kitchen Remodels" } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Custom Kitchen Cabinetry & Islands" } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Kitchen Layout Changes & Wall Removal" } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Pantries, Built-ins & Dry Bars" } }
      ]
    }
  };

  const fullRemodel = [
    "Layout changes and wall removal",
    "Plumbing, electrical and gas coordinated under our license",
    "Permits and inspections handled for you",
    "Cabinets, counters, tile, flooring and lighting",
    "Structural repairs uncovered during demolition",
    "One contractor managing every trade"
  ];

  const cabinetryRefresh = [
    "Custom or semi-custom cabinets in your existing layout",
    "Islands and peninsulas built to fit",
    "Pantries, hood surrounds and appliance garages",
    "Built-in dry bars and beverage centers",
    "Crown molding, trim and finish details",
    "New counters and backsplash with the cabinetry"
  ];

  const costDrivers = [
    { title: "Layout changes", text: "Keeping sinks, range and walls where they are is the single biggest way to control cost. Moving plumbing, gas or walls adds labor, permits and inspections." },
    { title: "Cabinetry", text: "Custom cabinets are built to your exact space; semi-custom and stock lines cost less. Many kitchens mix the two, with a custom island or pantry." },
    { title: "Counters & finishes", text: "Countertop material, backsplash tile, flooring, fixtures and hardware all vary widely in price, and they're where you can choose where to splurge." },
    { title: "Older-home conditions", text: "Foothill and older Sacramento-area homes can hide outdated wiring, plumbing or framing. We plan for it in the quote instead of surprising you mid-project." }
  ];

  return (
    <div className="min-h-screen">
      <Head>
        <title>Kitchen Remodeling | Colfax, Auburn & Placer County CA</title>
        <meta name="description" content="Kitchen remodels & custom-cabinetry refreshes in Placer, Nevada, Sacramento, Yolo & El Dorado Counties. Licensed contractor #801602. (916) 607-1972" />
        <link rel="canonical" href="https://www.monconbuild.com/services/kitchen-remodeling" />
        <meta property="og:title" content="Kitchen Remodeling | Colfax, Auburn & Placer County CA" />
        <meta property="og:description" content="Kitchen remodels & custom-cabinetry refreshes in Placer, Nevada, Sacramento, Yolo & El Dorado Counties. Licensed contractor #801602. (916) 607-1972" />
        <meta property="og:url" content="https://www.monconbuild.com/services/kitchen-remodeling" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://www.monconbuild.com/images/Kitchens/kitchen-1.webp" />
        <meta name="twitter:card" content="summary_large_image" />

        {/* Service Schema */}
      </Head>
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema).replace(/</g, '\\u003c') }}
/>

      {/* Breadcrumb Navigation */}
      <Breadcrumb items={breadcrumbItems} />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-green-900 via-green-800 to-emerald-900 text-white py-24 md:py-32">
        <div className="container mx-auto px-6 md:px-12">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Kitchen Remodeling in Colfax &amp; Placer County, CA
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-200">
              Full kitchen remodels and custom-cabinetry refreshes for homeowners across Placer, Nevada, Sacramento, Yolo &amp; El Dorado Counties
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/contact">
                <Button size="lg" className="bg-green-700 hover:bg-green-800 text-lg px-8 py-6">
                  Get a Free Kitchen Quote
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
            <h2 className="text-3xl font-bold mb-6 text-gray-900">A Kitchen Built by a Finish Carpenter</h2>
            <p className="text-lg text-gray-700 mb-6">
              Most kitchen remodels are judged by the cabinetry: how the doors line up, how the crown meets the
              ceiling, how the island fits the room. That&apos;s our specialty. Monument Construction is a finish
              carpentry shop and a licensed general contractor, so the same team that plans your layout also builds
              and installs the woodwork you see every day.
            </p>
            <p className="text-lg text-gray-700 mb-12">
              Whether you&apos;re opening up a closed-off kitchen or keeping the layout and replacing tired cabinets,
              we manage the whole project from the first measurement to the final walkthrough. California
              Contractor <a href="https://www.cslb.ca.gov/801602" target="_blank" rel="noopener noreferrer" className="text-green-700 hover:text-blue-800 underline">License #801602</a>.
            </p>

            <h2 className="text-3xl font-bold mb-6 text-gray-900">Two Ways to Remodel Your Kitchen</h2>
            <div className="grid md:grid-cols-2 gap-6 mb-12">
              <div className="bg-green-50 p-6 rounded-lg">
                <h3 className="text-2xl font-bold mb-2 text-gray-900">Full Kitchen Remodel</h3>
                <p className="text-gray-700 mb-4">
                  For kitchens that need a new layout: walls opened up, the sink or range moved, and everything
                  replaced down to the studs.
                </p>
                <ul className="space-y-3">
                  {fullRemodel.map((item) => (
                    <li key={item} className="flex items-start">
                      <CheckCircle2 className="w-5 h-5 text-green-700 mr-3 flex-shrink-0 mt-1" />
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-green-50 p-6 rounded-lg">
                <h3 className="text-2xl font-bold mb-2 text-gray-900">Cabinetry-Led Refresh</h3>
                <p className="text-gray-700 mb-4">
                  For kitchens whose layout already works: new cabinetry, islands and finish work that transform
                  the room without moving walls or utilities.
                </p>
                <ul className="space-y-3">
                  {cabinetryRefresh.map((item) => (
                    <li key={item} className="flex items-start">
                      <CheckCircle2 className="w-5 h-5 text-green-700 mr-3 flex-shrink-0 mt-1" />
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <h2 className="text-3xl font-bold mb-6 text-gray-900">Recent Kitchen Work</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-12">
              {kitchenPhotos.map((photo, index) => (
                <button
                  key={photo.src}
                  type="button"
                  onClick={() => setGallery({ open: true, index })}
                  className="relative aspect-[4/3] overflow-hidden rounded-lg group focus:outline-none focus-visible:ring-4 focus-visible:ring-green-700"
                  aria-label={`View larger: ${photo.alt}`}
                >
                  <img
                    src={optimized(photo.src, 'medium')}
                    srcSet={`${optimized(photo.src, 'thumbnails')} 400w, ${optimized(photo.src, 'medium')} 1200w`}
                    sizes="(max-width: 768px) calc(50vw - 2rem), 300px"
                    alt={photo.alt}
                    loading="lazy"
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </button>
              ))}
            </div>

            <h2 className="text-3xl font-bold mb-6 text-gray-900">What Drives the Cost of a Kitchen Remodel</h2>
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              {costDrivers.map((driver) => (
                <div key={driver.title} className="border-2 border-gray-100 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{driver.title}</h3>
                  <p className="text-gray-700 text-sm">{driver.text}</p>
                </div>
              ))}
            </div>
            <p className="text-lg text-gray-700 mb-12">
              Every kitchen is different, so we don&apos;t publish one-size-fits-all prices. We&apos;ll visit, measure,
              and give you a free, itemized quote, so you can see exactly where the money goes.{' '}
              <a href="/contact" className="text-green-700 hover:text-blue-800 font-semibold underline">Request your free quote</a>.
            </p>

            <h2 className="text-3xl font-bold mb-6 text-gray-900">Our Kitchen Remodeling Process</h2>
            <div className="grid md:grid-cols-2 gap-6 mb-12">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-lg">
                <div className="flex items-start mb-3">
                  <div className="bg-green-700 text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 mr-3 font-bold">1</div>
                  <h3 className="text-lg font-semibold text-gray-900">Visit &amp; Measure</h3>
                </div>
                <p className="text-gray-700 text-sm">
                  We come to your home, talk through how you cook and use the space, measure everything, and check
                  the plumbing, electrical and framing we&apos;ll be working around.
                </p>
              </div>
              <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-lg">
                <div className="flex items-start mb-3">
                  <div className="bg-green-600 text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 mr-3 font-bold">2</div>
                  <h3 className="text-lg font-semibold text-gray-900">Design, Quote &amp; Permits</h3>
                </div>
                <p className="text-gray-700 text-sm">
                  You get a layout, cabinetry plan and itemized quote. Once you approve, we order materials and pull
                  any permits your city or county requires.
                </p>
              </div>
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-lg">
                <div className="flex items-start mb-3">
                  <div className="bg-green-700 text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 mr-3 font-bold">3</div>
                  <h3 className="text-lg font-semibold text-gray-900">Build</h3>
                </div>
                <p className="text-gray-700 text-sm">
                  Demolition, framing, rough-in and inspections, then cabinetry, counters, tile and trim. We contain
                  dust, keep the site clean, and keep you updated on the schedule.
                </p>
              </div>
              <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-lg">
                <div className="flex items-start mb-3">
                  <div className="bg-green-600 text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 mr-3 font-bold">4</div>
                  <h3 className="text-lg font-semibold text-gray-900">Finish &amp; Walkthrough</h3>
                </div>
                <p className="text-gray-700 text-sm">
                  Hardware, adjustments and final inspection. We walk the kitchen with you and fix anything on your
                  list before we call it done.
                </p>
              </div>
            </div>

            <figure className="bg-gray-50 border-l-4 border-green-700 p-8 rounded-lg mb-12">
              <Quote className="w-8 h-8 text-green-700 mb-4" aria-hidden="true" />
              <blockquote className="text-lg text-gray-700 italic mb-4">
                &ldquo;We&apos;ve collaborated with William on numerous projects over the years, ranging from kitchen
                remodels to extensive exterior renovations. On every project, William consistently delivers exceptional
                results, surpassing our expectations. His superior craftsmanship is evident in every detail.&rdquo;
              </blockquote>
              <figcaption className="font-semibold text-gray-900">
                Neal Mitchell <span className="font-normal text-gray-600">· Grass Valley, CA</span>
              </figcaption>
            </figure>

            <div className="bg-green-50 p-8 rounded-lg mb-12">
              <div className="flex items-start mb-4">
                <Award className="w-8 h-8 text-green-800 mr-4 flex-shrink-0" />
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Why Homeowners Choose Monument</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li>• Licensed California Contractor <a href="https://www.cslb.ca.gov/801602" target="_blank" rel="noopener noreferrer" className="text-green-700 hover:text-blue-800 underline">#801602</a></li>
                    <li>• Custom cabinetry and finish carpentry built by our own team</li>
                    <li>• 25+ years of experience</li>
                    <li>• Featured on DIY Network TV</li>
                    <li>• Serving Placer, Nevada, Sacramento, Yolo &amp; El Dorado Counties</li>
                  </ul>
                </div>
              </div>
            </div>

            <ServiceAreasBlock intro="Kitchen remodeling throughout Northern California:" />
          </div>
        </div>
      </section>

      {/* Related Services Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6 md:px-12">
          <h2 className="text-3xl font-bold mb-12 text-gray-900 text-center">Explore Our Other Services</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-bold mb-3 text-gray-900">Custom Woodwork</h3>
              <p className="text-gray-700 mb-4">Bespoke cabinetry, built-ins and furniture made for your space.</p>
              <a href="/services/custom-woodwork" className="text-green-700 hover:text-blue-800 font-semibold">
                Learn More →
              </a>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-bold mb-3 text-gray-900">Complete Remodeling</h3>
              <p className="text-gray-700 mb-4">Whole-house renovations when the kitchen is just the start.</p>
              <a href="/services/complete-remodeling" className="text-green-700 hover:text-blue-800 font-semibold">
                Learn More →
              </a>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-bold mb-3 text-gray-900">Finish Carpentry</h3>
              <p className="text-gray-700 mb-4">Crown molding, trim, wainscoting and built-ins.</p>
              <a href="/services/finish-carpentry" className="text-green-700 hover:text-blue-800 font-semibold">
                Learn More →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <FAQSection
        faqs={kitchenRemodelingFAQs}
        title="Frequently Asked Questions About Kitchen Remodeling"
      />

      {/* Final CTA Section */}
      <section className="py-16 bg-gradient-to-r from-green-700 to-green-900 text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-6">
            Ready to Plan Your New Kitchen?
          </h2>
          <p className="text-xl mb-8">
            Contact Monument Construction for a free visit and itemized quote
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

      <ImageGallery
        images={kitchenPhotoSrcs}
        isOpen={gallery.open}
        onClose={() => setGallery((g) => ({ ...g, open: false }))}
        initialIndex={gallery.index}
        title="Kitchen Remodeling"
      />
    </div>
  );
};

export default KitchenRemodeling;
