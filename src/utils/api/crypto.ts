import axios from "axios";

import { CryptoCurrency, CryptoCurrencyDetail, CryptoCurrencyDetailType, CryptoTrendingType, GetCryptoListType, GetCryptoTrendingType } from "../types/api";
import { cryptoDetailUrl, cryptoGetGlobalUrl, cryptoListUrl, cryptoTrendingUrl } from "./apiLink";

export const getCryptoListApi = async (
  page: number
): Promise<GetCryptoListType> => {
  try {
    const global = await axios.get(cryptoGetGlobalUrl, {
      withCredentials: false,
    });
    if (!global.data.data.active_cryptocurrencies) {
      return {
        success: false,
        error: JSON.stringify(global.data),
      };
    }
    const url = cryptoListUrl({
        page,
      });

      const result = await axios.get<CryptoCurrency[]>(url, {
        withCredentials: false,
      });
      if(result.data.length>0){
        return{
            success:true,
            active_cryptocurrencies:global.data.data.active_cryptocurrencies,
            cryptoList:result.data
        }
      }

      return{
        success:false,
        error:'Something wrong, check log'
      }
  } catch (error) {
    return {
      success: false,
      error: JSON.stringify(error),
    };
  }
};

export const getCryptoDetailApi = async (symbol : string) : Promise<CryptoCurrencyDetailType> =>{
  const url = cryptoDetailUrl(symbol)
  try {
    const result = await axios.get<CryptoCurrencyDetail>(url,{
      withCredentials:false
    })
    return {
      success:true,
      code:200,
      crypto:result.data,
      message:'get cryptodetail successfully'
    }
  } catch (error) {
    return{
      success:false,
      message:JSON.stringify(error),
      code:400
    }
    
  }
}

export const getCryptoTrendingApi = async () : Promise<GetCryptoTrendingType> =>{
  const url = cryptoTrendingUrl()
  try {
    const result = await axios.get(url,{
      withCredentials:false
    })

    if(Array.isArray(result.data.coins)){
      const list : CryptoTrendingType[] = result.data.coins.map((item : any) => item.item)
    
      return {
        success:true,
        code:200,
        message:'get crypto trending successfully',
        cryptoList:list
      }
    }

    return{
      success:false,
      code:400,
      message:'get cryptotrending error'
    }
    
    
   
  } catch (error) {
    return{
      success:false,
      message:JSON.stringify(error),
      code:400
    }
    
  }
}
