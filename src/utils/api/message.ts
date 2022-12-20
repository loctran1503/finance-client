import axios from "axios";
import { MessageIO, MessageResponse } from "../types/socket";
import { apiLink } from "./apiLink";

export const getMessageApi =async (timestamp? : Date) : Promise<MessageResponse> =>{
    try {

       const url = apiLink.users.getMessage
       const result = await axios.post<MessageResponse>(url,timestamp && {
        timestamp
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