import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { Head } from 'vite-react-ssg';
import { MapPin, Phone, CheckCircle2, ArrowRight } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import Breadcrumb from '../components/Breadcrumb';
import { getCityBySlug } from '../data/cities';
import { CONTACT_INFO } from '../utils/constants';

const SERVICE_LABELS = {
  'finish-carpentry': 'Finish Carpentry',
  'general-construction': 'General Construction',
  'residential-projects': 'Residential Projects',
  'home-additions': 'Home Additions',
  'custom-woodwork': 'Custom Woodwork',
  'complete-remodeling': 'Complete Remodeling',
};

const BASE = 'https://www.monconbuild.com';

export default function CityLanding() {
  const { city: slug } = useParams();
  const city = getCityBySlug(slug);

  // Unknown slug: render a lightweight, non-indexed not-found state. (Direct hits
  // to unlisted slugs are served the static 404.html by Vercel; this covers the
  // client-side catch-all.)
  if (!city) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center px-6 py-24 text-center">
        <Head>
          <title>Service Area Not Found | Monument Construction</title>
          <meta name="robots" content="noindex, follow" />
        </Head>
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">We don't have a page for that area yet</h1>
          <p className="text-gray-600 mb-8">See every community we serve on our service areas page.</p>
          <Link to="/service-areas" className="bg-green-700 hover:bg-green-800 text-white px-6 py-3 rounded-lg font-semibold">
            View Service Areas
          </Link>
        </div>
      </div>
    );
  }

  const url = `${BASE}/service-areas/${city.slug}`;
  const title = `${city.name} General Contractor & Remodeling | Monument Construction`;
  // Keep under ~155 chars for the longest city/county combo so SERPs don't
  // truncate the phone number.
  const description = `Licensed contractor #801602 serving ${city.name}, ${city.county}. Remodeling, home additions & finish carpentry. Call ${CONTACT_INFO.FORMATTED_PHONE}.`;

  const breadcrumbItems = [
    { name: 'Service Areas', url: `${BASE}/service-areas` },
    { name: city.name, url },
  ];

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    'serviceType': 'General contracting, remodeling & finish carpentry',
    'provider': {
      '@type': 'GeneralContractor',
      '@id': `${BASE}/#organization`,
      'name': 'Monument Construction',
      'telephone': CONTACT_INFO.FORMATTED_PHONE,
    },
    'areaServed': [
      { '@type': 'City', 'name': `${city.name}, CA`, 'containedInPlace': { '@type': 'AdministrativeArea', 'name': city.county } },
    ],
    'url': url,
    'description': description,
  };

  const webPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    'name': title,
    'url': url,
    'description': description,
    'isPartOf': { '@id': `${BASE}/#website` },
    'about': { '@id': `${BASE}/#organization` },
  };

  return (
    <div className="min-h-screen">
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={url} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={url} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content={`${BASE}/og-default.jpg`} />
        <meta name="twitter:card" content="summary_large_image" />
        <script type="application/ld+json">{JSON.stringify(serviceSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(webPageSchema)}</script>
      </Head>

      <Breadcrumb items={breadcrumbItems} />

      {/* Hero */}
      <section className="bg-gradient-to-br from-green-900 via-green-800 to-emerald-900 text-white py-20 md:py-28">
        <div className="container mx-auto px-6 md:px-12">
          <div className="max-w-4xl mx-auto text-center">
            <p className="inline-flex items-center gap-2 text-green-200 font-semibold mb-4">
              <MapPin className="w-5 h-5" /> {city.name}, {city.county} &middot; {city.region}
            </p>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              {city.name} General Contractor &amp; Remodeling
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 leading-relaxed">{city.tagline}</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10">
              <Button asChild size="lg" className="bg-white text-green-800 hover:bg-gray-100">
                <Link to="/contact">Request a Free Quote</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                <a href={`tel:+1${CONTACT_INFO.PHONE}`}>
                  <Phone className="w-5 h-5 mr-2" /> {CONTACT_INFO.FORMATTED_PHONE}
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Intro + local context */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-6 md:px-12">
          <div className="max-w-3xl mx-auto">
            <p className="text-lg text-gray-700 leading-relaxed mb-6">{city.intro}</p>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mt-10 mb-4">
              Building in {city.name}
            </h2>
            {city.localContext.map((para, i) => (
              <p key={i} className="text-gray-700 leading-relaxed mb-4">{para}</p>
            ))}
          </div>
        </div>
      </section>

      {/* Local considerations */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6 md:px-12">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3 text-center">
              What {city.name} Projects Take Into Account
            </h2>
            <p className="text-gray-600 text-center mb-10">
              Local knowledge from {city.elevation} elevation to the permit counter.
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              {city.considerations.map((c, i) => (
                <Card key={i} className="border-gray-200">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg text-gray-900">
                      <CheckCircle2 className="w-5 h-5 text-green-700 flex-shrink-0" /> {c.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 text-sm leading-relaxed">{c.text}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Popular services (spoke -> hub internal links) */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-6 md:px-12">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 text-center">
              Our Services in {city.name}
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {city.popularServices.map((s) => (
                <Link
                  key={s}
                  to={`/services/${s}`}
                  className="group flex items-center justify-between bg-white border border-gray-200 rounded-lg px-5 py-4 hover:border-green-700 hover:shadow-md transition-all"
                >
                  <span className="font-semibold text-gray-900">{SERVICE_LABELS[s]}</span>
                  <ArrowRight className="w-4 h-4 text-green-700 group-hover:translate-x-1 transition-transform" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Neighborhoods */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-6 md:px-12">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              Neighborhoods &amp; Areas We Serve Around {city.name}
            </h2>
            <div className="flex flex-wrap justify-center gap-3">
              {city.neighborhoods.map((n) => (
                <span key={n} className="inline-flex items-center gap-1 bg-white border border-gray-200 rounded-full px-4 py-2 text-sm text-gray-700">
                  <MapPin className="w-3.5 h-3.5 text-green-700" /> {n}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Nearby cities (internal links) */}
      {city.nearby?.length > 0 && (
        <section className="py-12">
          <div className="container mx-auto px-6 md:px-12">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Nearby Communities We Serve</h2>
              <div className="flex flex-wrap justify-center gap-4">
                {city.nearby.map((n) => {
                  const nc = getCityBySlug(n);
                  if (!nc) return null;
                  return (
                    <Link
                      key={n}
                      to={`/service-areas/${nc.slug}`}
                      className="text-green-700 font-semibold hover:underline"
                    >
                      {nc.name} &rarr;
                    </Link>
                  );
                })}
                <Link to="/service-areas" className="text-gray-600 font-semibold hover:underline">
                  All Service Areas &rarr;
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-16 md:py-24 bg-green-700 text-white">
        <div className="container mx-auto px-6 md:px-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Planning a Project in {city.name}?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto text-green-50">
            Licensed contractor #801602, serving {city.name} and the {city.region} with 25+ years of craftsmanship.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-white text-green-800 hover:bg-gray-100">
              <Link to="/contact">Request a Free Quote</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
              <a href={`tel:+1${CONTACT_INFO.PHONE}`}>
                <Phone className="w-5 h-5 mr-2" /> {CONTACT_INFO.FORMATTED_PHONE}
              </a>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
