
import React from 'react';

interface TagProps {
  text: string;
  onRemove: () => void;
}

const Tag: React.FC<TagProps> = ({ text, onRemove }) => {
  return (
    <div className="bg-green-100 text-green-800 text-sm font-medium me-2 px-3 py-1.5 rounded-full flex items-center gap-2">
      <span>{text}</span>
      <button 
        onClick={onRemove} 
        className="text-green-600 hover:text-green-800 focus:outline-none"
        aria-label={`Remove ${text}`}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
};

export default Tag;
