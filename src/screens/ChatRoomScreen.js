// React Imports //
import React, {
  useCallback,
  useEffect,
  useState,
  useLayoutEffect,
} from "react";
import { View, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useSafeAreaInsets } from "react-native-safe-area-context";

// Expo Action Sheet Import //
import { useActionSheet } from "@expo/react-native-action-sheet";

// ENV Imports //
import { REACT_APP_BACKEND_URL } from "@env";

// Gifted Chat Imports //
import { Actions, GiftedChat, Bubble } from "react-native-gifted-chat";

// Socket IO imports //
import { io } from "socket.io-client";

// RNE Imports //
import { Avatar, Icon } from "react-native-elements";

// Redux Action Imports //
import {
  leaveRoom,
  fetchRoom,
  sendMessage,
  sendImage,
  receiveMessage,
  receiveImage,
} from "store/actions/chatroom";

// Constants Imports //
import Colors from "constants/Colors";

// Local Component Imports //
import DefaultText from "components/DefaultText";
import IconButton from "components/IconButton";
import Loader from "components/Loader";

// Utils Imports //
import {
  takeImage,
  chooseFromLibrary,
  uploadImageHandler,
} from "utils/imagePicker";

// Main Component //
const ChatRoomScreen = (props) => {
  // Init //
  const insets = useSafeAreaInsets();
  const { user, chatId } = props.route.params;
  const { name, username, profilePic } = user;

  const [socket] = useState(
    io(`${REACT_APP_BACKEND_URL}/chatSocketRevised`, {
      autoConnect: false,
    })
  );
  const [lastSentMessage, setLastSentMessage] = useState("");
  const [lastSentImageUrl, setLastSentImageUrl] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);

  const loggedInUserId = useSelector((state) => state.auth.user.id);
  const messages = useSelector((state) => state.chatRoom.messages);
  const dispatch = useDispatch();

  const { showActionSheetWithOptions } = useActionSheet();

  // Functions //
  const showActionSheet = () => {
    const options = ["Delete Chat", "Cancel"];
    const destructiveButtonIndex = 0;
    const cancelButtonIndex = 1;

    showActionSheetWithOptions(
      {
        options,
        destructiveButtonIndex,
        cancelButtonIndex,
        tintColor: Colors.primary,
      },
      async (buttonIndex) => {
        if (buttonIndex === 0) {
          console.log("Delete Chat");
        }
      }
    );
  };

  // Validations //
  const isValidString = (inputString) => {
    return inputString !== "" && inputString !== undefined;
  };

  const isValidImage = (img) => {
    return img !== undefined;
  };

  // Handlers //
  const imageHandler = async (inputType) => {
    try {
      let img;
      switch (inputType) {
        case "camera":
          img = await takeImage();
          break;
        case "library":
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
        console.log("Image upload failed. Please try again.");
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
      console.log("Image Url is invalid, please try again.");
    }
  };

  const onSend = useCallback((newMessage = []) => {
    setLastSentMessage(newMessage[0].text);
  }, []);

  // Side Effects //

  // Initial entry to the chat room, get the room info
  useEffect(() => {
    dispatch(fetchRoom(chatId, loggedInUserId));
  }, []);

  // After messages have been fetched, connect to socket
  useEffect(() => {
    //TODO: Future enhancement to mark messages as seen. Consider Socket.io Acknowledgements for sent
    console.log("Start connection to socket");
    socket.connect();
    socket.emit("join", { chatId });
    socket.on("joined", () => {
      console.log("joined");
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
      console.log("Disconnect from socket");
      dispatch(leaveRoom());
    };
  }, []);

  useEffect(() => {
    if (lastSentMessage === "") {
      return;
    }
    console.log("Sending new message:", lastSentMessage);
    dispatch(sendMessage(lastSentMessage));
    socket.emit("new message", {
      chatId: chatId,
      userId: loggedInUserId,
      content: lastSentMessage,
    });
  }, [lastSentMessage]);

  useEffect(() => {
    if (lastSentImageUrl === "") {
      return;
    }
    console.log("Sending new image:", lastSentImageUrl);
    dispatch(sendImage(lastSentImageUrl));
    socket.emit("new image", {
      chatId: chatId,
      userId: loggedInUserId,
      imageUrl: lastSentImageUrl,
    });
  }, [lastSentImageUrl]);

  useLayoutEffect(() => {
    props.navigation.setOptions({
      title: "",
      headerLeft: () => (
        <View style={styles.headerLeftContainer}>
          <IconButton
            size={23}
            color={Colors.primary}
            name="arrowleft"
            onPress={() => props.navigation.goBack()}
          />
          <View style={styles.avatarContainer}>
            <Avatar rounded size={35} source={{ uri: profilePic }} />
          </View>
          <View style={styles.namesContainer}>
            <DefaultText style={styles.username}>{`@${username}`}</DefaultText>
            <DefaultText style={styles.name}>{name}</DefaultText>
          </View>
        </View>
      ),
      headerRight: () => (
        <IconButton
          style={styles.buttonRight}
          size={23}
          color={Colors.primary}
          name="ellipsis1"
          onPress={showActionSheet}
        />
      ),
    });
  }, [props.navigation, username]);

  // Renderers //
  const renderBubble = (props) => {
    return (
      <Bubble
        {...props}
        textStyle={{
          right: {
            color: "white",
          },
        }}
        wrapperStyle={{
          left: {
            backgroundColor: Colors.textInput,
          },
          right: {
            backgroundColor: Colors.primary,
          },
        }}
      />
    );
  };

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
          <Icon name={"attachment"} size={20} color={Colors.primary} />
        )}
      />
    );
  };

  const renderFooter = () => {
    if (isUploading) {
      return <Loader isLoading={true} />;
    }
    return null;
  };

  // Render //
  return isLoading ? (
    <Loader isLoading={true} />
  ) : (
    <GiftedChat
      messages={messages}
      onSend={(messages) => onSend(messages)}
      user={{
        _id: loggedInUserId,
      }}
      renderActions={renderActions}
      renderFooter={renderFooter}
      infiniteScroll
      renderBubble={renderBubble}
      bottomOffset={insets.bottom + 48} // removes extra vertical spacing in keyboard
    />
  );
};

export default ChatRoomScreen;

const styles = StyleSheet.create({
  headerLeftContainer: {
    flexDirection: "row",
    marginLeft: 10,
  },
  avatarContainer: {
    marginLeft: 6,
  },
  namesContainer: {
    marginLeft: 10,
  },
  username: {
    fontFamily: "latoBold",
    fontSize: 14,
  },
  buttonRight: {
    marginRight: 10,
  },
});
