"use client";

import React, { useState } from 'react';
import { Transaction } from '@/types/dashboard';
import TransactionTable from '@/components/transactions/TransactionTable';
import DateRangePicker from '@/components/ui/DateRangePicker';

// Mock data for the transactions page with more entries
const mockTransactionsExtended: Transaction[] = Array(100).fill(null).map((_, index) => ({
  id: `06c1774-7f3d_90a8`,
  user: 'Riley Freeman',
  amount: 500,
  date: '01/01/2025 16:58:15',
  status: index % 3 === 0 ? 'successful' : (index % 3 === 1 ? 'pending' : 'failed')
}));

const TransactionsPageContent: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [dateRange, setDateRange] = useState<{
    startDate: string;
    endDate: string;
  }>({
    startDate: '10 Aug 2023',
    endDate: '16 Aug 2024',
  });
  
  const itemsPerPage = 10;
  const totalItems = mockTransactionsExtended.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  
  // Get current transactions
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentTransactions = mockTransactionsExtended.slice(indexOfFirstItem, indexOfLastItem);
  
  // Change page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
  
  // Handle search
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1); // Reset to first page on search
  };
  
  // Handle date range change
  const handleDateRangeChange = (startDate: string, endDate: string) => {
    setDateRange({ startDate, endDate });
    setCurrentPage(1); // Reset to first page on date change
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
      {/* Header with Export button */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-semibold text-gray-900">Transactions</h1>
        <button 
          className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md flex items-center gap-2 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
            <polyline points="7 10 12 15 17 10"></polyline>
            <line x1="12" y1="15" x2="12" y2="3"></line>
          </svg>
          Export
        </button>
      </div>
      
      {/* Filters */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        {/* Search */}
        <div className="relative w-full sm:w-auto">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg className="w-4 h-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
            </svg>
          </div>
          <input 
            type="search" 
            className="block w-full sm:w-64 p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-white focus:ring-purple-500 focus:border-purple-500" 
            placeholder="Search" 
            value={searchQuery}
            onChange={handleSearch}
          />
        </div>
        
        {/* Date Range Picker */}
        <DateRangePicker 
          startDate={dateRange.startDate} 
          endDate={dateRange.endDate} 
          onChange={handleDateRangeChange} 
        />
      </div>
      
      {/* Transactions Table */}
      <TransactionTable transactions={currentTransactions} />
      
      {/* Pagination */}
      <div className="flex flex-col sm:flex-row justify-between items-center mt-6 text-sm">
        <div className="mb-4 sm:mb-0">
          <span className="text-gray-600">
            {indexOfFirstItem + 1}-{Math.min(indexOfLastItem, totalItems)} of {totalItems} items
          </span>
        </div>
        
        <div className="flex items-center gap-2">
          <span className="text-gray-600 mr-2">Items per page:</span>
          <select 
            className="border border-gray-300 rounded p-1 text-sm"
            defaultValue="10"
          >
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="50">50</option>
          </select>
          
          <div className="flex items-center ml-4">
            <button 
              onClick={() => paginate(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className={`px-3 py-1 rounded-md ${currentPage === 1 ? 'text-gray-400 cursor-not-allowed' : 'text-gray-700 hover:bg-gray-100'}`}
            >
              Previous
            </button>
            
            <div className="mx-2 px-3 py-1">
              <span className="font-medium">{currentPage}</span>
              <span className="mx-1">of</span>
              <span>{totalPages}</span>
            </div>
            
            <button 
              onClick={() => paginate(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className={`px-3 py-1 rounded-md ${currentPage === totalPages ? 'text-gray-400 cursor-not-allowed' : 'text-gray-700 hover:bg-gray-100'}`}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionsPageContent;
