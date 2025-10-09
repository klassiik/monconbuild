import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Award, CheckCircle2, Tv, Users, Hammer, Star } from 'lucide-react';

const About = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white py-20 md:py-28">
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
          <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
            <div>
              <h2 className="text-3xl md:text-5xl font-bold mb-6 text-slate-900">William Rogers</h2>
              <h3 className="text-xl md:text-2xl text-blue-600 font-semibold mb-6">Owner & Master Craftsman</h3>
              
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

              <div className="mt-10 p-6 bg-blue-50 border-l-4 border-blue-600 rounded">
                <p className="text-lg font-semibold text-slate-900 mb-2">California Contractor License #801602</p>
                <p className="text-gray-600">Licensed and bonded for your protection and peace of mind.</p>
              </div>
            </div>

            <div>
              <img 
                src="https://customer-assets.emergentagent.com/job_99d86ab4-e27f-41c7-9c4d-305324a0277f/artifacts/uvmny025_Untitled12.jpg" 
                alt="Monument Construction - Quality Workmanship"
                className="rounded-lg shadow-2xl"
              />
            </div>
          </div>

          {/* Key Features */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
            <div className="p-8 bg-slate-50 rounded-lg">
              <Award className="w-12 h-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-bold mb-3 text-slate-900">Licensed Professional</h3>
              <p className="text-gray-600">California Contractor License #801602. Fully licensed and bonded.</p>
            </div>

            <div className="p-8 bg-slate-50 rounded-lg">
              <Tv className="w-12 h-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-bold mb-3 text-slate-900">Featured Expert</h3>
              <p className="text-gray-600">Multiple DIY Network TV appearances showcasing construction expertise.</p>
            </div>

            <div className="p-8 bg-slate-50 rounded-lg">
              <Users className="w-12 h-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-bold mb-3 text-slate-900">Referral-Based</h3>
              <p className="text-gray-600">Built on satisfied customers and word-of-mouth recommendations.</p>
            </div>

            <div className="p-8 bg-slate-50 rounded-lg">
              <Hammer className="w-12 h-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-bold mb-3 text-slate-900">Finish Carpentry Specialist</h3>
              <p className="text-gray-600">Master craftsman specializing in custom trim work and fine details.</p>
            </div>

            <div className="p-8 bg-slate-50 rounded-lg">
              <CheckCircle2 className="w-12 h-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-bold mb-3 text-slate-900">Complete Services</h3>
              <p className="text-gray-600">From groundwork to final touches – comprehensive construction services.</p>
            </div>

            <div className="p-8 bg-slate-50 rounded-lg">
              <Star className="w-12 h-12 text-blue-600 mb-4" />
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
      <section className="py-20 md:py-28 bg-blue-600 text-white">
        <div className="container mx-auto px-6 md:px-12 text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">Let's Build Something Great Together</h2>
          <p className="text-xl mb-10 text-blue-100 max-w-3xl mx-auto">
            Contact Monument Construction today to discuss your project and receive a free consultation.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-6 text-lg transition-all duration-300"
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
              <a href="tel:9166071972">Call (916) 607-1972</a>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;