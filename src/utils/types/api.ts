export interface SignUpByPassWord {
  email: string;
  password: string;
  name: string;

}
export interface LoginByPassWord {
  email: string;
  password: string;
}

export interface Coin {
  id: string;
  coinId: string;
  name: string;
  symbol: string;
  avatar: string;
  amount: number;
  createdAt: Date;
}

export interface BuyOrSellCoinDto {
  id: string;
  amount: number;
}

export interface User {
  userId: string;
  name: string;
  avatar: string;
  usd: number;
  usdt: number;
  createdAt: Date;
  coins?: Coin[];
  events?: UserEvent[];
}

export interface UserEvent {
  eventId: string;
  porfolio: number;
  description: string;
  createdAt: Date;
  user: User;
}

export interface CryptoTrendingType {
  id: string;
  name: string;
  symbol: string;
  market_cap_rank: 75;
  thumb: string;
  small: string;
  large: string;
  slug: string;
  price_btc: 0.0001964521862721883;
  score: 6;
}
export interface GetCryptoTrendingType extends DefaultResponse{
    cryptoList?:CryptoTrendingType[]
}

// Response
export interface DefaultResponse {
  code: number;
  success: boolean;
  message: string;
}

export interface UserResponse extends DefaultResponse {
  user?: User;
  access_token?: string;
}

export interface UserListResponse extends DefaultResponse {
  userList?: User[];
}

export interface GetCryptoListType {
  active_cryptocurrencies?: number;
  cryptoList?: CryptoCurrency[];
  success: boolean;
  error?: string;
}

export interface CryptoCurrency {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  market_cap: number;
  market_cap_rank: number;
  fully_diluted_valuation: number;
  total_volume: number;
  high_24h: number;
  low_24h: number;
  price_change_24h: number;
  price_change_percentage_24h: number;
  market_cap_change_24h: number;
  market_cap_change_percentage_24h: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  ath: number;
  ath_change_percentage: number;
  ath_date: Date;
  atl: number;
  atl_change_percentage: number;
  atl_date: Date;
  roi: null;
  last_updated: Date;
}

export interface CryptoCurrencyDetailType extends DefaultResponse {
  crypto?: CryptoCurrencyDetail;
}

export interface CryptoCurrencyDetail {
  id: string;
  symbol: string;
  name: string;
  market_cap_rank: number;
  description: {
    en: string;
  };
  market_data: {
    current_price: {
      usd: number;
    };
    price_change_24h_in_currency: {
      usd: number;
    };
    price_change_percentage_1h_in_currency: {
      usd: number;
    };
    high_24h: {
      usd: number;
    };
    low_24h: {
      usd: number;
    };
    market_cap: {
      usd: number;
    };
    total_volume: {
      usd: number;
    };
    total_supply: number;

    max_supply: number;
    circulating_supply: number;
  };
  links: {
    homepage: string[];
    blockchain_site: string[];
  };

  image: {
    large: string;
    small: string;
    thumb: string;
  };
}

export interface CryptoListUrlType {
  perPage?: number;
  page?: number | null;
}

export interface CryptoPricing {
  e?: string; // Event type
  E?: number; // Event time
  s?: string; // Symbol
  p: {
    prevState: number;
    state: number;
  }; // Price change
  P: number; // Price change percent
  w?: number; // Weighted average price
  x?: number; // First trade(F)-1 price (first trade before the 24hr rolling window)
  c: {
    prevState: number;
    state: number;
  }; // Last price
  Q?: number; // Last quantity
  b?: number; // Best bid price
  B?: number; // Best bid quantity
  a?: number; // Best ask price
  A?: number; // Best ask quantity
  o?: number; // Open price
  h: number; // High price
  l: number; // Low price
  v?: number; // Total traded base asset volume
  q?: number; // Total traded quote asset volume
  O?: 1671844897975; // Statistics open time
  C?: 1671931297975; // Statistics close time
  F?: 2375066445; // First trade ID
  L?: 2378148937; // Last trade Id
  n?: 3082493; // Total number of trades
}
