import uuid from "react-native-uuid";
import React, { useCallback, useEffect, useState, useRef } from "react";
import { Actions, GiftedChat } from "react-native-gifted-chat";
import { useSelector } from "react-redux";
import { Icon } from "react-native-elements";

import request from "utils/request";
import Colors from "constants/Colors";
import Loader from "components/Loader";
import {
  takeImage,
  chooseFromLibrary,
  uploadImageHandler,
} from "utils/imagePicker";

const ChatRoomScreen = (props) => {
  let chatId = props.route.params.chatId;
  const userId = props.route.params.user._id;
  const loggedInUserId = useSelector((state) => state.auth.user.id);
  const userProfilePic = props.route.params.user.profilePic;
  const initialMessages = () => {
    if (chatId) {
      return props.route.params.messages.map((message) => {
        return {
          _id: message._id,
          text: message.content,
          image: message.imageUrl,
          createdAt: message.createdAt,
          sent: true,
          received: message.seen,
          user: {
            _id: message.creator,
            avatar: userProfilePic,
          },
        };
      }).reverse();
    }
    return [];
  }

  const [socket] = useState(props.route.params.socket);
  const [messages, setMessages] = useState(initialMessages());
  const [lastSentMessage, setLastSentMessage] = useState("");
  const [lastSentImageUrl, setLastSentImageUrl] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const [userOnline, setUserOnline] = useState(false);
  const userOnlineRef = useRef(userOnline);

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
        updateMessages(loggedInUserId, "Image chosen is invalid. Please try another.", "", true);
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
        sent: true,
        received: userOnlineRef.current,
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

  const updateErrorMessage = (error) => {
    updateMessages(uuid.v4(), error, "", true);
  }

  const setValidImageUrl = (inputUrl) => {
    if (isValidString(inputUrl)) {
      setLastSentImageUrl(inputUrl);
    } else {
      setIsUploading(false);
      updateErrorMessage("Upload failed. Please try again.");
    }
  };

  const onSend = useCallback((newMessage = []) => {
    setLastSentMessage(newMessage[0].text);
    updateMessages(loggedInUserId, newMessage[0].text, "", false);
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
        sent: true,
        received: message.seen,
        user: {
          _id: message.creator,
          avatar: userProfilePic,
        },
      };
    });
  };

  const getChatRoom = async () => {
    const response = await request.get(`/api/chats/${loggedInUserId}/${userId}`);
    chatId = response.data.room.id;
    return chatId;
  }

  useEffect(() => {
    userOnlineRef.current = userOnline;
  }, [userOnline]);

  //Initialise socket connection and event listeners
  useEffect(() => {
    if (chatId === undefined || chatId === null) {
      getChatRoom()
          .then((result) => {
            getMessages(chatId)
                .then((response) => {
                  setMessages(response.reverse());
                })
                .catch((e) => {
                  updateErrorMessage("Failed to open chat. Please try again.");
                  console.error(e);
                });
            socket.emit("join", {
              chatId: result,
              currUser: loggedInUserId,
            });
          })
          .catch((e) => console.error(e));
    } else {
      socket.emit("join", {
        chatId: chatId,
        currUser: loggedInUserId,
      });
    }
    socket.on("joined", () => {
      setIsLoading(false);
    });
    socket.on("user connected", (user) => {
      if (user === userId) {
        setUserOnline(true);
        socket.emit("respond connected", {
          chatId: chatId,
          currUser: loggedInUserId,
        });
      }
    });
    socket.on("connected response", (user) => {
      if (user === userId) {
        setUserOnline(true);
      }
    });
    socket.on("message", (message) => {
      const newMessage = [
        {
          _id: uuid.v4(),
          text: message.content,
          image: message.imageUrl,
          createdAt: new Date(),
          sent: true,
          received: true,
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
    socket.on("user disconnect", (user) => {
      if (user === userId) {
        setUserOnline(false);
      }
    });
    return () => socket.emit("leave room", { chatId: chatId, currUser: loggedInUserId });
  }, []);

  //Effect when text message is sent
  useEffect(() => {
    if (isValidString(lastSentMessage)) {
      socket.emit("message", {
        otherUserId: userId,
        userId: loggedInUserId,
        message: lastSentMessage,
        imageUrl: "",
        seen: userOnline,
      });
    }
  }, [lastSentMessage]);

  //Effect when image is uploaded
  useEffect(() => {
    if (isValidString(lastSentImageUrl)) {
      socket.emit("message", {
        otherUserId: userId,
        userId: loggedInUserId,
        message: "",
        imageUrl: lastSentImageUrl,
        seen: userOnline,
      });
      updateMessages(loggedInUserId, "", lastSentImageUrl, false);
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

export default ChatRoomScreen;
