import uuid from "react-native-uuid";

export const LEAVE_ROOM = "LEAVE_ROOM";
export const FETCH_ROOM = "FETCH_ROOM";
export const SEND_MESSAGE = "SEND_MESSAGE";
export const SEND_IMAGE = "SEND_IMAGE";
export const RECEIVE_MESSAGE = "RECEIVE_MESSAGE";
export const RECEIVE_IMAGE = "RECEIVE_IMAGE";

import throwApiError from "utils/apiError";
import request from "utils/request";

export const leaveRoom = () => {
    return (dispatch) => {
        dispatch({
            type: LEAVE_ROOM,
        });
    };
};

export const fetchRoom = (selectedRoomId, userId) => {
    return async (dispatch) => {
        try {
            const response = await request.get(
                `/api/chats/${selectedRoomId}`
            );
            const roomUsers = response.data.room.users;
            let user, opposingUser;
            if (roomUsers[0]._id === userId) {
                user = roomUsers[0];
                opposingUser = roomUsers[1];
            } else {
                user = roomUsers[1];
                opposingUser = roomUsers[0];
            }

            const usersDict = {}
            usersDict[userId] = user;
            usersDict[opposingUser._id] = opposingUser;

            const messages = response.data.room.messages.map(message => {
                return {
                    _id: message._id,
                    text: message.content,
                    image: message.imageUrl,
                    createdAt: message.createdAt,
                    //sent: true,
                    //received: message.seen,
                    user: {
                        _id: message.creator,
                        name: usersDict[message.creator].username,
                        avatar: usersDict[message.creator].profilePic,
                    },
                };
            });

            dispatch({
                type: FETCH_ROOM,
                user: user,
                opposingUser: opposingUser,
                messages: messages,
            });
        } catch (err) {
            throwApiError(err);
        }
    };
};

export const sendMessage = (messageContent) => {
    return (dispatch) => {
        const message = {
            _id: uuid.v4(),
            text: messageContent,
            image: "",
            createdAt: Date.now(),
            //sent: true,
            //received: false,
        };
        dispatch({
            type: SEND_MESSAGE,
            message: message,
        });
    };
};

export const sendImage = (imageUrl) => {
    return (dispatch) => {
        const message = {
            _id: uuid.v4(),
            text: "",
            image: imageUrl,
            createdAt: Date.now(),
            //sent: true,
            //received: false,
        };
        dispatch({
            type: SEND_IMAGE,
            message: message,
        });
    };
};

export const receiveMessage = (messageObject) => {
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
            type: RECEIVE_MESSAGE,
            message: message,
        });
    };
};

export const receiveImage = (messageObject) => {
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
            type: RECEIVE_IMAGE,
            message: message,
        });
    };
};
