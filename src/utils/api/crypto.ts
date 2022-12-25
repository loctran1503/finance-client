import axios from "axios";

import { CryptoCurrency, CryptoCurrencyDetail, CryptoCurrencyDetailType, GetCryptoListType } from "../types/api";
import { cryptoDetailUrl, cryptoGetGlobalUrl, cryptoListUrl } from "./apiLink";

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
