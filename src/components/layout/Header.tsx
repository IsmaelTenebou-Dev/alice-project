import React from 'react';

interface HeaderProps {
  title: string;
}

const Header: React.FC<HeaderProps> = ({ title }) => {
  return (
    <header className="px-8 py-5 flex justify-between items-center border-b border-gray-100 bg-white">
      <h1 className="text-xl font-semibold text-gray-900">{title}</h1>
      
      <div className="flex items-center gap-4">
        {/* Search Icon */}
        <button className="text-gray-500 hover:text-gray-700 transition-colors p-1">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
        </button>

        {/* Notification Icon */}
        <button className="text-gray-500 hover:text-gray-700 transition-colors relative p-1">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
            <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
          </svg>
          <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>

        <div className="flex items-center gap-3 border-l border-gray-100 pl-4 ml-2">
          <div className="w-9 h-9 rounded-full bg-[#7C3AED] grid place-items-center">
            <span className="text-sm font-medium text-white">JD</span>
          </div>
          <div className="text-sm">
            <p className="font-medium text-gray-800">John Doe</p>
            <p className="text-gray-500 text-xs">Admin</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
