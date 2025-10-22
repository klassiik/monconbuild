import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Phone, Mail, CheckCircle2, Award, Hammer, Home as HomeIcon, Building2, Wrench } from 'lucide-react';

const Home = () => {
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
      description: "Floor-to-ceiling custom carpentry"
    },
    {
      image: "https://customer-assets.emergentagent.com/job_99d86ab4-e27f-41c7-9c4d-305324a0277f/artifacts/zdso40es_Untitled1.png",
      title: "Custom Home Office",
      description: "Corner desk with integrated shelving"
    },
    {
      image: "https://customer-assets.emergentagent.com/job_99d86ab4-e27f-41c7-9c4d-305324a0277f/artifacts/gx2z9lsu_Untitled7.jpg",
      title: "Covered Entry Construction",
      description: "Custom timber frame entrance"
    }
  ];

  const features = [
    "Licensed Contractor #801602",
    "Featured on DIY Network TV",
    "Serving Placer & Nevada Counties",
    "Referral-Based Excellence"
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-cover bg-center bg-fixed text-white py-24 md:py-32 overflow-hidden" style={{backgroundImage: "url('/sierra.webp')"}}>
        {/* Overlay for better text readability - darker on top, lighter on bottom */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-green-900/70"></div>
        
        {/* Optional: Add a subtle pattern overlay */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjA1IiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-20"></div>
        
        <div className="container mx-auto px-6 md:px-12 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Professional Construction & Finish Carpentry in <span className="text-blue-400">Colfax, CA</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-300 leading-relaxed">
              Expert craftsmanship from ground work to complete construction. Licensed, experienced, and trusted throughout Placer & Nevada Counties.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-12 justify-center">
              <Button 
                size="lg" 
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 text-lg transition-all duration-300 hover:scale-105 shadow-lg"
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
                <a href="tel:9166071972" aria-label="Call Monument Construction at (916) 607-1972">
                  <Phone className="mr-2 w-5 h-5" />
                  (916) 607-1972
                </a>
              </Button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center gap-2 text-sm md:text-base">
                  <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0" />
                  <span className="text-gray-200">{feature}</span>
                </div>
              ))}
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
                className="border-2 hover:border-blue-600 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 group"
              >
                <CardContent className="p-8">
                  <div className="text-blue-600 mb-4 group-hover:scale-110 transition-transform duration-300">
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
              className="border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white transition-all duration-300"
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
              <div 
                key={index} 
                className="group cursor-pointer overflow-hidden rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300"
              >
                <div className="relative overflow-hidden">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    loading="lazy"
                    className="w-full h-72 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-green-900 via-transparent to-transparent opacity-60"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <h3 className="text-xl font-bold mb-1">{project.title}</h3>
                    <p className="text-sm text-gray-200">{project.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Button 
              size="lg" 
              className="bg-blue-600 hover:bg-blue-700 text-white transition-all duration-300"
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
                  <Award className="w-8 h-8 text-blue-600 flex-shrink-0" />
                  <div>
                    <h3 className="text-xl font-bold mb-2 text-slate-900">Licensed & Experienced</h3>
                    <p className="text-gray-600">California Contractor License #801602 with extensive experience in residential projects.</p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <CheckCircle2 className="w-8 h-8 text-blue-600 flex-shrink-0" />
                  <div>
                    <h3 className="text-xl font-bold mb-2 text-slate-900">Finish Carpentry Specialist</h3>
                    <p className="text-gray-600">Master craftsman specializing in custom woodwork, built-ins, and fine finish details.</p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <Building2 className="w-8 h-8 text-blue-600 flex-shrink-0" />
                  <div>
                    <h3 className="text-xl font-bold mb-2 text-slate-900">Complete Construction Services</h3>
                    <p className="text-gray-600">From foundation to finish, we handle every aspect of your construction project.</p>
                  </div>
                </div>
              </div>

              <div className="mt-10">
                <Button 
                  size="lg" 
                  className="bg-blue-600 hover:bg-blue-700 text-white transition-all duration-300"
                  asChild
                >
                  <Link to="/about">Learn More About Us</Link>
                </Button>
              </div>
            </div>

            <div className="relative">
              <img 
                src="https://customer-assets.emergentagent.com/job_99d86ab4-e27f-41c7-9c4d-305324a0277f/artifacts/uvmny025_Untitled12.jpg" 
                alt="Monument Construction quality work"
                loading="lazy"
                className="rounded-lg shadow-2xl"
              />
              <div className="absolute -bottom-6 -left-6 bg-blue-600 text-white p-6 rounded-lg shadow-xl">
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
              Proudly serving Placer County and Nevada County with quality construction services.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              "Colfax, CA",
              "Auburn, CA", 
              "Grass Valley, CA",
              "Nevada City, CA",
              "Truckee, CA",
              "All of Placer & Nevada Counties"
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
      <section className="py-20 md:py-28 bg-blue-600 text-white">
        <div className="container mx-auto px-6 md:px-12 text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">Ready to Start Your Project?</h2>
          <p className="text-xl md:text-2xl mb-10 text-blue-100 max-w-3xl mx-auto">
            Get in touch today for a free consultation and quote. Let's bring your vision to life.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-6 text-lg transition-all duration-300 hover:scale-105 shadow-lg"
              asChild
            >
              <Link to="/contact">Request Free Quote</Link>
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-2 border-white text-white hover:bg-white hover:text-blue-600 px-8 py-6 text-lg transition-all duration-300"
              asChild
            >
              <a href="tel:9166071972" aria-label="Call Monument Construction at (916) 607-1972">
                <Phone className="mr-2 w-5 h-5" />
                Call (916) 607-1972
              </a>
            </Button>
          </div>

          <div className="mt-10 flex flex-col sm:flex-row gap-6 justify-center items-center text-blue-100">
            <div className="flex items-center gap-2">
              <Phone className="w-5 h-5" />
              <span>(916) 607-1972</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="w-5 h-5" />
              <span>monumentconstruction@comcast.net</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;