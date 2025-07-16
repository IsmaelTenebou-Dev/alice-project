export interface Referral {
  referrerId: string;
  inviteeId: string;
  dateTime: string;
  status: 'successful' | 'pending' | 'failed';
  discountAmount: number | null;
  isTopReferrer?: boolean;
}

export interface ReferralsStats {
  totalDiscountAwarded: string;
  successfulReferrals: number;
  pendingReferrals: number;
  failedReferrals: number;
}

export interface ReferralsChartData {
  months: string[];
  totalReferred: number[];
  registered: number[];
}
