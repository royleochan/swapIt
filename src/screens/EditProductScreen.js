import React, { useState, useLayoutEffect } from "react";
import {
  Alert,
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

import {
  takeImage,
  chooseFromLibrary,
  uploadImageHandler,
} from "utils/imagePicker";
import request from "utils/request";
import FemaleCategories from "constants/FemaleCategories";
import MaleCategories from "constants/MaleCategories";
import DefaultText from "components/DefaultText";
import MainButton from "components/MainButton";
import DropDown from "components/DropDown";
import Loader from "components/Loader";
import IconButton from "components/IconButton";
import Colors from "constants/Colors";

const EditProductScreen = (props) => {
  const { _id, imageUrl, title, description } = props.route.params;
  const { control, handleSubmit, errors, reset } = useForm({
    defaultValues: {
      title: title,
      description: description,
    },
  });
  const { showActionSheetWithOptions } = useActionSheet();
  const [displayImage, setDisplayImage] = useState(imageUrl);
  const [pickedImage, setPickedImage] = useState();
  const [maleCategory, setMaleCategory] = useState(null);
  const [femaleCategory, setFemaleCategory] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

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
          setDisplayImage(selectedImage.uri);
        } else if (buttonIndex === 1) {
          selectedImage = await chooseFromLibrary();
          setDisplayImage(selectedImage.uri);
        }
        setPickedImage(selectedImage);
      }
    );
  };

  const saveHandler = async (data) => {
    if (!isValidCategory()) {
      Alert.alert("Edit failed!", "Please select exactly one category.", [
        { text: "Okay" },
      ]);
      return;
    }

    setIsLoading(true);
    if (pickedImage !== undefined) {
      const imageUrl = await uploadImageHandler(pickedImage);
      data.imageUrl = imageUrl;
    } else {
      data.imageUrl = imageUrl;
    }

    data.category = maleCategory !== null ? maleCategory : femaleCategory;

    try {
      await request.patch(`/api/products/${_id}`, data, token);
      setPickedImage(undefined);
      setDisplayImage(undefined);
      setMaleCategory(null);
      setFemaleCategory(null);
      reset({ title: "", description: "" });
      setIsLoading(false);
      props.navigation.push("Profile");
    } catch (err) {
      throw new Error(err);
    }
  };

  // category validation
  const isValidCategory = () => {
    if (maleCategory === null && femaleCategory === null) {
      return false;
    } else if (maleCategory !== null && femaleCategory !== null) {
      return false;
    } else {
      return true;
    }
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.screen}>
        {isLoading && <Loader isLoading={true} />}
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
                defaultValue={description}
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
        <View style={styles.formBoxContainer}>
          <DefaultText style={styles.inputHeader}>Category</DefaultText>
          <DropDown
            functions={[maleCategory, setMaleCategory]}
            placeholder="Male"
            items={MaleCategories}
          />
          <DropDown
            functions={[femaleCategory, setFemaleCategory]}
            placeholder="Female"
            items={FemaleCategories}
          />
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
