import uuid from "react-native-uuid";
import { REACT_APP_BACKEND_URL } from "@env";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { Actions, GiftedChat } from "react-native-gifted-chat";
import { useSelector } from "react-redux";
import { io } from "socket.io-client";
import { Icon } from "react-native-elements";

import request from "utils/request";
import Colors from "constants/Colors";
import {
  takeImage,
  chooseFromLibrary,
  uploadImageHandler,
} from "utils/imagePicker";

const ChatScreen = (props) => {
  const [socket] = useState(
    io(`${REACT_APP_BACKEND_URL}/chatSocket`, {
      autoConnect: false,
    })
  );
  const [messages, setMessages] = useState([]);
  const [lastSentMessage, setLastSentMessage] = useState("");
  const [lastSentImage, setLastSentImage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const firstUpdate = useRef(true);

  const loggedInUserId = useSelector((state) => state.auth.user.id);
  const userId = props.route.params._id;
  const userProfilePic = props.route.params.profilePic;

  const handleCancel = () => {};

  const renderActions = (props) => {
    return (
      <Actions
        {...props}
        options={{
          ["Use camera"]: takeImage,
          ["Choose Image"]: chooseFromLibrary,
          ["Cancel"]: handleCancel,
        }}
        icon={() => (
          <Icon name={"attachment"} size={23} color={Colors.primary} />
        )}
        onSend={(args) => console.log(args)}
      />
    );
  };

  const getMessages = async () => {
    //   const response = await request.get(`/api/chats/${loggedInUserId}/${userId}`);
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

  useEffect(() => {
    // setIsLoading(true);
    console.log("Attempting to connect...");
    socket.connect();
    socket.on("connect", async () => {
      console.log("Received connect, preparing to emit...");
      socket.emit("join", "609a8094dec46a7ce23a5e61");
    });
    socket.on("joined", async (roomId) => {
      console.log("User has joined room %s", roomId);
      await getMessages()
        .then((response) => {
          // setIsLoading(false);
          setMessages(response.reverse());
        })
        .catch((e) => console.error(e));
    });
    socket.on("message", (message) => {
      const newMessage = [
        {
          _id: uuid.v4(),
          text: message.content,
          createdAt: new Date(),
          user: {
            _id: message.userId,
            avatar: userProfilePic,
          },
        },
      ];
      setMessages((previousMessages) =>
        GiftedChat.append(previousMessages, newMessage)
      );
    });
    return () => {
      console.log("DISCONNECT");
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!firstUpdate.current) {
      console.log("LAST SENT:" + lastSentMessage);
      socket.emit("message", {
        userId: loggedInUserId,
        message: lastSentMessage,
      });
    } else {
      firstUpdate.current = false;
    }
  }, [lastSentMessage]);

  const onSend = useCallback((newMessage = []) => {
    console.log(newMessage[0]);
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
      renderActions={renderActions}
      infiniteScroll
    />
  );
};

export default ChatScreen;
