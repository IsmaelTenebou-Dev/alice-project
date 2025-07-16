"use client";

import React, { useState, useRef, useEffect } from 'react';

interface DateRangePickerProps {
  startDate: string;
  endDate: string;
  onChange: (startDate: string, endDate: string) => void;
}

const DateRangePicker: React.FC<DateRangePickerProps> = ({ 
  startDate, 
  endDate, 
  onChange 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  // For a real implementation, we would add date selection logic here
  // This is a simplified version for the UI demonstration
  
  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full sm:w-64 px-4 py-2 text-sm text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:ring-purple-500 focus:border-purple-500"
      >
        <div className="flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
            <line x1="16" y1="2" x2="16" y2="6"></line>
            <line x1="8" y1="2" x2="8" y2="6"></line>
            <line x1="3" y1="10" x2="21" y2="10"></line>
          </svg>
          <span>{startDate} - {endDate}</span>
        </div>
        <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
        </svg>
      </button>
      
      {isOpen && (
        <div className="absolute right-0 z-10 mt-2 w-72 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="p-4">
            <div className="flex justify-between mb-4">
              <button className="text-sm font-medium text-purple-600 hover:text-purple-800">
                Last 7 days
              </button>
              <button className="text-sm font-medium text-purple-600 hover:text-purple-800">
                Last 30 days
              </button>
              <button className="text-sm font-medium text-purple-600 hover:text-purple-800">
                This month
              </button>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Start date</label>
                <input
                  type="date"
                  className="w-full p-2 text-sm border border-gray-300 rounded-md"
                  value="2023-08-10"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">End date</label>
                <input
                  type="date"
                  className="w-full p-2 text-sm border border-gray-300 rounded-md"
                  value="2024-08-16"
                />
              </div>
            </div>
            
            <div className="mt-4 flex justify-end gap-2">
              <button 
                className="px-3 py-1.5 text-sm text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                onClick={() => setIsOpen(false)}
              >
                Cancel
              </button>
              <button 
                className="px-3 py-1.5 text-sm text-white bg-purple-600 border border-purple-600 rounded-md hover:bg-purple-700"
                onClick={() => {
                  // Apply the selected date range
                  onChange(startDate, endDate);
                  setIsOpen(false);
                }}
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DateRangePicker;
