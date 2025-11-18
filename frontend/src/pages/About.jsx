import React from 'react';

import { Helmet } from 'react-helmet-async';
import { Button } from '../components/ui/button';
import Breadcrumb from '../components/Breadcrumb';
import { Award, CheckCircle2, Tv, Users, Hammer, Star } from 'lucide-react';
import Testimonials from '../components/Testimonials';

const About = () => {
  const breadcrumbItems = [
    { name: 'About', url: 'https://www.monconbuild.com/about' }
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

  return (
    <div className="min-h-screen">
      <Helmet>
        <title>About Monument Construction</title>
        <meta name="description" content="Monument Construction: 25+ years trusted finish carpentry & construction services in Colfax & Placer County. Featured on DIY Network." />
        <link rel="canonical" href="https://www.monconbuild.com/about" />
        <meta property="og:title" content="About Monument Construction" />
        <meta property="og:description" content="Monument Construction: 25+ years trusted finish carpentry & construction services in Colfax & Placer County. Featured on DIY Network." />
        <meta property="og:url" content="https://www.monconbuild.com/about" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://www.monconbuild.com/hero.webp" />
      </Helmet>
      {/* Breadcrumb Navigation */}
      <Breadcrumb items={breadcrumbItems} />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-green-900 via-green-800 to-emerald-900 text-white py-20 md:py-28">
        <div className="container mx-auto px-6 md:px-12">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">About Monument Construction</h1>
            <p className="text-xl md:text-2xl text-gray-300 leading-relaxed">
              Quality craftsmanship and trusted service in Placer and Nevada Counties since day one.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 md:py-28 bg-white">
        <div className="container mx-auto px-6 md:px-12">
          <div className="max-w-4xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-gray-900">Our Story</h2>
            <div className="prose prose-lg max-w-none space-y-6 text-gray-700">
              <p>
                Monument Construction was founded on a simple principle: delivering exceptional craftsmanship with every project, regardless of size. For over 25 years, we've been the trusted choice for homeowners throughout Placer County, Nevada County, and the greater Colfax area who demand the highest quality in construction and finish carpentry services.
              </p>

              <p>
                Our reputation is built on the foundation of personal referrals and word-of-mouth recommendations. We don't advertise broadly because we're selective about the projects we undertake. This allows us to maintain the quality standards and personal attention that have made us successful and trusted in our communities.
              </p>

              <p>
                What began as a passion for fine finish carpentry has evolved into a full-service construction company that handles everything from detailed interior trim work to complete residential renovations. Throughout our growth, we've never compromised on the craftsmanship and attention to detail that define our work.
              </p>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
            <div>
              <h2 className="text-3xl md:text-5xl font-bold mb-6 text-slate-900">William Rogers</h2>
              <h3 className="text-xl md:text-2xl text-green-700 font-semibold mb-6">Owner & Master Craftsman</h3>
              
              <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
                <p>
                  William Rogers is a licensed general contractor specializing in finish carpentry with decades of experience serving the Colfax, Placer County, and Nevada County communities.
                </p>
                
                <p>
                  As a finish carpenter by trade, William brings an unmatched level of detail and craftsmanship to every project. However, his expertise extends far beyond trim work – Monument Construction provides comprehensive residential construction services from ground work to complete construction, with the same dedication to quality in every phase.
                </p>
                
                <p>
                  William's expertise has been recognized beyond the local community. He has been featured in multiple episodes on DIY Network television, showcasing his building and construction techniques to a national audience.
                </p>
                
                <p>
                  Monument Construction operates primarily through referrals – a testament to the quality of work and customer satisfaction that defines every project. When you work with William and his team, you're getting the same level of care and craftsmanship that has built a strong reputation throughout the region.
                </p>
              </div>

              <div className="mt-10 p-6 bg-green-50 border-l-4 border-green-700 rounded">
                <p className="text-lg font-semibold text-slate-900 mb-2">California Contractor <a href="https://www.cslb.ca.gov/801602" target="_blank" rel="noopener noreferrer" className="text-green-700 hover:text-blue-800 underline">License #801602</a></p>
                <p className="text-gray-600">Licensed and bonded for your protection and peace of mind.</p>
              </div>
            </div>

            <div>
              <img 
                src="https://customer-assets.emergentagent.com/job_99d86ab4-e27f-41c7-9c4d-305324a0277f/artifacts/uvmny025_Untitled12.jpg" 
                alt="Monument Construction - Quality Workmanship"
                loading="lazy"
                className="rounded-lg shadow-2xl"
              />
            </div>
          </div>

          {/* Key Features */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
            <div className="p-8 bg-slate-50 rounded-lg">
              <Award className="w-12 h-12 text-green-700 mb-4" />
              <h3 className="text-xl font-bold mb-3 text-slate-900">Licensed Professional</h3>
              <p className="text-gray-600">California Contractor <a href="https://www.cslb.ca.gov/801602" target="_blank" rel="noopener noreferrer" className="text-green-700 hover:text-blue-800 underline">License #801602</a>. Fully licensed and bonded.</p>
            </div>

            <div className="p-8 bg-slate-50 rounded-lg">
              <Tv className="w-12 h-12 text-green-700 mb-4" />
              <h3 className="text-xl font-bold mb-3 text-slate-900">Featured Expert</h3>
              <p className="text-gray-600">Multiple DIY Network TV appearances showcasing construction expertise.</p>
            </div>

            <div className="p-8 bg-slate-50 rounded-lg">
              <Users className="w-12 h-12 text-green-700 mb-4" />
              <h3 className="text-xl font-bold mb-3 text-slate-900">Referral-Based</h3>
              <p className="text-gray-600">Built on satisfied customers and word-of-mouth recommendations.</p>
            </div>

            <div className="p-8 bg-slate-50 rounded-lg">
              <Hammer className="w-12 h-12 text-green-700 mb-4" />
              <h3 className="text-xl font-bold mb-3 text-slate-900">Finish Carpentry Specialist</h3>
              <p className="text-gray-600">Master craftsman specializing in custom trim work and fine details.</p>
            </div>

            <div className="p-8 bg-slate-50 rounded-lg">
              <CheckCircle2 className="w-12 h-12 text-green-700 mb-4" />
              <h3 className="text-xl font-bold mb-3 text-slate-900">Complete Services</h3>
              <p className="text-gray-600">From groundwork to final touches – comprehensive construction services.</p>
            </div>

            <div className="p-8 bg-slate-50 rounded-lg">
              <Star className="w-12 h-12 text-green-700 mb-4" />
              <h3 className="text-xl font-bold mb-3 text-slate-900">Local Expertise</h3>
              <p className="text-gray-600">Deep knowledge of Placer and Nevada County building and communities.</p>
            </div>
          </div>

          {/* Our Approach */}
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-slate-900 text-center">Our Approach</h2>
            
            <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
              <p>
                At Monument Construction, we believe that quality craftsmanship starts with understanding your vision and needs. Every project begins with a thorough consultation where we discuss your goals, timeline, and budget.
              </p>
              
              <p>
                Our finish carpentry background means we approach every project with an eye for detail. Whether we're framing a new structure or installing crown molding, the same level of precision and care goes into every aspect of the work.
              </p>
              
              <p>
                We maintain clear communication throughout the project, keeping you informed of progress and addressing any questions or concerns promptly. Our goal is not just to meet your expectations, but to exceed them.
              </p>
              
              <p>
                As a referral-based business, we understand that our reputation depends on your satisfaction. That's why we treat every project – large or small – with the same commitment to quality and customer service.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <Testimonials testimonials={testimonials} showImages={true} />

      {/* Service Areas */}
      <section className="py-20 md:py-28 bg-slate-50">
        <div className="container mx-auto px-6 md:px-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-slate-900">Serving Your Community</h2>
          <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto">
            Proudly serving Colfax and surrounding areas in Placer and Nevada Counties.
          </p>
          
          <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-4 max-w-5xl mx-auto mb-12">
            {[
              "Colfax",
              "Auburn",
              "Grass Valley",
              "Nevada City",
              "Truckee",
              "Lincoln"
            ].map((city, index) => (
              <div key={index} className="p-4 bg-white rounded-lg shadow">
                <p className="font-semibold text-slate-900">{city}</p>
              </div>
            ))}
          </div>
          
          <p className="text-gray-600">
            And all surrounding areas in Placer County and Nevada County
          </p>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-28 bg-green-700 text-white">
        <div className="container mx-auto px-6 md:px-12 text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">Let's Build Something Great Together</h2>
          <p className="text-xl mb-10 text-blue-100 max-w-3xl mx-auto">
            Contact Monument Construction today to discuss your project and receive a free consultation.
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
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center text-gray-900">Explore Our Work</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow">
              <h3 className="text-2xl font-bold mb-3 text-gray-900">Our Services</h3>
              <p className="text-gray-600 mb-6">Discover the complete range of construction and carpentry services we offer.</p>
              <a href="/services" className="inline-block bg-green-700 hover:bg-green-800 text-white font-semibold px-6 py-2 rounded transition-colors">
                View Services
              </a>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow">
              <h3 className="text-2xl font-bold mb-3 text-gray-900">Our Portfolio</h3>
              <p className="text-gray-600 mb-6">See examples of our completed projects and quality workmanship.</p>
              <a href="/portfolio" className="inline-block bg-green-700 hover:bg-green-800 text-white font-semibold px-6 py-2 rounded transition-colors">
                View Portfolio
              </a>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow">
              <h3 className="text-2xl font-bold mb-3 text-gray-900">Service Areas</h3>
              <p className="text-gray-600 mb-6">Learn about the regions we serve in Northern California.</p>
              <a href="/service-areas" className="inline-block bg-green-700 hover:bg-green-800 text-white font-semibold px-6 py-2 rounded transition-colors">
                View Areas
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Services Directory Section for SEO */}
      <section className="py-16 md:py-20 bg-green-50">
        <div className="container mx-auto px-6 md:px-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center text-gray-900">Our Services</h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            We specialize in a wide range of construction and finish carpentry services throughout Placer and Nevada Counties, California.
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

export default About;
