export const FETCH_NOTIFICATIONS = "FETCH_NOTIFICATIONS";
export const MARK_ALL_NOTIFICATIONS = "MARK_ALL_NOTIFICATIONS";
export const DISMISS_NOTIFICATION = "DISMISS_NOTIFICATION";
export const SET_ACTIVE_NOTIFICATION = "SET_ACTIVE_NOTIFICATION";

import throwApiError from "utils/apiError";
import request from "utils/request";

export const fetchNotifications = () => {
  return async (dispatch, getState) => {
    const loggedInUserId = getState().auth.user.id;
    try {
      const response = await request.get(
        `/api/notifications/${loggedInUserId}`
      );
      dispatch({
        type: FETCH_NOTIFICATIONS,
        notifications: response.data.notifications,
      });
    } catch (err) {
      throwApiError(err);
    }
  };
};

export const markAllNotificationsAsRead = (notificationIds) => {
  return async (dispatch, getState) => {
    const { auth } = getState();
    const userId = auth.user.id;
    const jwtToken = auth.jwtToken;

    try {
      dispatch({
        type: MARK_ALL_NOTIFICATIONS,
        notificationIds,
      });

      const response = await request.patch(
        "/api/notifications",
        {
          userId,
          notificationIds,
        },
        jwtToken
      );
    } catch (err) {
      throwApiError(err);
    }
  };
};

export const dismissNotification = (notificationId) => {
  return async (dispatch, getState) => {
    const { auth } = getState();
    const jwtToken = auth.jwtToken;

    try {
      dispatch({
        type: DISMISS_NOTIFICATION,
        notificationId,
      });

      const response = await request.delete(
        `/api/notifications/${notificationId}`,
        jwtToken
      );
    } catch (err) {
      throwApiError(err);
    }
  };
};

export const setActiveNotification = (notificationId) => {
  return (dispatch) => {
    dispatch({
      type: SET_ACTIVE_NOTIFICATION,
      notificationId,
    });
  };
};
