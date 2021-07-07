export const FETCH_NOTIFICATIONS = "FETCH_NOTIFICATIONS";
export const MARK_ALL_NOTIFICATIONS = "MARK_ALL_NOTIFICATIONS";
export const DISMISS_NOTIFICATION = "DISMISS_NOTIFICATION";
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
      throw new Error(err.response.data.message);
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
      throw new Error(err.response.data.message);
    }
  };
};

export const dismissNotification = (notificationId) => {
  return async (dispatch, getState) => {
    const { auth } = getState();
    const userId = auth.user.id;
    const jwtToken = auth.jwtToken;

    try {
      dispatch({
        type: DISMISS_NOTIFICATION,
        notificationId,
      });

      const response = await request.delete(
        `/api/notifications/${userId}/${notificationId}`,
        jwtToken
      );
    } catch (err) {
      throw new Error(err.response.data.message);
    }
  };
};
