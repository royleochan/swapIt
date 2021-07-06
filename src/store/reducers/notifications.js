import {
  FETCH_NOTIFICATIONS,
  DISMISS_NOTIFICATION,
  MARK_ALL_NOTIFICATIONS,
} from "store/actions/notifications";

const initialState = {
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
    default:
      return state;
  }
};
