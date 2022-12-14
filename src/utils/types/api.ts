

export interface SignUpByPassWord{
    email:string;
    password:string;
    name:string
}
export interface LoginByPassWord{
    email:string;
    password:string
}

export interface User{
    userId:string
    name:string
    avatar:string
    createdAt:Date
}

// Response
export interface DefaultResponse{
    code:number;
    success:boolean;
    message:string;
}

export interface UserResponse extends DefaultResponse{
    user?:User;
    access_token?:string;
}

