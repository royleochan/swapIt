import { FETCH_CHATS, FILTER_CHATS, FIND_ROOM } from "store/actions/chatscreen";

const initialState = {
  activeChats: [],
  filteredChats: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_CHATS:
      return {
        ...state,
        activeChats: [...action.activeChats],
      };
    case FILTER_CHATS:
      const { query } = action;

      return {
        ...state,
        filteredChats: state.activeChats.filter(
          (chat) => chat.user.username.includes(query)
        ),
      };
    case FIND_ROOM:
      const isChatRoomPresent = state.activeChats.find(
        (chat) => chat.chatId === action.chatRoom._id
      );
      if (isChatRoomPresent) {
        return state;
      }
      return {
        ...state,
        activeChats: [...state.activeChats, action.chatRoom],
      };
    default:
      return state;
  }
};
