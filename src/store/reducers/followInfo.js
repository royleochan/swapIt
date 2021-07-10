import {
  FETCH_FOLLOWING,
  FETCH_FOLLOWERS,
  FOLLOW_USER,
  UNFOLLOW_USER,
} from "store/actions/followInfo";

const initialState = {
  following: [],
  followers: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_FOLLOWING:
      return {
        ...state,
        following: [...action.following],
      };
    case FETCH_FOLLOWERS:
      return {
        ...state,
        followers: [...action.followers],
      };
    case FOLLOW_USER:
      return {
        ...state,
        following: [...state.following, action.followed],
      };
    case UNFOLLOW_USER:
      return {
        ...state,
        following: state.following.filter((user) => user._id !== action.userId),
      };
    default:
      return state;
  }
};
