import React, { useState, useLayoutEffect } from "react";
import {
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { useSelector } from "react-redux";
import { useActionSheet } from "@expo/react-native-action-sheet";
import { useForm, Controller } from "react-hook-form";
import { AntDesign } from "@expo/vector-icons";

import {
  takeImage,
  chooseFromLibrary,
  uploadImageHandler,
} from "utils/imagePicker";
import request from "utils/request";
import DefaultText from "components/DefaultText";
import MainButton from "components/MainButton";
import Colors from "constants/Colors";

const EditProductScreen = (props) => {
  const { _id, imageUrl } = props.route.params;
  const { control, handleSubmit, errors, reset } = useForm();
  const { showActionSheetWithOptions } = useActionSheet();
  const [displayImage, setDisplayImage] = useState(imageUrl);
  const [pickedImage, setPickedImage] = useState();

  const token = useSelector((state) => state.auth.jwtToken);

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
        setDisplayImage(selectedImage.uri);
        setPickedImage(selectedImage);
      }
    );
  };

  const saveHandler = async (data) => {
    if (pickedImage !== undefined) {
      const imageUrl = await uploadImageHandler(pickedImage);
      data.imageUrl = imageUrl;
    } else {
      data.imageUrl = imageUrl;
    }

    try {
      await request.patch(`/api/products/${_id}`, data, token);
      setPickedImage(undefined);
      setDisplayImage(undefined);
      reset({ title: "", description: "" });
    } catch (err) {
      throw new Error(err);
    }
  };

  // header save and back button
  useLayoutEffect(() => {
    props.navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity
          style={{ paddingLeft: 10 }}
          onPress={() => props.navigation.goBack()}
        >
          <AntDesign name="arrowleft" size={23} color={Colors.primary} />
        </TouchableOpacity>
      ),
    });
  }, [props.navigation]);

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.screen}>
        <TouchableOpacity onPress={showActionSheet}>
          <View style={styles.imagePreview}>
            <Image style={styles.image} source={{ uri: displayImage }} />
          </View>
        </TouchableOpacity>
        <View style={styles.formBoxContainer}>
          <DefaultText style={styles.inputHeader}>Title</DefaultText>
          <Controller
            name="title"
            defaultValue=""
            rules={{ required: true }}
            control={control}
            render={({ onChange, value }) => (
              <TextInput
                value={value}
                onChangeText={(value) => {
                  onChange(value);
                }}
                style={styles.titleInput}
              />
            )}
          />
          {errors.title && (
            <DefaultText style={styles.errorText}>
              Required field cannot be empty.
            </DefaultText>
          )}
        </View>
        <View style={styles.formBoxContainer}>
          <DefaultText style={styles.inputHeader}>Description</DefaultText>
          <Controller
            name="description"
            defaultValue=""
            rules={{ required: true }}
            control={control}
            render={({ onChange, value }) => (
              <TextInput
                value={value}
                onChangeText={(value) => {
                  onChange(value);
                }}
                style={styles.descriptionInput}
                multiline={true}
              />
            )}
          />
          {errors.description && (
            <DefaultText style={styles.errorText}>
              Required field cannot be empty.
            </DefaultText>
          )}
        </View>
        <MainButton style={styles.button} onPress={handleSubmit(saveHandler)}>
          Confirm
        </MainButton>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default EditProductScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
  },
  imagePreview: {
    width: 200,
    height: 200,
    marginBottom: 10,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#ccc",
    borderWidth: 1,
    marginTop: 20,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  errorText: {
    marginVertical: 5,
    fontSize: 10,
    color: Colors.darkPink,
  },
  formBoxContainer: {
    marginVertical: 10,
    width: "80%",
  },
  inputHeader: {
    marginVertical: 6,
  },
  titleInput: {
    width: "95%",
    height: 25,
    borderRadius: 8,
    paddingHorizontal: 2,
    backgroundColor: Colors.glass,
    opacity: 0.3,
  },
  descriptionInput: {
    width: "95%",
    height: 100,
    borderRadius: 8,
    paddingHorizontal: 2,
    backgroundColor: Colors.glass,
    opacity: 0.3,
  },
  button: {
    height: 50,
    width: 200,
    marginTop: 18,
  },
});
