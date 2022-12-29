import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "..";
import { apiLink } from "../../utils/api/apiLink";
import { buyCoinApi, sellCoinApi } from "../../utils/api/coins";
import { loginApi, signUpApi,logoutApi } from "../../utils/api/users";
import { BuyOrSellCoinDto, DefaultResponse, LoginByPassWord, SignUpByPassWord, User, UserEvent, UserResponse } from "../../utils/types/api";
import { AuthState } from "../../utils/types/redux";



const initialState : AuthState = {
    isAuthenticated:false,
    user:null,
    isLoading:true,
    access_token:null
}


//Check authenticate
export const checkAuthenticate = createAsyncThunk('checkAuth',async () : Promise<UserResponse> =>{
    try {
      const url = apiLink.users.checkAuth
      const serverResult = await axios.post<UserResponse>(url)
      axios.defaults.headers.common['Authorization']=`Bearer ${serverResult.data.access_token}`
   
      
      return serverResult.data
     
  
    } catch (error) {
     return{
        code:500,
        success:false,
        message:JSON.stringify(error)
     }
    }
})

//User Sign up
export const userSignup = createAsyncThunk('userSignup',async (signUpByPassword : SignUpByPassWord) : Promise<UserResponse> =>{
  try {
    return await signUpApi(signUpByPassword)
  } catch (error) {
   return{
      code:500,
      success:false,
      message:JSON.stringify(error)
   }
  }
})

//User login
export const userLogin = createAsyncThunk('userLogin',async (loginByPassWord : LoginByPassWord) : Promise<UserResponse> =>{
  try {
    return await loginApi(loginByPassWord)
  } catch (error) {
   return{
      code:500,
      success:false,
      message:JSON.stringify(error)
   }
  }
})

//User logout
export const userLogout = createAsyncThunk('userLogout',async () : Promise<DefaultResponse> =>{
  try {
    return await logoutApi()
  } catch (error) {
   return{
      code:500,
      success:false,
      message:JSON.stringify(error)
   }
  }
})

//buy crypto
export const buyCrypto = createAsyncThunk('buyCrypto',async (coin : BuyOrSellCoinDto) : Promise<UserResponse> =>{
  try {
    const result = await buyCoinApi(coin)
    return result
  } catch (error) {
   return{
      code:500,
      success:false,
      message:JSON.stringify(error)
   }
  }
})

//sell crypto
export const sellCrypto = createAsyncThunk('sellCrypto',async (coin : BuyOrSellCoinDto) : Promise<UserResponse> =>{
  try {
    const result = await sellCoinApi(coin)
    return result
  } catch (error) {
   return{
      code:500,
      success:false,
      message:JSON.stringify(error)
   }
  }
})




const authSlice = createSlice({
    name:'authSlice',
    initialState,
    reducers:{
      setIsLoading(state,action){
        state.isLoading = action.payload
      },
      setUserMoneyAndEvents(state,action){
        if(state.user){
          const events : UserEvent[] = action.payload.events
          state.user={
            ...state.user,
            usd:action.payload.usd,
            usdt:action.payload.usdt,
            events
          }
        }
      },
      
    },
    extraReducers:(builder) =>{
      // Check Authenticate Case
      builder.addCase(checkAuthenticate.pending,(state) =>{
  
      });
      builder.addCase(checkAuthenticate.fulfilled,(state,action ) =>{
        
        if(action.payload.success || action.payload.user){
          state.isAuthenticated = true;
          state.user = action.payload.user as User;
         
          
          state.access_token = action.payload.access_token as string
        }
         state.isLoading=false
      });
      // buy crypto
      builder.addCase(buyCrypto.pending,(state) =>{
        state.isLoading=true
      });
      builder.addCase(buyCrypto.fulfilled,(state,action ) =>{
        if(action.payload.success && action.payload.user){
          state.user = action.payload.user as User;
          console.log(action.payload);
          
        }
         state.isLoading=false
      });
       // sell crypto
       builder.addCase(sellCrypto.pending,(state) =>{
        state.isLoading=true
      });
      builder.addCase(sellCrypto.fulfilled,(state,action ) =>{
        if(action.payload.success && action.payload.user){
          state.user = action.payload.user as User;
          console.log(action.payload);
          
        }
         state.isLoading=false
      });
      // Sign Up Case
      builder.addCase(userSignup.pending,(state) =>{
    
      });
      builder.addCase(userSignup.fulfilled,(state,action ) =>{
     
        if(action.payload.success || action.payload.user){
          state.isAuthenticated = true;
          state.user = action.payload.user as User
        }else{
          console.log(action.payload.message)
        }
      });
      // Log In Case
      builder.addCase(userLogin.pending,(state) =>{

      });
      builder.addCase(userLogin.fulfilled,(state,action ) =>{
     
        if(action.payload.success || action.payload.user){
          state.isAuthenticated = true;
          state.user = action.payload.user as User
        }
      });
      
       // Log Out Case
       builder.addCase(userLogout.pending,(state) =>{
          state.isLoading=true
      });
      builder.addCase(userLogout.fulfilled,(state,action ) =>{
        state.isLoading=false
        if(action.payload.success){
          state.isAuthenticated = false;
          state.user = null
        }
      });
       
        
  
    
    }
})

const authReducer = authSlice.reducer;
export const authSelector = (state: RootState) => state.auth;
export const { setIsLoading,setUserMoneyAndEvents} =
  authSlice.actions;

export default authReducer;