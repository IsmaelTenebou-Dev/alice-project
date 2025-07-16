import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import TransactionsPageContent from '@/components/transactions/TransactionsPageContent';

export default function TransactionsPage() {
  return (
    <DashboardLayout title="Transactions">
      <div className="max-w-[1200px] mx-auto">
        <TransactionsPageContent />
      </div>
    </DashboardLayout>
  );
}
