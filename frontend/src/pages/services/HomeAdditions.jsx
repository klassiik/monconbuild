import React, { useState } from 'react';

import { Head } from 'vite-react-ssg';
import Breadcrumb from '../../components/Breadcrumb';
import { Button } from '../../components/ui/button';
import FAQSection from '../../components/FAQSection';
import ImageGallery from '../../components/ImageGallery';
import { homeAdditionsFAQs } from '../../data/faqs';
import ServiceAreasBlock from '../../components/ServiceAreasBlock';
import { Phone, Mail, Award } from 'lucide-react';

// Optimized "thumbnails"/"medium" variant paths (see scripts/import-images.mjs).
const optimized = (src, size) => src.replace('/images/', `/images/${size}/`);

// All five Additions photos are the same sunroom project (Placer County).
const additionPhotos = [
  { src: '/images/Additions/addition-1.webp', alt: 'Sunroom home addition in Placer County with cedar tongue-and-groove ceiling, exposed beams and floor-to-ceiling windows' },
  { src: '/images/Additions/addition-2.webp', alt: 'Glass-walled sunroom home addition with vaulted wood ceiling and seating area, Placer County' },
  { src: '/images/Additions/addition-3.webp', alt: 'Cedar plank ceiling and exposed rafters in a Placer County sunroom addition' },
  { src: '/images/Additions/addition-4.webp', alt: 'Exposed beam framing meeting the window wall in a sunroom home addition, Placer County' },
  { src: '/images/Additions/addition-5.webp', alt: 'Exterior of a sunroom home addition with a tile roof matched to the existing house, Placer County' },
];

// Hoisted so the reference is stable across renders (ImageGallery lists `images`
// in its preload effect deps).
const additionPhotoSrcs = additionPhotos.map((p) => p.src);

const linkClass = 'text-green-700 hover:text-blue-800 underline';

const HomeAdditions = () => {
  const [gallery, setGallery] = useState({ open: false, index: 0 });

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
    "description": "Room additions, second-story additions, primary suites, bump-outs, garage conversions and sunrooms built to match the existing home, by a licensed general contractor (#801602) in Placer, Nevada, Sacramento, Yolo, and El Dorado Counties.",
    "url": "https://www.monconbuild.com/services/home-additions",
    "image": "https://www.monconbuild.com/images/Additions/addition-1.webp",
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Home Addition Services",
      "itemListElement": [
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Room Additions & Primary Suites" } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Second Story Additions" } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Bump-outs & Kitchen Extensions" } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Garage Conversions & In-law Suites" } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Sunrooms & Enclosed Porches" } }
      ]
    }
  };

  const siteConditions = [
    {
      condition: 'Sloped and oak-wooded lots',
      affects: 'Foundation, drainage, deck framing',
      plan: 'Engineered foundations, with drainage worked out before framing starts.'
    },
    {
      condition: 'Wildfire (WUI) zones around Auburn, Grass Valley and Placerville',
      affects: 'Exterior materials, eaves, vents',
      plan: 'Ember-resistant construction to current code: enclosed eaves, appropriate vents, non-combustible details where required.'
    },
    {
      condition: 'Well and septic systems',
      affects: 'Where the addition can sit',
      plan: 'We lay out the addition around the existing systems and their setbacks before design begins.'
    },
    {
      condition: 'Snow load in Truckee and the Tahoe basin',
      affects: 'Roof framing, decks, a short building season',
      plan: (
        <>
          Framing engineered for snow load and a schedule built around the season. More on{' '}
          <a href="/service-areas/south-lake-tahoe" className={linkClass}>additions in South Lake Tahoe</a>.
        </>
      )
    },
    {
      condition: 'HOA architectural review',
      affects: 'Exterior design approval',
      plan: (
        <>
          Plans drawn to the neighborhood&apos;s design guidelines, common for{' '}
          <a href="/service-areas/el-dorado-hills" className={linkClass}>home additions in El Dorado Hills</a>.
        </>
      )
    },
    {
      condition: 'Older homes',
      affects: 'Hidden structural and code issues',
      plan: 'We look for them at the site walk and plan for them in the quote, instead of discovering them mid-job.'
    }
  ];

  const permitRows = [
    {
      area: 'Placer County',
      authority: 'Placer County Community Development Resource Agency outside city limits; the City of Auburn for homes inside Auburn.',
      link: { href: '/service-areas/auburn', text: 'Auburn' }
    },
    {
      area: 'Nevada County',
      authority: 'Nevada County, or the City of Grass Valley inside city limits.',
      link: { href: '/service-areas/grass-valley', text: 'building and remodeling in Grass Valley' }
    },
    {
      area: 'El Dorado County',
      authority: 'El Dorado County (including unincorporated El Dorado Hills), or the City of Placerville inside city limits.',
      link: { href: '/service-areas/placerville', text: 'Placerville' }
    },
    {
      area: 'Lake Tahoe basin',
      authority: 'Tahoe Regional Planning Agency (TRPA) review on top of the local building permit.',
      link: { href: '/service-areas/south-lake-tahoe', text: 'South Lake Tahoe' }
    },
    {
      area: 'Sacramento County',
      authority: 'Sacramento County, or the City of Sacramento inside city limits.',
      link: { href: '/service-areas/sacramento', text: 'Sacramento' }
    },
    {
      area: 'Yolo County',
      authority: 'Yolo County, or the City of Davis Building Division inside Davis.',
      link: { href: '/service-areas/davis', text: 'Davis' }
    }
  ];

  const processSteps = [
    {
      title: 'Site Walk & Design',
      text: 'We walk the property with you and look at what will shape the addition: slope, soil, access, well and septic, and how the existing house is framed. Then we work out a design that fits how you live and how the house is built.'
    },
    {
      title: 'Engineering & Permits',
      text: 'A structural engineer checks the foundation and framing where the design needs it, always for a second story. We prepare the plans and take them through plan check with your city or county, plus TRPA or HOA review where it applies.'
    },
    {
      title: 'Construction',
      text: 'We do the framing and carpentry ourselves and schedule the plumbing, electrical and HVAC trades. Inspections happen at each phase. The work area stays sealed off from the rest of the house until it is time to open the wall.'
    },
    {
      title: 'Finish Work & Walkthrough',
      text: 'Trim, casings, flooring and paint, matched to the rooms next door. After final inspection we walk the addition with you and take care of anything on your list before we call it done.'
    }
  ];

  return (
    <div className="min-h-screen">
      <Head>
        <title>Home Addition Contractor | Colfax & Placer County CA</title>
        <meta name="description" content="Room additions, second stories and primary suites built to match your home. Licensed contractor #801602 serving the foothills. Call for a free quote." />
        <link rel="canonical" href="https://www.monconbuild.com/services/home-additions" />
        <meta property="og:title" content="Home Addition Contractor | Colfax & Placer County CA" />
        <meta property="og:description" content="Room additions, second stories and primary suites built to match your home. Licensed contractor #801602 serving the foothills. Call for a free quote." />
        <meta property="og:url" content="https://www.monconbuild.com/services/home-additions" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://www.monconbuild.com/images/Additions/addition-1.webp" />
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
              Home Addition Contractor for the Sierra Foothills &amp; Sacramento Region
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-200">
              Room additions, second stories and primary suites across Placer, Nevada, Sacramento, Yolo &amp; El Dorado Counties
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
            <h2 className="text-3xl font-bold mb-6 text-gray-900">Additions That Look Like They Were Always There</h2>
            <p className="text-lg text-gray-700 mb-6">
              Monument Construction is a home addition contractor based in Colfax, building room additions,
              second stories and primary suites for homeowners in Placer, Nevada, Sacramento, Yolo and El Dorado
              Counties. We&apos;re a licensed general contractor and a finish carpentry shop, so the same people who
              frame your addition also fit the trim at the end.
            </p>
            <p className="text-lg text-gray-700 mb-12">
              That matters most where the new space meets the old. Our goal is an addition you can&apos;t pick out
              from the street or from the hallway. California Contractor{' '}
              <a href="https://www.cslb.ca.gov/801602" target="_blank" rel="noopener noreferrer" className={linkClass}>License #801602</a>.
            </p>

            <h2 className="text-3xl font-bold mb-6 text-gray-900">Types of Home Additions We Build</h2>
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div className="bg-green-50 p-6 rounded-lg">
                <h3 className="text-xl font-bold mb-2 text-gray-900">Room Additions &amp; Primary Suites</h3>
                <p className="text-gray-700">
                  A room addition is the most common way to add space on the ground floor: a bedroom, a family room,
                  or a primary suite with its own bath and closet. We tie it into your existing floor, roof and
                  heating so it works like part of the original house.
                </p>
              </div>
              <div className="bg-green-50 p-6 rounded-lg">
                <h3 className="text-xl font-bold mb-2 text-gray-900">Second-Story Additions</h3>
                <p className="text-gray-700">
                  Can you add a second story to a one-story house? Yes, if the foundation and framing can carry the
                  extra weight, and a structural engineer confirms that before design starts. It&apos;s often the
                  answer on smaller lots, including{' '}
                  <a href="/service-areas/sacramento" className={linkClass}>second-story additions in Sacramento</a>{' '}
                  and Folsom.
                </p>
              </div>
              <div className="bg-green-50 p-6 rounded-lg">
                <h3 className="text-xl font-bold mb-2 text-gray-900">Bump-Outs &amp; Kitchen Extensions</h3>
                <p className="text-gray-700">
                  A few feet can change a room. Bump-outs push out one wall for a bigger kitchen, a breakfast nook or
                  a roomier bath, without the scope of a full addition.
                </p>
              </div>
              <div className="bg-green-50 p-6 rounded-lg">
                <h3 className="text-xl font-bold mb-2 text-gray-900">Garage Conversions &amp; In-Law Suites</h3>
                <p className="text-gray-700">
                  An attached garage already has a foundation and a roof. Converting it, or adding an in-law suite
                  off the main house, gives family a room of their own under the same roof.
                </p>
              </div>
              <div className="bg-green-50 p-6 rounded-lg md:col-span-2">
                <h3 className="text-xl font-bold mb-2 text-gray-900">Sunrooms &amp; Enclosed Porches</h3>
                <p className="text-gray-700">
                  Glass-walled rooms that bring the outdoors in, with real framing, roofing and finish work behind
                  them. See the sunroom addition below.
                </p>
              </div>
            </div>
            <p className="text-lg text-gray-700 mb-12">
              Looking for a separate unit with its own kitchen and entrance? That&apos;s an ADU, and we build those
              too. <a href="/contact" className={linkClass}>Ask us about ADUs</a>.
            </p>

            <h2 className="text-3xl font-bold mb-6 text-gray-900">What Changes an Addition in the Foothills</h2>
            <p className="text-lg text-gray-700 mb-6">
              The same addition plan can play out very differently on a valley lot and a foothill one. These are the
              site conditions we plan for as a home addition contractor working from Sacramento to Tahoe.
            </p>
            <div className="overflow-x-auto mb-6">
              <table className="w-full text-left border border-gray-200 rounded-lg">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 font-semibold text-gray-900">Site condition</th>
                    <th className="px-4 py-3 font-semibold text-gray-900">What it affects</th>
                    <th className="px-4 py-3 font-semibold text-gray-900">How we plan for it</th>
                  </tr>
                </thead>
                <tbody>
                  {siteConditions.map((row) => (
                    <tr key={row.condition} className="border-t border-gray-200 align-top">
                      <td className="px-4 py-3 text-gray-800 font-semibold">{row.condition}</td>
                      <td className="px-4 py-3 text-gray-700">{row.affects}</td>
                      <td className="px-4 py-3 text-gray-600">{row.plan}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-lg text-gray-700 mb-12">
              An addition that adds heated and cooled living space also has to meet California&apos;s Title 24 energy
              standards for insulation, windows and heating and cooling. We build that into the plans from the start.
            </p>

            <h2 className="text-3xl font-bold mb-6 text-gray-900">Who Permits Your Addition</h2>
            <p className="text-lg text-gray-700 mb-6">
              Yes, a home addition in California needs a building permit, and who issues it depends on where you live.
              Inside a city, it&apos;s the city building department; outside city limits, it&apos;s the county. We
              prepare the plans, handle the submittals and schedule the inspections either way.
            </p>
            <div className="overflow-x-auto mb-12">
              <table className="w-full text-left border border-gray-200 rounded-lg">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 font-semibold text-gray-900">Area</th>
                    <th className="px-4 py-3 font-semibold text-gray-900">Who issues the permit</th>
                    <th className="px-4 py-3 font-semibold text-gray-900">More local detail</th>
                  </tr>
                </thead>
                <tbody>
                  {permitRows.map((row) => (
                    <tr key={row.area} className="border-t border-gray-200 align-top">
                      <td className="px-4 py-3 text-gray-800 font-semibold whitespace-nowrap">{row.area}</td>
                      <td className="px-4 py-3 text-gray-700">{row.authority}</td>
                      <td className="px-4 py-3">
                        <a href={row.link.href} className={linkClass}>{row.link.text}</a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <h2 className="text-3xl font-bold mb-6 text-gray-900">Matching the House You Already Have</h2>
            <p className="text-lg text-gray-700 mb-6">
              Most additions give themselves away in the details: a baseboard that&apos;s a little too tall, a door
              casing that doesn&apos;t match the hallway, a roof pitch that&apos;s almost right. Because we&apos;re{' '}
              <a href="/services/finish-carpentry" className={linkClass}>finish carpenters</a>, we mill trim to your
              existing profiles when it can&apos;t be bought, carry the roofline and siding through, and line up floors
              and ceilings so there&apos;s no step where old meets new.
            </p>
            <p className="text-lg text-gray-700 mb-12">
              When the new room calls for built-ins, a window seat or a mantel, our{' '}
              <a href="/services/custom-woodwork" className={linkClass}>custom woodwork</a> shop builds those too, in
              the same style as the rest of the house.
            </p>

            <h2 className="text-3xl font-bold mb-6 text-gray-900">Recent Home Additions</h2>
            <p className="text-lg text-gray-700 mb-6">
              <strong>Sunroom addition, Placer County.</strong> A glass-walled room off the back of the house, with a
              vaulted cedar tongue-and-groove ceiling on exposed beams. Outside, the new roof is framed and tiled to
              match the existing house.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
              {additionPhotos.map((photo, index) => (
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
            <p className="text-lg text-gray-700 mb-12">
              More of our work is in the <a href="/portfolio" className={linkClass}>project portfolio</a>.
            </p>

            <h2 className="text-3xl font-bold mb-6 text-gray-900">Our Home Addition Process</h2>
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              {processSteps.map((step, index) => (
                <div
                  key={step.title}
                  className={`bg-gradient-to-br ${index % 2 === 0 ? 'from-blue-50 to-blue-100' : 'from-green-50 to-green-100'} p-6 rounded-lg`}
                >
                  <div className="flex items-start mb-3">
                    <div className={`${index % 2 === 0 ? 'bg-green-700' : 'bg-green-600'} text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 mr-3 font-bold`}>
                      {index + 1}
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900">{step.title}</h3>
                  </div>
                  <p className="text-gray-700 text-sm">{step.text}</p>
                </div>
              ))}
            </div>
            <p className="text-lg text-gray-700 mb-12">
              You can usually stay in the house while we build. We&apos;ll talk through how the work area, access and
              noise will go for your project before anything starts.
            </p>

            <div className="bg-green-50 p-8 rounded-lg mb-12">
              <div className="flex items-start mb-4">
                <Award className="w-8 h-8 text-green-800 mr-4 flex-shrink-0" />
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Why Homeowners Hire Us for Additions</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li>• Licensed California Contractor <a href="https://www.cslb.ca.gov/801602" target="_blank" rel="noopener noreferrer" className={linkClass}>#801602</a></li>
                    <li>• Owner William Rogers on the job, not a salesperson</li>
                    <li>• A finish carpenter running every job, from framing to the last piece of trim</li>
                    <li>• 25+ years building in Northern California</li>
                    <li>• Featured on DIY Network TV</li>
                    <li>• Serving Placer, Nevada, Sacramento, Yolo &amp; El Dorado Counties</li>
                  </ul>
                </div>
              </div>
            </div>

            <ServiceAreasBlock intro="Home addition services throughout Northern California:" />
          </div>
        </div>
      </section>

      {/* Related Services Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6 md:px-12">
          <h2 className="text-3xl font-bold mb-12 text-gray-900 text-center">Explore Our Other Services</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-bold mb-3 text-gray-900">Complete Remodeling</h3>
              <p className="text-gray-700 mb-4">Whole-house renovations when the addition is part of a bigger plan.</p>
              <a href="/services/complete-remodeling" className="text-green-700 hover:text-blue-800 font-semibold">
                Learn More →
              </a>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-bold mb-3 text-gray-900">Kitchen Remodeling</h3>
              <p className="text-gray-700 mb-4">Full remodels and cabinetry-led refreshes, often paired with a bump-out.</p>
              <a href="/services/kitchen-remodeling" className="text-green-700 hover:text-blue-800 font-semibold">
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
        faqs={homeAdditionsFAQs}
        title="Home Addition FAQs"
      />

      {/* Final CTA Section */}
      <section className="py-16 bg-gradient-to-r from-green-700 to-green-900 text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-6">
            Planning a Home Addition?
          </h2>
          <p className="text-xl mb-8">
            Contact Monument Construction for a free site walk and itemized quote anywhere in Placer, Nevada,
            Sacramento, Yolo or El Dorado County
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
        images={additionPhotoSrcs}
        isOpen={gallery.open}
        onClose={() => setGallery((g) => ({ ...g, open: false }))}
        initialIndex={gallery.index}
        title="Home Additions"
      />
    </div>
  );
};

export default HomeAdditions;
