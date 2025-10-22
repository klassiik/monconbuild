import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Hammer, Home, Building2, Wrench, DoorOpen, Drill, PaintBucket, Ruler } from 'lucide-react';

const Services = () => {
  const services = [
    {
      icon: <Hammer className="w-12 h-12" />,
      title: "Finish Carpentry",
      description: "Our specialty and passion. Expert finish carpentry including custom trim work, crown molding, baseboards, door and window casings, wainscoting, and decorative millwork. Every detail is crafted with precision and care.",
      features: [
        "Custom trim and molding installation",
        "Built-in cabinets and shelving",
        "Custom mantels and fireplace surrounds",
        "Coffered and tray ceilings",
        "Window seats and built-ins",
        "Custom woodwork and cabinetry"
      ]
    },
    {
      icon: <Home className="w-12 h-12" />,
      title: "Residential Construction",
      description: "Complete residential construction services from ground work to final touches. We handle every phase of your home project with the same level of craftsmanship and attention to detail.",
      features: [
        "New home construction",
        "Room additions and extensions",
        "Whole home remodeling",
        "Kitchen and bathroom renovations",
        "Deck and patio construction",
        "Foundation to finish services"
      ]
    },
    {
      icon: <Wrench className="w-12 h-12" />,
      title: "Complete Construction Services",
      description: "From groundbreaking to final walkthrough, we provide comprehensive construction services. Our experience allows us to manage every aspect of your project seamlessly.",
      features: [
        "Site preparation and groundwork",
        "Framing and structural work",
        "Roofing and siding",
        "Electrical and plumbing coordination",
        "Drywall and finishing",
        "Final details and punch list"
      ]
    },
    {
      icon: <DoorOpen className="w-12 h-12" />,
      title: "Custom Doors & Windows",
      description: "Expert installation of doors and windows with precise finish carpentry. We ensure proper fit, function, and beautiful trim work for every opening.",
      features: [
        "Interior and exterior door installation",
        "Window installation and replacement",
        "Custom door and window trim",
        "Weather sealing and insulation",
        "Hardware selection and installation",
        "Specialty and custom openings"
      ]
    },
    {
      icon: <Drill className="w-12 h-12" />,
      title: "Remodeling & Renovations",
      description: "Transform your existing space with our expert remodeling services. We bring new life to homes and businesses with quality craftsmanship.",
      features: [
        "Kitchen remodeling",
        "Bathroom renovations",
        "Basement finishing",
        "Historic home restoration",
        "Interior and exterior updates",
        "Accessibility modifications"
      ]
    },
    {
      icon: <PaintBucket className="w-12 h-12" />,
      title: "Interior Finishing",
      description: "Complete interior finishing services that showcase attention to detail. We create beautiful, functional spaces with quality materials and expert workmanship.",
      features: [
        "Hardwood flooring installation",
        "Tile and stone work",
        "Custom built-in furniture",
        "Closet systems and organizers",
        "Home office installations",
        "Entertainment centers"
      ]
    },
    {
      icon: <Ruler className="w-12 h-12" />,
      title: "Design & Consultation",
      description: "Expert guidance from initial concept through completion. We work with you to design solutions that meet your needs, budget, and timeline.",
      features: [
        "Project planning and design",
        "Material selection assistance",
        "Budget development",
        "Timeline scheduling",
        "Code compliance guidance",
        "Permit coordination"
      ]
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-green-900 via-green-800 to-emerald-900 text-white py-20 md:py-28">
        <div className="container mx-auto px-6 md:px-12">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Our Services</h1>
            <p className="text-xl md:text-2xl text-gray-300 leading-relaxed">
              From expert finish carpentry to complete construction projects, Monument Construction delivers quality craftsmanship across all services.
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 md:py-28 bg-white">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid md:grid-cols-2 gap-12">
            {services.map((service, index) => (
              <Card key={index} className="border-2 hover:border-blue-600 transition-all duration-300 hover:shadow-xl">
                <CardHeader>
                  <div className="text-blue-600 mb-4">
                    {service.icon}
                  </div>
                  <CardTitle className="text-2xl md:text-3xl mb-4">{service.title}</CardTitle>
                  <p className="text-gray-600 text-lg leading-relaxed">{service.description}</p>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <span className="text-blue-600 mt-1">•</span>
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 md:py-28 bg-slate-50">
        <div className="container mx-auto px-6 md:px-12">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-5xl font-bold mb-8 text-slate-900">Why Choose Monument Construction?</h2>
            
            <div className="grid md:grid-cols-3 gap-8 mt-12">
              <div className="p-8 bg-white rounded-lg shadow-lg">
                <h3 className="text-xl font-bold mb-3 text-slate-900">Licensed Contractor</h3>
                <p className="text-gray-600">California Contractor License #801602. Fully licensed and bonded for your protection.</p>
              </div>
              
              <div className="p-8 bg-white rounded-lg shadow-lg">
                <h3 className="text-xl font-bold mb-3 text-slate-900">Expert Craftsmanship</h3>
                <p className="text-gray-600">Decades of experience with featured projects on DIY Network TV.</p>
              </div>
              
              <div className="p-8 bg-white rounded-lg shadow-lg">
                <h3 className="text-xl font-bold mb-3 text-slate-900">Referral-Based</h3>
                <p className="text-gray-600">Our reputation is built on satisfied customers and quality work.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-28 bg-blue-600 text-white">
        <div className="container mx-auto px-6 md:px-12 text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">Ready to Discuss Your Project?</h2>
          <p className="text-xl mb-10 text-blue-100 max-w-3xl mx-auto">
            Contact us today for a free consultation. We'll discuss your needs and provide a detailed quote.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-6 text-lg transition-all duration-300"
              asChild
            >
              <Link to="/contact">Get Free Quote</Link>
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
    </div>
  );
};

export default Services;