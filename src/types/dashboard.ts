export interface DashboardStats {
  totalTransactions: string;
  totalRevenue: string;
  activeUsers: number;
  pendingKYCs: number;
  transactionTrend: string;
  revenueTrend: string;
  usersTrend: string;
}

export interface ChartData {
  day: string;
  value: number;
}

export type TransactionStatus = 'successful' | 'pending' | 'failed';

export interface Transaction {
  id: string;
  user: string;
  amount: number;
  date: string;
  status: TransactionStatus;
}
