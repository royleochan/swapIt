import uuid from "react-native-uuid";
import { REACT_APP_BACKEND_URL } from "@env";
import React, { useCallback, useEffect, useState } from "react";
import { Actions, GiftedChat } from "react-native-gifted-chat";
import { useSelector } from "react-redux";
import { io } from "socket.io-client";
import { Icon } from "react-native-elements";

import request from "utils/request";
import Colors from "constants/Colors";
import Loader from "components/Loader";
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
  const [isLoading, setIsLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);

  const loggedInUserId = useSelector((state) => state.auth.user.id);
  const userId = props.route.params._id;
  const userProfilePic = props.route.params.profilePic;

  //Validation Checks
  const isValidString = (inputString) => {
    return inputString !== "" && inputString !== undefined;
  };

  const isValidImage = (img) => {
    return img !== undefined;
  };

  //Handlers
  const imageHandler = async (inputType) => {
    try {
      let img;
      switch (inputType) {
        case ("camera"):
          img = await takeImage();
          break;
        case ("library"):
          img = await chooseFromLibrary();
          break;
      }
      if (isValidImage(img)) {
        setIsUploading(true);
        let imageUrl = await uploadImageHandler(img);
        setValidImageUrl(imageUrl);
      } else {
        console.log("Image chosen is invalid");
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleCancel = () => {};

  //Modifiers
  const updateMessages = (userId, content, imageUrl, isSystem) => {
    const newMessage = [
      {
        _id: uuid.v4(),
        text: content,
        image: imageUrl,
        createdAt: new Date(),
        system: isSystem,
        user: {
          _id: userId,
          avatar: userProfilePic,
        },
      },
    ];
    setMessages((previousMessages) =>
        GiftedChat.append(previousMessages, newMessage)
    );
  };

  const setValidImageUrl = (inputUrl) => {
    if (isValidString(inputUrl)) {
      setLastSentImageUrl(inputUrl);
    } else {
      setIsUploading(false);
      updateMessages(loggedInUserId, "Upload failed. Please try again.", "", true);
      console.log("Invalid Image Url:", inputUrl);
    }
  };

  const onSend = useCallback((newMessage = []) => {
    console.log(newMessage[0]);
    setLastSentMessage(newMessage[0].text);
    setMessages((previousMessages) =>
        GiftedChat.append(previousMessages, newMessage)
    );
  }, []);

  //Asynchronous Methods
  const getMessages = async (roomId) => {
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

  //Initialise socket connection and event listeners
  useEffect(() => {
    socket.connect();
    socket.on("connect", async () => {
      socket.emit("join", "609a8094dec46a7ce23a5e61");
    });
    socket.on("joined", async (roomId) => {
      await getMessages(roomId)
          .then((response) => {
            setMessages(response.reverse());
            setIsLoading(false);
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
      setMessages((previousMessages) =>
          GiftedChat.append(previousMessages, newMessage)
      );
    });
    return () => {
      socket.disconnect();
    };
  }, []);

  //Effect when text message is sent
  useEffect(() => {
    if (isValidString(lastSentMessage)) {
      socket.emit("message", {
        userId: loggedInUserId,
        message: lastSentMessage,
        imageUrl: "",
      });
    } else {
      console.log("Invalid message");
    }
  }, [lastSentMessage]);

  //Effect when image is uploaded
  useEffect(() => {
    if (isValidString(lastSentImageUrl)) {
      socket.emit("message", {
        userId: loggedInUserId,
        message: "",
        imageUrl: lastSentImageUrl,
      });
      updateMessages(loggedInUserId, "", lastSentImageUrl, false);
    } else {
      console.log("Invalid Image Url");
    }
    setIsUploading(false);
  }, [lastSentImageUrl]);

  const renderActions = (props) => {
    return (
        <Actions
            {...props}
            options={{
              ["Use Camera"]: () => imageHandler("camera"),
              ["Choose Image"]: () => imageHandler("library"),
              ["Cancel"]: handleCancel,
            }}
            icon={() => (
                <Icon name={"attachment"} size={23} color={Colors.primary} />
            )}
            onSend={(args) => console.log(args)}
        />
    );
  };

  const renderFooter = () => {
    if (isUploading) {
      return <Loader isLoading={true} />;
    }
    return null;
  }

  return (
      isLoading ? <Loader isLoading={true} /> :
      <GiftedChat
          messages={messages}
          onSend={(messages) => onSend(messages)}
          user={{
            _id: loggedInUserId,
          }}
          renderActions={renderActions}
          renderFooter={renderFooter}
          infiniteScroll
      />
  );
};

export default ChatScreen;
