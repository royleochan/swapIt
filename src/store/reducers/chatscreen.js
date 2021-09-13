import {
    FETCH_CHATS,
    FETCH_SEARCH,
    FIND_ROOM,
} from "store/actions/chatscreen";

const initialState = {
    activeChats: [],
    searchedChats: [],
};

export default (state = initialState, action) => {
    switch (action.type) {
        case FETCH_CHATS:
            return {
                ...state,
                activeChats: [...action.activeChats],
            };
        case FETCH_SEARCH:
            return {
                ...state,
                searchedChats: [...action.searchedChats],
            };
        case FIND_ROOM:
            return {
                ...state,
                activeChats: [...state.activeChats, action.chatRoom],
            };
        default:
            return state;
    }
};
