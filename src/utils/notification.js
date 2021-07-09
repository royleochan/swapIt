import Constants from "expo-constants";
import * as Notifications from "expo-notifications";
import { Platform } from "react-native";

import request from "utils/request";

/**
 * This function handles the following:
 * 1. Requests permission from user for push notifications
 * 2. Obtains expo push token which is unique for every device (only resets upon app deletion and reinstallation)
 * 3. Updates push token for the user in the database
 *
 * @param uid string representing logged in user's id
 * @param jwtToken string representing user's jwt token
 * @returns user object with updated push token
 */
export default registerForPushNotificationsAsync = async (uid, jwtToken) => {
  let token;

  if (Constants.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      alert("Failed to get push token for push notification!");
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
  } else {
    alert("Must use physical device for Push Notifications");
  }

  if (Platform.OS === "android") {
    Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  // update token in the database
  console.log("Push Token: " + token);
  let user;
  try {
    const response = await request.patch(
      `/api/users/pushToken/${uid}`,
      {
        pushToken: token,
      },
      jwtToken
    );
    user = response.data.user;
  } catch (err) {
    console.log(err.response.data);
  }

  return user;
};
