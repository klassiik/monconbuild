import React from 'react';
import { Award, Star, Shield, Tv, CheckCircle2 } from 'lucide-react';

const TrustBadges = () => {
  // Schema.org markup for trust signals
  const trustSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Monument Construction",
    "description": "Licensed general contractor and finish carpentry specialist serving Placer County and Nevada County, California.",
    "hasCredential": {
      "@type": "EducationalOccupationalCredential",
      "credentialCategory": "license",
      "recognizedBy": {
        "@type": "Organization",
        "name": "California Contractors State License Board"
      },
      "identifier": "801602"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "5.0",
      "reviewCount": "50",
      "bestRating": "5",
      "worstRating": "1"
    }
  };

  const badges = [
    {
      icon: Shield,
      title: "Licensed & Insured",
      subtitle: "CA License #801602",
      description: "Fully licensed, bonded, and insured for your protection"
    },
    {
      icon: Award,
      title: "25+ Years",
      subtitle: "Experience",
      description: "Quarter-century of quality construction and craftsmanship"
    },
    {
      icon: Tv,
      title: "Featured on",
      subtitle: "DIY Network",
      description: "TV appearances showcasing our expert craftsmanship"
    },
    {
      icon: Star,
      title: "100% Satisfaction",
      subtitle: "Guaranteed",
      description: "We stand behind our work with quality guarantees"
    }
  ];

  return (
    <div className="py-12 bg-gray-50">
      <script type="application/ld+json">
        {JSON.stringify(trustSchema)}
      </script>
      
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
            Why Choose Monument Construction?
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {badges.map((badge, index) => {
              const IconComponent = badge.icon;
              return (
                <div key={index} className="text-center">
                  <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200 hover:border-green-700 transition-all duration-300 hover:shadow-xl">
                    <IconComponent className="w-16 h-16 mx-auto mb-4 text-green-700" />
                    <h3 className="font-bold text-lg text-gray-900 mb-2">{badge.title}</h3>
                    <p className="text-green-700 font-semibold text-sm mb-2">{badge.subtitle}</p>
                    <p className="text-gray-600 text-sm">{badge.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
          
          {/* Additional Trust Indicators */}
          <div className="mt-12 bg-white rounded-lg shadow-lg p-8">
            <div className="flex items-start gap-4">
              <CheckCircle2 className="w-8 h-8 text-green-700 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-xl text-gray-900 mb-4">Licensed & Bonded</h3>
                <div className="grid md:grid-cols-2 gap-6 text-gray-700">
                  <div>
                    <p className="font-semibold mb-2">California Contractor License</p>
                    <p className="text-sm">License #801602 - Fully verified and current</p>
                  </div>
                  <div>
                    <p className="font-semibold mb-2">Insurance Coverage</p>
                    <p className="text-sm">Liability and workers' compensation insurance</p>
                  </div>
                  <div>
                    <p className="font-semibold mb-2">Service Areas</p>
                    <p className="text-sm">Placer County & Nevada County, California</p>
                  </div>
                  <div>
                    <p className="font-semibold mb-2">Professional Affiliations</p>
                    <p className="text-sm">Better Business Bureau member</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrustBadges;
