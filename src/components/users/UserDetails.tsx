"use client";

import React, { useState } from 'react';
import { User, KYCStatus } from '@/types/users';
import ImagePopup from '@/components/ui/ImagePopup';

interface UserDetailsProps {
  user: User | null;
}

interface TabProps {
  label: string;
  active: boolean;
  onClick: () => void;
}

const Tab: React.FC<TabProps> = ({ label, active, onClick }) => {
  return (
    <button
      className={`px-4 py-2 text-sm font-medium ${active ? 'text-purple-600 border-b-2 border-purple-600' : 'text-gray-500 hover:text-gray-700'}`}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

interface DocumentItemProps {
  title: string;
  lastUpdated: string;
  imageSrc: string;
  versoImageSrc?: string;
  onStatusChange?: (title: string, status: 'Approved' | 'Rejected', reason?: string) => void;
}

const DocumentItem: React.FC<DocumentItemProps> = ({ title, lastUpdated, imageSrc, versoImageSrc, onStatusChange }) => {
  const [status, setStatus] = useState<'Pending' | 'Approved' | 'Rejected'>('Pending');
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [rejectionReason, setRejectionReason] = useState('');
  const [statusUpdateTime, setStatusUpdateTime] = useState(lastUpdated);
  
  const handleApprove = () => {
    setStatus('Approved');
    const currentDate = new Date().toLocaleDateString();
    setStatusUpdateTime(`Approved on ${currentDate}`);
    if (onStatusChange) {
      onStatusChange(title, 'Approved');
    }
  };
  
  const handleReject = () => {
    setShowRejectModal(true);
  };
  
  const submitRejection = () => {
    setStatus('Rejected');
    setShowRejectModal(false);
    const currentDate = new Date().toLocaleDateString();
    setStatusUpdateTime(`Rejected on ${currentDate}`);
    if (onStatusChange) {
      onStatusChange(title, 'Rejected', rejectionReason);
    }
  };
  
  const cancelRejection = () => {
    setShowRejectModal(false);
    setRejectionReason('');
  };
  
  return (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-sm font-medium text-gray-900">{title}</h3>
        <span className={`text-xs ${status === 'Approved' ? 'text-green-600' : status === 'Rejected' ? 'text-red-500' : 'text-gray-500'}`}>
          {status === 'Pending' ? `Last updated: ${lastUpdated}` : statusUpdateTime}
        </span>
      </div>
      <div className="mb-2">
        <div className={`bg-gray-100 rounded-md p-2 ${versoImageSrc ? 'flex gap-4' : ''}` }>
          <div className="w-32 h-24 flex items-center justify-center">
            <ImagePopup src={imageSrc} alt={`${title} front`} className="max-w-full max-h-full object-contain" />
          </div>
          {versoImageSrc && (
            <div className="w-32 h-24 flex items-center justify-center">
              <ImagePopup src={versoImageSrc} alt={`${title} back`} className="max-w-full max-h-full object-contain" />
            </div>
          )}
        </div>
      </div>
      
      {status === 'Pending' ? (
        <div className="flex items-center gap-4">
          <button 
            className="flex items-center text-green-600 text-xs font-medium"
            onClick={handleApprove}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1">
              <path d="M20 6L9 17l-5-5"></path>
            </svg>
            Approve
          </button>
          <button 
            className="flex items-center text-red-500 text-xs font-medium"
            onClick={handleReject}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
            Reject
          </button>
        </div>
      ) : (
        <div className="flex items-center gap-2">
          {status === 'Approved' ? (
            <span className="text-green-600 text-xs font-medium flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1">
                <path d="M20 6L9 17l-5-5"></path>
              </svg>
              Approved
            </span>
          ) : (
            <span className="text-red-500 text-xs font-medium flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
              Rejected
            </span>
          )}
        </div>
      )}
      
      {/* Reject Modal */}
      {showRejectModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center" style={{ backgroundColor: 'rgba(0, 0, 0, 0.1)' }}>
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md mx-4">
            <div className="p-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">Reject {title}</h3>
            </div>
            <div className="p-4">
              <p className="text-sm text-gray-600 mb-4">
                Please provide a reason for rejecting this KYC submission. The user will be notified and prompted to make corrections.
              </p>
              <textarea
                className="w-full p-2 border border-gray-300 rounded-md text-sm mb-4"
                rows={4}
                placeholder="Enter rejection reason"
                value={rejectionReason}
                onChange={(e) => setRejectionReason(e.target.value)}
              />
            </div>
            <div className="p-4 border-t border-gray-200 flex justify-end space-x-2">
              <button
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                onClick={cancelRejection}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 text-sm font-medium text-white bg-purple-600 rounded-md hover:bg-purple-700"
                onClick={submitRejection}
                disabled={!rejectionReason.trim()}
              >
                Reject
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const UserDetails: React.FC<UserDetailsProps> = ({ user }) => {
  const [activeTab, setActiveTab] = useState<'Details' | 'Uploaded Documents'>('Details');
  const [verificationStatus, setVerificationStatus] = useState(user?.kycStatus || 'Pending');
  const [documentStatuses, setDocumentStatuses] = useState<{
    [key: string]: { status: 'Pending' | 'Approved' | 'Rejected'; reason?: string }
  }>({});
  const [hasChanges, setHasChanges] = useState(false);
  
  const getStatusBadge = (status: string) => {
    const styles = {
      'Approved': 'text-green-600',
      'Pending': 'text-amber-500',
      'Rejected': 'text-red-500',
      'Not initiated': 'text-gray-500',
    };
    
    const statusKey = status as keyof typeof styles;
    const badgeStyle = styles[statusKey] || styles['Pending'];
    
    return (
      <div className="inline-flex items-center">
        <span className={`inline-flex items-center ${badgeStyle}`}>
          <span className="w-1.5 h-1.5 rounded-full mr-1.5 bg-current"></span>
          <span className="text-xs font-medium capitalize">{status}</span>
        </span>
      </div>
    );
  };
  
  const handleSaveChanges = () => {
    console.log('Saving verification status:', verificationStatus);
    console.log('Document statuses:', documentStatuses);
    // Here you would typically make an API call to update the user's status and document statuses
    setHasChanges(false);
    
    // Show success message
    alert('Changes saved successfully!');
  };
  
  const handleDocumentStatusChange = (title: string, status: 'Approved' | 'Rejected', reason?: string) => {
    setDocumentStatuses(prev => ({
      ...prev,
      [title]: { status, reason }
    }));
    setHasChanges(true);
  };
  
  if (!user) {
    return (
      <div className="border border-gray-100 rounded-lg shadow-sm bg-white p-6">
        <p className="text-gray-500 text-center">Select a user to view details</p>
      </div>
    );
  }

  return (
    <div className="border border-gray-100 rounded-lg shadow-sm bg-white">
      {/* Tabs */}
      <div className="border-b border-gray-200">
        <div className="flex">
          <Tab 
            label="Details" 
            active={activeTab === 'Details'} 
            onClick={() => setActiveTab('Details')} 
          />
          <Tab 
            label="Uploaded Documents" 
            active={activeTab === 'Uploaded Documents'} 
            onClick={() => setActiveTab('Uploaded Documents')} 
          />
        </div>
      </div>
      
      {activeTab === 'Details' ? (
        <div className="p-6">
          <div className="flex items-center mb-4">
            <h2 className="text-lg font-semibold text-black">ID #{user.id}</h2>
            <div className="ml-2">
              {getStatusBadge(user.kycStatus)}
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex flex-col space-y-1">
              <span className="text-sm text-gray-600">Date Joined: {user.dateJoined}</span>
              <span className="text-sm text-gray-600">Total Transactions: {user.totalTransactions}</span>
            </div>
            
            <div className="grid grid-cols-1 gap-4 mt-6">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">First name</span>
                <span className="text-sm text-black font-medium">{user.firstName}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Last name</span>
                <span className="text-sm text-black font-medium">{user.lastName}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Phone number</span>
                <div className="flex items-center">
                  <div className="w-5 h-5 mr-1 flex items-center justify-center bg-amber-500 rounded-full">
                    <span className="text-white text-xs">+</span>
                  </div>
                  <span className="text-sm text-black font-medium">{user.phoneNumber}</span>
                </div>
              </div>
              
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Email address</span>
                <span className="text-sm text-black font-medium">{user.emailAddress}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">DOB</span>
                <span className="text-sm text-black font-medium">{user.dob}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Country</span>
                <span className="text-sm text-black font-medium">{user.country}</span>
              </div>
            </div>
            
            <div className="flex justify-between mt-2">
              <span className="text-sm text-gray-600">Home Address</span>
              <span className="text-sm text-black font-medium text-right max-w-[60%]">{user.homeAddress}</span>
            </div>
          </div>
          
          <div className="mt-8">
            <h3 className="text-sm font-medium text-gray-900 mb-4">Update verification status</h3>
            <select 
              className="w-full p-2 border border-gray-300 rounded-md text-sm mb-4"
              value={verificationStatus}
              onChange={(e) => setVerificationStatus(e.target.value as KYCStatus)}
            >
              <option value="Pending">Pending</option>
              <option value="Approved">Approved</option>
              <option value="Rejected">Rejected</option>
              <option value="Not initiated">Not initiated</option>
            </select>
            
            <div className="flex justify-end">
              <button 
                className="bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-md transition-colors text-sm"
                onClick={handleSaveChanges}
              >
                Save changes
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="p-6">
          <DocumentItem 
            title="Utility bill" 
            lastUpdated="1/1/2024" 
            imageSrc="/utility_bill.jpeg" 
            onStatusChange={handleDocumentStatusChange} 
          />
          
          <DocumentItem 
            title="ID proof" 
            lastUpdated="1/1/2024" 
            imageSrc="/sample_recto.png"
            versoImageSrc="/sample_verso.png" 
            onStatusChange={handleDocumentStatusChange} 
          />
          
          <DocumentItem 
            title="Selfie" 
            lastUpdated="1/1/2024" 
            imageSrc="/selfie.jpeg" 
            onStatusChange={handleDocumentStatusChange} 
          />
          
          <div className="flex justify-between items-center mt-8">
            <div className="flex items-center gap-2">
              <button className="px-3 py-1 border border-gray-300 rounded-md text-sm text-gray-700">
                Previous
              </button>
              <div className="flex items-center gap-1 mx-2">
                <span className="text-sm">1</span>
                <span className="text-sm text-gray-500">Of 20</span>
              </div>
              <button className="px-3 py-1 border border-gray-300 rounded-md text-sm text-gray-700">
                Next
              </button>
            </div>
            
            <button 
              className={`${hasChanges ? 'bg-purple-600 hover:bg-purple-700' : 'bg-gray-400 cursor-not-allowed'} text-white py-2 px-4 rounded-md transition-colors text-sm`}
              onClick={handleSaveChanges}
              disabled={!hasChanges}
            >
              Save changes
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserDetails;
