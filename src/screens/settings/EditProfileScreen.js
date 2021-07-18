// React Imports //
import React, { useLayoutEffect, useState, useEffect } from "react";
import { StyleSheet, View, TouchableOpacity, Image, Text } from "react-native";
import { useDispatch, useSelector } from "react-redux";

// Expo Action Sheet Import //
import { useActionSheet } from "@expo/react-native-action-sheet";

// React Hook Form Imports //
import { useForm, Controller } from "react-hook-form";

// Redux Action Imports //
import { updateUser } from "store/actions/auth";

// Utils Imports //
import {
  DUMMY_PROFILE_PIC_URL,
  takeImage,
  chooseFromLibrary,
  uploadImageHandler,
} from "utils/imagePicker";
import showAlert from "utils/showAlert";

// Colors Imports //
import Colors from "constants/Colors";

// Components Imports //
import DefaultText from "components/DefaultText";
import DefaultTextInput from "components/DefaultTextInput";
import IconButton from "components/IconButton";
import Loader from "components/Loader";

// Main Component //
const EditProfileScreen = (props) => {
  // Init //
  const { control, handleSubmit, errors } = useForm();
  const { showActionSheetWithOptions } = useActionSheet();

  const dispatch = useDispatch();
  const loggedInUser = useSelector((state) => state.auth.user);

  const [pickedImage, setPickedImage] = useState(loggedInUser.profilePic);
  const [isLoading, setIsLoading] = useState(false);

  // Navigation Functions //
  const navigateToProfile = () => {
    props.navigation.navigate("Profile");
  };

  // Functions //
  const showActionSheet = () => {
    const options = [
      "Take Photo",
      "Choose From Library",
      "Remove Current",
      "Cancel",
    ];
    const cancelButtonIndex = 3;

    showActionSheetWithOptions(
      {
        title: "Choose an action",
        options,
        cancelButtonIndex,
        tintColor: Colors.primary,
      },
      async (buttonIndex) => {
        let selectedImage;
        if (buttonIndex === 0) {
          selectedImage = await takeImage();
        } else if (buttonIndex === 1) {
          selectedImage = await chooseFromLibrary();
        } else if (buttonIndex === 2) {
          setPickedImage(DUMMY_PROFILE_PIC_URL);
          return;
        } else if (buttonIndex == 3) {
          setPickedImage(loggedInUser.profilePic);
          return;
        }

        setPickedImage(selectedImage);
      }
    );
  };

  const saveHandler = async (data) => {
    setIsLoading(true);
    let imageUrl;
    if (typeof pickedImage === "object") {
      imageUrl = await uploadImageHandler(pickedImage);
    } else {
      imageUrl = pickedImage;
    }
    const formState = { ...data, profilePic: imageUrl };
    try {
      await dispatch(updateUser(formState));
      setIsLoading(false);
      navigateToProfile();
    } catch (err) {
      showAlert("Edit profile failed!", err.message, () => setIsLoading(false));
    }
  };

  // Side Effects //
  useLayoutEffect(() => {
    props.navigation.setOptions({
      headerRight: () => (
        <IconButton
          style={{ paddingRight: 16 }}
          size={22}
          color={Colors.primary}
          name="save"
          onPress={handleSubmit(saveHandler)}
        />
      ),
    });
  }, [props.navigation, pickedImage]);

  // Render //
  return (
    <View style={styles.screenContainer}>
      {isLoading && <Loader isLoading={isLoading} />}
      <View style={styles.imageContainer}>
        <View style={styles.profilePic}>
          {typeof pickedImage === "object" && (
            <Image style={styles.image} source={{ uri: pickedImage.uri }} />
          )}
          {typeof pickedImage === "string" && (
            <Image style={styles.image} source={{ uri: pickedImage }} />
          )}
        </View>
        <TouchableOpacity onPress={showActionSheet}>
          <DefaultText>Change Profile Picture</DefaultText>
        </TouchableOpacity>
      </View>
      <View>
        <Controller
          name="name"
          defaultValue={loggedInUser.name}
          control={control}
          rules={{ required: true }}
          render={({ onChange, value }) => (
            <DefaultTextInput
              label="Name"
              value={value}
              onChangeText={(value) => {
                onChange(value);
              }}
            />
          )}
        />
        {errors.name && (
          <Text style={styles.errorText}>Required field cannot be empty.</Text>
        )}
        <Controller
          name="username"
          defaultValue={loggedInUser.username}
          control={control}
          rules={{ required: true }}
          render={({ onChange, value }) => (
            <DefaultTextInput
              label="Username"
              value={value}
              onChangeText={(value) => {
                onChange(value);
              }}
            />
          )}
        />
        {errors.username && (
          <Text style={styles.errorText}>Required field cannot be empty.</Text>
        )}
        <View>
          <Controller
            name="description"
            defaultValue={loggedInUser.description}
            control={control}
            render={({ onChange, value }) => (
              <DefaultTextInput
                label="Description"
                value={value}
                multiline={true}
                containerStyle={styles.descriptionContainer}
                style={styles.descriptionInputArea}
                onChangeText={(value) => {
                  onChange(value);
                }}
              />
            )}
          />
        </View>
        <Controller
          name="location"
          defaultValue={loggedInUser.location}
          control={control}
          render={({ onChange, value }) => (
            <DefaultTextInput
              label="Location"
              value={value}
              onChangeText={(value) => {
                onChange(value);
              }}
            />
          )}
        />
      </View>
    </View>
  );
};

export default EditProfileScreen;

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    justifyContent: "flex-start",
    backgroundColor: Colors.background,
  },
  imageContainer: {
    paddingVertical: 30,
    alignItems: "center",
  },
  profilePic: {
    paddingBottom: 15,
  },
  image: {
    width: 110,
    height: 110,
    borderRadius: 55,
  },
  errorText: {
    marginLeft: 40,
    marginTop: 5,
    color: Colors.darkPink,
  },
  descriptionContainer: {
    height: 100,
    alignItems: "flex-start",
  },
  descriptionInputArea: {
    paddingTop: 0,
  },
});
