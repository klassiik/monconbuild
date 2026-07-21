import React, { useState } from 'react';

import { Head } from 'vite-react-ssg';
import { Button } from '../components/ui/button';
import Breadcrumb from '../components/Breadcrumb';
import ImageGallery from '../components/ImageGallery';
import AutoCarousel from '../components/AutoCarousel';
import { PortfolioPageSchema, CreativeWorkSchema } from '../components/Schema';
import { Camera } from 'lucide-react';
import { portfolioCategories, libraryProgress, featuredSlides } from '../data/portfolio';

// Optimized "thumbnails"/"medium" variant paths (see scripts/import-images.mjs).
const optimized = (src, size) =>
  src && src.startsWith('/images/') ? src.replace('/images/', `/images/${size}/`) : src;

const Portfolio = () => {
  const [gallery, setGallery] = useState({ open: false, images: [], title: '', index: 0 });

  const openGallery = (images, title, index = 0) =>
    setGallery({ open: true, images, title, index });
  const closeGallery = () => setGallery((g) => ({ ...g, open: false }));

  const breadcrumbItems = [
    { name: 'Portfolio', url: 'https://www.monconbuild.com/portfolio' },
  ];

  // Build schema-friendly project entries from the category data.
  const schemaProjects = portfolioCategories.map((cat) => ({
    id: cat.id,
    title: cat.name,
    category: cat.name,
    description: cat.blurb,
    location: 'Placer & Nevada Counties, CA',
    thumbnail: cat.images[0],
    images: cat.images,
  }));

  return (
    <div className="min-h-screen overflow-x-hidden w-full">
      <Head>
        <title>Portfolio | Construction Projects</title>
        <meta name="description" content="View our portfolio of finish carpentry, home additions & construction projects in Placer, Nevada, Sacramento, Yolo & El Dorado Counties, CA." />
        <link rel="canonical" href="https://www.monconbuild.com/portfolio" />
        <meta property="og:title" content="Portfolio | Construction Projects" />
        <meta property="og:description" content="View our portfolio of finish carpentry, home additions & construction projects in Placer, Nevada, Sacramento, Yolo & El Dorado Counties, CA." />
        <meta property="og:url" content="https://www.monconbuild.com/portfolio" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://www.monconbuild.com/og-default.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>

      {/* Portfolio Page Schema for SEO */}
      <PortfolioPageSchema projects={schemaProjects} />
      {schemaProjects.map((project) => (
        <CreativeWorkSchema key={`schema-${project.id}`} project={project} />
      ))}

      {/* Breadcrumb Navigation */}
      <Breadcrumb items={breadcrumbItems} />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-green-900 via-green-800 to-emerald-900 text-white py-16 md:py-20">
        <div className="container mx-auto px-6 md:px-12">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">Our Work</h1>
            <p className="text-lg md:text-2xl text-gray-200 leading-relaxed">
              Real projects across Placer, Nevada, Sacramento, Yolo &amp; El Dorado Counties — browse by category below.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Slideshow */}
      <section className="py-10 md:py-14 bg-white">
        <div className="container mx-auto px-6 md:px-12">
          <div className="max-w-4xl mx-auto">
            <AutoCarousel
              slides={featuredSlides}
              aspectClass="aspect-[4/3]"
              onSlideClick={(i) =>
                openGallery(featuredSlides.map((s) => s.src), 'Featured Projects', i)
              }
            />
          </div>
        </div>
      </section>

      {/* Category Tiles */}
      <section className="py-12 md:py-16 bg-gray-50">
        <div className="container mx-auto px-6 md:px-12">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-3 text-gray-900">
            Browse by Project Type
          </h2>
          <p className="text-center text-gray-600 mb-10 md:mb-12">
            Tap any category to open the full photo gallery.
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {portfolioCategories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => openGallery(cat.images, cat.name, 0)}
                className="group text-left rounded-xl overflow-hidden shadow-lg hover:shadow-2xl bg-white transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-green-700"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={optimized(cat.images[0], 'medium')}
                    srcSet={`${optimized(cat.images[0], 'thumbnails')} 400w, ${optimized(cat.images[0], 'medium')} 1200w`}
                    sizes="(max-width: 640px) calc(100vw - 3rem), (max-width: 1024px) calc(50vw - 3rem), 33vw"
                    alt={`${cat.name} project by Monument Construction`}
                    loading="lazy"
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute bottom-3 right-3 bg-black/70 text-white px-3 py-1.5 rounded-lg text-xs md:text-sm font-medium flex items-center gap-1.5">
                    <Camera className="w-3.5 h-3.5 md:w-4 md:h-4" />
                    {cat.images.length} photo{cat.images.length !== 1 ? 's' : ''}
                  </div>
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center">
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white font-semibold bg-green-700 px-5 py-2.5 rounded-lg">
                      View Gallery
                    </span>
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="text-xl font-bold text-slate-900 mb-1">{cat.name}</h3>
                  <p className="text-gray-600 text-sm">{cat.blurb}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Library Construction — Progress Slideshow */}
      <section className="py-16 md:py-24 bg-slate-900 text-white">
        <div className="container mx-auto px-6 md:px-12">
          <div className="text-center mb-10 md:mb-12">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Library Build — Start to Finish</h2>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto">
              Watch a custom Downton Abbey–inspired library come together, from bare framing to the finished room.
            </p>
          </div>
          <div className="max-w-4xl mx-auto">
            <AutoCarousel
              slides={libraryProgress}
              interval={3500}
              aspectClass="aspect-[4/3]"
              onSlideClick={(i) =>
                openGallery(libraryProgress.map((s) => s.src), 'Library Build — Start to Finish', i)
              }
            />
          </div>
        </div>
      </section>

      {/* Image Gallery Lightbox */}
      <ImageGallery
        images={gallery.images}
        isOpen={gallery.open}
        onClose={closeGallery}
        initialIndex={gallery.index}
        title={gallery.title}
      />

      {/* Process Section */}
      <section className="py-20 md:py-28 bg-slate-50">
        <div className="container mx-auto px-6 md:px-12">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-slate-900">Our Process</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From initial consultation to final walkthrough, we ensure quality at every step.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {[
              { n: 1, title: 'Consultation', text: 'We discuss your vision, needs, and budget in detail.' },
              { n: 2, title: 'Planning', text: 'Detailed project planning, timeline, and material selection.' },
              { n: 3, title: 'Construction', text: 'Expert craftsmanship with regular progress updates.' },
              { n: 4, title: 'Completion', text: 'Final walkthrough and your complete satisfaction.' },
            ].map((step) => (
              <div key={step.n} className="text-center">
                <div className="w-16 h-16 bg-green-700 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  {step.n}
                </div>
                <h3 className="text-xl font-bold mb-3 text-slate-900">{step.title}</h3>
                <p className="text-gray-600">{step.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-28 bg-green-700 text-white">
        <div className="container mx-auto px-6 md:px-12 text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">Ready to Start Your Project?</h2>
          <p className="text-xl mb-10 text-white max-w-3xl mx-auto">
            Let's create something beautiful together. Contact us today for a free consultation.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-white text-green-700 hover:bg-gray-100 px-8 py-6 text-lg transition-all duration-300"
              asChild
            >
              <a href="/contact">Request Free Quote</a>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-white text-white hover:bg-white hover:text-green-700 px-8 py-6 text-lg transition-all duration-300"
              asChild
            >
              <a href="tel:9166071972">Call (916) 607-1972</a>
            </Button>
          </div>
        </div>
      </section>

      {/* Services Directory Section for SEO */}
      <section className="py-16 md:py-20 bg-green-50">
        <div className="container mx-auto px-6 md:px-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center text-gray-900">View Our Services</h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            Explore the complete range of construction and carpentry services we offer to homeowners in Placer, Nevada, Sacramento, Yolo, and El Dorado Counties.
          </p>
          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              <a href="/services/finish-carpentry" className="flex items-center p-4 bg-white rounded-lg hover:bg-green-100 transition-colors border border-green-200 hover:border-green-700 group">
                <span className="text-base font-semibold text-green-700 group-hover:text-blue-800">→ Finish Carpentry</span>
              </a>
              <a href="/services/general-construction" className="flex items-center p-4 bg-white rounded-lg hover:bg-green-100 transition-colors border border-green-200 hover:border-green-700 group">
                <span className="text-base font-semibold text-green-700 group-hover:text-blue-800">→ General Construction</span>
              </a>
              <a href="/services/home-additions" className="flex items-center p-4 bg-white rounded-lg hover:bg-green-100 transition-colors border border-green-200 hover:border-green-700 group">
                <span className="text-base font-semibold text-green-700 group-hover:text-blue-800">→ Home Additions</span>
              </a>
              <a href="/services/residential-projects" className="flex items-center p-4 bg-white rounded-lg hover:bg-green-100 transition-colors border border-green-200 hover:border-green-700 group">
                <span className="text-base font-semibold text-green-700 group-hover:text-blue-800">→ Residential Projects</span>
              </a>
              <a href="/services/custom-woodwork" className="flex items-center p-4 bg-white rounded-lg hover:bg-green-100 transition-colors border border-green-200 hover:border-green-700 group">
                <span className="text-base font-semibold text-green-700 group-hover:text-blue-800">→ Custom Woodwork</span>
              </a>
              <a href="/services/complete-remodeling" className="flex items-center p-4 bg-white rounded-lg hover:bg-green-100 transition-colors border border-green-200 hover:border-green-700 group">
                <span className="text-base font-semibold text-green-700 group-hover:text-blue-800">→ Complete Remodeling</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Portfolio;
