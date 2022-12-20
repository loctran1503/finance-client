interface DefaultResponse{
    code:number;
    success:boolean;
    message:string;
}

export interface MessageResponse extends DefaultResponse{
    messageList?:MessageIO[],
    hasMore?:boolean
}

export interface MessageIO{
    content:string,
    timestamp:Date,
    messageId:string
    user:{
        userId:string
        name:string,
        avatar:string
    },
    timestampBlocking:number
}