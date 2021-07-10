import {
  AUTHENTICATE,
  LOGOUT,
  REFRESHUSER,
  UPDATEUSER,
  UPDATEUSERLIKES,
} from "store/actions/auth";

const initialState = {
  isAuth: false, // boolean
  user: null, // object representing user schema with products populated
  jwtToken: null, // string
};

export default (state = initialState, action) => {
  switch (action.type) {
    case AUTHENTICATE:
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
    case UPDATEUSER:
    case UPDATEUSERLIKES:
    case REFRESHUSER:
      return {
        ...state,
        user: action.user,
      };
    default:
      return state;
  }
};
