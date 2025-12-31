import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Phone, Mail, CheckCircle2, Award, Hammer, Home as HomeIcon, Building2, Wrench } from 'lucide-react';
import Testimonials from '../components/Testimonials';
import { CONTACT_INFO } from '../utils/constants';
import ErrorBoundary from '../components/ErrorBoundary';
import { handleError } from '../utils/errorHandler';

// LCP-friendly background image component with blur-in effect
const HeroBackground = () => {
  const [loaded, setLoaded] = useState(false);
  
  const handleImageError = () => {
    handleError(new Error('Failed to load hero background image'), 'IMAGE_LOAD_ERROR', 'LOW', {
      imageSource: '/hero.webp',
      component: 'HeroBackground'
    });
  };

  return (
    <img
      src="/hero.webp"
      alt="Sierra Nevada mountains in Colfax, California"
      decoding="async"
      fetchPriority="high"
      className={`absolute inset-0 z-0 w-full h-full object-cover transform transition-all duration-700 ${loaded ? 'opacity-100 blur-0 scale-100' : 'opacity-0 blur-sm scale-105'}`}
      onLoad={() => setLoaded(true)}
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
      "about": {
        "@type": "GeneralContractor",
        "name": "Monument Construction"
      },
      "primaryImageOfPage": {
        "@type": "ImageObject",
        "url": "https://www.monconbuild.com/hero.webp",
        "description": "Sierra Nevada mountains in Colfax, California"
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
        image: "https://customer-assets.emergentagent.com/job_99d86ab4-e27f-41c7-9c4d-305324a0277f/artifacts/6s7jphb3_Untitled.jpg",
        title: "Custom Library & Built-ins",
        description: "Floor-to-ceiling custom carpentry",
        alt: "Custom library built-in bookcase with finish carpentry work in Placer County, CA home"
      },
      {
        image: "https://customer-assets.emergentagent.com/job_99d86ab4-e27f-41c7-9c4d-305324a0277f/artifacts/zdso40es_Untitled1.png",
        title: "Custom Home Office",
        description: "Corner desk with integrated shelving",
        alt: "Custom home office built-in desk and shelving by Monument Construction in Colfax, CA"
      },
      {
        image: "https://customer-assets.emergentagent.com/job_99d86ab4-e27f-41c7-9c4d-305324a0277f/artifacts/gx2z9lsu_Untitled7.jpg",
        title: "Covered Entry Construction",
        description: "Custom timber frame entrance",
        alt: "Custom timber frame covered entry construction in Auburn, CA by licensed contractor"
      },
      {
        image: "/3.webp",
        title: "Custom Woodwork Project",
        description: "Expert craftsmanship details",
        alt: "Custom woodwork and finish carpentry by Monument Construction"
      },
      {
        image: "/4.webp",
        title: "Construction Project",
        description: "Quality construction work",
        alt: "Construction project by Monument Construction in Placer County, CA"
      }
    ];

    const testimonials = [
      {
        text: "We had William build our formal library and asked him to model it after the library in the show Downton Abbey. As you can see from the pictures, he succeeded amazingly well. We then had him build a library in my home office and my wife's smaller home office in the same style. He also built custom shelves in the mudroom in a different style entirely. Everything this man builds is perfect. No flaws or mistakes anywhere. He is a master craftsman, an artist, if you will, and a pleasure to work with. We highly recommend William for any project you might have.",
        name: "Richard Young",
        location: "Sacramento, CA",
        image: "/2.jpg",
        service: "Custom Library & Built-ins"
      },
      {
        text: "We've collaborated with William on numerous projects over the years, ranging from kitchen remodels to extensive exterior renovations. On every project, William consistently delivers exceptional results, surpassing our expectations. His superior craftsmanship is evident in every detail, as he approaches construction with a meticulous and perfectionist mindset. If you're seeking top-notch work and exceptional results, don't hesitate to contact William. Additionally, some of the projects we've entrusted to him required creative problem-solving and ingenuity. In each instance, William demonstrated his remarkable ability to find innovative solutions, resulting in outstanding outcomes.",
        name: "Neal Mitchell",
        location: "Nevada City, CA",
        service: "Kitchen Remodeling & Exterior Renovations"
      }
    ];

    const features = [
      { text: "Licensed Contractor #801602", link: "https://www.cslb.ca.gov/801602" },
      { text: "Featured on DIY Network TV", link: null },
      { text: "Serving Placer & Nevada Counties", link: null },
      { text: "Referral-Based Excellence", link: null }
    ];

    return (
      <ErrorBoundary>
        <div className="min-h-screen">
          {/* SEO Meta Tags and Schema.org Structured Data */}
          <Helmet>
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
          </Helmet>

          {/* Hero Section - Semantic HTML with LCP-friendly <img> */}
          <section aria-label="Hero section" className="relative text-white py-24 md:py-32 overflow-hidden">
            {/* Background image as real <img> for better LCP */}
            <HeroBackground />
            {/* Overlay for better text readability - darker on top, lighter on bottom */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-green-900/70 z-10" aria-hidden="true"></div>
            
            {/* Optional: Add a subtle pattern overlay */}
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjA1IiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-20 z-10" aria-hidden="true"></div>
            
            <div className="container mx-auto px-6 md:px-12 relative z-20">
              <div className="max-w-4xl mx-auto text-center">
                <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                  Professional Construction & Finish Carpentry in <span className="text-blue-400">Placer County</span>
                </h1>
                <p className="text-xl md:text-2xl mb-8 text-gray-300 leading-relaxed">
                  Expert craftsmanship from ground work to complete construction. Licensed, experienced, and trusted throughout Placer & Nevada Counties.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 mb-12 justify-center">
                  <Button 
                    size="lg" 
                    className="bg-green-700 hover:bg-green-800 text-white px-8 py-6 text-lg transition-all duration-300 hover:scale-105 shadow-lg"
                    asChild
                  >
                    <Link to="/contact">Get Free Quote</Link>
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-2 border-white text-white hover:bg-white hover:text-green-900 px-8 py-6 text-lg transition-all duration-300"
                    asChild
                  >
                    <a href={`tel:${CONTACT_INFO.PHONE}`} aria-label={`Call Monument Construction at ${CONTACT_INFO.FORMATTED_PHONE}`}>
                      <Phone className="mr-2 w-5 h-5" />
                      {CONTACT_INFO.FORMATTED_PHONE}
                    </a>
                  </Button>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-2 text-sm md:text-base">
                      <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0" />
                      {feature.link ? (
                        <a 
                          href={feature.link} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="text-gray-100 hover:text-blue-400 transition-colors underline"
                          aria-label={`View ${feature.text}`}
                        >
                          {feature.text}
                        </a>
                      ) : (
                        <span className="text-gray-100">{feature.text}</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Testimonials Section */}
          <Testimonials testimonials={testimonials} showImages={true} />

          {/* About Monument Construction Section */}
          <section className="py-20 md:py-28 bg-gradient-to-r from-gray-50 to-blue-50">
            <div className="container mx-auto px-6 md:px-12">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">About Monument Construction</h2>
                <div className="prose prose-lg max-w-none space-y-6 text-gray-700">
                  <p>
                    Monument Construction is a licensed general contractor (License #801602) specializing in expert finish carpentry and comprehensive residential construction services. With over 25 years of experience serving Placer, Nevada, Sacramento, Yolo, and El Dorado Counties in Northern California, we've built a reputation for quality craftsmanship, attention to detail, and customer satisfaction.
                  </p>
                  
                  <p>
                    Our founder, William Rogers, is an accomplished master craftsman who has been featured on DIY Network television for his expert building and construction techniques. This national recognition reflects our commitment to great results on every project, from the smallest finish carpentry detail to complete home renovations.
                  </p>
                  
                  <p>
                    What sets Monument Construction apart is our approach to every project. We don't just build - we listen to our clients, understand their vision, and bring it to life with precision and care. Whether you're looking to add custom trim work, expand your home, or undertake a complete renovation, we bring the same craftsmanship and professionalism to every job.
                  </p>

                  <p>
                    Operating primarily through referrals and word-of-mouth recommendations, our client base is a testament to the quality of our work. We're selective about the projects we take on, so we can bring the level of attention and craftsmanship each project needs.
                  </p>

                  <div className="grid md:grid-cols-2 gap-6 mt-8">
                    <div className="bg-white p-6 rounded-lg border-l-4 border-green-700">
                      <h3 className="text-lg font-bold mb-3 text-gray-900">Our Expertise</h3>
                      <ul className="space-y-2 text-sm">
                        <li>✓ Finish carpentry and custom woodwork</li>
                        <li>✓ General residential construction</li>
                        <li>✓ Home additions and extensions</li>
                        <li>✓ Complete remodeling projects</li>
                        <li>✓ Custom design consultation</li>
                        <li>✓ Permit and compliance coordination</li>
                      </ul>
                    </div>
                    <div className="bg-white p-6 rounded-lg border-l-4 border-green-600">
                      <h3 className="text-lg font-bold mb-3 text-gray-900">Why Choose Us</h3>
                      <ul className="space-y-2 text-sm">
                        <li>✓ Licensed and fully insured</li>
                        <li>✓ 25+ years of experience</li>
                        <li>✓ Featured on DIY Network TV</li>
                        <li>✓ Referral-based reputation</li>
                        <li>✓ Attention to every detail</li>
                        <li>✓ Local community expertise</li>
                      </ul>
                    </div>
                  </div>
                </div>
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

          {/* Portfolio Preview */}
          <section className="py-20 md:py-28 bg-slate-50">
            <div className="container mx-auto px-6 md:px-12">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-5xl font-bold mb-4 text-slate-900">Recent Projects</h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  See the quality and craftsmanship that defines Monument Construction.
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-8 mb-12">
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

          {/* Why Choose Us */}
          <section className="py-20 md:py-28 bg-white">
            <div className="container mx-auto px-6 md:px-12">
              <div className="grid lg:grid-cols-2 gap-16 items-center">
                <div>
                  <h2 className="text-3xl md:text-5xl font-bold mb-6 text-slate-900">Why Choose Monument Construction?</h2>
                  <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                    With decades of experience and a reputation built on referrals, William Rogers brings unmatched expertise to every project.
                  </p>
                  
                  <div className="space-y-6">
                    <div className="flex gap-4">
                      <Award className="w-8 h-8 text-green-700 flex-shrink-0" />
                      <div>
                        <h3 className="text-xl font-bold mb-2 text-slate-900">Licensed & Experienced</h3>
                        <p className="text-gray-600">California Contractor License #801602 with extensive experience in residential projects.</p>
                      </div>
                    </div>
                    
                    <div className="flex gap-4">
                      <CheckCircle2 className="w-8 h-8 text-green-700 flex-shrink-0" />
                      <div>
                        <h3 className="text-xl font-bold mb-2 text-slate-900">Finish Carpentry Specialist</h3>
                        <p className="text-gray-600">Master craftsman specializing in custom woodwork, built-ins, and fine finish details.</p>
                      </div>
                    </div>
                    
                    <div className="flex gap-4">
                      <Building2 className="w-8 h-8 text-green-700 flex-shrink-0" />
                      <div>
                        <h3 className="text-xl font-bold mb-2 text-slate-900">Complete Construction Services</h3>
                        <p className="text-gray-600">From foundation to finish, we handle every aspect of your construction project.</p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-10">
                    <Button 
                      size="lg" 
                      className="bg-green-700 hover:bg-green-800 text-white transition-all duration-300"
                      asChild
                    >
                      <Link to="/about">Learn More About Us</Link>
                    </Button>
                  </div>
                </div>

                <div className="relative">
                  <img 
                    src="https://customer-assets.emergentagent.com/job_99d86ab4-e27f-41c7-9c4d-305324a0277f/artifacts/uvmny025_Untitled12.jpg" 
                    alt="Monument Construction quality finish carpentry and construction work in Colfax, Placer County, CA"
                    loading="lazy"
                    className="rounded-lg shadow-2xl"
                    onError={() => handleError(new Error('Failed to load about section image'), 'IMAGE_LOAD_ERROR', 'LOW', {
                      imageSource: 'about-section-image'
                    })}
                  />
                  <div className="absolute -bottom-6 -left-6 bg-green-700 text-white p-6 rounded-lg shadow-xl">
                    <p className="text-4xl font-bold">25+</p>
                    <p className="text-sm">Years Experience</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Service Areas */}
          <section className="py-20 md:py-28 bg-green-900 text-white">
            <div className="container mx-auto px-6 md:px-12">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-5xl font-bold mb-4">Serving Your Community</h2>
                <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                  Proudly serving Placer, Nevada, Sacramento, Yolo, and El Dorado Counties with quality construction services.
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
                {[
                  "Colfax, CA",
                  "Auburn, CA", 
                  "Grass Valley, CA",
                  "Nevada City, CA",
                  "Truckee, CA",
                  "Sacramento, CA",
                  "Roseville, CA",
                  "Rocklin, CA",
                  "Folsom, CA",
                  "Davis, CA",
                  "Woodland, CA",
                  "El Dorado Hills, CA",
                  "South Lake Tahoe, CA",
                  "Placerville, CA",
                  "All of Northern California"
                ].map((area, index) => (
                  <div key={index} className="text-center p-6 bg-green-800 rounded-lg hover:bg-green-700 transition-colors duration-300">
                    <p className="text-lg font-semibold">{area}</p>
                  </div>
                ))}
              </div>

              <div className="text-center mt-12">
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-2 border-white text-white hover:bg-white hover:text-green-900 transition-all duration-300"
                  asChild
                >
                  <Link to="/service-areas">View All Service Areas</Link>
                </Button>
              </div>
            </div>
          </section>

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

          {/* Explore More Section */}
          <section className="py-16 md:py-20 bg-gray-50">
            <div className="container mx-auto px-6 md:px-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center text-gray-900">Learn More About Us</h2>
              <div className="grid md:grid-cols-3 gap-8">
                <div className="bg-white p-8 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow">
                  <h3 className="text-2xl font-bold mb-3 text-gray-900">Our Services</h3>
                  <p className="text-gray-600 mb-6">Explore our complete range of construction and carpentry services.</p>
                  <Link to="/services" className="inline-block bg-green-700 hover:bg-green-800 text-white font-semibold px-6 py-2 rounded transition-colors">
                    View All Services
                  </Link>
                </div>
                <div className="bg-white p-8 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow">
                  <h3 className="text-2xl font-bold mb-3 text-gray-900">Our Portfolio</h3>
                  <p className="text-gray-600 mb-6">See examples of our completed projects and quality workmanship.</p>
                  <Link to="/portfolio" className="inline-block bg-green-700 hover:bg-green-800 text-white font-semibold px-6 py-2 rounded transition-colors">
                    View Portfolio
                  </Link>
                </div>
                <div className="bg-white p-8 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow">
                  <h3 className="text-2xl font-bold mb-3 text-gray-900">About Our Team</h3>
                  <p className="text-gray-600 mb-6">Learn about Monument Construction and our experience.</p>
                  <Link to="/about" className="inline-block bg-green-700 hover:bg-green-800 text-white font-semibold px-6 py-2 rounded transition-colors">
                    About Us
                  </Link>
                </div>
              </div>
            </div>
          </section>

          {/* Services Directory Section for SEO */}
          <section className="py-16 md:py-20 bg-green-50">
            <div className="container mx-auto px-6 md:px-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center text-gray-900">Our Construction & Carpentry Services</h2>
              <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
                Monument Construction specializes in finish carpentry and general construction services throughout Placer and Nevada Counties. Explore our service offerings below.
              </p>
              <div className="max-w-5xl mx-auto">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <Link to="/services/finish-carpentry" className="flex items-center p-4 bg-white rounded-lg hover:bg-green-100 transition-colors border border-green-200 hover:border-green-700 group">
                    <span className="text-base font-semibold text-green-700 group-hover:text-blue-800">→ Finish Carpentry</span>
                  </Link>
                  <Link to="/services/general-construction" className="flex items-center p-4 bg-white rounded-lg hover:bg-green-100 transition-colors border border-green-200 hover:border-green-700 group">
                    <span className="text-base font-semibold text-green-700 group-hover:text-blue-800">→ General Construction</span>
                  </Link>
                  <Link to="/services/home-additions" className="flex items-center p-4 bg-white rounded-lg hover:bg-green-100 transition-colors border border-green-200 hover:border-green-700 group">
                    <span className="text-base font-semibold text-green-700 group-hover:text-blue-800">→ Home Additions</span>
                  </Link>
                  <Link to="/services/residential-projects" className="flex items-center p-4 bg-white rounded-lg hover:bg-green-100 transition-colors border border-green-200 hover:border-green-700 group">
                    <span className="text-base font-semibold text-green-700 group-hover:text-blue-800">→ Residential Projects</span>
                  </Link>
                  <Link to="/services/custom-woodwork" className="flex items-center p-4 bg-white rounded-lg hover:bg-green-100 transition-colors border border-green-200 hover:border-green-700 group">
                    <span className="text-base font-semibold text-green-700 group-hover:text-blue-800">→ Custom Woodwork</span>
                  </Link>
                  <Link to="/services/complete-remodeling" className="flex items-center p-4 bg-white rounded-lg hover:bg-green-100 transition-colors border border-green-200 hover:border-green-700 group">
                    <span className="text-base font-semibold text-green-700 group-hover:text-blue-800">→ Complete Remodeling</span>
                  </Link>
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
