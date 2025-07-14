import React from 'react';

interface StatsCardProps {
  title: string;
  value: string | number;
  trend?: {
    value: string;
    positive?: boolean;
  };
  viewAllLink?: string;
}

const StatsCard: React.FC<StatsCardProps> = ({ title, value, trend, viewAllLink }) => {
  return (
    <div className="flex flex-col p-4 md:p-5 rounded-lg border border-gray-200 bg-white shadow-card">
      <div className="flex justify-between items-center">
        <span className="text-sm text-gray-600">{title}</span>
        {trend ? (
          <span className={`text-xs font-medium ${trend.positive ? 'text-green-600' : 'text-red-500'}`}>
            {trend.positive ? '+' : '-'}{trend.value}
          </span>
        ) : viewAllLink ? (
          <a href={viewAllLink} className="text-xs text-gray-600 hover:underline flex items-center gap-1">
            View all <span className="ml-0.5">→</span>
          </a>
        ) : null}
      </div>
      <div className="mt-2">
        <span className="text-2xl md:text-3xl font-bold text-gray-900">{value}</span>
      </div>
    </div>
  );
};

export default StatsCard;
