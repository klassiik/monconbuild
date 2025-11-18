import React from 'react';
import { Card, CardContent } from './ui/card';
import { Star, Quote } from 'lucide-react';

// Reusable Testimonials Component
const Testimonials = ({ testimonials = [], showImages = true }) => {
  if (!testimonials || testimonials.length === 0) return null;

  return (
    <section className="py-20 md:py-28 bg-white" aria-label="Customer testimonials">
      <div className="container mx-auto px-6 md:px-12">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-slate-900">What Our Clients Say</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Don't just take our word for it - hear from satisfied customers throughout Placer and Nevada Counties.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <Card 
              key={index} 
              className="border-2 hover:border-green-700 transition-all duration-300 hover:shadow-xl relative overflow-hidden bg-gradient-to-br from-slate-50 to-white"
            >
              <CardContent className="p-8">
                {/* Quote icon */}
                <div className="absolute top-4 right-4 text-green-100">
                  <Quote className="w-12 h-12" />
                </div>
                
                {/* Star rating */}
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-green-700 text-green-700" />
                  ))}
                </div>

                {/* Testimonial text */}
                <blockquote className="text-lg text-gray-700 leading-relaxed mb-6 relative z-10">
                  "{testimonial.text}"
                </blockquote>

                {/* Customer info and image */}
                <div className="flex items-center gap-4">
                  {showImages && testimonial.image && (
                    <div className="relative w-16 h-16 rounded-full overflow-hidden flex-shrink-0">
                      <img 
                        src={testimonial.image} 
                        alt={`${testimonial.name} - ${testimonial.location} customer`}
                        loading="lazy"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <div>
                    <p className="font-semibold text-slate-900 text-lg">{testimonial.name}</p>
                    <p className="text-green-700 font-medium">{testimonial.location}</p>
                    {testimonial.service && (
                      <p className="text-gray-600 text-sm">{testimonial.service}</p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;