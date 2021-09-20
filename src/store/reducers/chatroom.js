import {
    LEAVE_ROOM,
    FETCH_ROOM,
    SEND_MESSAGE,
    SEND_IMAGE,
    RECEIVE_MESSAGE,
    RECEIVE_IMAGE,

} from "store/actions/chatroom";

const initialState = {
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
            };
        case FETCH_ROOM:
            return {
                ...state,
                user: action.user,
                opposingUser: action.opposingUser,
                messages: [...action.messages].reverse(),
            };
        case SEND_MESSAGE:
            msg = action.message;
            msg.user = {
                _id: state.user._id,
                name: state.user.username,
                avatar: state.user.profilePic,
            };
            return {
                ...state,
                messages: [msg, ...state.messages],
            };
        case SEND_IMAGE:
            msg = action.message;
            msg.user = {
                _id: state.user._id,
                name: state.user.username,
                avatar: state.user.profilePic,
            };
            return {
                ...state,
                messages: [msg, ...state.messages],
            };
        case RECEIVE_MESSAGE:
            msg = action.message;
            msg.user = {
                _id: state.opposingUser._id,
                name: state.opposingUser.username,
                avatar: state.opposingUser.profilePic,
            };
            return {
                ...state,
                messages: [msg, ...state.messages],
            };
        case RECEIVE_IMAGE:
            msg = action.message;
            msg.user = {
                _id: state.opposingUser._id,
                name: state.opposingUser.username,
                avatar: state.opposingUser.profilePic,
            };
            return {
                ...state,
                messages: [msg, ...state.messages],
            };
        default:
            return state;
    }
};
