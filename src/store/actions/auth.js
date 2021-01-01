export const AUTHENTICATE = "AUTHENTICATE";
export const LOGOUT = "LOGOUT";
export const UPDATEUSER = "UPDATEUSER";

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
