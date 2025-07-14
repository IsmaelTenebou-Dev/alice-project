import { ChartData, Transaction } from '../types/dashboard';

export const mockDashboardStats = {
  totalTransactions: '$3,400.00',
  totalRevenue: '$150,000.00',
  activeUsers: 523,
  pendingKYCs: 12,
  transactionTrend: '8%',
  revenueTrend: '6%',
  usersTrend: '8%',
};

export const mockRevenueData: ChartData[] = [
  { day: 'Mon', value: 6000 },  // 6k as requested
  { day: 'Tue', value: 15000 }, // 15k as requested
  { day: 'Wed', value: 13000 }, // 13k as requested
  { day: 'Thu', value: 8000 },  // 8k as requested
  { day: 'Fri', value: 25000 }, // 25k as requested (highlighted day)
  { day: 'Sat', value: 14000 }, // 14k as requested
  { day: 'Sun', value: 17000 }, // 17k as requested
];

export const mockTransactionData: ChartData[] = [
  { day: 'Mon', value: 2000 },
  { day: 'Tue', value: 5000 },
  { day: 'Wed', value: 7000 },
  { day: 'Thu', value: 8000 },
  { day: 'Fri', value: 20000 },
  { day: 'Sat', value: 25000 },
  { day: 'Sun', value: 28000 },
];

export const mockTransactions: Transaction[] = [
  {
    id: '06c1774-7f3d_90a8',
    user: 'Riley Freeman',
    amount: 500,
    date: '01/01/2025 16:58:15',
    status: 'successful',
  },
  {
    id: '06c1774-7f3d_90a8',
    user: 'Riley Freeman',
    amount: 500,
    date: '01/01/2025 16:58:15',
    status: 'pending',
  },
  {
    id: '06c1774-7f3d_90a8',
    user: 'Riley Freeman',
    amount: 500,
    date: '01/01/2025 16:58:15',
    status: 'failed',
  },
];
