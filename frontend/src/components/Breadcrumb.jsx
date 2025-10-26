import React from 'react';
import { ChevronRight, Home } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

/**
 * Breadcrumb Component with Schema.org Structured Data
 * @param {Array} items - Breadcrumb items [{name, url}]
 */
const Breadcrumb = ({ items }) => {
  // Add Home as first item if not present
  const breadcrumbItems = items[0]?.name === 'Home' 
    ? items 
    : [{ name: 'Home', url: 'https://www.monconbuild.com/' }, ...items];

  // Generate Schema.org BreadcrumbList
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": breadcrumbItems.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url
    }))
  };

  return (
    <>
      {/* Inject Breadcrumb Schema */}
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbSchema)}
        </script>
      </Helmet>

      {/* Visual Breadcrumb Navigation */}
      <nav aria-label="Breadcrumb" className="bg-gray-50 border-b border-gray-200">
        <div className="container mx-auto px-6 md:px-12 py-3">
          <ol className="flex items-center space-x-2 text-sm" itemScope itemType="https://schema.org/BreadcrumbList">
            {breadcrumbItems.map((item, index) => {
              const isLast = index === breadcrumbItems.length - 1;
              const isFirst = index === 0;

              return (
                <li 
                  key={index} 
                  className="flex items-center"
                  itemProp="itemListElement"
                  itemScope
                  itemType="https://schema.org/ListItem"
                >
                  {index > 0 && (
                    <ChevronRight className="w-4 h-4 mx-2 text-gray-400" aria-hidden="true" />
                  )}
                  
                  {isLast ? (
                    <span 
                      className="text-gray-700 font-medium"
                      itemProp="name"
                      aria-current="page"
                    >
                      {isFirst && <Home className="w-4 h-4 inline mr-1" aria-hidden="true" />}
                      {item.name}
                    </span>
                  ) : (
                    <a 
                      href={item.url.replace('https://www.monconbuild.com', '')} 
                      className="text-green-700 hover:text-blue-800 hover:underline transition-colors"
                      itemProp="item"
                    >
                      <span itemProp="name">
                        {isFirst && <Home className="w-4 h-4 inline mr-1" aria-hidden="true" />}
                        {item.name}
                      </span>
                    </a>
                  )}
                  
                  <meta itemProp="position" content={index + 1} />
                </li>
              );
            })}
          </ol>
        </div>
      </nav>
    </>
  );
};

export default Breadcrumb;

