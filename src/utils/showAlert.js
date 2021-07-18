import { Alert } from "react-native";

/**
 * Invokes native alert popup with title, message and okay button
 *
 * @param title string representing title of alert
 * @param message string representing title of message
 * @param onPress function to call on pressing okay button
 */
const showAlert = (title, message, onPress) => {
  if (onPress !== null) {
    Alert.alert(title, message, [{ text: "Okay", onPress: onPress }]);
  } else {
    Alert.alert(title, message, [{ text: "Okay" }]);
  }
};

export default showAlert;
