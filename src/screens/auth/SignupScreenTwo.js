import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  Text,
  Keyboard,
  TouchableWithoutFeedback,
  Alert,
} from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import { useActionSheet } from "@expo/react-native-action-sheet";
import { useForm, Controller } from "react-hook-form";
import { useDispatch } from "react-redux";

import {
  takeImage,
  chooseFromLibrary,
  uploadImageHandler,
} from "utils/imagePicker";
import * as authActions from "store/actions/auth";
import Colors from "constants/Colors";
import GlassTextInput from "components/GlassTextInput";
import MainButton from "components/MainButton";
import Loader from "components/Loader";

const SignupScreenTwo = (props) => {
  const formData = props.route.params;
  const dispatch = useDispatch();
  const { control, handleSubmit } = useForm();
  const { showActionSheetWithOptions } = useActionSheet();
  const [pickedImage, setPickedImage] = useState();
  const [isLoading, setIsLoading] = useState(false);

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
          setPickedImage(undefined);
          return;
        }
        setPickedImage(selectedImage);
      }
    );
  };

  const submitHandler = async (data) => {
    setIsLoading(true);
    const imageUrl = await uploadImageHandler(pickedImage);
    const formState = { ...data, ...formData, profilePic: imageUrl };
    try {
      await dispatch(authActions.signup(formState));
    } catch (err) {
      Alert.alert("Signup failed!", `${err}`, [
        { text: "Okay", onPress: () => setIsLoading(false) },
      ]);
    }
  };

  useEffect(() => {
    return () => setIsLoading(false);
  }, []);

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.screen}>
        {isLoading && <Loader isLoading={true} />}
        <TouchableOpacity
          style={styles.skipButton}
          onPress={handleSubmit(submitHandler)}
        >
          <Text style={styles.skipText}>Skip</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={showActionSheet}>
          <View style={styles.imageContainer}>
            {pickedImage === undefined ? (
              <AntDesign name="camerao" size={26} color={Colors.glass} />
            ) : (
              <Image style={styles.image} source={{ uri: pickedImage.uri }} />
            )}
          </View>
        </TouchableOpacity>
        <Controller
          name="location"
          defaultValue=""
          control={control}
          render={({ onChange, value }) => (
            <GlassTextInput
              value={value}
              onChangeText={(value) => {
                onChange(value);
              }}
            >
              Location
            </GlassTextInput>
          )}
        />
        <Controller
          name="description"
          defaultValue=""
          control={control}
          render={({ onChange, value }) => (
            <GlassTextInput
              value={value}
              onChangeText={(value) => {
                onChange(value);
              }}
              style={styles.descriptionInputArea}
              multiline={true}
            >
              Profile Description
            </GlassTextInput>
          )}
        />
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.iconContainer}
            onPress={() => props.navigation.goBack()}
          >
            <AntDesign name="arrowleft" size={24} color={Colors.background} />
          </TouchableOpacity>
          <MainButton
            style={styles.confirmButton}
            onPress={handleSubmit(submitHandler)}
          >
            Confirm
          </MainButton>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default SignupScreenTwo;

const styles = StyleSheet.create({
  screen: {
    backgroundColor: Colors.primary,
    flex: 1,
    alignItems: "center",
  },
  skipButton: {
    marginLeft: 300,
    marginTop: 60,
  },
  skipText: {
    color: Colors.background,
    fontFamily: "lato",
    fontSize: 16,
  },
  imageContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
    marginBottom: 20,
    backgroundColor: Colors.glass,
    backgroundColor: "#00000070",
    color: Colors.background,
    width: 200,
    height: 200,
    borderRadius: 100,
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 100,
  },
  buttonContainer: {
    width: 300,
    paddingTop: 30,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  confirmButton: {
    width: 120,
    height: 40,
  },
  descriptionInputArea: {
    paddingTop: 20,
    height: 200,
  },
});
