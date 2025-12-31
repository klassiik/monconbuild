import React, { useState, useMemo } from 'react';

import { Helmet } from 'react-helmet-async';
import { Button } from '../components/ui/button';
import Breadcrumb from '../components/Breadcrumb';
import ImageGallery from '../components/ImageGallery';
import { PortfolioPageSchema, CreativeWorkSchema } from '../components/Schema';
import { Camera } from 'lucide-react';

const Portfolio = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [currentProject, setCurrentProject] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const breadcrumbItems = [
    { name: 'Portfolio', url: 'https://www.monconbuild.com/portfolio' }
  ];

  // Category definitions for filtering
  const categories = [
    'All',
    'Kitchens',
    'Bathrooms',
    'Library & Offices',
    'Living Rooms',
    'Framing',
    'Outdoors',
    'Finish Carpentry',
    'General Construction'
  ];

  // Helper function to get optimized image paths
  const getOptimizedImage = (imagePath, size = 'medium') => {
    // For external images, return as-is
    if (imagePath.startsWith('http')) return imagePath;
    
    // Replace /images/ with /images/{size}/
    return imagePath.replace('/images/', `/images/${size}/`);
  };

  // Category-specific quotes for portfolio projects
  const categoryQuotes = {
    "Kitchens": {
      quote: "The kitchen is the heart of the home, and every detail matters. We create spaces where families gather and memories are made.",
      author: "William Rogers, Owner"
    },
    "Bathrooms": {
      quote: "A well-designed bathroom combines luxury with functionality. We transform these essential spaces into personal retreats.",
      author: "William Rogers, Owner"
    },
    "Library & Offices": {
      quote: "Custom built-ins and library spaces require precision and artistry. Each shelf, each molding tells a story of craftsmanship.",
      author: "William Rogers, Owner"
    },
    "Living Rooms": {
      quote: "Living spaces should reflect your lifestyle. We create environments that are both beautiful and perfectly suited to how you live.",
      author: "William Rogers, Owner"
    },
    "Framing": {
      quote: "Strong foundations and precise framing are invisible once complete, but they define the integrity of everything built upon them.",
      author: "William Rogers, Owner"
    },
    "Outdoors": {
      quote: "Outdoor living extends your home into nature. We build spaces that withstand the elements while inviting you to enjoy them.",
      author: "William Rogers, Owner"
    },
    "Finish Carpentry": {
      quote: "Finish carpentry is where construction becomes art. The final details transform a house into something truly exceptional.",
      author: "William Rogers, Owner"
    },
    "General Construction": {
      quote: "From groundwork to final walkthrough, we bring the same dedication to quality at every phase of construction.",
      author: "William Rogers, Owner"
    }
  };

  const projects = [
    // === KITCHEN PROJECTS ===
    {
      id: 'kitchen-1',
      title: "Modern Kitchen Remodel",
      category: "Kitchens",
      location: "Placer County, CA",
      description: "Complete kitchen transformation featuring custom cabinetry, modern fixtures, and quality craftsmanship. This project showcases our attention to detail in every aspect of kitchen renovation.",
      thumbnail: "/images/Kitchens/1/modern-kitchen-remodel-1.webp",
      images: [
        "/images/Kitchens/1/modern-kitchen-remodel-1.webp",
        "/images/Kitchens/1/modern-kitchen-remodel-2.webp",
        "/images/Kitchens/1/modern-kitchen-remodel-3.webp",
        "/images/Kitchens/1/modern-kitchen-remodel-4.webp",
        "/images/Kitchens/1/modern-kitchen-remodel-5.webp",
        "/images/Kitchens/1/modern-kitchen-remodel-6.webp"
      ]
    },
    {
      id: 'kitchen-2',
      title: "Custom Kitchen Design",
      category: "Kitchens",
      location: "Nevada County, CA",
      description: "Beautifully designed kitchen with custom storage solutions, premium finishes, and expert installation. A perfect blend of functionality and aesthetics for the heart of the home.",
      thumbnail: "/images/Kitchens/2/custom-kitchen-design-1.webp",
      images: [
        "/images/Kitchens/2/custom-kitchen-design-1.webp",
        "/images/Kitchens/2/custom-kitchen-design-2.webp",
        "/images/Kitchens/2/custom-kitchen-design-3.webp",
        "/images/Kitchens/2/custom-kitchen-design-4.webp",
        "/images/Kitchens/2/custom-kitchen-design-5.webp",
        "/images/Kitchens/2/custom-kitchen-design-6.webp",
        "/images/Kitchens/2/custom-kitchen-design-7.webp",
        "/images/Kitchens/2/custom-kitchen-design-8.webp",
        "/images/Kitchens/2/custom-kitchen-design-9.webp"
      ]
    },
    // === BATHROOM PROJECTS ===
    {
      id: 'bathroom-1',
      title: "Luxury Bathroom Renovation",
      category: "Bathrooms",
      location: "Placer County, CA",
      description: "Stunning bathroom remodel featuring premium tile work, custom vanity, and modern fixtures. Expert craftsmanship creating a spa-like retreat in your home.",
      thumbnail: "/images/Bathrooms/luxury-bathroom-renovation-1.webp",
      images: [
        "/images/Bathrooms/luxury-bathroom-renovation-1.webp",
        "/images/Bathrooms/luxury-bathroom-renovation-2.webp"
      ]
    },
    // === LIBRARY & OFFICE PROJECTS ===
    {
      id: 'library-1',
      title: "Custom Home Library",
      category: "Library & Offices",
      location: "Placer County, CA",
      description: "Floor-to-ceiling custom built-in bookshelves featuring rich wood tones, crown molding, and integrated lighting. This project showcases expert finish carpentry with attention to every detail.",
      thumbnail: "/images/Library-Offices/custom-home-library-1.webp",
      images: [
        "/images/Library-Offices/custom-home-library-1.webp",
        "/images/Library-Offices/custom-home-library-2.webp",
        "/images/Library-Offices/custom-home-library-3.webp",
        "/images/Library-Offices/custom-home-library-4.webp",
        "/images/Library-Offices/custom-home-library-5.webp",
        "/images/Library-Offices/custom-home-library-6.webp",
        "/images/Library-Offices/custom-home-library-7.webp",
        "/images/Library-Offices/custom-home-library-8.webp",
        "/images/Library-Offices/custom-home-library-9.webp",
        "/images/Library-Offices/custom-home-library-10.webp",
        "/images/Library-Offices/custom-home-library-11.webp",
        "/images/Library-Offices/custom-home-library-12.webp",
        "/images/Library-Offices/custom-home-library-13.webp",
        "/images/Library-Offices/custom-home-library-14.webp",
        "/images/Library-Offices/custom-home-library-15.webp",
        "/images/Library-Offices/custom-home-library-16.webp",
        "/images/Library-Offices/custom-home-library-17.webp"
      ]
    },
    // === LIVING ROOM PROJECTS ===
    {
      id: 'living-1',
      title: "Living Room Transformation",
      category: "Living Rooms",
      location: "Nevada County, CA",
      description: "Complete living room renovation with custom built-ins, premium finishes, and expert trim work. Creating comfortable and elegant living spaces for families to enjoy.",
      thumbnail: "/images/LivingRooms/living-room-transformation-1.webp",
      images: [
        "/images/LivingRooms/living-room-transformation-1.webp"
      ]
    },
    // === FRAMING PROJECTS ===
    {
      id: 'framing-1',
      title: "Residential Framing Project",
      category: "Framing",
      location: "Placer County, CA",
      description: "Expert structural framing demonstrating precision engineering and quality construction. Strong foundations and proper framing are essential for every successful build.",
      thumbnail: "/images/Framing/residential-framing-project-1.webp",
      images: [
        "/images/Framing/residential-framing-project-1.webp",
        "/images/Framing/residential-framing-project-2.webp",
        "/images/Framing/residential-framing-project-3.webp",
        "/images/Framing/residential-framing-project-4.webp",
        "/images/Framing/residential-framing-project-5.webp",
        "/images/Framing/residential-framing-project-6.webp",
        "/images/Framing/residential-framing-project-7.webp",
        "/images/Framing/residential-framing-project-8.webp",
        "/images/Framing/residential-framing-project-9.webp"
      ]
    },
    // === OUTDOOR PROJECTS ===
    {
      id: 'outdoor-1',
      title: "Outdoor Living Space",
      category: "Outdoors",
      location: "Nevada County, CA",
      description: "Custom outdoor construction featuring quality materials and expert craftsmanship. Extending your living space to enjoy the beautiful Sierra Nevada surroundings.",
      thumbnail: "/images/Outdoors/outdoor-living-space-1.webp",
      images: [
        "/images/Outdoors/outdoor-living-space-1.webp",
        "/images/Outdoors/outdoor-living-space-2.webp",
        "/images/Outdoors/outdoor-living-space-3.webp"
      ]
    },
    // === EXISTING FEATURED PROJECTS ===
    {
      id: 'featured-1',
      title: "Custom Library & Built-ins",
      category: "Finish Carpentry",
      location: "Placer County, CA",
      description: "Elegant Downton Abbey-inspired library featuring handcrafted bookshelves, detailed wainscoting, and traditional architectural elements. A masterpiece of classic design and modern functionality.",
      thumbnail: "https://customer-assets.emergentagent.com/job_99d86ab4-e27f-41c7-9c4d-305324a0277f/artifacts/6s7jphb3_Untitled.jpg",
      images: ["https://customer-assets.emergentagent.com/job_99d86ab4-e27f-41c7-9c4d-305324a0277f/artifacts/6s7jphb3_Untitled.jpg"]
    },
    {
      id: 'featured-2',
      title: "Custom Home Office",
      category: "Finish Carpentry",
      location: "Nevada County, CA",
      description: "Custom-built corner office with wraparound desk, curved shelving, and integrated storage. Precision carpentry creating a functional and beautiful workspace.",
      thumbnail: "https://customer-assets.emergentagent.com/job_99d86ab4-e27f-41c7-9c4d-305324a0277f/artifacts/zdso40es_Untitled1.png",
      images: ["https://customer-assets.emergentagent.com/job_99d86ab4-e27f-41c7-9c4d-305324a0277f/artifacts/zdso40es_Untitled1.png"]
    },
    {
      id: 'featured-3',
      title: "Covered Entry Construction",
      category: "General Construction",
      location: "Colfax, CA",
      description: "Custom timber frame covered entrance featuring exposed beam construction, ambient lighting, and quality craftsmanship. Complete construction from foundation to finish.",
      thumbnail: "https://customer-assets.emergentagent.com/job_99d86ab4-e27f-41c7-9c4d-305324a0277f/artifacts/gx2z9lsu_Untitled7.jpg",
      images: ["https://customer-assets.emergentagent.com/job_99d86ab4-e27f-41c7-9c4d-305324a0277f/artifacts/gx2z9lsu_Untitled7.jpg"]
    },
    {
      id: 'featured-4',
      title: "Sunroom Addition",
      category: "General Construction",
      location: "Placer County, CA",
      description: "Beautiful sunroom addition with vaulted wood ceilings, floor-to-ceiling windows, and expert finish work. Seamless integration with existing structure.",
      thumbnail: "https://customer-assets.emergentagent.com/job_99d86ab4-e27f-41c7-9c4d-305324a0277f/artifacts/uvmny025_Untitled12.jpg",
      images: ["https://customer-assets.emergentagent.com/job_99d86ab4-e27f-41c7-9c4d-305324a0277f/artifacts/uvmny025_Untitled12.jpg"]
    },
    {
      id: 'featured-5',
      title: "Mountain Home Construction",
      category: "General Construction",
      location: "Nevada County, CA",
      description: "Custom mountain home featuring natural materials, expert framing, and quality construction throughout. Built to withstand Sierra Nevada weather conditions.",
      thumbnail: "https://customer-assets.emergentagent.com/job_99d86ab4-e27f-41c7-9c4d-305324a0277f/artifacts/pbh4alag_Untitled14.png",
      images: ["https://customer-assets.emergentagent.com/job_99d86ab4-e27f-41c7-9c4d-305324a0277f/artifacts/pbh4alag_Untitled14.png"]
    },
    {
      id: 'featured-6',
      title: "Custom Woodwork Project",
      category: "Finish Carpentry",
      location: "Placer County, CA",
      description: "Expert custom woodwork showcasing precision craftsmanship and attention to detail. Quality finish carpentry that transforms spaces.",
      thumbnail: "/3.webp",
      images: ["/3.webp"]
    },
    {
      id: 'featured-7',
      title: "Construction Project",
      category: "General Construction",
      location: "Nevada County, CA",
      description: "Quality construction work demonstrating our commitment to excellence in every phase of the project from foundation to finish.",
      thumbnail: "/4.webp",
      images: ["/4.webp"]
    }
  ];

  // Filter projects based on active category
  const filteredProjects = useMemo(() => {
    if (activeCategory === 'All') return projects;
    return projects.filter(project => project.category === activeCategory);
  }, [activeCategory]);

  // Open gallery for a project
  const openGallery = (project, imageIndex = 0) => {
    setCurrentProject(project);
    setCurrentImageIndex(imageIndex);
    setGalleryOpen(true);
  };

  // Close gallery
  const closeGallery = () => {
    setGalleryOpen(false);
    setCurrentProject(null);
    setCurrentImageIndex(0);
  };

  return (
    <div className="min-h-screen overflow-x-hidden">
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
      
      {/* Portfolio Page Schema for SEO */}
      <PortfolioPageSchema projects={projects} />
      
      {/* Individual Project Schemas */}
      {projects.map(project => (
        <CreativeWorkSchema key={`schema-${project.id}`} project={project} />
      ))}
      
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
                <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-green-700">
                  <h3 className="text-lg font-bold mb-3 text-gray-900">Finish Carpentry Excellence</h3>
                  <p className="text-sm">Custom trim work, built-in cabinetry, decorative mantels, and architectural details that define the character of a home.</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-green-700">
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
          {/* Category Filter Tabs */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-center mb-6 text-gray-900">Filter by Category</h2>
            <div className="flex flex-wrap justify-center gap-3">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-5 py-2.5 rounded-full font-medium transition-all duration-300 ${
                    activeCategory === category
                      ? 'bg-green-700 text-white shadow-lg scale-105'
                      : 'bg-gray-100 text-gray-700 hover:bg-green-100 hover:text-green-800'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
            <p className="text-center text-gray-500 mt-4">
              Showing {filteredProjects.length} project{filteredProjects.length !== 1 ? 's' : ''}
            </p>
          </div>

          {/* Projects Grid */}
          <div className="grid gap-16">
            {filteredProjects.map((project, index) => (
              <div 
                key={project.id} 
                className={`grid lg:grid-cols-2 gap-12 items-center ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}
              >
                <div className={`${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                  {/* Aspect ratio container to prevent CLS */}
                  <div 
                    className="relative overflow-hidden rounded-lg shadow-2xl group cursor-pointer aspect-[910/500]"
                    onClick={() => openGallery(project, 0)}
                  >
                    <img 
                      src={getOptimizedImage(project.thumbnail, 'medium')} 
                      srcSet={`${getOptimizedImage(project.thumbnail, 'thumbnails')} 400w, ${getOptimizedImage(project.thumbnail, 'medium')} 1200w, ${project.thumbnail} 2400w`}
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 910px"
                      alt={`${project.title} - ${project.category} project in ${project.location} by Monument Construction`}
                      loading="lazy"
                      width="910"
                      height="500"
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4 bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-semibold">
                      {project.category}
                    </div>
                    {/* Image count badge */}
                    {project.images.length > 1 && (
                      <div className="absolute bottom-4 right-4 bg-black/70 text-white px-3 py-2 rounded-lg text-sm font-medium flex items-center gap-2">
                        <Camera className="w-4 h-4" />
                        {project.images.length} photos
                      </div>
                    )}
                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <span className="text-white text-lg font-semibold bg-green-700 px-6 py-3 rounded-lg">
                        View Gallery
                      </span>
                    </div>
                  </div>
                  
                  {/* Thumbnail strip for multi-image projects */}
                  {project.images.length > 1 && (
                    <div className="flex gap-2 mt-4 overflow-x-auto pb-2">
                      {project.images.slice(0, 5).map((img, imgIndex) => (
                        <button
                          key={imgIndex}
                          onClick={() => openGallery(project, imgIndex)}
                          className="flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 border-transparent hover:border-green-700 transition-colors"
                        >
                          <img 
                            src={getOptimizedImage(img, 'thumbnails')} 
                            alt={`${project.title} ${project.category} - Photo ${imgIndex + 1} - ${project.location}`}
                            loading="lazy"
                            width="80"
                            height="80"
                            className="w-full h-full object-cover"
                          />
                        </button>
                      ))}
                      {project.images.length > 5 && (
                        <button
                          onClick={() => openGallery(project, 5)}
                          className="flex-shrink-0 w-20 h-20 rounded-lg bg-gray-200 flex items-center justify-center text-gray-600 font-semibold hover:bg-green-100 transition-colors"
                        >
                          +{project.images.length - 5}
                        </button>
                      )}
                    </div>
                  )}
                </div>
                
                <div className={`${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                  <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-900">{project.title}</h2>
                  <p className="text-lg text-green-700 font-semibold mb-6">{project.location}</p>
                  <p className="text-lg text-gray-700 leading-relaxed mb-8">{project.description}</p>
                  
                  <div className="border-l-4 border-green-700 pl-6">
                    <p className="text-gray-600 italic">
                      "{categoryQuotes[project.category]?.quote || 'Every project reflects our commitment to quality craftsmanship and attention to detail.'}"
                    </p>
                    <p className="text-slate-900 font-semibold mt-2">- {categoryQuotes[project.category]?.author || 'William Rogers, Owner'}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Image Gallery Lightbox */}
      <ImageGallery
        images={currentProject?.images || []}
        isOpen={galleryOpen}
        onClose={closeGallery}
        initialIndex={currentImageIndex}
        title={currentProject?.title}
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
            <div className="text-center">
              <div className="w-16 h-16 bg-green-700 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                1
              </div>
              <h3 className="text-xl font-bold mb-3 text-slate-900">Consultation</h3>
              <p className="text-gray-600">We discuss your vision, needs, and budget in detail.</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-700 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                2
              </div>
              <h3 className="text-xl font-bold mb-3 text-slate-900">Planning</h3>
              <p className="text-gray-600">Detailed project planning, timeline, and material selection.</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-700 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                3
              </div>
              <h3 className="text-xl font-bold mb-3 text-slate-900">Construction</h3>
              <p className="text-gray-600">Expert craftsmanship with regular progress updates.</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-700 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                4
              </div>
              <h3 className="text-xl font-bold mb-3 text-slate-900">Completion</h3>
              <p className="text-gray-600">Final walkthrough and your complete satisfaction.</p>
            </div>
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

      {/* Explore More Section */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="container mx-auto px-6 md:px-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center text-gray-900">Ready to Start Your Project?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow">
              <h3 className="text-2xl font-bold mb-3 text-gray-900">Our Services</h3>
              <p className="text-gray-600 mb-6">Explore the complete range of construction and carpentry services we offer.</p>
              <a href="/services" className="inline-block bg-green-700 hover:bg-green-800 text-white font-semibold px-6 py-2 rounded transition-colors">
                View Services
              </a>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow">
              <h3 className="text-2xl font-bold mb-3 text-gray-900">About Us</h3>
              <p className="text-gray-600 mb-6">Learn about Monument Construction and our team's expertise.</p>
              <a href="/about" className="inline-block bg-green-700 hover:bg-green-800 text-white font-semibold px-6 py-2 rounded transition-colors">
                About Us
              </a>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow">
              <h3 className="text-2xl font-bold mb-3 text-gray-900">Get a Quote</h3>
              <p className="text-gray-600 mb-6">Contact us today to discuss your project and receive a free estimate.</p>
              <a href="/contact" className="inline-block bg-green-700 hover:bg-green-800 text-white font-semibold px-6 py-2 rounded transition-colors">
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Services Directory Section for SEO */}
      <section className="py-16 md:py-20 bg-green-50">
        <div className="container mx-auto px-6 md:px-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center text-gray-900">View Our Services</h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            Explore the complete range of construction and carpentry services we offer to homeowners in Placer and Nevada Counties.
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
