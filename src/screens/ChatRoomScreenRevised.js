import {
  REACT_APP_BACKEND_URL
} from "@env"

import React, { useCallback, useEffect, useState, useRef } from "react";
import { Actions, GiftedChat } from "react-native-gifted-chat";
import { useSelector } from "react-redux";
import { Icon } from "react-native-elements";

import Colors from "constants/Colors";
import Loader from "components/Loader";
import {
  takeImage,
  chooseFromLibrary,
  uploadImageHandler,
} from "utils/imagePicker";

import {
  leaveRoom,
  fetchRoom,
  sendMessage,
  sendImage,
  receiveMessage,
  receiveImage,
} from "../store/actions/chatroom";
import {io} from "socket.io-client";

const ChatRoomScreenRevised = (props) => {
  let chatId = props.route.params.chatId;
  const userId = props.route.params.user._id;
  const loggedInUserId = useSelector((state) => state.auth.user.id);
  const init = useSelector((state) => state.chatRoom.init);
  const opposingUser = useSelector((state) => state.chatRoom.opposingUser);
  const messages = useSelector((state) => state.chatRoom.messages);

  const opposingProfilePic = props.route.params.user.profilePic;

  const [socket] = useState(
      io(`${REACT_APP_BACKEND_URL}/chatSocketRevised`, {
        autoConnect: false,
      })
  );
  const [lastSentMessage, setLastSentMessage] = useState("");
  const [lastSentImageUrl, setLastSentImageUrl] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);

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
        setIsUploading(false);
        //TODO: Provide proper system message for user to handle
        console.log("Image upload failed. Please try again.")
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleCancel = () => {};

  const setValidImageUrl = (inputUrl) => {
    if (isValidString(inputUrl)) {
      setLastSentImageUrl(inputUrl);
    } else {
      setIsUploading(false);
      //TODO: Provide proper system message for user to handle
      console.log("Image Url is invalid, please try again.")
    }
  };

  const onSend = useCallback((newMessage = []) => {
    setLastSentMessage(newMessage[0].text);
  }, []);

  //Initial entry to the chat room, get the room info
  useEffect(() => {
    fetchRoom(chatId, loggedInUserId);
  }, []);

  //After messages have been fetched, connect to socket
  useEffect(() => {
    //TODO: Future enhancement to mark messages as seen. Consider Socket.io Acknowledgements for sent
    console.log('Start connection to socket')
    socket.connect();
    console.log('Connected, chatId:', {chatId});
    socket.emit("join", { chatId });
    socket.on("joined", () => {
      console.log('joined');
      setIsLoading(false);
    });
    socket.on("receive message", (messageObject) => {
      receiveMessage(messageObject);
      // setMessages((previousMessages) =>
      //     GiftedChat.append(previousMessages, newMessage)
      // );
    });
    socket.on("receive image", (messageObject) => {
      receiveImage(messageObject);
    });
    return () => {
      socket.disconnect();
      leaveRoom();
    };
  }, [init]);

  useEffect(() => {
    sendMessage(lastSentMessage)
    socket.emit("new message", {
      chatId: chatId,
      userId: loggedInUserId,
      content: lastSentMessage
    });
  }, [lastSentMessage]);

  useEffect(() => {
    sendImage(lastSentImageUrl)
    socket.emit("new image", {
      chatId: chatId,
      userId: loggedInUserId,
      imageUrl: lastSentImageUrl,
    });
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

export default ChatRoomScreenRevised;
