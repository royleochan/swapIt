export const AUTHENTICATE = "AUTHENTICATE";
export const LOGOUT = "LOGOUT";
export const UPDATEUSER = "UPDATEUSER";

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
        "authentication_data",
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
      console.log(err);
      throw err;
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
