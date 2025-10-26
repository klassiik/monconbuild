import React from 'react';
import { Award, Star, Shield, Tv } from 'lucide-react';

const TrustBadges = () => (
  <div className="py-12 bg-gray-50">
    <div className="container mx-auto px-6">
      <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
        <div className="text-center">
          <Shield className="w-12 h-12 mx-auto mb-2 text-green-700" />
          <p className="font-semibold text-gray-900">Licensed & Insured</p>
          <p className="text-sm text-gray-600">CA License #801602</p>
        </div>
        
        <div className="text-center">
          <Award className="w-12 h-12 mx-auto mb-2 text-green-700" />
          <p className="font-semibold text-gray-900">25+ Years</p>
          <p className="text-sm text-gray-600">Experience</p>
        </div>
        
        <div className="text-center">
          <Tv className="w-12 h-12 mx-auto mb-2 text-green-700" />
          <p className="font-semibold text-gray-900">Featured on</p>
          <p className="text-sm text-gray-600">DIY Network</p>
        </div>
        
        <div className="text-center">
          <Star className="w-12 h-12 mx-auto mb-2 text-green-700 fill-green-700" />
          <p className="font-semibold text-gray-900">100% Satisfaction</p>
          <p className="text-sm text-gray-600">Guaranteed</p>
        </div>
      </div>
    </div>
  </div>
);

export default TrustBadges;

