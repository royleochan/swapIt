import {
  FETCH_NOTIFICATIONS,
  DISMISS_NOTIFICATION,
  MARK_ALL_NOTIFICATIONS,
  SET_ACTIVE_NOTIFICATION,
} from "store/actions/notifications";

const initialState = {
  activeNotification: null,
  notifications: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_NOTIFICATIONS:
      return {
        ...state,
        notifications: [...action.notifications],
      };
    case MARK_ALL_NOTIFICATIONS:
      return {
        ...state,
        notifications: state.notifications.map((notification) => {
          notification.isRead = true;
          return notification;
        }),
      };
    case DISMISS_NOTIFICATION:
      return {
        ...state,
        notifications: state.notifications.filter(
          (notification) => notification._id !== action.notificationId
        ),
      };
    case SET_ACTIVE_NOTIFICATION:
      return {
        ...state,
        activeNotification: action.notificationId,
      };
    default:
      return state;
  }
};
