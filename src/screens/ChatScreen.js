import React, { useState, useCallback, useEffect } from "react";
import { GiftedChat } from "react-native-gifted-chat";

import { useSelector } from "react-redux";
import request from "utils/request";

const ChatScreen = (props) => {
  const [messages, setMessages] = useState([]);

  const loggedInUserId = useSelector((state) => state.auth.user.id);
  const userId = props.route.params._id;
  const userProfilePic = props.route.params.profilePic;

  // const getMessages = async () => {
  //   const response = await request.get(`/api/chats/${loggedInUserId}/${userId}`);
  // };

  const getMessages = async () => {
    const response = await request.get(`/api/chats/609a8094dec46a7ce23a5e61`);
    const result = response.data.room.messages.map((message) => {
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
    return result;
  };

  useEffect(() => {
    const loadMessages = async () => {
      const result = await getMessages();
      setMessages(result.reverse());
    };
    loadMessages();
  }, []);

  const onSend = useCallback((messages = []) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, messages)
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
