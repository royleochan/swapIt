import {
  AUTHENTICATE,
  RELOGIN,
  LOGOUT,
  REFRESH_USER,
  UPDATE_USER,
  LIKE_PRODUCT,
  UNLIKE_PRODUCT,
} from "store/actions/auth";

import {
  REACT_APP_BACKEND_URL
} from "@env";

import {io} from "socket.io-client";


const initialState = {
  isAuth: false, // boolean
  user: null, // object representing user schema with products populated
  jwtToken: null, // string
  socket: io(`${REACT_APP_BACKEND_URL}/chatSocket`, { autoConnect: false }),
};

export default (state = initialState, action) => {
  switch (action.type) {
    case AUTHENTICATE:
    case RELOGIN:
      return {
        ...state,
        isAuth: true,
        user: action.user,
        jwtToken: action.jwtToken,
      };
    case LOGOUT:
      return {
        isAuth: false,
        user: null,
        jwtToken: null,
      };
    case UPDATE_USER:
    case REFRESH_USER:
      return {
        ...state,
        user: action.user,
      };
    case LIKE_PRODUCT:
      return {
        ...state,
        user: {
          ...state.user,
          likes: [...state.user.likes, action.productId],
        },
      };
    case UNLIKE_PRODUCT:
      return {
        ...state,
        user: {
          ...state.user,
          likes: state.user.likes.filter((pid) => pid !== action.productId),
        },
      };

    default:
      return state;
  }
};
