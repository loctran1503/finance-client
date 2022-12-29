import axios from "axios";
import clsx from "clsx";
import React, { useCallback, useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { io, Socket } from "socket.io-client";
import { useAppSelector } from "../../store/hook";
import { authSelector } from "../../store/reducers/authSlice";
import { socketLink } from "../../utils/api/apiLink";
import { getMessageApi } from "../../utils/api/message";
import { formatDateToMDY, getTimeFromDate } from "../../utils/funnctions/date";
import { MessageIO, MessageResponse } from "../../utils/types/socket";
import Login from "../Auth/Login";
import styles from "./styles.module.scss";
const ChatRoom = () => {
  const  [socket,setSocket] = useState<Socket|null>(null);
  const { user, isAuthenticated, isLoading, access_token } =
    useAppSelector(authSelector);
  const [message, setMessage] = useState("");
  const [messageResponse, setMessageResponse] = useState<MessageResponse>({
    messageList:[],
    hasMore:false,
    code:0,
    success:false,
    message:''
  });
  const [messageBlockingCountDown, setmessageBlockingCountDown] = useState(0);

  useEffect(() => {
    const getMessage = async () => {
      const serverResult = await getMessageApi();
      if (serverResult.messageList && serverResult.messageList.length > 0) {
        setMessageResponse({
          ...messageResponse,
          hasMore:serverResult.hasMore,
          messageList: serverResult.messageList,
        });
      }
    };
    getMessage();
  }, []);



  useEffect(() => {
    if (!isLoading) {
      const socket = io(socketLink.chats.link, {
        transports: ["websocket"],
        path: socketLink.chats.path,
        ...(isAuthenticated
          ? {
              auth: {
                token: access_token as string,
              },
            }
          : {}),
      });
      socket.on("connect", () => {
        console.log('socket connected');
        

        
        socket.emit("client-send-indentify", {
          name: isAuthenticated ? user?.name : "Guest",
        });
        setSocket(socket)
      });

      socket.on("connect_error", (err) => console.log(err));
      socket.on("connect_failed", (err) => console.log(err));

      return () => {
        console.log("socket disconnected");
        socket.disconnect();
      };
    }
  }, [isLoading,isAuthenticated]);

  useEffect(() => {
    if (messageBlockingCountDown > 0) {
      const timeoutId = setTimeout(() => {
        setmessageBlockingCountDown(messageBlockingCountDown - 1000);
      }, 1000);
      return () => clearTimeout(timeoutId);
    }
  }, [messageBlockingCountDown]);

  useEffect(() => {
    if ( socket && socket.active) {
      socket.on("server-send-message", (value: MessageIO) => {
        if (value.user.userId === user?.userId) {
          setmessageBlockingCountDown(value.timestampBlocking);
        }
        setMessageResponse((oldArray) => ({
          ...oldArray,
          messageList: [value, ...(oldArray.messageList || [])],
        }));
      });
    }

    return () => {
      socket?.off("server-send-message");
    };
  }, [socket]);

  const handleSendMessage = useCallback(() => {
    if (messageBlockingCountDown === 0) {
        console.log(axios.defaults.headers.common);
        
      
      socket?.emit("client-send-message", {
        message,
      });
      setMessage("");
    }
  }, [message]);

  const handleMessageChanging = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };

  const fetchMoreData = async () => {
    if(messageResponse.messageList){
      const serverResult = await getMessageApi(
        messageResponse.messageList[messageResponse.messageList.length-1].timestamp
      );
  
      
      if (serverResult.messageList) {
       
        
        const temp = messageResponse.messageList.map(item => item)
        setMessageResponse((oldValue) => (
          {
            ...oldValue,
            hasMore:serverResult.hasMore,
            messageList:temp.concat(serverResult.messageList || [])
          }
        ))
      }
    }
  };

  return (
    <div className="grid wide">
      {messageResponse.messageList && (
        <div className="row">
          <div className="col l-8 l-o-2 m-12 m-o-2 c-12">
            <div className={styles.container}>
              {/* Header */}
              <h3 className={styles.header}>Community</h3>
              {/* Body */}
              <div id="scrollableDiv" className={styles.body}>
                {/*Put the scroll bar always on the bottom*/}
                <InfiniteScroll
                  dataLength={messageResponse.messageList.length}
                  height={500}
                  next={fetchMoreData}
                  style={{ display: "flex", flexDirection: "column-reverse" }} //To put endMessage and loader to the top.
                  inverse={true} //
                  hasMore={messageResponse.hasMore || false}
                  loader={<h4>Loading...</h4>}
              
                  scrollableTarget="scrollableDiv"
                >
                  {messageResponse.messageList.length > 0 &&
                    messageResponse.messageList.map((item, index) =>
                      item.user.userId === user?.userId ? (
                        <div key={item.messageId} className={styles.sender}>
                       
                          <div>
                          <p className={styles.senderMessage}>{item.content}</p>
                          <p className={styles.senderTimetamps}>
                            {formatDateToMDY(new Date(item.timestamp))}
                          </p>
                          </div>
                        </div>
                      ) : (
                        <div className={styles.receiver} key={item.messageId}>
                          
                          <p className={styles.receiverName}>
                            {item.user.name}
                          </p>

                          <div>
                          <p className={styles.receiverMessage}>
                            {item.content}
                          </p>
                          <p className={styles.receiverTimestamp}>
                            {formatDateToMDY(new Date(item.timestamp))}
                          </p>
                          </div>
                        </div>
                      )
                    )}
                </InfiniteScroll>
              </div>
              {/* Body */}
              {/* <div className={styles.body}>
              {messageList.length > 0 &&
                messageList.map((item,index) =>
                  item.user.userId === user?.userId ? (
                    <div
                    key={index}
                      className={styles.sender}
                      onClick={() => {
                        console.log(messageList);
                      }}
                    >
                      <p className={styles.senderMessage}>
                        {item.content}
                      </p>
                      <p className={styles.timestamps}>{item.timestamp.toString()}</p>
                    </div>
                  ) : (
                    <div className={styles.receiver}>
                      <p className={styles.timestamps}>{item.timestamp.toString()}</p>
                      <p className={styles.receiverName}>{item.user.name}:</p>

                      <p className={styles.receiverMessage}>
                        {item.content}
                      </p>
                    </div>
                  )
                )}
            </div> */}
              {/* Footer */}
              <div className={styles.footer}>
                {isAuthenticated ? <>
                <input
                  className={styles.messageInput}
                  type="text"
                  disabled={messageBlockingCountDown > 0}
                  value={message}
                  onChange={(e) => {
                    handleMessageChanging(e);
                  }}
                />
                <span
                  className={clsx(
                    styles.btnSendMessage,
                    messageBlockingCountDown > 0 && styles.messageBlockingActive
                  )}
                  onClick={handleSendMessage}
                >
                  {messageBlockingCountDown > 0
                    ? messageBlockingCountDown / 1000
                    : "Send"}
                </span>
                </> : <div className={styles.logInRequired}>
                  <div>
                  Login to Chat 
                  </div>
                  <Login/>
                  </div>}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default React.memo(ChatRoom);
