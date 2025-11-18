import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from './ui/accordion';
import ErrorBoundary from './ErrorBoundary';
import { handleError } from '../utils/errorHandler';

const FAQSection = ({ faqs, title = "Frequently Asked Questions" }) => {
  try {
    const faqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": faqs.map(faq => ({
        "@type": "Question",
        "name": faq.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.answer
        }
      }))
    };

    return (
      <ErrorBoundary>
        <section 
          className="py-16 bg-gray-50"
          aria-label="Frequently asked questions"
        >
          <script
            type="application/ld+json"
          >
            {JSON.stringify(faqSchema)}
          </script>
          
          <div className="container mx-auto px-6 max-w-4xl">
            <h2 className="text-3xl font-bold mb-8 text-gray-900">{title}</h2>
            
            <div 
              role="region"
              aria-label="FAQ list"
            >
              <Accordion type="single" collapsible className="space-y-4">
                {faqs.map((faq, index) => (
                  <AccordionItem 
                    key={index} 
                    value={`item-${index}`} 
                    className="bg-white rounded-lg shadow-sm border border-gray-200"
                  >
                    <AccordionTrigger 
                      className="text-left text-lg font-semibold px-6 hover:no-underline"
                      aria-expanded="false"
                      aria-controls={`faq-content-${index}`}
                      id={`faq-trigger-${index}`}
                    >
                      <span className="sr-only">Question {index + 1}: </span>
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent 
                      className="text-gray-700 px-6 pb-4"
                      id={`faq-content-${index}`}
                      role="region"
                      aria-labelledby={`faq-trigger-${index}`}
                    >
                      <span className="sr-only">Answer: </span>
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </section>
      </ErrorBoundary>
    );
  } catch (error) {
    handleError(error, 'COMPONENT_RENDER_ERROR', 'HIGH', {
      component: 'FAQSection',
      faqsCount: faqs?.length || 0
    });
    
    // Fallback minimal FAQ section
    return (
      <section className="py-16 bg-gray-50" aria-label="Frequently asked questions">
        <div className="container mx-auto px-6 max-w-4xl">
          <h2 className="text-3xl font-bold mb-8 text-gray-900">{title}</h2>
          <div className="text-center">
            <p className="text-gray-600">Frequently asked questions are currently being loaded...</p>
          </div>
        </div>
      </section>
    );
  }
};

export default FAQSection;
