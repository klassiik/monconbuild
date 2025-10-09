import React, { useState } from 'react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Label } from '../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Phone, Mail, MapPin, Clock, CheckCircle2 } from 'lucide-react';
import { useToast } from '../hooks/use-toast';

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    projectType: '',
    location: '',
    message: '',
    timeline: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSelectChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Store in localStorage (frontend only)
    const submissions = JSON.parse(localStorage.getItem('contactSubmissions') || '[]');
    const newSubmission = {
      ...formData,
      id: Date.now(),
      submittedAt: new Date().toISOString()
    };
    submissions.push(newSubmission);
    localStorage.setItem('contactSubmissions', JSON.stringify(submissions));

    toast({
      title: "Quote Request Received!",
      description: "We'll contact you within 24 hours to discuss your project.",
    });

    // Reset form
    setFormData({
      name: '',
      email: '',
      phone: '',
      projectType: '',
      location: '',
      message: '',
      timeline: ''
    });
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white py-20 md:py-28">
        <div className="container mx-auto px-6 md:px-12">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Contact Us</h1>
            <p className="text-xl md:text-2xl text-gray-300 leading-relaxed">
              Ready to start your project? Get in touch today for a free consultation and quote.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-20 md:py-28 bg-white">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-slate-900">Request a Free Quote</h2>
              <p className="text-lg text-gray-600 mb-8">
                Fill out the form below and we'll contact you within 24 hours to discuss your project.
              </p>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Label htmlFor="name">Full Name *</Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="mt-2"
                    placeholder="John Smith"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="mt-2"
                      placeholder="john@example.com"
                    />
                  </div>

                  <div>
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className="mt-2"
                      placeholder="(916) 555-0123"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="projectType">Project Type *</Label>
                  <Select 
                    name="projectType" 
                    value={formData.projectType}
                    onValueChange={(value) => handleSelectChange('projectType', value)}
                  >
                    <SelectTrigger className="mt-2">
                      <SelectValue placeholder="Select project type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="finish-carpentry">Finish Carpentry</SelectItem>
                      <SelectItem value="general-construction">General Construction</SelectItem>
                      <SelectItem value="residential">Residential Project</SelectItem>
                      <SelectItem value="remodeling">Remodeling/Renovation</SelectItem>
                      <SelectItem value="addition">Home Addition</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="location">Project Location *</Label>
                  <Input
                    id="location"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    required
                    className="mt-2"
                    placeholder="Colfax, CA"
                  />
                </div>

                <div>
                  <Label htmlFor="timeline">Desired Timeline</Label>
                  <Select 
                    name="timeline" 
                    value={formData.timeline}
                    onValueChange={(value) => handleSelectChange('timeline', value)}
                  >
                    <SelectTrigger className="mt-2">
                      <SelectValue placeholder="Select timeline" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="asap">As soon as possible</SelectItem>
                      <SelectItem value="1-3-months">1-3 months</SelectItem>
                      <SelectItem value="3-6-months">3-6 months</SelectItem>
                      <SelectItem value="6-plus-months">6+ months</SelectItem>
                      <SelectItem value="flexible">Flexible</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="message">Project Details *</Label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    className="mt-2 min-h-32"
                    placeholder="Please describe your project, including scope, budget considerations, and any specific requirements..."
                  />
                </div>

                <Button 
                  type="submit" 
                  size="lg" 
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white transition-all duration-300"
                >
                  Request Free Quote
                </Button>

                <p className="text-sm text-gray-500 text-center">
                  By submitting this form, you agree to be contacted regarding your project inquiry.
                </p>
              </form>
            </div>

            {/* Contact Details */}
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-slate-900">Get In Touch</h2>
              <p className="text-lg text-gray-600 mb-8">
                Prefer to call or email? We're here to help answer your questions and discuss your project needs.
              </p>

              <div className="space-y-6 mb-12">
                <Card className="border-2 hover:border-blue-600 transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <Phone className="w-8 h-8 text-blue-600 flex-shrink-0 mt-1" />
                      <div>
                        <h3 className="font-bold text-lg mb-2 text-slate-900">Phone</h3>
                        <a href="tel:9166071972" className="text-blue-600 hover:text-blue-700 text-xl font-semibold transition-colors duration-300">
                          (916) 607-1972
                        </a>
                        <p className="text-gray-600 mt-2">Call us for immediate assistance</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-2 hover:border-blue-600 transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <Mail className="w-8 h-8 text-blue-600 flex-shrink-0 mt-1" />
                      <div>
                        <h3 className="font-bold text-lg mb-2 text-slate-900">Email</h3>
                        <a href="mailto:monumentconstruction@comcast.net" className="text-blue-600 hover:text-blue-700 font-semibold transition-colors duration-300 break-all">
                          monumentconstruction@comcast.net
                        </a>
                        <p className="text-gray-600 mt-2">Send us a detailed message</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-2 hover:border-blue-600 transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <MapPin className="w-8 h-8 text-blue-600 flex-shrink-0 mt-1" />
                      <div>
                        <h3 className="font-bold text-lg mb-2 text-slate-900">Service Area</h3>
                        <p className="text-gray-700 font-semibold">Colfax, CA</p>
                        <p className="text-gray-600 mt-2">Serving all of Placer & Nevada Counties</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-2 hover:border-blue-600 transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <Clock className="w-8 h-8 text-blue-600 flex-shrink-0 mt-1" />
                      <div>
                        <h3 className="font-bold text-lg mb-2 text-slate-900">Response Time</h3>
                        <p className="text-gray-700 font-semibold">Within 24 hours</p>
                        <p className="text-gray-600 mt-2">We respond to all inquiries promptly</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* License Info */}
              <Card className="bg-blue-50 border-2 border-blue-200">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <CheckCircle2 className="w-8 h-8 text-blue-600" />
                    <span>Licensed & Insured</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-lg font-semibold text-slate-900 mb-2">
                    California Contractor License #801602
                  </p>
                  <p className="text-gray-700">
                    Fully licensed, bonded, and insured for your protection and peace of mind.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 md:py-28 bg-slate-50">
        <div className="container mx-auto px-6 md:px-12">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-slate-900 text-center">
              Frequently Asked Questions
            </h2>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>How quickly can you start my project?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Project start times vary depending on our current schedule and the scope of your project. After our initial consultation, we'll provide a realistic timeline. Many projects can begin within 2-4 weeks of contract signing.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Do you provide free estimates?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Yes! We provide free consultations and quotes for all projects. We'll visit your site, discuss your needs, and provide a detailed estimate at no cost.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>What areas do you serve?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    We serve all of Placer County and Nevada County, including Colfax, Auburn, Grass Valley, Nevada City, Truckee, and surrounding communities.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Are you licensed and insured?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Yes, Monument Construction holds California Contractor License #801602 and carries full liability insurance and workers' compensation coverage.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>What types of projects do you handle?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    We specialize in finish carpentry but provide complete construction services from ground work to final touches, including residential and commercial projects, remodeling, additions, and custom woodwork.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;