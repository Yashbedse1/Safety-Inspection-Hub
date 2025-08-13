'use client';

import { useState } from 'react';
import { ChecklistSection } from '@/types/checklist.types';
import { ItemRow } from './ItemRow';

interface SectionAccordionProps {
  section: ChecklistSection;
  isFirst?: boolean;
}

export const SectionAccordion = ({ section, isFirst = false }: SectionAccordionProps) => {
  const [isExpanded, setIsExpanded] = useState(isFirst);

  const toggleAccordion = () => {
    setIsExpanded(!isExpanded);
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      toggleAccordion();
    }
  };

  return (
    <div className="border border-gray-200 rounded-lg mb-4">
      <button
        className="w-full px-6 py-4 text-left bg-gray-50 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-inset transition-colors"
        onClick={toggleAccordion}
        onKeyDown={handleKeyDown}
        aria-expanded={isExpanded}
        aria-controls={`section-${section.id}`}
      >
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900">
              {section.title}
            </h3>
            <p className="text-sm text-gray-600 mt-1">{section.description}</p>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-600">
              {section.completionPercentage}% complete
            </span>
            <svg
              className={`h-5 w-5 text-gray-500 transition-transform ${
                isExpanded ? 'rotate-180' : ''
              }`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
        </div>
      </button>

      {isExpanded && (
        <div
          id={`section-${section.id}`}
          className="px-6 py-4 bg-white"
          role="region"
          aria-labelledby={`section-${section.id}`}
        >
          <div className="space-y-2">
            {section.items.map((item) => (
              <ItemRow key={item.id} item={item} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
