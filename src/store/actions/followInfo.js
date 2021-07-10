export const FETCH_FOLLOWERS = "FETCH_FOLLOWERS";
export const FETCH_FOLLOWING = "FETCH_FOLLOWING";
export const FOLLOW_USER = "FOLLOW_USER";
export const UNFOLLOW_USER = "UNFOLLOW_USER";
import request from "utils/request";

export const fetchFollowers = (selectedUserId) => {
  return async (dispatch) => {
    try {
      const response = await request.get(
        `/api/users/followers/${selectedUserId}`
      );

      dispatch({
        type: FETCH_FOLLOWERS,
        followers: response.data.result.followers,
      });
    } catch (err) {
      throw new Error(err.response.data.message);
    }
  };
};

export const fetchFollowing = (selectedUserId) => {
  return async (dispatch) => {
    try {
      const response = await request.get(
        `/api/users/following/${selectedUserId}`
      );

      dispatch({
        type: FETCH_FOLLOWING,
        following: response.data.result.following,
      });
    } catch (err) {
      throw new Error(err.response.data.message);
    }
  };
};

export const followUser = (selectedUserId) => {
  return async (dispatch, getState) => {
    const loggedInUserId = getState().auth.user.id;
    const jwtToken = getState().auth.jwtToken;

    try {
      const response = await request.patch(
        `/api/users/follow/${selectedUserId}`,
        { loggedInUserId },
        jwtToken
      );

      dispatch({
        type: FOLLOW_USER,
        followed: response.data.followed,
      });
    } catch (err) {
      throw new Error(err.response.data.message);
    }
  };
};

export const unfollowUser = (selectedUserId) => {
  return async (dispatch, getState) => {
    const loggedInUserId = getState().auth.user.id;
    const jwtToken = getState().auth.jwtToken;

    try {
      const response = await request.patch(
        `/api/users/unfollow/${selectedUserId}`,
        { loggedInUserId },
        jwtToken
      );

      dispatch({
        type: UNFOLLOW_USER,
        userId: response.data.unfollowed._id,
      });
    } catch (err) {
      throw new Error(err.response.data.message);
    }
  };
};
