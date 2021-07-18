import { Alert } from "react-native";

/**
 * Invokes native alert popup with title, message and okay button
 *
 * @param title string representing title of alert
 * @param message string representing title of message, can also be undefined
 * @param onPress function to call on pressing okay button, can also be null
 */
const showAlert = (title, message, onPress) => {
  const messageToShow =
    message === undefined ? "Something went wrong" : message;
  if (onPress !== null) {
    Alert.alert(title, messageToShow, [{ text: "Okay", onPress: onPress }]);
  } else {
    Alert.alert(title, messageToShow, [{ text: "Okay" }]);
  }
};

export default showAlert;
