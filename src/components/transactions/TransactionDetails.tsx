"use client";

import React from 'react';
import Link from 'next/link';

interface TransactionDetailsProps {
  transactionId: string;
}

const TransactionDetails: React.FC<TransactionDetailsProps> = ({ transactionId }) => {
  // This would typically fetch the transaction data based on the ID
  // For now, we'll use mock data that matches the image
  const transactionData = {
    id: transactionId || '06C12594838FE',
    sessionId: 'BCIRYBSI49JDKFKSO90',
    status: 'successful',
    amount: 230.00,
    user: 'Riley Freeman',
    dateTime: '3/12/2024 16:56:08',
    amountTendered: '$230.00',
    recipientReceived: 'FCFA 1234',
    exchangeRate: '$1 = FCFA 123',
    fee: '$1',
    paymentChannel: 'Mobile money',
    accountName: 'CHIKAM NDO',
    accountNumber: '912345678',
    paymentMethod: 'Mastercard',
    cardType: 'Mastercard debit card',
    cardHolder: 'Jane doe',
    cardNumber: '12345******7890',
    expiryDate: '01/2024',
    fundingSource: 'DEBIT',
    issuerName: 'SD BANK',
    issuerCountry: 'Malaysia',
    auditTrail: [
      { date: '3/12/2024 16:56:08', event: 'Transaction initiated' },
      { date: '3/12/2024 16:56:08', event: 'Status changed:', status: 'pending' },
      { date: '3/12/2024 16:56:08', event: 'Status changed:', status: 'completed' },
    ]
  };

  const getStatusBadge = (status: string) => {
    const styles = {
      successful: 'text-green-600 bg-green-50',
      pending: 'text-amber-500 bg-amber-50',
      failed: 'text-red-500 bg-red-50',
      completed: 'text-green-600 bg-green-50',
    };
    
    const currentStatus = status.toLowerCase();
    const badgeStyle = styles[currentStatus as keyof typeof styles] || styles.pending;
    
    return (
      <div className="inline-flex items-center">
        <span className={`inline-flex items-center px-2 py-1 rounded-full ${badgeStyle}`}>
          <span className="w-1.5 h-1.5 rounded-full mr-1.5 bg-current"></span>
          <span className="text-xs font-medium capitalize">{currentStatus}</span>
        </span>
      </div>
    );
  };

  return (
    <div>
      {/* Back button header */}
      <div className="mb-4">
        <Link 
          href="/dashboard/transactions" 
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
          Transaction ID {transactionData.id}
        </Link>
      </div>
      
      <div className="bg-white rounded-lg shadow-sm border border-gray-100">

      {/* Transaction Details and Session ID */}
      <div className="px-5 py-4 flex justify-between items-center border-b border-gray-100">
        <h2 className="text-base font-semibold text-gray-900">Transaction Details</h2>
        <div className="text-sm text-gray-600">
          <span className="font-medium">Session ID</span> {transactionData.sessionId}
        </div>
      </div>

      {/* Status and Amount */}
      <div className="px-5 py-4 border-b border-gray-100">
        <div className="mb-1">
          <span className="text-sm font-medium text-gray-700">Status</span>
          <div className="mt-1">{getStatusBadge(transactionData.status)}</div>
        </div>
        <div className="mt-3">
          <span className="text-3xl font-bold text-black">${transactionData.amount.toFixed(2)}</span>
        </div>
      </div>

      {/* Payment Details, Recipient Details and Card Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-5 py-4">
        {/* Left Column: Payment Details and Recipient Details */}
        <div className="pr-4">
          {/* Payment Details */}
          <div className="border border-gray-100 rounded-lg p-4 mb-6 shadow-sm">
            <h3 className="text-base font-semibold text-black mb-4">Payment Details</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">User</span>
                <span className="text-sm text-black font-semibold">{transactionData.user}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Date/Time</span>
                <span className="text-sm text-black font-semibold">{transactionData.dateTime}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Amount tendered</span>
                <span className="text-sm text-black font-semibold">{transactionData.amountTendered}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Recipient received</span>
                <span className="text-sm text-black font-semibold">{transactionData.recipientReceived}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Exchange rate</span>
                <span className="text-sm text-black font-semibold">{transactionData.exchangeRate}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Fee</span>
                <span className="text-sm text-black font-semibold">{transactionData.fee}</span>
              </div>
            </div>
          </div>
          
          {/* Recipient Details */}
          <div className="border border-gray-100 rounded-lg p-4 shadow-sm">
            <h3 className="text-base font-semibold text-black mb-4">Recipient Details</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Payment channel</span>
                <span className="text-sm text-black font-semibold">{transactionData.paymentChannel}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Account name</span>
                <span className="text-sm text-black font-semibold">{transactionData.accountName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Account number</span>
                <span className="text-sm text-black font-semibold">{transactionData.accountNumber}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Card Details */}
        <div className="border border-gray-100 rounded-lg p-4 shadow-sm pl-2">
          <h3 className="text-base font-semibold text-black mb-4">Card Details</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Payment method</span>
              <div className="flex items-center">
                <div className="w-6 h-6 mr-2">
                  <svg viewBox="0 0 36 24" xmlns="http://www.w3.org/2000/svg" role="img" width="24" height="16" aria-labelledby="pi-mastercard">
                    <title id="pi-mastercard">Mastercard</title>
                    <path opacity=".07" d="M35 0H1C.45 0 0 .45 0 1v22c0 .55.45 1 1 1h34c.55 0 1-.45 1-1V1c0-.55-.45-1-1-1z"></path>
                    <path fill="#fff" d="M35 1c0-.55-.45-1-1-1H2c-.55 0-1 .45-1 1v22c0 .55.45 1 1 1h32c.55 0 1-.45 1-1V1z"></path>
                    <circle fill="#EB001B" cx="15" cy="12" r="7"></circle>
                    <circle fill="#F79E1B" cx="23" cy="12" r="7"></circle>
                    <path fill="#FF5F00" d="M22 12c0-2.4-1.2-4.5-3-5.7-1.8 1.3-3 3.4-3 5.7s1.2 4.5 3 5.7c1.8-1.2 3-3.3 3-5.7z"></path>
                  </svg>
                </div>
                <span className="text-sm text-black font-semibold">{transactionData.paymentMethod}</span>
              </div>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Card type</span>
              <span className="text-sm text-black font-semibold">{transactionData.cardType}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Card holder</span>
              <span className="text-sm text-black font-semibold">{transactionData.cardHolder}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Card number</span>
              <span className="text-sm text-black font-semibold">{transactionData.cardNumber}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Expiry date</span>
              <span className="text-sm text-black font-semibold">{transactionData.expiryDate}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Funding source</span>
              <span className="text-sm text-black font-semibold">{transactionData.fundingSource}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Issuer name</span>
              <span className="text-sm text-black font-semibold">{transactionData.issuerName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Issuer country/region</span>
              <span className="text-sm text-black font-semibold">{transactionData.issuerCountry}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Transaction Audit */}
      <div className="px-5 py-4 border-t border-gray-100 mt-6">
        <h3 className="text-base font-semibold text-black mb-4">Transaction Audit</h3>
        <div className="border border-gray-100 rounded-lg p-4 shadow-sm">
          <div className="space-y-4">
            {transactionData.auditTrail.map((audit, index) => (
              <div key={index} className="flex">
                <div className="text-sm text-gray-600 w-32 flex-shrink-0">{audit.date}</div>
                <div className="text-sm text-black font-medium ml-8">
                  {audit.event}
                  {audit.status && (
                    <span className="ml-2">
                      {getStatusBadge(audit.status)}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Action buttons */}
      <div className="px-5 py-4 border-t border-gray-100 flex justify-center">
        <div className="flex space-x-4">
          <button className="px-6 py-2 bg-white border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors font-medium">
            Print receipt
          </button>
          <button className="px-6 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors font-medium">
            Download receipt
          </button>
        </div>
      </div>
      </div>
    </div>
  );
};

export default TransactionDetails;
