import React from 'react';
import StatsCard from '../ui/StatsCard';

interface StatsOverviewProps {
  stats: {
    totalTransactions: string;
    totalRevenue: string;
    activeUsers: number;
    pendingKYCs: number;
    transactionTrend: string;
    revenueTrend: string;
    usersTrend: string;
  };
}

const StatsOverview: React.FC<StatsOverviewProps> = ({ stats }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
      <StatsCard 
        title="Total Transaction" 
        value={stats.totalTransactions}
        trend={{ value: stats.transactionTrend, positive: true }}
      />
      <StatsCard 
        title="Total Revenue" 
        value={stats.totalRevenue}
        trend={{ value: stats.revenueTrend, positive: false }}
      />
      <StatsCard 
        title="Active users" 
        value={stats.activeUsers}
        trend={{ value: stats.usersTrend, positive: true }}
      />
      <StatsCard 
        title="Pending KYCs" 
        value={stats.pendingKYCs}
        viewAllLink="/dashboard/kyc"
      />
    </div>
  );
};

export default StatsOverview;
