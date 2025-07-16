import React from 'react';
import Link from 'next/link';
import { User } from '@/types/users';

interface UserPageProps {
  params: {
    id: string;
  };
}

// This would normally fetch user data from an API
const getUserById = (id: string): User => {
  return {
    id: id,
    firstName: 'Riley',
    lastName: 'Freeman',
    phoneNumber: '+237 912345678',
    emailAddress: 'rileyfree@gmail.com',
    dob: 'March 24, 1983',
    country: 'Cameroon',
    homeAddress: 'No 45A, Riverpark estate close to finestone',
    dateJoined: '26/11/24',
    totalTransactions: 24,
    kycStatus: 'Approved'
  };
};

export default function UserPage({ params }: UserPageProps) {
  const user = getUserById(params.id);
  
  const getStatusBadge = (status: string) => {
    const styles = {
      'Approved': 'text-green-600 bg-green-50',
      'Pending': 'text-amber-500 bg-amber-50',
      'Rejected': 'text-red-500 bg-red-50',
      'Not initiated': 'text-gray-500 bg-gray-50',
    };
    
    const statusKey = status as keyof typeof styles;
    const badgeStyle = styles[statusKey] || styles['Pending'];
    
    return (
      <div className="inline-flex items-center">
        <span className={`inline-flex items-center px-2 py-1 rounded-full ${badgeStyle}`}>
          <span className="w-1.5 h-1.5 rounded-full mr-1.5 bg-current"></span>
          <span className="text-xs font-medium capitalize">{status}</span>
        </span>
      </div>
    );
  };

  return (
    <div className="p-6">
      {/* Back button header */}
      <div className="mb-4">
        <Link 
          href="/dashboard/users" 
          className="inline-flex items-center text-gray-700 hover:text-gray-900 transition-colors"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="20" 
            height="20" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
            className="mr-2"
          >
            <path d="M19 12H5"></path>
            <path d="M12 19l-7-7 7-7"></path>
          </svg>
          Back to Users
        </Link>
      </div>
      
      <div className="bg-white rounded-lg shadow-sm border border-gray-100">
        <div className="p-6">
          <div className="flex items-center mb-4">
            <h2 className="text-lg font-semibold text-black">User ID #{user.id}</h2>
            <div className="ml-2">
              {getStatusBadge(user.kycStatus)}
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="flex flex-col space-y-1">
              <span className="text-sm text-gray-600">Date Joined: {user.dateJoined}</span>
              <span className="text-sm text-gray-600">Total Transactions: {user.totalTransactions}</span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <div className="border border-gray-100 rounded-lg p-4 shadow-sm">
                <h3 className="text-base font-semibold text-black mb-4">Personal Information</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">First name</span>
                    <span className="text-sm text-black">{user.firstName}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Last name</span>
                    <span className="text-sm text-black">{user.lastName}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">DOB</span>
                    <span className="text-sm text-black">{user.dob}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Country</span>
                    <span className="text-sm text-black">{user.country}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Home Address</span>
                    <span className="text-sm text-black text-right max-w-[60%]">{user.homeAddress}</span>
                  </div>
                </div>
              </div>
              
              <div className="border border-gray-100 rounded-lg p-4 shadow-sm">
                <h3 className="text-base font-semibold text-black mb-4">Contact Information</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Phone number</span>
                    <div className="flex items-center">
                      <div className="w-5 h-5 mr-1 flex items-center justify-center bg-amber-500 rounded-full">
                        <span className="text-white text-xs">+</span>
                      </div>
                      <span className="text-sm text-black">{user.phoneNumber}</span>
                    </div>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Email address</span>
                    <span className="text-sm text-black">{user.emailAddress}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-8 border border-gray-100 rounded-lg p-4 shadow-sm">
            <h3 className="text-base font-semibold text-black mb-4">Verification Status</h3>
            <div className="flex items-center">
              <span className="text-sm text-gray-600 mr-2">Current status:</span>
              {getStatusBadge(user.kycStatus)}
            </div>
            
            <div className="mt-4">
              <h4 className="text-sm font-medium text-gray-700 mb-2">Update verification status</h4>
              <select 
                className="w-full p-2 border border-gray-300 rounded-md text-sm"
                defaultValue={user.kycStatus}
              >
                <option value="Pending">Pending</option>
                <option value="Approved">Approved</option>
                <option value="Rejected">Rejected</option>
                <option value="Not initiated">Not initiated</option>
              </select>
              
              <button 
                className="mt-4 bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-md transition-colors"
              >
                Save changes
              </button>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-100 p-6">
          <h3 className="text-base font-semibold text-black mb-4">Uploaded Documents</h3>
          <div className="border border-gray-100 rounded-lg p-4 shadow-sm">
            <p className="text-sm text-gray-500">No documents uploaded yet.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
