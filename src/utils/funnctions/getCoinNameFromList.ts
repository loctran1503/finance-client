import { Coin } from "../types/api";

export const getCoinNameFromList = (list : Coin[]) : string =>{
    if(list.length===0){
        return '0'
    }else{
       let nameCoinList : string = ''
     
       list.forEach((item,index) =>{
        if(index===0){
            nameCoinList+=`${item.name}`
        }else{
            nameCoinList+=`,${item.name}`
        }
       })
       console.log(nameCoinList);
        return nameCoinList
    }
}