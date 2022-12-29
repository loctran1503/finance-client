import axios from "axios";
import { BuyOrSellCoinDto, UserResponse } from "../types/api";
import { apiLink } from "./apiLink";

export const convertToUsdtApi = async (amount:number) : Promise<UserResponse> =>{
    try {
        const url = apiLink.coins.convertToUsdt
        const result = await axios.post<UserResponse>(url,{
            amount
        })


        return result.data
    } catch (error) {
        return{
            code:500,
            success:false,
            message:JSON.stringify(error)
        }
    }
}

export const convertToUsdApi = async (amount:number) : Promise<UserResponse> =>{
    try {
        const url = apiLink.coins.convertToUsd
        const result = await axios.post<UserResponse>(url,{
            amount
        })
        

        return result.data
    } catch (error) {
        return{
            code:500,
            success:false,
            message:JSON.stringify(error)
        }
    }
}



export const buyCoinApi = async (coin : BuyOrSellCoinDto) : Promise<UserResponse> => {
    try {
        const url = apiLink.coins.buyCoins
        const result = await axios.post<UserResponse>(url,{
            coin
        })
        return result.data
    } catch (error) {
        return{
            code:500,
            success:false,
            message:JSON.stringify(error)
        }
    }
}

export const sellCoinApi = async (coin : BuyOrSellCoinDto) : Promise<UserResponse> => {
    try {
        const url = apiLink.coins.sellCoins
        const result = await axios.post<UserResponse>(url,{
            coin
        })
        return result.data
    } catch (error) {
        return{
            code:500,
            success:false,
            message:JSON.stringify(error)
        }
    }
}