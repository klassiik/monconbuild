import React from 'react';

import { Head } from 'vite-react-ssg';
import { Link } from 'react-router-dom';
import Breadcrumb from '../../components/Breadcrumb';
import { Button } from '../../components/ui/button';
import { Phone, CheckCircle2 } from 'lucide-react';

// Cost guide assembled from the figures and claims already published on the
// finish-carpentry service page FAQs — keep the two in sync if prices change.
const URL = 'https://www.monconbuild.com/guides/finish-carpentry-cost-placer-county';

const FinishCarpentryCosts = () => {
  const breadcrumbItems = [
    { name: 'Finish Carpentry Cost Guide', url: URL }
  ];

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "What Finish Carpentry Costs in Placer County (2026)",
    "description": "Hourly rates, crown molding and built-in price ranges, project timelines, material choices, and California licensing rules for finish carpentry in Placer County.",
    "image": "https://www.monconbuild.com/og-default.jpg",
    "author": {
      "@type": "Person",
      "name": "William Rogers",
      "jobTitle": "Owner & Master Craftsman",
      "url": "https://www.monconbuild.com/about"
    },
    "publisher": { "@id": "https://www.monconbuild.com/#organization" },
    "datePublished": "2026-07-21",
    "dateModified": "2026-07-21",
    "mainEntityOfPage": URL
  };

  const costRows = [
    { item: 'Finish carpentry labor', range: '$50 – $100 per hour', note: 'Materials additional' },
    { item: 'Crown molding, 12×14 room', range: '$800 – $1,500', note: 'Installed' },
    { item: 'Custom built-ins', range: '$2,000 – $10,000+', note: 'Depends on size and complexity' }
  ];

  const timelines = [
    'Most finish carpentry projects: 2–7 days',
    'Crown molding for a whole house: 2–3 days',
    'Custom built-in bookshelves: 3–5 days',
    'Complete interior trim for a new home: 2–3 weeks'
  ];

  return (
    <div className="min-h-screen">
      <Head>
        <title>Finish Carpentry Cost Guide | Placer County CA (2026)</title>
        <meta name="description" content="Finish carpentry costs in Placer County: hourly rates, crown molding & built-in prices, timelines & hiring tips from a licensed contractor. (916) 607-1972" />
        <link rel="canonical" href={URL} />
        <meta property="og:title" content="Finish Carpentry Cost Guide | Placer County CA (2026)" />
        <meta property="og:description" content="Hourly rates, project price ranges, timelines, and licensing rules for finish carpentry in Placer County, from a licensed contractor with 25+ years in the field." />
        <meta property="og:url" content={URL} />
        <meta property="og:type" content="article" />
        <meta property="og:image" content="https://www.monconbuild.com/og-default.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <script type="application/ld+json">{JSON.stringify(articleSchema)}</script>
      </Head>

      <Breadcrumb items={breadcrumbItems} />

      {/* Hero */}
      <section className="relative bg-gradient-to-br from-green-900 via-green-800 to-emerald-900 text-white py-20 md:py-24">
        <div className="container mx-auto px-6 md:px-12">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              What Finish Carpentry Costs in Placer County (2026)
            </h1>
            <p className="text-xl text-gray-200">
              Real price ranges, timelines, and hiring advice from William Rogers —
              licensed general contractor (#801602) with 25+ years of finish
              carpentry in the Sierra foothills.
            </p>
          </div>
        </div>
      </section>

      {/* Article body */}
      <article className="py-16">
        <div className="container mx-auto px-6 max-w-3xl">
          <p className="text-lg text-gray-700 leading-relaxed mb-10">
            The two questions we hear most in Colfax, Auburn, and the rest of
            Placer County are "what will it cost?" and "how long will it take?"
            This guide shares the same ranges we quote in person, so you can
            budget before you ever pick up the phone.
          </p>

          <h2 className="text-3xl font-bold mb-6 text-gray-900">Typical price ranges</h2>
          <div className="overflow-x-auto mb-6">
            <table className="w-full text-left border border-gray-200 rounded-lg">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 font-semibold text-gray-900">Project</th>
                  <th className="px-4 py-3 font-semibold text-gray-900">Typical range</th>
                  <th className="px-4 py-3 font-semibold text-gray-900">Notes</th>
                </tr>
              </thead>
              <tbody>
                {costRows.map((row) => (
                  <tr key={row.item} className="border-t border-gray-200">
                    <td className="px-4 py-3 text-gray-800">{row.item}</td>
                    <td className="px-4 py-3 text-green-800 font-semibold whitespace-nowrap">{row.range}</td>
                    <td className="px-4 py-3 text-gray-600">{row.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-gray-700 leading-relaxed mb-10">
            Every project is quoted individually — these ranges are where most
            Placer County work lands, not a menu. We provide free, detailed
            written quotes so you know the real number before work begins.
          </p>

          <h2 className="text-3xl font-bold mb-6 text-gray-900">What moves the price</h2>
          <ul className="space-y-4 mb-10 text-gray-700 leading-relaxed">
            <li>
              <strong>Material choice.</strong> For painted trim we typically
              recommend MDF or poplar — both stable through Placer County's
              temperature swings and dry summers. Stain-grade work in oak, maple,
              or pine costs more in both material and labor, because every joint
              shows. Exterior trim in mountain areas calls for cedar or composite
              materials that shrug off moisture and temperature changes.
            </li>
            <li>
              <strong>Detail and complexity.</strong> Finish carpentry is the
              woodwork you look at every day, so precision drives the hours. An
              elaborate crown profile, paneled wainscot, or a floor-to-ceiling
              built-in takes more shop and install time than simple flat-stock trim.
            </li>
            <li>
              <strong>Older homes.</strong> Around Colfax we work on homes dating
              back to the Gold Rush era. Matching original trim may mean
              custom-milling profiles or sourcing period-appropriate moldings —
              beautiful results, but it adds to the budget.
            </li>
          </ul>

          <h2 className="text-3xl font-bold mb-6 text-gray-900">How long projects take</h2>
          <ul className="space-y-3 mb-10">
            {timelines.map((t) => (
              <li key={t} className="flex items-start gap-3 text-gray-700">
                <CheckCircle2 className="w-5 h-5 text-green-700 flex-shrink-0 mt-1" />
                <span>{t}</span>
              </li>
            ))}
          </ul>

          <h2 className="text-3xl font-bold mb-6 text-gray-900">The $500 rule: why licensing matters</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            In California, any construction project over $500 legally requires a
            licensed contractor. Hiring unlicensed help puts you at risk and may
            void your homeowner's insurance. Before hiring anyone, verify their
            license on the Contractors State License Board website — you can
            check ours right now:{' '}
            <a
              href="https://www.cslb.ca.gov/801602"
              target="_blank"
              rel="noopener noreferrer"
              className="text-green-800 font-semibold underline hover:text-green-900"
            >
              CSLB License #801602
            </a>
            .
          </p>
          <p className="text-gray-700 leading-relaxed mb-10">
            A license means the work meets state requirements and building codes,
            and that the contractor carries the bond and insurance the law expects.
          </p>

          <h2 className="text-3xl font-bold mb-6 text-gray-900">Getting an accurate number</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Ranges are a starting point; your home and design decide the real
            cost. We visit your property, discuss the vision, take measurements,
            and deliver a detailed written proposal — typically within 2–3
            business days. Consultations and quotes are always free throughout
            Placer, Nevada, Sacramento, Yolo, and El Dorado Counties.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            Learn more about our{' '}
            <Link to="/services/finish-carpentry" className="text-green-800 font-semibold underline hover:text-green-900">
              finish carpentry services
            </Link>{' '}
            and{' '}
            <Link to="/services/custom-woodwork" className="text-green-800 font-semibold underline hover:text-green-900">
              custom woodwork &amp; cabinetry
            </Link>
            , or browse the{' '}
            <Link to="/portfolio" className="text-green-800 font-semibold underline hover:text-green-900">
              portfolio
            </Link>{' '}
            to see the level of finish these budgets buy.
          </p>
        </div>
      </article>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-green-700 to-green-900 text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready for a real number?</h2>
          <p className="text-xl mb-8">
            Free on-site consultation and a detailed written quote — no obligation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact">
              <Button size="lg" className="bg-green-700 hover:bg-green-800 text-lg px-8 py-6">
                Request Free Quote
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
      </section>
    </div>
  );
};

export default FinishCarpentryCosts;
