// React Imports //
import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  Text,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import { useDispatch } from "react-redux";

// Antd Icon Imports //
import AntDesign from "react-native-vector-icons/AntDesign";

// Expo Action Sheet Import //
import { useActionSheet } from "@expo/react-native-action-sheet";

// React Hook Form Imports //
import { useForm, Controller } from "react-hook-form";

// Redux Action Imports //
import { signup } from "store/actions/auth";

// Utils Imports //
import {
  takeImage,
  chooseFromLibrary,
  uploadImageHandler,
} from "utils/imagePicker";
import showAlert from "utils/showAlert";

// Colors Import //
import Colors from "constants/Colors";

// Components Imports //
import GlassTextInput from "components/GlassTextInput";
import MainButton from "components/MainButton";
import Loader from "components/Loader";

// Main Component //
const SignupScreenTwo = (props) => {
  // Init //
  const formData = props.route.params;
  const dispatch = useDispatch();
  const { control, handleSubmit } = useForm();
  const { showActionSheetWithOptions } = useActionSheet();
  const [pickedImage, setPickedImage] = useState();
  const [isLoading, setIsLoading] = useState(false);

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
          setPickedImage(undefined);
          return;
        }
        setPickedImage(selectedImage);
      }
    );
  };

  const submitHandler = async (data) => {
    setIsLoading(true);
    let imageUrl;
    let formState;
    if (pickedImage !== undefined) {
      imageUrl = await uploadImageHandler(pickedImage);
      formState = { ...data, ...formData, profilePic: imageUrl };
    } else {
      formState = { ...data, ...formData };
    }

    try {
      await dispatch(signup(formState));
    } catch (err) {
      showAlert("Signup failed!", err.message, () => setIsLoading(false));
    }
  };

  // Side Effects //
  useEffect(() => {
    return () => setIsLoading(false);
  }, []);

  // Render //
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
