export const AUTHENTICATE = "AUTHENTICATE";
export const RELOGIN = "RELOGIN";
export const LOGOUT = "LOGOUT";
export const REFRESH_USER = "REFRESH_USER";
export const UPDATE_USER = "UPDATE_USER";
export const LIKE_PRODUCT = "LIKE_PRODUCT";
export const UNLIKE_PRODUCT = "UNLIKE_PRODUCT";
export const UPDATE_PASSWORD = "UPDATE_PASSWORD";

import request from "utils/request";
import throwApiError from "utils/apiError";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const authenticate = (username, password) => {
  return async (dispatch) => {
    try {
      const res = await request
        .post("/api/users/login", {
          username,
          password,
        })
        .catch((error) => {
          throwApiError(error);
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
      let message = "Something went wrong!";
      if (e.message === "USERNAME_NOT_FOUND") {
        message = "This username could not be found!";
      } else if (e.message === "INVALID_PASSWORD") {
        message = "This password is not valid!";
      }
      throw new Error(message);
    }
  };
};

export const relogin = (user, jwtToken) => {
  return (dispatch) => {
    dispatch({
      type: RELOGIN,
      user,
      jwtToken,
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
    } catch (err) {
      throwApiError(err);
    }
  };
};

export const logout = () => {
  return async (dispatch, getState) => {
    const loggedInUserId = getState().auth.user.id;

    try {
      const response = await request.post(`/api/users/logout`, {
        userId: loggedInUserId,
      });
      AsyncStorage.removeItem("authenticationData");
      dispatch({
        type: LOGOUT,
      });
    } catch (err) {
      throwApiError(err);
    }
  };
};

export const refreshUser = (updatedUser) => {
  return async (dispatch) => {
    dispatch({
      type: REFRESH_USER,
      user: updatedUser,
    });
  };
};

export const updateUser = (updatedUserCredentials) => {
  return async (dispatch, getState) => {
    const loggedInUserId = getState().auth.user.id;
    const jwtToken = getState().auth.jwtToken;

    try {
      const response = await request.patch(
        `/api/users/${loggedInUserId}`,
        updatedUserCredentials,
        jwtToken
      );
      dispatch({
        type: UPDATE_USER,
        user: response.data.user,
      });
    } catch (err) {
      throwApiError(err);
    }
  };
};

export const likeProduct = (productId) => {
  return async (dispatch, getState) => {
    const loggedInUserId = getState().auth.user.id;
    const jwtToken = getState().auth.jwtToken;

    try {
      const response = await request.patch(
        `/api/products/like/${productId}`,
        { userId: loggedInUserId },
        jwtToken
      );

      dispatch({
        type: LIKE_PRODUCT,
        productId: response.data.product._id,
      });
    } catch (err) {
      throwApiError(err);
    }
  };
};

export const unlikeProduct = (productId) => {
  return async (dispatch, getState) => {
    const loggedInUserId = getState().auth.user.id;
    const jwtToken = getState().auth.jwtToken;

    try {
      const response = await request.patch(
        `/api/products/unlike/${productId}`,
        { userId: loggedInUserId },
        jwtToken
      );
      dispatch({
        type: UNLIKE_PRODUCT,
        productId: response.data.product._id,
      });
    } catch (err) {
      throwApiError(err);
    }
  };
};

export const updatePassword = (formState) => {
  return async (dispatch, getState) => {
    const loggedInUserId = getState().auth.user.id;
    const jwtToken = getState().auth.jwtToken;

    try {
      const response = await request.patch(
        `/api/users/password/${loggedInUserId}`,
        formState,
        jwtToken
      );
      dispatch({
        type: UPDATE_PASSWORD,
      });
    } catch (err) {
      throwApiError(err);
    }
  };
};
