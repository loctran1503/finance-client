import React, { useCallback, useEffect, useState } from "react";
import { useAppSelector } from "../../store/hook";
import { appSelector } from "../../store/reducers/appSlice";
import { authSelector } from "../../store/reducers/authSlice";
import { MessageIO } from "../../utils/types/socket";
import styles from "./styles.module.scss";
const ChatRoom = () => {
  const { socket } = useAppSelector(appSelector);
  const { user } = useAppSelector(authSelector);
  const [message, setMessage] = useState("");
  const [messageList, setMessageList] = useState<MessageIO[]>([]);

  useEffect(() => {
    socket?.on("server-send-message", (value: MessageIO) => {
      setMessageList((oldArray) => [...oldArray, value]);
    });

    return () => {socket?.off("server-send-message")}
  }, [socket]);

  const handleSendMessage = useCallback(() => {
    socket?.emit("client-send-message", {
      message,
    });
    setMessage("");
  }, [message]);

  const handleMessageChanging = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };

  return (
    <div className="grid wide">
      <div className="row">
        <div className="col l-8 l-o-2 m-12 m-o-2 c-12">
          <div className={styles.container}>
            {/* Header */}
            <h3 className={styles.header}>Community</h3>
            {/* Body */}
            <div className={styles.body}>
              {messageList.length > 0 &&
                messageList.map((item) =>
                  item.userId === user?.userId ? (
                    <div
                    key={item.timestamp}
                      className={styles.sender}
                      onClick={() => {
                        console.log(messageList);
                      }}
                    >
                      <p className={styles.senderMessage}>
                        {item.message}
                      </p>
                      <p className={styles.timestamps}>{item.timestamp}</p>
                    </div>
                  ) : (
                    <div className={styles.receiver}>
                      <p className={styles.timestamps}>{item.timestamp}</p>
                      <p className={styles.receiverName}>{item.name}:</p>

                      <p className={styles.receiverMessage}>
                        {item.message}
                      </p>
                    </div>
                  )
                )}
            </div>
            {/* Footer */}
            <div className={styles.footer}>
              <input
                className={styles.messageInput}
                type="text"
                value={message}
                onChange={(e) => {
                  handleMessageChanging(e);
                }}
              />
              <span
                className={styles.btnSendMessage}
                onClick={handleSendMessage}
              >
                Send
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(ChatRoom);
