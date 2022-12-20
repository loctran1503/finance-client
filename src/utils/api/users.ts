import axios from "axios";
import { DefaultResponse, LoginByPassWord, SignUpByPassWord, User, UserResponse } from "../types/api";
import { getAuth, createUserWithEmailAndPassword,signInWithEmailAndPassword } from "firebase/auth";
import { apiLink } from "./apiLink";
import { app } from "../config/firebase";
import logo from "../../assets/images/bitcoin-logo.png";
const auth = getAuth(app);

export const signUpApi = async ({
  email,
  password,
  name
}: SignUpByPassWord): Promise<UserResponse> => {
  return await createUserWithEmailAndPassword(auth, email, password)
    .then(async (userCredential) => {
      // Signed in
      const user = userCredential.user;
      const url = apiLink.users.signUp;
      const serverResult = await axios.post<UserResponse>(
        url,
        {
          firebaseId: user.uid,
          name,
          avatar: logo,
        }
        
      );
      if (!serverResult.data.success) {
        return {
          success: false,
          message: serverResult.data.message,
          code: 400,
        };
      }

      //All thing is good
      if (serverResult.data.access_token)
        axios.defaults.headers.common["Authorization"] =
          serverResult.data.access_token;

      return {
        success: true,
        message: serverResult.data.message,
        code: 200,
        user: serverResult.data.user,
      };
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(`errorCode:${errorCode} - errorMessage:${errorMessage}`);
      return {
        success: false,
        message: errorMessage,
        code: 500,
      };

      // ..
    });
};

//Sign In
export const loginApi = async ({
  email,
  password,
}: LoginByPassWord): Promise<UserResponse> => {
  return await signInWithEmailAndPassword(auth, email, password)
    .then(async (userCredential) => {
      // Signed in
      const user = userCredential.user;
      const url = apiLink.users.login;
      const serverResult = await axios.post<UserResponse>(
        url,
        {
          firebaseId: user.uid,
          
        }
      );
      if (!serverResult.data.success) {
        return {
          success: false,
          message: serverResult.data.message,
          code: 400,
        };
      }

      //All thing is good
      if (serverResult.data.access_token)
        axios.defaults.headers.common["Authorization"] =
          serverResult.data.access_token;
    
      return {
        success: true,
        message: serverResult.data.message,
        code: 200,
        user: serverResult.data.user,
      };
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(`errorCode:${errorCode} - errorMessage:${errorMessage}`);
      return {
        success: false,
        message: errorCode,
        code: 500,
      };

      // ..
    });
};

export const logoutApi = async() : Promise<DefaultResponse> =>{
  const url = apiLink.users.logout
  try {
    const serverResult = await axios.post<DefaultResponse>(url,{

    })
    return{
      success:serverResult.data.success,
      code:serverResult.data.code,
      message:serverResult.data.message
    }

  } catch (error) {
    return{
      code:500,
      success:false,
      message:JSON.stringify(error)
    }
  }

}