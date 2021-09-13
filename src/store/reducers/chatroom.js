import {
    LEAVE_ROOM,
    FETCH_ROOM,
    SEND_MESSAGE,
    SEND_IMAGE,
    RECEIVE_MESSAGE,
    RECEIVE_IMAGE,

} from "store/actions/chatroom";

const initialState = {
    init: false,
    user: {},
    opposingUser: {},
    messages: [],
};

export default (state = initialState, action) => {
    let msg;
    switch (action.type) {
        case LEAVE_ROOM:
            return {
                ...state,
                init: action.init,
            };
        case FETCH_ROOM:
            return {
                ...state,
                init: action.init,
                messages: [...action.messages],
            };
        case SEND_MESSAGE:
            msg = action.message;
            msg.user = {
                _id: state.user._id,
                avatar: state.user.profilePic,
            };
            return {
                ...state,
                messages: [...state.messages, msg],
            };
        case SEND_IMAGE:
            msg = action.message;
            msg.user = {
                _id: state.user._id,
                avatar: state.user.profilePic,
            };
            return {
                ...state,
                messages: [...state.messages, msg],
            };
        case RECEIVE_MESSAGE:
            msg = action.message;
            msg.user = {
                _id: state.opposingUser._id,
                avatar: state.opposingUser.profilePic,
            };
            return {
                ...state,
                messages: [...state.messages, msg],
            };
        case RECEIVE_IMAGE:
            msg = action.message;
            msg.user = {
                _id: state.opposingUser._id,
                avatar: state.opposingUser.profilePic,
            };
            return {
                ...state,
                messages: [...state.messages, msg],
            };
        default:
            return state;
    }
};
