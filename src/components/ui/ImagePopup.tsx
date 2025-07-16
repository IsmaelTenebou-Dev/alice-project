"use client";

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

interface ImagePopupProps {
  src: string;
  alt: string;
  className?: string;
}

const ImagePopup: React.FC<ImagePopupProps> = ({ src, alt, className = '' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const popupRef = useRef<HTMLDivElement>(null);

  // Close popup when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  // Close popup when ESC key is pressed
  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscKey);
    }

    return () => {
      document.removeEventListener('keydown', handleEscKey);
    };
  }, [isOpen]);

  return (
    <>
      <Image 
        src={src} 
        alt={alt} 
        className={`cursor-pointer ${className}`} 
        onClick={() => setIsOpen(true)}
        width={500}
        height={300}
        style={{ objectFit: 'contain', width: 'auto', height: 'auto' }}
      />
      
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75 p-4">
          <div 
            ref={popupRef}
            className="relative max-w-4xl max-h-[90vh] overflow-auto bg-white rounded-lg shadow-xl"
          >
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-2 right-2 w-8 h-8 flex items-center justify-center rounded-full bg-white bg-opacity-75 hover:bg-opacity-100 text-gray-800 transition-colors"
              aria-label="Close"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
            <div className="p-2">
              <Image 
                src={src} 
                alt={alt} 
                className="max-w-full max-h-[80vh] object-contain"
                width={1000}
                height={800}
                style={{ objectFit: 'contain', width: 'auto', height: 'auto' }}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ImagePopup;
