import {REACT_APP_BACKEND_URL} from "@env";
import React, {useCallback, useEffect, useRef, useState} from "react";
import {GiftedChat} from "react-native-gifted-chat";

import {useSelector} from "react-redux";
import request from "utils/request";
import {io} from "socket.io-client";

const ChatScreen = (props) => {
  const [socket] = useState(io(`${REACT_APP_BACKEND_URL}/chatSocket`, {
    autoConnect: false
  }));
  const [messages, setMessages] = useState([]);
  const [lastSentMessage, setLastSentMessage] = useState("");
  const firstUpdate = useRef(true);

  const loggedInUserId = useSelector((state) => state.auth.user.id);
  const userId = props.route.params._id;
  const userProfilePic = props.route.params.profilePic;

  // const getMessages = async () => {
  //   const response = await request.get(`/api/chats/${loggedInUserId}/${userId}`);
  // };

  const getMessages = async () => {
    const response = await request.get(`/api/chats/609a8094dec46a7ce23a5e61`);
    return response.data.room.messages.map((message) => {
      return {
        _id: message._id,
        text: message.content,
        createdAt: message.createdAt,
        user: {
          _id: message.creator,
          avatar: userProfilePic,
        },
      };
    });
  };

  // useEffect(() => {
  //   const loadMessages = async () => {
  //     const result = await getMessages();
  //     setMessages(result.reverse());
  //   };
  //   loadMessages();
  // }, []);

  useEffect(() => {
    socket.connect();
    socket.on("connect", async () => {
      console.log("Received connect, preparing to emit...");
      socket.emit("join", "609a8094dec46a7ce23a5e61");
    })
    socket.on("joined", async (roomId) => {
      console.log("User has joined room %s", roomId);
      await getMessages()
          .then(response => setMessages(response.reverse()))
          .catch(e => console.error(e));
    });
    socket.on("message", (message) => {
      console.log("INCOMING MESSAGE: " + message.content);
    });
    return () => {
      console.log("DISCONNECT");
      socket.disconnect();
    }
  }, []);

  useEffect(() => {
    if (!firstUpdate.current) {
      console.log("LAST SENT:" + lastSentMessage);
      socket.emit("message", { userId: loggedInUserId, message: lastSentMessage });
    } else {
      firstUpdate.current = false;
      console.log("INITIAL RENDER:", lastSentMessage);
    }
  }, [lastSentMessage]);

  const onSend = useCallback((newMessage = []) => {
    setLastSentMessage(newMessage[0].text);
    setMessages((previousMessages) =>
        GiftedChat.append(previousMessages, newMessage)
    );
  }, []);

  return (
    <GiftedChat
      messages={messages}
      onSend={(messages) => onSend(messages)}
      user={{
        _id: loggedInUserId,
      }}
    />
  );
};

export default ChatScreen;
