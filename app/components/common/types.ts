export interface CryptoData {
  name: string;
  logo_url: string;
  currency_symbol: string;
  inst_price_usd: number;
  change_percent_1d: string;
  change_percent_7d_color: string;
  id: string;
  inst_market_cap_plain: string;
  circulating_supply_plain: string;
  volume_24h_usd_plain: string;
  change_percent_1d_color: string;
}

export interface CryptoCardProps {
  symbol: string;
  name: string;
  price: string;
  change: string;
  changeDirection: string;
}

export interface TransactionDataCompProps {
  active: number;
  tradeHistoryItems: { id: string; [key: string]: any }[];
  setConfirmApproveWithdraw: (value: boolean) => void;
  setWithdrawData: (data: { id: string; [key: string]: any }) => void;
}

export interface summary {
  id: number;
  title: string;
  icon: string;
  slug: string;
  amount?: number;
}

export interface SUMMARYDATA {
  summaryData: summary[];
}

export interface MarketData {
  name: string;
  image: string;
  symbol: string;
  price: string;
  change: number;
}
