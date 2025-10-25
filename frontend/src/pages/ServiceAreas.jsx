import React from 'react';

import { Helmet } from 'react-helmet-async';
import { Button } from '../components/ui/button';
import Breadcrumb from '../components/Breadcrumb';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { MapPin, Phone, CheckCircle2 } from 'lucide-react';

const ServiceAreas = () => {
  const breadcrumbItems = [
    { name: 'Service Areas', url: 'https://www.monconbuild.com/service-areas' }
  ];

  const counties = [
    {
      name: "Placer County",
      description: "Serving all communities throughout Placer County with expert construction and finish carpentry services.",
      cities: [
        "Colfax (Primary Location)",
        "Auburn",
        "Roseville",
        "Rocklin",
        "Lincoln",
        "Loomis",
        "Granite Bay",
        "Foresthill",
        "Applegate",
        "Weimar"
      ]
    },
    {
      name: "Nevada County",
      description: "Providing quality construction services throughout Nevada County, from valley communities to mountain areas.",
      cities: [
        "Grass Valley",
        "Nevada City",
        "Truckee",
        "Penn Valley",
        "Rough and Ready",
        "Lake of the Pines",
        "Lake Wildwood",
        "Washington",
        "Chicago Park",
        "North San Juan"
      ]
    }
  ];

  const services = [
    "Finish Carpentry",
    "General Construction",
    "Residential Projects",
    "Home Additions",
    "Remodeling & Renovations",
    "Custom Woodwork"
  ];

  return (
    <div className="min-h-screen">
      <Helmet>
        <title>Service Areas | Placer County CA</title>
        <meta name="description" content="Monument Construction serves Placer & Nevada Counties including Colfax, Auburn, Grass Valley, Nevada City & Truckee." />
        <link rel="canonical" href="https://www.monconbuild.com/service-areas" />
      </Helmet>
      {/* Breadcrumb Navigation */}
      <Breadcrumb items={breadcrumbItems} />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-green-900 via-green-800 to-emerald-900 text-white py-20 md:py-28">
        <div className="container mx-auto px-6 md:px-12">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Service Areas</h1>
            <p className="text-xl md:text-2xl text-gray-300 leading-relaxed">
              Proudly serving Placer County and Nevada County, California with quality construction and finish carpentry services.
            </p>
          </div>
        </div>
      </section>

      {/* Service Areas Introduction */}
      <section className="py-20 md:py-28 bg-gray-50">
        <div className="container mx-auto px-6 md:px-12">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-gray-900">Where We Serve</h2>
            <div className="prose prose-lg max-w-none space-y-6 text-gray-700">
              <p>
                Monument Construction serves a wide geographic area throughout Northern California, with a primary focus on Placer County and Nevada County. Since our founding, we've been the trusted construction and finish carpentry partner for homeowners in Colfax and the surrounding communities.
              </p>

              <p>
                Our service area includes Colfax, Auburn, Grass Valley, Nevada City, Truckee, and all surrounding communities in Placer and Nevada Counties. Whether you're located in a rural mountain community or a more developed suburban area, we bring the same level of professionalism, craftsmanship, and customer service to every project.
              </p>

              <p>
                Being locally based in Colfax provides significant advantages. We understand the local building codes, climate considerations, and community standards. We maintain fast response times, can coordinate inspections efficiently, and have established relationships with local suppliers and subcontractors. This local expertise means your project benefits from our deep understanding of what works in our region.
              </p>

              <div className="grid md:grid-cols-2 gap-6 my-10">
                <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-blue-600">
                  <h3 className="text-lg font-bold mb-3 text-gray-900">Primary Coverage Area</h3>
                  <ul className="space-y-2 text-sm">
                    <li>• Placer County (Colfax, Auburn, Loomis, Rocklin)</li>
                    <li>• Nevada County (Grass Valley, Nevada City, Penn Valley)</li>
                    <li>• Mountain Communities (Truckee and surrounding areas)</li>
                    <li>• All communities in between</li>
                  </ul>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-green-600">
                  <h3 className="text-lg font-bold mb-3 text-gray-900">Local Advantages</h3>
                  <ul className="space-y-2 text-sm">
                    <li>• Fast response times and quick consultations</li>
                    <li>• Knowledge of local building codes</li>
                    <li>• Established supplier and contractor relationships</li>
                    <li>• Understanding of regional climate and construction needs</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Primary Location */}
      <section className="py-20 md:py-28 bg-white">
        <div className="container mx-auto px-6 md:px-12">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <MapPin className="w-16 h-16 text-blue-600 mx-auto mb-6" />
            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-slate-900">Based in Colfax, California</h2>
            <p className="text-xl text-gray-600 leading-relaxed">
              Monument Construction is headquartered in Colfax, CA, in the heart of Placer County. From this central location, we serve communities throughout Placer and Nevada Counties, bringing quality craftsmanship to your doorstep.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-16">
            <Card className="text-center border-2 hover:border-blue-600 transition-all duration-300">
              <CardContent className="p-8">
                <CheckCircle2 className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2 text-slate-900">Local Knowledge</h3>
                <p className="text-gray-600">Deep understanding of local building codes and community needs.</p>
              </CardContent>
            </Card>

            <Card className="text-center border-2 hover:border-blue-600 transition-all duration-300">
              <CardContent className="p-8">
                <CheckCircle2 className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2 text-slate-900">Quick Response</h3>
                <p className="text-gray-600">Serving nearby communities with fast response times.</p>
              </CardContent>
            </Card>

            <Card className="text-center border-2 hover:border-blue-600 transition-all duration-300">
              <CardContent className="p-8">
                <CheckCircle2 className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2 text-slate-900">Community Trust</h3>
                <p className="text-gray-600">Built on referrals and relationships within our community.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Counties Served */}
      <section className="py-20 md:py-28 bg-slate-50">
        <div className="container mx-auto px-6 md:px-12">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-slate-900">Areas We Serve</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Quality construction and finish carpentry services throughout Northern California's Gold Country.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {counties.map((county, index) => (
              <Card key={index} className="border-2 hover:shadow-xl transition-all duration-300">
                <CardHeader>
                  <CardTitle className="text-3xl text-blue-600">{county.name}</CardTitle>
                  <p className="text-lg text-gray-600 mt-4">{county.description}</p>
                </CardHeader>
                <CardContent>
                  <h4 className="font-bold text-lg mb-4 text-slate-900">Communities Served:</h4>
                  <ul className="grid md:grid-cols-2 gap-3">
                    {county.cities.map((city, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-blue-600 mt-1">•</span>
                        <span className="text-gray-700">{city}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Services Available */}
      <section className="py-20 md:py-28 bg-white">
        <div className="container mx-auto px-6 md:px-12">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-slate-900 text-center">
              Services Available in All Areas
            </h2>
            <p className="text-xl text-gray-600 text-center mb-12">
              We bring the full range of our construction expertise to every community we serve.
            </p>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((service, index) => (
                <div key={index} className="p-6 bg-slate-50 rounded-lg border-2 border-transparent hover:border-blue-600 transition-all duration-300">
                  <CheckCircle2 className="w-6 h-6 text-blue-600 mb-3" />
                  <h3 className="font-bold text-slate-900">{service}</h3>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Service Area Details */}
      <section className="py-20 md:py-28 bg-slate-50">
        <div className="container mx-auto px-6 md:px-12">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-slate-900 text-center">
              Why Location Matters
            </h2>
            
            <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
              <p>
                As a local contractor based in Colfax, we understand the unique challenges and opportunities of building in the Sierra Nevada foothills. From dealing with varying elevations to working with local building codes, our experience in the area ensures your project is completed correctly.
              </p>
              
              <p>
                Our service area covers both valley communities and mountain locations. We're familiar with the construction considerations for each – from the warmer valley climates to the snow loads and weather conditions of higher elevations.
              </p>
              
              <p>
                Being local also means we've built relationships with suppliers, inspectors, and other trades throughout the region. This network helps us complete projects efficiently and handle any challenges that arise.
              </p>
              
              <p>
                If you're located outside our primary service area but still in Placer or Nevada County, please don't hesitate to reach out. We're often able to accommodate projects in surrounding areas.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-28 bg-blue-600 text-white">
        <div className="container mx-auto px-6 md:px-12 text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">Serving Your Community</h2>
          <p className="text-xl mb-10 text-blue-100 max-w-3xl mx-auto">
            Contact Monument Construction today to discuss your project, regardless of where you're located in Placer or Nevada County.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
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
              <a href="tel:9166071972">
                <Phone className="mr-2 w-5 h-5" />
                (916) 607-1972
              </a>
            </Button>
          </div>

          <p className="text-blue-100">
            Monument Construction • Colfax, CA • License #801602
          </p>
        </div>
      </section>

      {/* Explore More Section */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="container mx-auto px-6 md:px-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center text-gray-900">Learn More About Monument Construction</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow">
              <h3 className="text-2xl font-bold mb-3 text-gray-900">Our Services</h3>
              <p className="text-gray-600 mb-6">Explore our complete range of construction and carpentry services.</p>
              <a href="/services" className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded transition-colors">
                View Services
              </a>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow">
              <h3 className="text-2xl font-bold mb-3 text-gray-900">Our Portfolio</h3>
              <p className="text-gray-600 mb-6">See examples of our completed projects throughout our service areas.</p>
              <a href="/portfolio" className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded transition-colors">
                View Portfolio
              </a>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow">
              <h3 className="text-2xl font-bold mb-3 text-gray-900">About Us</h3>
              <p className="text-gray-600 mb-6">Learn about our team and years of construction experience.</p>
              <a href="/about" className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded transition-colors">
                About Us
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Services Directory Section for SEO */}
      <section className="py-16 md:py-20 bg-blue-50">
        <div className="container mx-auto px-6 md:px-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center text-gray-900">Our Services</h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            Monument Construction provides expert construction and carpentry services throughout Placer and Nevada Counties, California.
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

export default ServiceAreas;