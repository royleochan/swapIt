import {
  AUTHENTICATE,
  LOGOUT,
  REFRESHUSER,
  UPDATEUSER,
  LIKE_PRODUCT,
  UNLIKE_PRODUCT,
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
    case REFRESHUSER:
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
