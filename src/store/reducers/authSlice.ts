import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "..";
import { apiLink } from "../../utils/api/apiLink";
import { loginApi, signUpApi,logoutApi } from "../../utils/api/users";
import { DefaultResponse, SignUpByPassWord, User, UserResponse } from "../../utils/types/api";
import { AuthState } from "../../utils/types/redux";



const initialState : AuthState = {
    isAuthenticated:false,
    user:null,
    isLoading:true
}


//Check authenticate
export const checkAuthenticate = createAsyncThunk('checkAuth',async () : Promise<UserResponse> =>{
    try {
      const url = apiLink.users.checkAuth
      const serverResult = await axios.post<UserResponse>(url,null,{
        withCredentials:true
      })
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
export const userLogin = createAsyncThunk('userLogin',async (signUpByPassword : SignUpByPassWord) : Promise<UserResponse> =>{
  try {
    return await loginApi(signUpByPassword)
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




const authSlice = createSlice({
    name:'authSlice',
    initialState,
    reducers:{
      
    },
    extraReducers:(builder) =>{
      // Check Authenticate Case
      builder.addCase(checkAuthenticate.pending,(state) =>{
        state.isLoading = true
      });
      builder.addCase(checkAuthenticate.fulfilled,(state,action ) =>{
        state.isLoading=false
        if(action.payload.success || action.payload.user){
          state.isAuthenticated = true;
          state.user = action.payload.user as User
        }
        setTimeout(() =>{
          
          
        },1000)
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
export const { } =
  authSlice.actions;

export default authReducer;