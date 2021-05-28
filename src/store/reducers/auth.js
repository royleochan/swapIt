import { AUTHENTICATE, LOGOUT, UPDATEUSER, UPDATEUSERFOLLOWING, UPDATEUSERLIKES } from "store/actions/auth";

const initialState = {
  isAuth: false,
  user: null,
  jwtToken: null,
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
    case UPDATEUSER, UPDATEUSERFOLLOWING, UPDATEUSERLIKES:
      return {
        ...state,
        user: action.user,
      };
    default:
      return state;
  }
};
