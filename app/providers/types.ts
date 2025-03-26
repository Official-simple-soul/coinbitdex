export interface UserData {
  uid: string;
  email: string;
  firstName?: string;
  lastName?: string;
  country?: string;
  phone?: string;
  balance?: number;
  copy_trading_balance?: number;
  referral_id?: string;
  kyc_level?: number;
  kyc_status?: string;
  avatar_url?: string;
  referral_earn?: number;
  total_deposit?: number;
  total_withdraw?: number;
  copy_trading_profit?: number;
  total_profit?: number;
  password?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface DepositData {
  amount?: number;
  type?: string;
  status?: string;
  transactionId?: string;
  paymentScreenshot?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface RecordData {
  type?: string;
  amount?: number;
  transactionType?: string;
  description?: string;
  status?: string;
  transactionId?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface KYCData {
  card_type?: string;
  country?: string;
  document?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
