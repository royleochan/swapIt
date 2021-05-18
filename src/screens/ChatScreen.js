import uuid from "react-native-uuid";
import { REACT_APP_BACKEND_URL } from "@env";
import React, { useCallback, useEffect, useState } from "react";
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
  const [lastSentImageUrl, setLastSentImageUrl] = useState("");
  // const [isLoading, setIsLoading] = useState(false);

  const loggedInUserId = useSelector((state) => state.auth.user.id);
  const userId = props.route.params._id;
  const userProfilePic = props.route.params.profilePic;

  const isValidMessage = (msg) => {
    return msg !== "";
  };
  //Image validation
  const isValidImage = (image) => {
    return image !== undefined;
  };

  const isValidImageUrl = (imageUrl) => {
    return imageUrl === String;
  };

  const setValidImageUrl = (url) => {
    if (isValidImageUrl(url)) {
      setLastSentImageUrl(url);
    } else {
      console.log("Invalid image url!");
    }
  };

  //Choose image from image library
  const handlePickImage = async () => {
    try {
      let img = await chooseFromLibrary();
      if (isValidImage(img)) {
        console.log("Uploading image...");
        const imageUrl = await uploadImageHandler(img);
        setValidImageUrl(imageUrl);
      } else {
        console.log("Image chosen is invalid!");
      }
    } catch (e) {
      console.error(e);
    }
  };

  //Take picture
  const handleLaunchCamera = async () => {
    try {
      let img = await takeImage();
      if (isValidImage(img)) {
        const imageUrl = await uploadImageHandler(img);
        setValidImageUrl(imageUrl);
      } else {
        console.log("Image chosen is invalid!");
      }
    } catch (e) {
      console.error(e);
    }
  };

  const onSend = useCallback((newMessage = []) => {
    const messageText = newMessage[0].text;
    if (isValidMessage(messageText)) {
      console.log(newMessage);
      setLastSentMessage(messageText);
      setMessages((previousMessages) =>
          GiftedChat.append(previousMessages, newMessage)
      );
    }
  }, []);

  const renderActions = () => {
    return (
        <Actions
            options={{
              ['Use camera']: handleLaunchCamera,
              ['Choose Image']: handlePickImage,
            }}
            icon={() => (
                <Icon name={'attachment'} size={23} color={"black"} />
            )}
            onSend={onSend}
        />
    );
  };

  const getMessages = async (roomId) => {
    //   const response = await request.get(`/api/chats/${loggedInUserId}/${userId}`);
    const response = await request.get(`/api/chats/${roomId}`);
    return response.data.room.messages.map((message) => {
      return {
        _id: message._id,
        text: message.content,
        image: message.imageUrl,
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
      await getMessages(roomId)
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
          image: message.imageUrl,
          createdAt: new Date(),
          user: {
            _id: message.userId,
            avatar: userProfilePic,
          },
        },
      ];
      console.log(newMessage[0]);
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
    if (isValidMessage(lastSentMessage)) {
      socket.emit("message", {
        userId: loggedInUserId,
        message: lastSentMessage,
      });
    } else {
      console.log("Invalid message");
    }
  }, [lastSentMessage]);

  useEffect(() => {
    if (isValidImageUrl(lastSentImageUrl)) {
      console.log("imageUrl:", lastSentImageUrl);
      socket.emit("message", {
        userId: loggedInUserId,
        message: "",
        imageUrl: lastSentImageUrl,
      });
      console.log("Emitted");
    } else {
      console.log("Image invalid!");
    }
  }, [lastSentImageUrl]);



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
