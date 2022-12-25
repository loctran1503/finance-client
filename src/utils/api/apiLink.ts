import { CryptoListUrlType } from "../types/api";

//const severUrl = "http://localhost:4444/finance/api";
  const severUrl = 'https://gentlevn.com/finance/api'

//export const socketUrl = "http://localhost:4444/finance/api";
 export const socketUrl ='wss://gentlevn.com/finance/api'

export const apiLink = {
  users: {
    signUp: `${severUrl}/users/signUp`,
    login: `${severUrl}/users/login`,
    checkAuth: `${severUrl}/users/checkAuth`,
    logout: `${severUrl}/users/logout`,
    getMessage: `${severUrl}/users/getMessage`,
  },
};


export const cryptoListUrl = ({ page }: CryptoListUrlType): string => {
  let url: string = "";
  if (page) {
    url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=${page}&sparkline=false`;
  } else {
    url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false
    `;
  }

  return url;
};

export const cryptoDetailUrl = (symbol : string) : string  =>{
  return `https://api.coingecko.com/api/v3/coins/${symbol}`
}

export const cryptoGetGlobalUrl = 'https://api.coingecko.com/api/v3/global'
