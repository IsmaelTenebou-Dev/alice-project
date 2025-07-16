import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import TransactionDetails from '@/components/transactions/TransactionDetails';


type Params = { id: string };

export default function TransactionDetailsPage({ params }: { params: Params }) {
  return (
    <DashboardLayout title={`Transaction ID ${params.id}`}>
      <div className="max-w-[1200px] mx-auto">
        <TransactionDetails transactionId={params.id} />
      </div>
    </DashboardLayout>
  );
}
