export const AUTHENTICATE = "AUTHENTICATE";
export const LOGOUT = "LOGOUT";
export const UPDATEUSER = "UPDATEUSER";
export const UPDATEUSERFOLLOWING = "UPDATEUSERFOLLOWING";
export const UPDATEUSERLIKES = "UPDATEUSERLIKES";

import AsyncStorage from "@react-native-async-storage/async-storage";

import request from "utils/request";

export const authenticate = (username, password) => {
  return async (dispatch) => {
    try {
      const res = await request
        .post("/api/users/login", {
          username,
          password,
        })
        .catch((error) => {
          const errorResData = error.response.data;
          const errorId = errorResData.message;
          let message = "Something went wrong!";
          if (errorId === "USERNAME_NOT_FOUND") {
            message = "This username could not be found!";
          } else if (errorId === "INVALID_PASSWORD") {
            message = "This password is not valid!";
          }
          throw new Error(message);
        });

      const resData = res.data;

      await AsyncStorage.setItem(
        "authenticationData",
        JSON.stringify({
          jwtToken: resData.token,
          user: resData.user,
        })
      );

      dispatch({
        type: AUTHENTICATE,
        user: resData.user,
        jwtToken: resData.token,
      });
    } catch (e) {
      throw new Error(e);
    }
  };
};

export const relogin = (token, user) => {
  return (dispatch) => {
    dispatch({
      type: RELOGIN,
      user,
      token,
    });
  };
};

export const signup = (signupCredentials) => {
  return async (dispatch) => {
    try {
      const response = await request.post(
        `/api/users/signup`,
        signupCredentials
      );
      const resData = response.data;

      await AsyncStorage.setItem(
        "authenticationData",
        JSON.stringify({
          jwtToken: resData.token,
          user: resData.user,
        })
      );

      dispatch({
        type: AUTHENTICATE,
        user: resData.user,
        jwtToken: resData.token,
      });
    } catch (e) {
      throw new Error(e.response.data.message);
    }
  };
};

export const logout = () => {
  return async (dispatch) => {
    dispatch({
      type: LOGOUT,
    });
  };
};

export const updateUser = (user) => {
  return async (dispatch) => {
    dispatch({
      type: UPDATEUSER,
      user,
    });
  };
};

export const updateUserFollowing = (
  loggedInUserId,
  selectedUserId,
  token,
  isFollow
) => {
  return async (dispatch) => {
    try {
      let response;
      if (isFollow) {
        response = await request.patch(
          `/api/users/follow/${selectedUserId}`,
          { loggedInUserId: loggedInUserId },
          token
        );
      } else {
        response = await request.patch(
          `/api/users/unfollow/${selectedUserId}`,
          { loggedInUserId: loggedInUserId },
          token
        );
      }

      const resData = response.data;

      dispatch({
        type: UPDATEUSERFOLLOWING,
        user: resData.user,
      });
    } catch (e) {
      throw new Error(e.response.data.message);
    }
  };
};

export const updateUserLikes = (productId, loggedInUserId, token, isLike) => {
  return async (dispatch) => {
    try {
      let response;
      if (isLike) {
        response = await request.patch(
          `/api/products/like/${productId}`,
          { userId: loggedInUserId },
          token
        );
      } else {
        response = await request.patch(
          `/api/products/unlike/${productId}`,
          { userId: loggedInUserId },
          token
        );
      }

      const resData = response.data;

      dispatch({
        type: UPDATEUSERLIKES,
        user: resData.user,
      });
    } catch (e) {
      throw new Error(e.response.data.message);
    }
  };
};
