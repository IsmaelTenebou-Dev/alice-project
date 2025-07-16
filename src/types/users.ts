export type KYCStatus = 'Approved' | 'Pending' | 'Rejected' | 'Not initiated';

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  emailAddress: string;
  dob: string;
  country: string;
  homeAddress: string;
  dateJoined: string;
  totalTransactions: number;
  kycStatus: KYCStatus;
}

export interface KYCStats {
  submitted: number;
  approved: number;
  pending: number;
  rejected: number;
  notInitiated: number;
}
