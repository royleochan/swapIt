import {
  FETCH_CHATS,
  FILTER_CHATS,
  FIND_ROOM,
  RECEIVED_IMAGE,
  RECEIVED_MESSAGE,
  SENT_IMAGE,
  SENT_MESSAGE,
} from "store/actions/chatscreen";

/**
 * An activeChat object consists of:
 * {
 *     _id: String
 *     product: Product,
 *     user: User,
 *     opposingUser: User,
 *     messages: Message[],
 *     latestMessage: String,
 *     updatedAt: Time(?),
 * }
 */
const initialState = {
  activeChats: {},
  filteredChats: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_CHATS: {
      const { activeChats } = action;
      const activeChatsDict = {};
      for (let i = 0; i < activeChats.length; i++) {
        const currentChat = activeChats[i];
        currentChat.messages = currentChat.messages.map((messageObject) => {
          let messageCreator = messageObject.creator === currentChat.user._id ? currentChat.user : currentChat.opposingUser;
          return {
            _id: messageObject._id,
            text: messageObject.content,
            image: messageObject.imageUrl,
            createdAt: messageObject.createdAt,
            //sent: true,
            //received: false,
            user: {
              _id: messageObject.creator,
              name: messageCreator.username,
              avatar: messageCreator.profilePic,
            },
          };
        });
        activeChatsDict[currentChat.chatId] = currentChat;
      }
      return {
        ...state,
        activeChats: activeChatsDict,
      };
    }
    case FILTER_CHATS: {
      const {query} = action;

      return {};
    }
    case FIND_ROOM: {
      return {};
    }
    case SENT_MESSAGE: {
      const { chatId, message } = action;
      const stateActiveChats = {...state.activeChats};
      const currentChat = {...state.activeChats[chatId]};
      const user = {
        _id: currentChat.user._id,
        name: currentChat.user.username,
        avatar: currentChat.user.profilePic,
      };
      message.user = user;
      currentChat.messages.push(message);
      stateActiveChats[chatId] = currentChat;
      return {
        ...state,
        activeChats: stateActiveChats,
      };
    }
    case SENT_IMAGE: {
      const { chatId, message } = action;
      const stateActiveChats = {...state.activeChats};
      const currentChat = {...state.activeChats[chatId]};
      const user = {
        _id: currentChat.user._id,
        name: currentChat.user.username,
        avatar: currentChat.user.profilePic,
      };
      message.user = user;
      currentChat.messages.push(message);
      stateActiveChats[chatId] = currentChat;
      return {
        ...state,
        activeChats: stateActiveChats,
      };
    }
    case RECEIVED_MESSAGE: {
      const { chatId, message } = action;
      const stateActiveChats = {...state.activeChats};
      const currentChat = {...state.activeChats[chatId]};
      const user = {
        _id: currentChat.opposingUser._id,
        name: currentChat.opposingUser.username,
        avatar: currentChat.opposingUser.profilePic,
      };
      message.user = user;
      currentChat.messages.push(message);
      stateActiveChats[chatId] = currentChat;
      return {
        ...state,
        activeChats: stateActiveChats,
      };
    }
    case RECEIVED_IMAGE: {
      const { chatId, message } = action;
      const stateActiveChats = {...state.activeChats};
      const currentChat = {...state.activeChats[chatId]};
      const user = {
        _id: currentChat.opposingUser._id,
        name: currentChat.opposingUser.username,
        avatar: currentChat.opposingUser.profilePic,
      };
      message.user = user;
      currentChat.messages.push(message);
      stateActiveChats[chatId] = currentChat;
      return {
        ...state,
        activeChats: stateActiveChats,
      };
    }
    default:
      return state;
  }
};
