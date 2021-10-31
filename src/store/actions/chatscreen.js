import uuid from "react-native-uuid";

export const FETCH_CHATS = "FETCH_CHATS";
export const FILTER_CHATS = "FILTER_CHATS";
export const FIND_ROOM = "FIND_ROOM";
export const SENT_MESSAGE = "SENT_MESSAGE";
export const SENT_IMAGE = "SENT_IMAGE";
export const RECEIVED_MESSAGE = "RECEIVED_MESSAGE";
export const RECEIVED_IMAGE = "RECEIVED_IMAGE";

import throwApiError from "utils/apiError";
import request from "utils/request";

export const fetchChats = (userId) => {
  return async (dispatch) => {
    try {
      const response = await request.get(`/api/chats/rooms/${userId}`);
      const chats = response.data.chats;

      dispatch({
        type: FETCH_CHATS,
        activeChats: chats,
      });
      return chats;
    } catch (err) {
      throwApiError(err);
    }
  };
};

export const filterChats = (query) => {
  return async (dispatch) => {
    dispatch({
      type: FILTER_CHATS,
      query,
    });
  };
};

export const findRoom = (productId, userId, opposingId) => {
  return async (dispatch) => {
    try {
      const response = await request.get(
        `/api/chats/${productId}/${userId}/${opposingId}`
      );
      const chatRoom = response.data.room;
      chatRoom.user = chatRoom.users.find((usr) => usr.id !== userId);
      chatRoom.chatId = chatRoom._id;
      dispatch({
        type: FIND_ROOM,
        chatRoom: chatRoom,
      });
      return chatRoom;
    } catch (err) {
      throwApiError(err);
    }
  };
};

export const sentMessage = (chatId, messageContent) => {
  return (dispatch) => {
    const message = {
      _id: uuid.v4(),
      text: messageContent,
      image: "",
      createdAt: Date.now(),
    };
    dispatch({
      type: SENT_MESSAGE,
      chatId: chatId,
      message: message,
    });
  };
};

export const sentImage = (chatId, imageUrl) => {
  return (dispatch) => {
    const message = {
      _id: uuid.v4(),
      text: "",
      image: imageUrl,
      createdAt: Date.now(),
    };
    dispatch({
      type: SENT_MESSAGE,
      chatId: chatId,
      message: message,
    });
  };
};

export const receivedMessage = (chatId, messageObject) => {
  return (dispatch) => {
    const message = {
      _id: messageObject._id,
      text: messageObject.content,
      image: messageObject.imageUrl,
      createdAt: messageObject.createdAt,
      //sent: true,
      //received: false,
    };
    dispatch({
      type: RECEIVED_MESSAGE,
      chatId: chatId,
      message: message,
    });
  };
};

export const receivedImage = (chatId, messageObject) => {
  return (dispatch) => {
    const message = {
      _id: messageObject._id,
      text: messageObject.content,
      image: messageObject.imageUrl,
      createdAt: messageObject.createdAt,
      //sent: true,
      //received: false,
    };
    dispatch({
      type: RECEIVED_MESSAGE,
      chatId: chatId,
      message: message,
    });
  };
};
