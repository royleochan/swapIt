import * as ImagePicker from "expo-image-picker";
import { Alert } from "react-native";

import request from "utils/request";

const DUMMY_PROFILE_PIC_URL = "https://i.imgur.com/tiRSkS8.jpg";

const verifyCameraPermissions = async () => {
  const cameraStatus = await ImagePicker.requestCameraPermissionsAsync();

  if (cameraStatus.status !== "granted") {
    Alert.alert(
      "Insufficient Permissions!",
      "You need to grant camera permissions to upload an Image.",
      [{ text: "Okay" }]
    );
    return false;
  }
  return true;
};

const verifyLibraryPermissions = async () => {
  const mediaStatus = await ImagePicker.requestMediaLibraryPermissionsAsync();

  if (mediaStatus.status !== "granted") {
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
  const hasPermission = await verifyCameraPermissions();
  if (!hasPermission) {
    return;
  }
  const image = await ImagePicker.launchCameraAsync({
    allowsEditing: true,
    aspect: [10, 10],
    quality: 1,
  });

  return image;
};

const chooseFromLibrary = async () => {
  const hasPermission = await verifyLibraryPermissions();
  if (!hasPermission) {
    return;
  }
  const image = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.All,
    allowsEditing: true,
    aspect: [10, 10],
    quality: 1,
  });

  return image;
};

const uploadImageHandler = async (image) => {
  if (image === undefined) {
    return DUMMY_PROFILE_PIC_URL;
  }

  // get secure s3 url from server
  const res = await request.get("/api/s3Url");
  const { url } = res.data;

  // convert image uri to blob
  const resp = await fetch(image.uri);
  const imageBody = await resp.blob();

  // upload to s3 bucket
  await fetch(url, {
    method: "PUT",
    body: imageBody,
  });

  const imageUrl = url.split("?")[0];
  return imageUrl;
};

export {
  DUMMY_PROFILE_PIC_URL,
  verifyCameraPermissions,
  verifyLibraryPermissions,
  takeImage,
  chooseFromLibrary,
  uploadImageHandler,
};
