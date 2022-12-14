import { Socket } from "socket.io-client";
import { User } from "./api";


export interface AuthState{
    isAuthenticated:boolean;
    user:User | null;
    isLoading:boolean;
    access_token:string | null
}

export interface AppState{
    socket : Socket | null
}