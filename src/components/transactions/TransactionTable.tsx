import React from 'react';
import Link from 'next/link';
import { Transaction } from '@/types/dashboard';

interface TransactionTableProps {
  transactions: Transaction[];
}

const TransactionTable: React.FC<TransactionTableProps> = ({ transactions }) => {
  const getStatusBadge = (status: Transaction['status']) => {
    const styles = {
      successful: 'text-green-600 bg-green-50',
      pending: 'text-amber-500 bg-amber-50',
      failed: 'text-red-500 bg-red-50',
    };
    
    return (
      <div className="flex items-center">
        <span className={`inline-flex items-center px-2 py-1 rounded-full ${styles[status]}`}>
          <span className="w-1.5 h-1.5 rounded-full mr-1.5 bg-current"></span>
          <span className="text-xs font-medium capitalize">{status}</span>
        </span>
      </div>
    );
  };

  return (
    <div className="w-full overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="text-left text-sm border-b border-gray-100">
              <th className="pb-4 font-bold text-black">Transaction ID</th>
              <th className="pb-4 font-bold text-black">User</th>
              <th className="pb-4 font-bold text-black">Amount</th>
              <th className="pb-4 font-bold text-black">Date/Time</th>
              <th className="pb-4 font-bold text-black">Status</th>
              <th className="pb-4 font-bold text-black text-right">Action</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction, index) => (
              <tr 
                key={`${transaction.id}-${index}`} 
                className="text-sm border-b border-gray-100 last:border-b-0"
              >
                <td className="py-5 pr-8">
                  <div className="flex items-center gap-2 max-w-[180px]">
                    <span className="text-gray-500 flex-shrink-0">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </span>
                    <span className="text-gray-700 font-medium truncate text-sm">{transaction.id}</span>
                  </div>
                </td>
                <td className="py-5 pr-8 text-gray-700">{transaction.user}</td>
                <td className="py-5 pr-8 text-gray-700 font-medium">${transaction.amount}</td>
                <td className="py-5 pr-8 text-gray-700 whitespace-nowrap">{transaction.date}</td>
                <td className="py-5 pr-8">{getStatusBadge(transaction.status)}</td>
                <td className="py-5 text-right">
                  <Link 
                    href={`/dashboard/transactions/${transaction.id}`} 
                    className="text-sm text-gray-700 hover:text-gray-900 transition-colors border border-gray-200 rounded px-3 py-1.5"
                  >
                    View details
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TransactionTable;
