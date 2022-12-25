import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Socket } from "socket.io-client";
import { RootState } from "..";
import { UserResponse } from "../../utils/types/api";
import { AppState } from "../../utils/types/redux";



const initialState : AppState = {
    socket:null,
  
}


const appSlice = createSlice({
    name:'appSlice',
    initialState,
    reducers:{
       setSocket(state,action ){
            if(action.payload){
                state.socket = action.payload 
            }
       },
      
    },
   
    extraReducers:(builder) =>{
      
    
    }
})

const appReducer = appSlice.reducer;
export const appSelector = (state: RootState) => state.app;
export const { setSocket} =
appSlice.actions;

export default appReducer;