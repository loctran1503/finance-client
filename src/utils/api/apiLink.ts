import { CryptoListUrlType } from "../types/api";

//const severUrl = "http://localhost:4444/finance/api";
  const severUrl = 'https://gentlevn.com/finance/api'

//export const socketUrl = "http://localhost:4444/finance/api";
 export const socketUrl ='wss://gentlevn.com/finance/api'

export const socketLink ={
  chats:{
    path:"/finance/api/chat/socket.io",
    link:`${socketUrl}/chat`
  },
  coins:{
    path:"/finance/api/coins/socket.io",
    link:`${socketUrl}/coins`
  }
 }

export const apiLink = {
  users: {
    signUp: `${severUrl}/users/signUp`,
    login: `${severUrl}/users/login`,
    checkAuth: `${severUrl}/users/checkAuth`,
    logout: `${severUrl}/users/logout`,
    findAll:`${severUrl}/users/findAll`

  },
  messages:{
    findAll:`${severUrl}/messages/findAll`
  },
  coins:{
    convertToUsdt:`${severUrl}/coins/convert-usd-to-usdt`,
    convertToUsd:`${severUrl}/coins/convert-usdt-to-usd`,
    buyCoins:`${severUrl}/coins/buy`,
    sellCoins:`${severUrl}/coins/sell`,
  }
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

export const cryptoTrendingUrl = () => `https://api.coingecko.com/api/v3/search/trending`

export const cryptoPriceUrl = (id : number) : string  =>{
  return `https://api.coingecko.com/api/v3/simple/price?ids=${id}&vs_currencies=usd`
}

export const cryptoDetailUrl = (id : string) : string  =>{
  return `https://api.coingecko.com/api/v3/coins/${id}`
}

export const cryptoGetGlobalUrl = 'https://api.coingecko.com/api/v3/global'
