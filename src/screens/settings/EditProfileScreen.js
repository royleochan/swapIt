import React, { useLayoutEffect, useState, useEffect } from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import { Avatar } from "react-native-elements";
import { useActionSheet } from "@expo/react-native-action-sheet";
import { useForm, Controller } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

import {
  takeImage,
  chooseFromLibrary,
  uploadImageHandler,
} from "utils/imagePicker";
import * as authActions from "store/actions/auth";
import Colors from "constants/Colors";
import DefaultText from "components/DefaultText";
import DefaultTextInput from "components/DefaultTextInput";
import IconButton from "components/IconButton";

const EditProfileScreen = (props) => {
  const dispatch = useDispatch();
  const { loggedInUser } = props.route.params;
  const token = useSelector((state) => state.auth.jwtToken);
  const { showActionSheetWithOptions } = useActionSheet();
  const [pickedImage, setPickedImage] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const { control, handleSubmit, errors } = useForm();

  // action sheet handler
  const showActionSheet = () => {
    const options = ["Take Photo", "Choose From Library", "Cancel"];
    const cancelButtonIndex = 2;

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
        }
        setPickedImage(selectedImage.uri);
      }
    );
  };

  // header save button
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
  }, [props.navigation]);

  const saveHandler = async (data) => {
    setIsLoading(true);
    let imageUrl;
    if (pickedImage !== undefined) {
      imageUrl = await uploadImageHandler(pickedImage);
    } else {
      imageUrl = loggedInUser.profilePic;
    }
    const formState = { ...data, profilePic: imageUrl };
    try {
      await dispatch(authActions.updateUser(formState, loggedInUser.id, token));
    } catch (err) {
      Alert.alert("Edit profile failed!", `${err}`, [
        { text: "Okay", onPress: () => setIsLoading(false) },
      ]);
    }
  };

  useEffect(() => {
    return () => setIsLoading(false);
  }, []);

  return (
    <View style={styles.screenContainer}>
      <View style={styles.imageContainer}>
        <View style={styles.profilePic}>
          <Avatar
            rounded
            size={96}
            source={{
              uri: pickedImage,
            }}
          />
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
  descriptionContainer: {
    height: 100,
    alignItems: "flex-start",
  },
  descriptionInputArea: {
    paddingTop: 0,
  },
});
