import React from 'react';

import { Helmet } from 'react-helmet-async';
import { Button } from '../components/ui/button';
import Breadcrumb from '../components/Breadcrumb';

const Portfolio = () => {
  const breadcrumbItems = [
    { name: 'Portfolio', url: 'https://www.monconbuild.com/portfolio' }
  ];

  const projects = [
    {
      image: "https://customer-assets.emergentagent.com/job_99d86ab4-e27f-41c7-9c4d-305324a0277f/artifacts/6s7jphb3_Untitled.jpg",
      title: "Custom Library & Built-ins",
      category: "Finish Carpentry",
      location: "Placer County, CA",
      description: "Floor-to-ceiling custom built-in bookshelves featuring rich wood tones, crown molding, and integrated lighting. This project showcases expert finish carpentry with attention to every detail."
    },
    {
      image: "https://customer-assets.emergentagent.com/job_99d86ab4-e27f-41c7-9c4d-305324a0277f/artifacts/zdso40es_Untitled1.png",
      title: "Custom Home Office",
      category: "Finish Carpentry",
      location: "Nevada County, CA",
      description: "Custom-built corner office with wraparound desk, curved shelving, and integrated storage. Precision carpentry creating a functional and beautiful workspace."
    },
    {
      image: "https://customer-assets.emergentagent.com/job_99d86ab4-e27f-41c7-9c4d-305324a0277f/artifacts/gx2z9lsu_Untitled7.jpg",
      title: "Covered Entry Construction",
      category: "General Construction",
      location: "Colfax, CA",
      description: "Custom timber frame covered entrance featuring exposed beam construction, ambient lighting, and quality craftsmanship. Complete construction from foundation to finish."
    },
    {
      image: "https://customer-assets.emergentagent.com/job_99d86ab4-e27f-41c7-9c4d-305324a0277f/artifacts/uvmny025_Untitled12.jpg",
      title: "Sunroom Addition",
      category: "Residential Construction",
      location: "Placer County, CA",
      description: "Beautiful sunroom addition with vaulted wood ceilings, floor-to-ceiling windows, and expert finish work. Seamless integration with existing structure."
    },
    {
      image: "https://customer-assets.emergentagent.com/job_99d86ab4-e27f-41c7-9c4d-305324a0277f/artifacts/pbh4alag_Untitled14.png",
      title: "Mountain Home Construction",
      category: "General Construction",
      location: "Nevada County, CA",
      description: "Custom mountain home featuring natural materials, expert framing, and quality construction throughout. Built to withstand Sierra Nevada weather conditions."
    }
  ];

  return (
    <div className="min-h-screen">
      <Helmet>
        <title>Portfolio | Construction Projects</title>
        <meta name="description" content="View our portfolio of finish carpentry, home additions & construction projects in Placer & Nevada County, CA." />
        <link rel="canonical" href="https://www.monconbuild.com/portfolio" />
        <meta property="og:title" content="Portfolio | Construction Projects" />
        <meta property="og:description" content="View our portfolio of finish carpentry, home additions & construction projects in Placer & Nevada County, CA." />
        <meta property="og:url" content="https://www.monconbuild.com/portfolio" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://www.monconbuild.com/hero.webp" />
      </Helmet>
      {/* Breadcrumb Navigation */}
      <Breadcrumb items={breadcrumbItems} />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-green-900 via-green-800 to-emerald-900 text-white py-20 md:py-28">
        <div className="container mx-auto px-6 md:px-12">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Our Portfolio</h1>
            <p className="text-xl md:text-2xl text-gray-300 leading-relaxed">
              Explore our recent projects showcasing quality craftsmanship in finish carpentry and complete construction services.
            </p>
          </div>
        </div>
      </section>

      {/* Portfolio Introduction */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="container mx-auto px-6 md:px-12">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">Our Work</h2>
            <div className="prose prose-lg max-w-none space-y-6 text-gray-700">
              <p>
                Monument Construction has been trusted with hundreds of residential construction and finish carpentry projects throughout Placer County and Nevada County. Our portfolio reflects our commitment to quality, attention to detail, and customer satisfaction. Each project showcased here represents the craftsmanship and expertise we bring to every job.
              </p>

              <p>
                From custom finish carpentry details that transform a room's character to comprehensive home additions that expand living space, our work speaks to our dedication. We don't just complete projects - we create spaces that enhance our clients' lives and add lasting value to their homes.
              </p>

              <div className="grid md:grid-cols-2 gap-6 my-10">
                <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-blue-600">
                  <h3 className="text-lg font-bold mb-3 text-gray-900">Finish Carpentry Excellence</h3>
                  <p className="text-sm">Custom trim work, built-in cabinetry, decorative mantels, and architectural details that define the character of a home.</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-blue-600">
                  <h3 className="text-lg font-bold mb-3 text-gray-900">Complete Renovations</h3>
                  <p className="text-sm">Full home renovations and remodels that transform spaces while maintaining quality construction standards.</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-green-600">
                  <h3 className="text-lg font-bold mb-3 text-gray-900">Home Additions</h3>
                  <p className="text-sm">Room additions, second stories, and home expansions that seamlessly integrate with existing structures.</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-green-600">
                  <h3 className="text-lg font-bold mb-3 text-gray-900">Residential Construction</h3>
                  <p className="text-sm">New construction and residential projects handled with the same craftsmanship standards we apply to every undertaking.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio Grid */}
      <section className="py-20 md:py-28 bg-white">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid gap-16">
            {projects.map((project, index) => (
              <div 
                key={index} 
                className={`grid lg:grid-cols-2 gap-12 items-center ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}
              >
                <div className={`${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                  <div className="relative overflow-hidden rounded-lg shadow-2xl group">
                    <img 
                      src={project.image} 
                      alt={project.title}
                      loading="lazy"
                      className="w-full h-[500px] object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-semibold">
                      {project.category}
                    </div>
                  </div>
                </div>
                
                <div className={`${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                  <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-900">{project.title}</h2>
                  <p className="text-lg text-blue-600 font-semibold mb-6">{project.location}</p>
                  <p className="text-lg text-gray-700 leading-relaxed mb-8">{project.description}</p>
                  
                  <div className="border-l-4 border-blue-600 pl-6">
                    <p className="text-gray-600 italic">
                      "Every project reflects our commitment to quality craftsmanship and attention to detail."
                    </p>
                    <p className="text-slate-900 font-semibold mt-2">- William Rogers, Owner</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

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
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                1
              </div>
              <h3 className="text-xl font-bold mb-3 text-slate-900">Consultation</h3>
              <p className="text-gray-600">We discuss your vision, needs, and budget in detail.</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                2
              </div>
              <h3 className="text-xl font-bold mb-3 text-slate-900">Planning</h3>
              <p className="text-gray-600">Detailed project planning, timeline, and material selection.</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                3
              </div>
              <h3 className="text-xl font-bold mb-3 text-slate-900">Construction</h3>
              <p className="text-gray-600">Expert craftsmanship with regular progress updates.</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                4
              </div>
              <h3 className="text-xl font-bold mb-3 text-slate-900">Completion</h3>
              <p className="text-gray-600">Final walkthrough and your complete satisfaction.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-28 bg-blue-600 text-white">
        <div className="container mx-auto px-6 md:px-12 text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">Ready to Start Your Project?</h2>
          <p className="text-xl mb-10 text-blue-100 max-w-3xl mx-auto">
            Let's create something beautiful together. Contact us today for a free consultation.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-6 text-lg transition-all duration-300"
              asChild
            >
              <a href="/contact">Request Free Quote</a>
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-2 border-white text-white hover:bg-white hover:text-blue-600 px-8 py-6 text-lg transition-all duration-300"
              asChild
            >
              <a href="tel:9166071972">Call (916) 607-1972</a>
            </Button>
          </div>
        </div>
      </section>

      {/* Explore More Section */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="container mx-auto px-6 md:px-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center text-gray-900">Ready to Start Your Project?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow">
              <h3 className="text-2xl font-bold mb-3 text-gray-900">Our Services</h3>
              <p className="text-gray-600 mb-6">Explore the complete range of construction and carpentry services we offer.</p>
              <a href="/services" className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded transition-colors">
                View Services
              </a>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow">
              <h3 className="text-2xl font-bold mb-3 text-gray-900">About Us</h3>
              <p className="text-gray-600 mb-6">Learn about Monument Construction and our team's expertise.</p>
              <a href="/about" className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded transition-colors">
                About Us
              </a>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow">
              <h3 className="text-2xl font-bold mb-3 text-gray-900">Get a Quote</h3>
              <p className="text-gray-600 mb-6">Contact us today to discuss your project and receive a free estimate.</p>
              <a href="/contact" className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded transition-colors">
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Services Directory Section for SEO */}
      <section className="py-16 md:py-20 bg-blue-50">
        <div className="container mx-auto px-6 md:px-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center text-gray-900">View Our Services</h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            Explore the complete range of construction and carpentry services we offer to homeowners in Placer and Nevada Counties.
          </p>
          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              <a href="/services/finish-carpentry" className="flex items-center p-4 bg-white rounded-lg hover:bg-blue-100 transition-colors border border-blue-200 hover:border-blue-400 group">
                <span className="text-base font-semibold text-blue-600 group-hover:text-blue-800">→ Finish Carpentry</span>
              </a>
              <a href="/services/general-construction" className="flex items-center p-4 bg-white rounded-lg hover:bg-blue-100 transition-colors border border-blue-200 hover:border-blue-400 group">
                <span className="text-base font-semibold text-blue-600 group-hover:text-blue-800">→ General Construction</span>
              </a>
              <a href="/services/home-additions" className="flex items-center p-4 bg-white rounded-lg hover:bg-blue-100 transition-colors border border-blue-200 hover:border-blue-400 group">
                <span className="text-base font-semibold text-blue-600 group-hover:text-blue-800">→ Home Additions</span>
              </a>
              <a href="/services/residential-projects" className="flex items-center p-4 bg-white rounded-lg hover:bg-blue-100 transition-colors border border-blue-200 hover:border-blue-400 group">
                <span className="text-base font-semibold text-blue-600 group-hover:text-blue-800">→ Residential Projects</span>
              </a>
              <a href="/services/custom-woodwork" className="flex items-center p-4 bg-white rounded-lg hover:bg-blue-100 transition-colors border border-blue-200 hover:border-blue-400 group">
                <span className="text-base font-semibold text-blue-600 group-hover:text-blue-800">→ Custom Woodwork</span>
              </a>
              <a href="/services/complete-remodeling" className="flex items-center p-4 bg-white rounded-lg hover:bg-blue-100 transition-colors border border-blue-200 hover:border-blue-400 group">
                <span className="text-base font-semibold text-blue-600 group-hover:text-blue-800">→ Complete Remodeling</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Portfolio;