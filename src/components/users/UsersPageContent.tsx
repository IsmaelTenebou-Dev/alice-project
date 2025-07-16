"use client";

import React, { useState } from 'react';
import { User, KYCStats } from '@/types/users';
import UserTable from '@/components/users/UserTable';
import UserDetails from '@/components/users/UserDetails';

// Mock data for the users page
const mockUsers: User[] = Array(20).fill(null).map((_, index) => ({
  id: `user-${index + 1000}`, // Generate unique IDs
  firstName: 'Riley',
  lastName: 'Freeman',
  phoneNumber: '+237 912345678',
  emailAddress: 'rileyfree@gmail.com',
  dob: 'March 24, 1983',
  country: 'Cameroon',
  homeAddress: 'No 45A, Riverpark estate close to finestone',
  dateJoined: '26/11/24',
  totalTransactions: 24,
  kycStatus: index % 4 === 0 ? 'Approved' : 
             index % 4 === 1 ? 'Pending' : 
             index % 4 === 2 ? 'Approved' : 'Rejected'
})) as User[];

// Mock KYC stats
const mockKYCStats: KYCStats = {
  submitted: 4800,
  approved: 2000,
  pending: 98,
  rejected: 12,
  notInitiated: 180
};

const UsersPageContent: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  
  const itemsPerPage = 10;
  const totalItems = mockUsers.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  
  // Get current users
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentUsers = mockUsers.slice(indexOfFirstItem, indexOfLastItem);
  
  // Change page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
  
  // Handle search
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1); // Reset to first page on search
  };

  // Handle user selection
  const handleSelectUser = (user: User) => {
    setSelectedUser(user);
  };

  return (
    <div className="bg-white p-4 sm:p-6 rounded-lg shadow-sm border border-gray-100">
      {/* Header with Export button */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h1 className="text-xl font-semibold text-gray-900">Users</h1>
          <p className="text-sm text-gray-600 mt-1">Total users: {mockKYCStats.submitted + mockKYCStats.notInitiated}</p>
        </div>
        <button 
          className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md flex items-center gap-2 transition-colors w-full sm:w-auto justify-center sm:justify-start"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
            <polyline points="7 10 12 15 17 10"></polyline>
            <line x1="12" y1="15" x2="12" y2="3"></line>
          </svg>
          Export
        </button>
      </div>
      
      {/* KYC Stats */}
      <div className="flex flex-wrap gap-2 sm:gap-4 mb-6 overflow-x-auto pb-2">
        <div className="px-3 sm:px-4 py-2 bg-gray-50 rounded-md">
          <span className="text-sm font-medium text-gray-800 mr-1">{mockKYCStats.submitted}</span>
          <span className="text-sm text-gray-600">Submitted kyc</span>
        </div>
        <div className="px-3 sm:px-4 py-2 bg-gray-50 rounded-md">
          <span className="text-sm font-medium text-gray-800 mr-1">{mockKYCStats.approved}</span>
          <span className="text-sm text-gray-600">Approved kyc</span>
        </div>
        <div className="px-3 sm:px-4 py-2 bg-gray-50 rounded-md">
          <span className="text-sm font-medium text-gray-800 mr-1">{mockKYCStats.pending}</span>
          <span className="text-sm text-gray-600">Pending kyc</span>
        </div>
        <div className="px-3 sm:px-4 py-2 bg-gray-50 rounded-md">
          <span className="text-sm font-medium text-gray-800 mr-1">{mockKYCStats.rejected}</span>
          <span className="text-sm text-gray-600">Rejected kyc</span>
        </div>
        <div className="px-3 sm:px-4 py-2 bg-gray-50 rounded-md">
          <span className="text-sm font-medium text-gray-800 mr-1">{mockKYCStats.notInitiated}</span>
          <span className="text-sm text-gray-600">Kyc not initiated</span>
        </div>
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
        
        {/* Filter Button */}
        <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-sm">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
          </svg>
          Filter
        </button>
      </div>
      
      {/* Responsive grid layout - stacked on mobile, side-by-side on larger screens */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6">
        {/* Users Table - Takes up 5/12 on large screens */}
        <div className="lg:col-span-5 overflow-hidden order-2 lg:order-1">
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
            <UserTable 
              users={currentUsers} 
              onSelectUser={handleSelectUser}
              selectedUserId={selectedUser?.id}
            />
          </div>
          
          {/* Pagination */}
          <div className="flex items-center justify-between mt-4 sm:mt-6 text-sm">
            <button 
              onClick={() => paginate(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className={`px-2 sm:px-3 py-1 rounded-md ${currentPage === 1 ? 'text-gray-400 cursor-not-allowed' : 'text-gray-700 hover:bg-gray-100'}`}
            >
              Previous
            </button>
            
            <div className="mx-1 sm:mx-2 px-2 sm:px-3 py-1">
              <span className="font-medium">{currentPage}</span>
              <span className="mx-1">of</span>
              <span>{totalPages}</span>
            </div>
            
            <button 
              onClick={() => paginate(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className={`px-2 sm:px-3 py-1 rounded-md ${currentPage === totalPages ? 'text-gray-400 cursor-not-allowed' : 'text-gray-700 hover:bg-gray-100'}`}
            >
              Next
            </button>
          </div>
        </div>
        
        {/* User Details - Takes up 7/12 on large screens */}
        <div className="lg:col-span-7 order-1 lg:order-2 mb-4 lg:mb-0">
          <UserDetails user={selectedUser} />
        </div>
      </div>
    </div>
  );
};

export default UsersPageContent;
