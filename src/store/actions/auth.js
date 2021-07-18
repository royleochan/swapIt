export const AUTHENTICATE = "AUTHENTICATE";
export const LOGOUT = "LOGOUT";
export const REFRESHUSER = "REFRESHUSER";
export const UPDATEUSER = "UPDATEUSER";
export const LIKE_PRODUCT = "LIKE_PRODUCT";
export const UNLIKE_PRODUCT = "UNLIKE_PRODUCT";
export const UPDATE_PASSWORD = "UPDATE_PASSWORD";

import request from "utils/request";
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
          const errorResData = error.response.data;
          const errorId = errorResData.message;
          let message = "Something went wrong!";
          if (errorId === "USERNAME_NOT_FOUND") {
            message = "This username could not be found!";
          } else if (errorId === "INVALID_PASSWORD") {
            message = "This password is not valid!";
          }
          throw message;
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

export const refreshUser = (updatedUser) => {
  return async (dispatch) => {
    dispatch({
      type: UPDATEUSER,
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
        type: UPDATEUSER,
        user: response.data.user,
      });
    } catch (e) {
      throw new Error(e.response.data.message);
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
      console.log(err);
      throw new Error(err.response.data.message);
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
      throw new Error(err.response.data.message);
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
      throw new Error(err.response.data.message);
    }
  };
};
