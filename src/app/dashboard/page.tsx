import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import StatsOverview from '@/components/dashboard/StatsOverview';
import ChartSection from '@/components/dashboard/ChartSection';
import TransactionTable from '@/components/dashboard/TransactionTable';
import { 
  mockDashboardStats, 
  mockRevenueData, 
  mockTransactionData,
  mockTransactions 
} from '@/lib/mock-data';

export default function DashboardPage() {
  return (
    <DashboardLayout title="Admin Dashboard">
      <div className="max-w-[1200px] mx-auto">
        {/* Stats Overview */}
        <StatsOverview stats={mockDashboardStats} />
        
        {/* Chart Section */}
        <ChartSection
          revenueData={mockRevenueData}
          transactionData={mockTransactionData}
          revenueAmount="$23,078.56"
          transactionAmount="$23,078.56"
          highlightDate="June 28, 2024"
          highlightValue="$1512.67"
        />
        
        {/* Recent Transactions */}
        <div className="mt-8 bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <TransactionTable transactions={mockTransactions} />
        </div>
      </div>
    </DashboardLayout>
  );
}
