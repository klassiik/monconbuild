import React from 'react';
import { CheckCircle2 } from 'lucide-react';

// Shared "service areas" city list used by the six service pages. Keeps the city
// list and the canonical five-county phrasing in one place; each page passes its
// own heading/intro so the surrounding prose stays differentiated.
const SERVICE_AREA_CITIES = [
  'Colfax, CA',
  'Auburn, CA',
  'Grass Valley, CA',
  'Nevada City, CA',
  'Truckee, CA',
  'Sacramento, CA',
  'Elk Grove, CA',
  'Folsom, CA',
  'Davis, CA',
  'Woodland, CA',
  'El Dorado Hills, CA',
  'South Lake Tahoe, CA',
  'All of Placer, Nevada, Sacramento, Yolo & El Dorado Counties',
];

const ServiceAreasBlock = ({ heading = 'Service Areas', intro }) => (
  <>
    <h3 className="text-2xl font-bold mb-4 text-gray-900">{heading}</h3>
    <p className="text-lg text-gray-700 mb-4">{intro}</p>
    <div className="grid md:grid-cols-3 gap-4 mb-12">
      {SERVICE_AREA_CITIES.map((area) => (
        <div key={area} className="flex items-center text-gray-700">
          <CheckCircle2 className="w-5 h-5 text-green-600 mr-2" />
          {area}
        </div>
      ))}
    </div>
  </>
);

export default ServiceAreasBlock;
