import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";
import { Alert } from "react-native";

const verifyPermissions = async () => {
  const result = await Permissions.askAsync(
    Permissions.CAMERA,
    Permissions.CAMERA_ROLL
  );
  if (result.status !== "granted") {
    Alert.alert(
      "Insufficient Permissions!",
      "You need to grant camera permissions to upload an Image.",
      [{ text: "Okay" }]
    );
    return false;
  }
  return true;
};

const takeImage = async () => {
  const hasPermission = await verifyPermissions();
  if (!hasPermission) {
    return;
  }
  const image = await ImagePicker.launchCameraAsync({
    allowsEditing: true,
    base64: true,
    aspect: [10, 10],
    quality: 1,
  });

  return image;
};

const chooseFromLibrary = async () => {
  const hasPermission = await verifyPermissions();
  if (!hasPermission) {
    return;
  }
  const image = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.All,
    allowsEditing: true,
    base64: true,
    aspect: [10, 10],
    quality: 1,
  });

  return image;
};

export { verifyPermissions, takeImage, chooseFromLibrary };
