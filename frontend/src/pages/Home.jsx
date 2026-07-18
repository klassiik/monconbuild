import React, { useState } from 'react';
import { Head } from 'vite-react-ssg';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Phone, Mail, Hammer, Home as HomeIcon, Building2, Wrench } from 'lucide-react';
import Testimonials from '../components/Testimonials';
import AutoCarousel from '../components/AutoCarousel';
import ImageGallery from '../components/ImageGallery';
import { featuredSlides } from '../data/portfolio';
import { CONTACT_INFO, COMPANY_INFO } from '../utils/constants';
import ErrorBoundary from '../components/ErrorBoundary';
import { handleError } from '../utils/errorHandler';

// LCP-friendly background image: no fade/blur gate — the image is preloaded in
// index.html, so it must paint the moment it decodes to keep LCP fast.
const HeroBackground = () => {
  const handleImageError = () => {
    handleError(new Error('Failed to load hero background image'), 'IMAGE_LOAD_ERROR', 'LOW', {
      imageSource: '/hero.webp',
      component: 'HeroBackground'
    });
  };

  return (
    <img
      src="/hero.webp"
      alt="Two-story home exterior with deck and staircase built by Monument Construction in Colfax, CA"
      decoding="async"
      // eslint-disable-next-line react/no-unknown-property -- installed React 18.3 doesn't map camelCase fetchPriority; browser needs lowercase fetchpriority
      fetchpriority="high"
      className="absolute inset-0 z-0 w-full h-full object-cover"
      onError={handleImageError}
    />
  );
};

// Enhanced portfolio image component with lazy loading and error handling
const PortfolioImage = ({ project, index }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const handleImageError = () => {
    setImageError(true);
    handleError(new Error(`Failed to load portfolio image: ${project.image}`), 'IMAGE_LOAD_ERROR', 'LOW', {
      imageSource: project.image,
      projectTitle: project.title
    });
  };

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  // Fallback image for failed loads
  const fallbackImage = "/logo.svg";

  return (
    <div className="group cursor-pointer overflow-hidden rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300">
      <div className="relative overflow-hidden">
        {!imageError ? (
          <>
            <img 
              src={project.image} 
              alt={project.alt}
              loading="lazy"
              onLoad={handleImageLoad}
              onError={handleImageError}
              className={`w-full h-72 object-cover group-hover:scale-110 transition-transform duration-500 ${
                !imageLoaded ? 'opacity-0' : 'opacity-100'
              }`}
            />
            {!imageLoaded && (
              <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center">
                <div className="text-gray-400">Loading...</div>
              </div>
            )}
          </>
        ) : (
          <div className="w-full h-72 bg-gray-200 flex items-center justify-center">
            <img 
              src={fallbackImage} 
              alt="Monument Construction logo"
              className="w-16 h-16 opacity-50"
            />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-green-900 via-transparent to-transparent opacity-60"></div>
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
          <h3 className="text-xl font-bold mb-1">{project.title}</h3>
          <p className="text-sm text-gray-200">{project.description}</p>
        </div>
      </div>
    </div>
  );
};

// Hero section with hero.webp mountain background image for visual appeal
const Home = () => {
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [galleryIndex, setGalleryIndex] = useState(0);

  try {
    // Homepage Schema.org structured data for rich results
    const homepageSchema = {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "@id": "https://www.monconbuild.com/#webpage",
      "url": "https://www.monconbuild.com/",
      "name": "Monument Construction | Expert Finish Carpentry & General Contractor Colfax CA",
      "description": "Professional finish carpentry and general construction services serving Placer, Nevada, Sacramento, Yolo, and El Dorado Counties in Northern California. Licensed contractor #801602. Featured on DIY Network TV.",
      "isPartOf": {
        "@type": "WebSite",
        "@id": "https://www.monconbuild.com/#website"
      },
      "about": { "@id": "https://www.monconbuild.com/#organization" },
      "primaryImageOfPage": {
        "@type": "ImageObject",
        "url": "https://www.monconbuild.com/hero.webp",
        "description": "Two-story home exterior with deck and staircase built by Monument Construction in Colfax, CA"
      }
    };

    // ItemList Schema for Services (enables rich site links)
    const servicesListSchema = {
      "@context": "https://schema.org",
      "@type": "ItemList",
      "name": "Construction Services",
      "description": "Professional construction and finish carpentry services offered by Monument Construction",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "url": "https://www.monconbuild.com/services/finish-carpentry",
          "name": "Finish Carpentry",
          "description": "Expert custom woodwork, trim, moldings, and built-ins"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "url": "https://www.monconbuild.com/services/general-construction",
          "name": "General Construction",
          "description": "Complete construction services from foundation to finish"
        },
        {
          "@type": "ListItem",
          "position": 3,
          "url": "https://www.monconbuild.com/services/residential-projects",
          "name": "Residential Projects",
          "description": "Complete residential construction and renovation projects"
        },
        {
          "@type": "ListItem",
          "position": 4,
          "url": "https://www.monconbuild.com/services/home-additions",
          "name": "Home Additions",
          "description": "Room additions and home expansions"
        },
        {
          "@type": "ListItem",
          "position": 5,
          "url": "https://www.monconbuild.com/services/custom-woodwork",
          "name": "Custom Woodwork",
          "description": "Custom cabinetry and artisan woodwork"
        },
        {
          "@type": "ListItem",
          "position": 6,
          "url": "https://www.monconbuild.com/services/complete-remodeling",
          "name": "Complete Remodeling",
          "description": "Whole-house renovations and remodeling"
        }
      ]
    };

    const services = [
      {
        icon: <Hammer className="w-8 h-8" />,
        title: "Finish Carpentry",
        description: "Expert custom woodwork, trim, moldings, and built-ins that showcase true craftsmanship."
      },
      {
        icon: <HomeIcon className="w-8 h-8" />,
        title: "Residential Construction",
        description: "Complete residential projects from ground work to final touches with attention to detail."
      },
      {
        icon: <Wrench className="w-8 h-8" />,
        title: "Remodeling & Renovations",
        description: "Transform your existing space with quality craftsmanship and attention to detail."
      },
      {
        icon: <Building2 className="w-8 h-8" />,
        title: "Complete Construction",
        description: "Full-service construction from foundation to finish, bringing your vision to life."
      }
    ];

    const portfolio = [
      {
        image: "/images/medium/Library-Offices/library-1.webp",
        title: "Custom Library & Built-Ins",
        description: "Floor-to-ceiling custom carpentry",
        alt: "Custom library built-in bookcase with finish carpentry work in Placer County, CA home"
      },
      {
        image: "/images/medium/Kitchens/kitchen-1.webp",
        title: "Modern Kitchen Remodel",
        description: "Custom cabinetry and quartz counters",
        alt: "Modern kitchen remodel with custom cabinetry by Monument Construction in Placer County, CA"
      },
      {
        image: "/images/medium/Fireplaces/fireplace-1.webp",
        title: "Stone Fireplace & Mantel",
        description: "Stacked stone with a reclaimed-timber mantel",
        alt: "Stacked stone fireplace with reclaimed timber mantel by Monument Construction in Nevada County, CA"
      },
      {
        image: "/images/medium/Outdoors/outdoor-1.webp",
        title: "Timber-Frame Pavilion",
        description: "Outdoor living, built to last",
        alt: "Timber-frame outdoor pavilion by Monument Construction in Nevada County, CA"
      },
      {
        image: "/images/medium/Additions/addition-1.webp",
        title: "Sunroom Addition",
        description: "Light-filled space that blends right in",
        alt: "Sunroom addition with vaulted wood ceiling by Monument Construction in Placer County, CA"
      },
      {
        image: "/images/medium/Framing/framing-1.webp",
        title: "New Home Framing",
        description: "Foundations to rooflines, built strong",
        alt: "Residential framing project by Monument Construction in Placer County, CA"
      }
    ];

    const testimonials = [
      {
        text: "We've collaborated with William on numerous projects over the years, ranging from kitchen remodels to extensive exterior renovations. On every project, William consistently delivers exceptional results, surpassing our expectations. His superior craftsmanship is evident in every detail, as he approaches construction with a meticulous and perfectionist mindset. If you're seeking top-notch work and exceptional results, don't hesitate to contact William. Additionally, some of the projects we've entrusted to him required creative problem-solving and ingenuity. In each instance, William demonstrated his remarkable ability to find innovative solutions, resulting in outstanding outcomes.",
        name: "Neal Mitchell",
        location: "Grass Valley, CA",
        service: "Kitchen Remodeling & Exterior Renovations"
      },
      {
        text: "We had William build our formal library and asked him to model it after the library in the show Downton Abbey. As you can see from the pictures, he succeeded amazingly well. We then had him build a library in my home office and my wife's smaller home office in the same style. He also built custom shelves in the mudroom in a different style entirely. Everything this man builds is perfect. No flaws or mistakes anywhere. He is a master craftsman, an artist, if you will, and a pleasure to work with. We highly recommend William for any project you might have.",
        name: "Richard Young",
        location: "Sacramento, CA",
        service: "Custom Shelving & Library"
      }
    ];

    return (
      <ErrorBoundary>
        <div className="min-h-screen">
          {/* SEO Meta Tags and Schema.org Structured Data */}
          <Head>
            <title>Expert Carpentry & Construction | Colfax CA</title>
            <meta name="description" content="Expert finish carpentry & construction in Northern CA. Licensed contractor #801602 serving Placer, Nevada, Sacramento & El Dorado Counties. (916) 607-1972" />
            <link rel="canonical" href="https://www.monconbuild.com/" />
            
            {/* Open Graph Tags */}
            <meta property="og:title" content="Monument Construction | Expert Finish Carpentry & General Contractor Colfax CA" />
            <meta property="og:description" content="Licensed contractor serving Placer, Nevada, Sacramento, Yolo & El Dorado Counties with quality finish carpentry and complete construction services." />
            <meta property="og:url" content="https://www.monconbuild.com/" />
            <meta property="og:type" content="website" />
            <meta property="og:image" content="https://www.monconbuild.com/hero.webp" />
            
            {/* Schema.org JSON-LD */}
            <script type="application/ld+json">
              {JSON.stringify(homepageSchema)}
            </script>
            <script type="application/ld+json">
              {JSON.stringify(servicesListSchema)}
            </script>
          </Head>

          {/* Hero Section - Semantic HTML with LCP-friendly <img> */}
          <section aria-label="Hero section" className="relative text-white overflow-hidden min-h-[70vh] md:min-h-[80vh] flex items-end">
            {/* Background image as real <img> for better LCP */}
            <HeroBackground />

            {/* Subtle bottom scrim for text legibility */}
            <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/60 via-black/20 to-transparent z-10" aria-hidden="true"></div>

            {/* Optional: Add a subtle pattern overlay */}
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjA1IiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-20 z-10" aria-hidden="true"></div>

            <div className="container mx-auto px-6 md:px-12 relative z-20 pb-12 md:pb-16">
              <div className="max-w-2xl">
                <h1 className="text-3xl md:text-4xl font-semibold mb-4 leading-snug">
                  Professional Construction & Finish Carpentry
                </h1>
                <p className="text-base md:text-lg mb-6 text-gray-200 leading-relaxed">
                  Serving Placer, Nevada, Sacramento, Yolo & El Dorado Counties. Licensed, experienced, and trusted craftsmanship from ground work to complete construction.
                </p>

                <div className="flex flex-col sm:flex-row gap-3">
                  <Button
                    className="bg-green-700 hover:bg-green-800 text-white transition-colors duration-300"
                    asChild
                  >
                    <Link to="/contact">Get Free Quote</Link>
                  </Button>
                  <Button
                    variant="outline"
                    className="border border-white/40 text-white hover:border-white hover:bg-white/10 transition-colors duration-300"
                    asChild
                  >
                    <a href={`tel:${CONTACT_INFO.PHONE}`} aria-label={`Call Monument Construction at ${CONTACT_INFO.FORMATTED_PHONE}`}>
                      <Phone className="mr-2 w-4 h-4" />
                      {CONTACT_INFO.FORMATTED_PHONE}
                    </a>
                  </Button>
                </div>

                <p className="mt-4 text-sm text-gray-300">
                  Licensed &amp; Insured — {COMPANY_INFO.FULL_LICENSE}
                </p>
              </div>
            </div>
          </section>

          {/* Services Section */}
          <section className="py-20 md:py-28 bg-white">
            <div className="container mx-auto px-6 md:px-12">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-5xl font-bold mb-4 text-slate-900">Our Services</h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  From fine finish carpentry to complete construction projects, we deliver quality craftsmanship every time.
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {services.map((service, index) => (
                  <Card
                    key={index}
                    className="border-2 hover:border-green-700 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 group"
                  >
                    <CardContent className="p-8">
                      <div className="text-green-700 mb-4 group-hover:scale-110 transition-transform duration-300">
                        {service.icon}
                      </div>
                      <h3 className="text-xl font-bold mb-3 text-slate-900">{service.title}</h3>
                      <p className="text-gray-600 leading-relaxed">{service.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="text-center mt-12">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-green-700 text-green-700 hover:bg-green-700 hover:text-white transition-all duration-300"
                  asChild
                >
                  <Link to="/services">View All Services</Link>
                </Button>
              </div>
            </div>
          </section>

          {/* Testimonials Section */}
          <Testimonials testimonials={testimonials} showImages={true} />

          {/* Portfolio Preview */}
          <section className="py-20 md:py-28 bg-slate-50">
            <div className="container mx-auto px-6 md:px-12">
              <div className="text-center mb-10 md:mb-12">
                <h2 className="text-3xl md:text-5xl font-bold mb-4 text-slate-900">Our Work</h2>
                <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                  Quality craftsmanship across Placer, Nevada, Sacramento, Yolo &amp; El Dorado Counties.
                </p>
              </div>

              {/* Featured auto-slideshow */}
              <div className="max-w-4xl mx-auto mb-12 md:mb-16">
                <AutoCarousel
                  slides={featuredSlides}
                  aspectClass="aspect-[4/3]"
                  onSlideClick={(i) => {
                    setGalleryIndex(i);
                    setGalleryOpen(true);
                  }}
                />
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                {portfolio.map((project, index) => (
                  <PortfolioImage key={index} project={project} index={index} />
                ))}
              </div>

              <div className="text-center">
                <Button 
                  size="lg" 
                  className="bg-green-700 hover:bg-green-800 text-white transition-all duration-300"
                  asChild
                >
                  <Link to="/portfolio">View Full Portfolio</Link>
                </Button>
              </div>
            </div>
          </section>

          {/* Featured slideshow lightbox */}
          <ImageGallery
            images={featuredSlides.map((s) => s.src)}
            isOpen={galleryOpen}
            onClose={() => setGalleryOpen(false)}
            initialIndex={galleryIndex}
            title="Featured Projects"
          />

          {/* CTA Section */}
          <section className="py-20 md:py-28 bg-green-700 text-white">
            <div className="container mx-auto px-6 md:px-12 text-center">
              <h2 className="text-3xl md:text-5xl font-bold mb-6">Ready to Start Your Project?</h2>
              <p className="text-xl md:text-2xl mb-10 text-white max-w-3xl mx-auto">
                Get in touch today for a free consultation and quote. Let's bring your vision to life.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  size="lg" 
                  className="bg-white text-green-700 hover:bg-gray-100 px-8 py-6 text-lg transition-all duration-300 hover:scale-105 shadow-lg"
                  asChild
                >
                  <Link to="/contact">Request Free Quote</Link>
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-2 border-white text-white hover:bg-white hover:text-green-700 px-8 py-6 text-lg transition-all duration-300"
                  asChild
                >
                  <a href={`tel:${CONTACT_INFO.PHONE}`} aria-label={`Call Monument Construction at ${CONTACT_INFO.FORMATTED_PHONE}`}>
                    <Phone className="mr-2 w-5 h-5" />
                    Call {CONTACT_INFO.FORMATTED_PHONE}
                  </a>
                </Button>
              </div>

              <div className="mt-10 flex flex-col sm:flex-row gap-6 justify-center items-center text-white">
                <div className="flex items-center gap-2">
                  <Phone className="w-5 h-5" />
                  <span>{CONTACT_INFO.FORMATTED_PHONE}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-5 h-5" />
                  <a href={`mailto:${CONTACT_INFO.EMAIL}`} className="hover:text-white transition-colors">
                    {CONTACT_INFO.EMAIL}
                  </a>
                </div>
              </div>
            </div>
          </section>
        </div>
      </ErrorBoundary>
    );
  } catch (error) {
    handleError(error, 'COMPONENT_RENDER_ERROR', 'HIGH', {
      component: 'Home',
      timestamp: new Date().toISOString()
    });
    
    // Fallback minimal home page
    return (
      <ErrorBoundary>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Monument Construction</h1>
            <p className="text-xl mb-6">Professional Construction & Finish Carpentry</p>
            <div className="space-x-4">
              <a href={`tel:${CONTACT_INFO.PHONE}`} className="bg-green-700 text-white px-6 py-3 rounded">
                Call {CONTACT_INFO.FORMATTED_PHONE}
              </a>
              <Link to="/contact" className="bg-blue-700 text-white px-6 py-3 rounded">
                Get Quote
              </Link>
            </div>
          </div>
        </div>
      </ErrorBoundary>
    );
  }
};

export default Home;
