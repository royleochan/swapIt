import React, { useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Button,
  Image,
} from "react-native";
import { useActionSheet } from "@expo/react-native-action-sheet";
import AntDesign from "react-native-vector-icons/AntDesign";

import { takeImage, chooseFromLibrary } from "utils/imagePicker";
import Colors from "constants/Colors";
import FemaleCategories from "constants/FemaleCategories";
import MaleCategories from "constants/MaleCategories";
import DefaultText from "components/DefaultText";
import DropDown from "components/DropDown";
import MainButton from "components/MainButton";

const UploadScreen = (props) => {
  const { showActionSheetWithOptions } = useActionSheet();
  const [pickedImage, setPickedImage] = useState();

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
        setPickedImage(selectedImage);
      }
    );
  };

  return (
    <View style={styles.screenContainer}>
      <View style={styles.imageContainer}>
        <View style={styles.imagePreview}>
          {pickedImage === undefined ? (
            <TouchableOpacity
              style={styles.iconContainer}
              onPress={showActionSheet}
            >
              <AntDesign name="plussquareo" size={24} color={Colors.primary} />
            </TouchableOpacity>
          ) : (
            <Image style={styles.image} source={{ uri: pickedImage.uri }} />
          )}
        </View>
        {pickedImage !== undefined && (
          <MainButton
            style={styles.button}
            onPress={() => setPickedImage(undefined)}
          >
            Cancel
          </MainButton>
        )}
      </View>
      <View style={styles.formContainer}>
        <View style={styles.formBoxContainer}>
          <DefaultText style={styles.inputHeader}>Title</DefaultText>
          <TextInput style={styles.titleInput} />
        </View>
        <View style={styles.formBoxContainer}>
          <DefaultText style={styles.inputHeader}>Description</DefaultText>
          <TextInput style={styles.descriptionInput} multiline={true} />
        </View>
        <View style={styles.formBoxContainer}>
          <DefaultText style={styles.inputHeader}>Price Range</DefaultText>
          <View style={styles.priceRangeContainer}>
            <TextInput style={styles.priceRangeInput} />
            <DefaultText style={styles.toText}>to</DefaultText>
            <TextInput style={styles.priceRangeInput} />
          </View>
        </View>
        <View style={styles.formBoxContainer}>
          <DefaultText style={styles.inputHeader}>Category</DefaultText>
          <DropDown placeholder="Male" items={MaleCategories} />
          <DropDown placeholder="Female" items={FemaleCategories} />
        </View>
      </View>
    </View>
  );
};

export default UploadScreen;

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    alignItems: "center",
  },
  imageContainer: {
    height: "40%",
    justifyContent: "center",
    alignItems: "center"
  },
  imagePreview: {
    width: 200,
    height: 200,
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    borderColor: Colors.gray,
    borderWidth: 3,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  button: {
    width: 200,
    height: 30,
    marginTop: 12,
  },
  formContainer: {
    height: "65%",
    width: "100%",
    backgroundColor: Colors.gray,
    padding: 26,
  },
  formBoxContainer: {
    marginVertical: 10,
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
  priceRangeContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  priceRangeInput: {
    width: "10%",
    height: 40,
    borderRadius: 8,
    paddingHorizontal: 2,
    backgroundColor: Colors.glass,
    opacity: 0.3,
  },
  toText: {
    marginHorizontal: 10,
  },
});
