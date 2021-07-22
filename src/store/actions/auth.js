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

/**
 * Async action to login user. Sets login information in async storage if login is successful.
 *
 * @param username {string}
 * @param password {string}
 * @throws Error object containing error message if username does not exist or if password is wrong
 */
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

/**
 * Non-async action to relogin user.
 *
 * @param user {object} user schema information
 * @param jwtToken {string} representing jwtToken
 */
export const relogin = (user, jwtToken) => {
  return (dispatch) => {
    dispatch({
      type: RELOGIN,
      user,
      jwtToken,
    });
  };
};

/**
 * Async action for signing up. Sets login information in async storage if signup is successful.
 *
 * @param signupCredentials {object} sign up information
 * @throws Error object if api call for signing up fails
 */
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

/**
 * Async action for logging out. Api call will set expo push token to empty string. Cleans up async storage login information if successful.
 *
 * @throws Error object if api call for signing up fails
 */
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

/**
 * Non-async action to refresh and update user information in redux store.
 *
 * @param updatedUser {object} user schema with updated info
 */
export const refreshUser = (updatedUser) => {
  return async (dispatch) => {
    dispatch({
      type: REFRESH_USER,
      user: updatedUser,
    });
  };
};

/**
 * Async action to update user information.
 *
 * @param updatedUserCredentials {object} user schema with updated info
 * @throws Error object if api call for updating user fails
 */
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

/**
 * Async action to like a product.
 *
 * @param productId {string}
 * @throws Error object if api call for liking product fails
 */
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

/**
 * Async action to unlike a product.
 *
 * @param productId {string}
 * @throws Error object if api call for unliking product fails
 */
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

/**
 * Async action to update a user's password.
 *
 * @param formState {object} 
 * @throws Error object if api call to update password fails
 */
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
