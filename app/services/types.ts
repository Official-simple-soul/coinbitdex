export interface lastPage {
  next_page: number | undefined;
  data: any;
}

export interface MarketDataItem {
  symbol: string;
  price: number;
  change: number;
}
