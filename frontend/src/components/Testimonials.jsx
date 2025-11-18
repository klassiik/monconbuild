import React from 'react';
import { Card, CardContent } from './ui/card';
import { Star, Quote } from 'lucide-react';
import { handleError } from '../utils/errorHandler';

// Enhanced Testimonials Component with comprehensive accessibility
const Testimonials = ({ testimonials = [], showImages = true }) => {
  try {
    if (!testimonials || testimonials.length === 0) return null;

    const renderStars = () => {
      return [...Array(5)].map((_, i) => (
        <Star 
          key={i} 
          className="w-5 h-5 fill-green-700 text-green-700" 
          aria-hidden="true"
        />
      ));
    };

    return (
      <section 
        className="py-20 md:py-28 bg-white" 
        aria-label="Customer testimonials"
      >
        <div className="container mx-auto px-6 md:px-12">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4 text-slate-900">
              What Our Clients Say
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Don't just take our word for it - hear from satisfied customers throughout Placer and Nevada Counties.
            </p>
          </div>

          <div 
            className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto"
            role="list"
            aria-label="Testimonials list"
          >
            {testimonials.map((testimonial, index) => (
              <Card 
                key={index} 
                className="border-2 hover:border-green-700 transition-all duration-300 hover:shadow-xl relative overflow-hidden bg-gradient-to-br from-slate-50 to-white"
                role="listitem"
                aria-label={`Testimonial from ${testimonial.name} in ${testimonial.location}`}
              >
                <CardContent className="p-8">
                  {/* Quote icon for visual appeal, hidden from screen readers */}
                  <div className="absolute top-4 right-4 text-green-100" aria-hidden="true">
                    <Quote className="w-12 h-12" />
                  </div>
                  
                  {/* Star rating with proper ARIA labeling */}
                  <div 
                    className="flex items-center gap-1 mb-4" 
                    role="img" 
                    aria-label={`5 out of 5 stars rating from ${testimonial.name}`}
                    aria-describedby={`testimonial-rating-${index}`}
                  >
                    <span 
                      id={`testimonial-rating-${index}`} 
                      className="sr-only"
                    >
                      Five star rating
                    </span>
                    {renderStars()}
                  </div>

                  {/* Testimonial text with proper blockquote semantics */}
                  <blockquote 
                    className="text-lg text-gray-700 leading-relaxed mb-6 relative z-10"
                    cite={testimonial.service}
                  >
                    <span className="sr-only">Testimonial: </span>
                    "{testimonial.text}"
                  </blockquote>

                  {/* Customer info and image with enhanced accessibility */}
                  <div className="flex items-center gap-4">
                    {showImages && testimonial.image && (
                      <div className="relative w-16 h-16 rounded-full overflow-hidden flex-shrink-0">
                        <img 
                          src={testimonial.image} 
                          alt={`${testimonial.name} - ${testimonial.location} customer`}
                          loading="lazy"
                          className="w-full h-full object-cover"
                          onError={() => {
                            handleError(new Error(`Failed to load testimonial image for ${testimonial.name}`), 'IMAGE_LOAD_ERROR', 'LOW', {
                              imageSource: testimonial.image,
                              testimonialIndex: index
                            });
                          }}
                        />
                      </div>
                    )}
                    <div>
                      <p className="font-semibold text-slate-900 text-lg">{testimonial.name}</p>
                      <p className="text-green-700 font-medium">{testimonial.location}</p>
                      {testimonial.service && (
                        <p className="text-gray-600 text-sm" aria-label={`Service: ${testimonial.service}`}>
                          {testimonial.service}
                        </p>
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
  } catch (error) {
    handleError(error, 'COMPONENT_RENDER_ERROR', 'HIGH', {
      component: 'Testimonials',
      testimonialsCount: testimonials?.length || 0
    });
    
    // Fallback minimal testimonials
    return (
      <section className="py-20 bg-white" aria-label="Customer testimonials">
        <div className="container mx-auto px-6 md:px-12">
          <h2 className="text-3xl font-bold text-center mb-8">What Our Clients Say</h2>
          <div className="text-center">
            <p className="text-gray-600">Testimonials are currently being loaded...</p>
          </div>
        </div>
      </section>
    );
  }
};

export default Testimonials;