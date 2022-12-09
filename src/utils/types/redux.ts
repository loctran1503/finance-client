import { User } from "./api";


export interface AuthState{
    isAuthenticated:boolean;
    user:User | null;
    isLoading:boolean;
}