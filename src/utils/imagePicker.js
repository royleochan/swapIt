import {
  REACT_APP_CLOUDINARY_URL,
  REACT_APP_CLOUDINARY_UPLOAD_PRESET,
} from "@env";
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";
import { Alert } from "react-native";

const DUMMY_PROFILE_PIC_URL =
  "https://res.cloudinary.com/dey8rgnvh/image/upload/v1608621412/test_xmobg3.png";

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

const uploadImageHandler = async (image) => {
  if (image === undefined) {
    return DUMMY_PROFILE_PIC_URL;
  }

  let base64Img = `data:image/jpg;base64,${image.base64}`;
  let data = {
    file: base64Img,
    upload_preset: REACT_APP_CLOUDINARY_UPLOAD_PRESET,
  };

  const response = await fetch(REACT_APP_CLOUDINARY_URL, {
    body: JSON.stringify(data),
    headers: {
      "content-type": "application/json",
    },
    method: "POST",
  });

  const resData = await response.json();
  return resData.url;
};

export { verifyPermissions, takeImage, chooseFromLibrary, uploadImageHandler };
