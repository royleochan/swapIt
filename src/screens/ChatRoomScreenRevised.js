import {
  REACT_APP_BACKEND_URL
} from "@env"

import React, { useCallback, useEffect, useState } from "react";
import { Actions, GiftedChat } from "react-native-gifted-chat";
import {useDispatch, useSelector} from "react-redux";
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
  const loggedInUserId = useSelector((state) => state.auth.user.id);
  const opposingUser = useSelector((state) => state.chatRoom.opposingUser);
  const messages = useSelector((state) => state.chatRoom.messages);

  const [socket] = useState(
      io(`${REACT_APP_BACKEND_URL}/chatSocketRevised`, {
        autoConnect: false,
      })
  );
  const dispatch = useDispatch();
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
      setIsUploading(false);
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
    dispatch(fetchRoom(chatId, loggedInUserId));
  }, []);

  //After messages have been fetched, connect to socket
  useEffect(() => {
    //TODO: Future enhancement to mark messages as seen. Consider Socket.io Acknowledgements for sent
    console.log('Start connection to socket')
    socket.connect();
    socket.emit("join", { chatId });
    socket.on("joined", () => {
      console.log('joined');
      setIsLoading(false);
    });
    socket.on("receive message", (messageObject) => {
      console.log("receive message");
      dispatch(receiveMessage(messageObject));
    });
    socket.on("receive image", (messageObject) => {
      console.log("receive image");
      dispatch(receiveImage(messageObject));
    });
    return () => {
      socket.disconnect();
      console.log("Disconnect from socket")
      dispatch(leaveRoom());
    };
  }, []);

  useEffect(() => {
    if (lastSentMessage === "") {
      return
    }
    console.log("Sending new message:", lastSentMessage);
    dispatch(sendMessage(lastSentMessage));
    socket.emit("new message", {
      chatId: chatId,
      userId: loggedInUserId,
      content: lastSentMessage
    });
  }, [lastSentMessage]);

  useEffect(() => {
    if (lastSentImageUrl === "") {
      return
    }
    console.log("Sending new image:", lastSentImageUrl);
    dispatch(sendImage(lastSentImageUrl));
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
