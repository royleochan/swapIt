export const FETCH_CHATS = "FETCH_CHATS";
export const FILTER_CHATS = "FILTER_CHATS";
export const FIND_ROOM = "FIND_ROOM";

import throwApiError from "utils/apiError";
import request from "utils/request";

export const fetchChats = (userId) => {
  return async (dispatch) => {
    try {
      const response = await request.get(`/api/chats/rooms/${userId}`);
      const chats = response.data.rooms.chats;
      const activeChats = chats.map((chat) => {
        return {
          user: chat.users.find((usr) => usr.id !== userId),
          chatId: chat.id,
        };
      });

      dispatch({
        type: FETCH_CHATS,
        activeChats: activeChats,
      });
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

export const findRoom = (userId, opposingId) => {
  return async (dispatch) => {
    try {
      const response = await request.get(`/api/chats/${userId}/${opposingId}`);
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
