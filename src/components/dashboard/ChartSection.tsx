"use client";

import React from 'react';
import BarChart from '../charts/BarChart';
import LineChart from '../charts/LineChart';

interface ChartSectionProps {
  revenueData: {
    day: string;
    value: number;
  }[];
  transactionData: {
    day: string;
    value: number;
  }[];
  revenueAmount: string;
  transactionAmount: string;
  highlightDate?: string;
  highlightValue?: string;
}

const ChartSection: React.FC<ChartSectionProps> = ({
  revenueData,
  transactionData,
  revenueAmount = "$23,078.56", // Default value from image
  transactionAmount,
  highlightDate = "June 28, 2024", // Default value from image
  highlightValue = "$1512.67" // Default value from image
}) => {
  const maxRevenueValue = Math.max(...revenueData.map(d => d.value));
  const maxTransactionValue = Math.max(...transactionData.map(d => d.value));
  
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
      {/* Revenue Chart */}
      <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-card">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h3 className="text-sm text-gray-600 font-medium">Revenue Growth</h3>
            <p className="text-2xl font-semibold mt-1 text-gray-900">{revenueAmount}</p>
          </div>
          <div className="flex items-center">
            <button className="text-sm text-gray-600 flex items-center border border-gray-200 rounded-full px-4 py-1.5 hover:bg-gray-50 transition-colors">
              Last 7 days <svg className="ml-1.5 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
            </button>
          </div>
        </div>
        
        <div className="h-64">
          <BarChart 
            data={revenueData}
            maxValue={maxRevenueValue}
            highlightIndex={4} // Friday (index 4) is highlighted in the image
            highlightDate={highlightDate}
            highlightValue={highlightValue}
          />
        </div>
      </div>
      
      {/* Transactions Chart */}
      <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-card">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h3 className="text-sm text-gray-600">Transactions</h3>
            <p className="text-xl font-semibold mt-1 text-gray-900">{transactionAmount}</p>
          </div>
          <div className="flex items-center">
            <button className="text-sm text-gray-600 flex items-center border border-gray-200 rounded-full px-3 py-1 hover:bg-gray-50 transition-colors">
              Last 7 days <svg className="ml-1.5 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
            </button>
          </div>
        </div>
        
        <div className="h-64">
          <LineChart 
            data={transactionData}
            maxValue={maxTransactionValue}
          />
        </div>
      </div>
    </div>
  );
};

export default ChartSection;
