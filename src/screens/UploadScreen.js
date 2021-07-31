// React Imports //
import React, { useState, useLayoutEffect, useCallback } from "react";
import {
  View,
  StyleSheet,
  TextInput,
  Image,
  Text,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";
import { useSelector } from "react-redux";
import { useActionSheet } from "@expo/react-native-action-sheet";

// React Navigation Hook Imports //
import { useFocusEffect } from "@react-navigation/native";

// React Hook Form Imports //
import { useForm, Controller } from "react-hook-form";

// Util Imports //
import request from "utils/request";
import {
  takeImage,
  chooseFromLibrary,
  uploadImageHandler,
} from "utils/imagePicker";

// Constants Imports //
import Colors from "constants/Colors";
import FemaleCategories from "constants/FemaleCategories";
import MaleCategories from "constants/MaleCategories";

// Components Imports //
import DefaultText from "components/DefaultText";
import DropDown from "components/DropDown";
import MainButton from "components/MainButton";
import Loader from "components/Loader";
import IconButton from "components/IconButton";

// Main Component //
const UploadScreen = (props) => {
  // Init //
  const loggedInUserId = useSelector((state) => state.auth.user.id);
  const jwtToken = useSelector((state) => state.auth.jwtToken);
  const { showActionSheetWithOptions } = useActionSheet();
  const [pickedImage, setPickedImage] = useState();
  const [isLoading, setIsLoading] = useState(false);

  // form states
  const { control, handleSubmit, errors, watch, reset } = useForm();
  const watchMinPrice = watch("minPrice");
  const watchMaxPrice = watch("maxPrice");
  const [maleCategory, setMaleCategory] = useState(null);
  const [femaleCategory, setFemaleCategory] = useState(null);

  // Functions //
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
        setPickedImage(selectedImage);
      }
    );
  };

  // image validation
  const isValidImage = () => {
    return pickedImage !== undefined;
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

  // price validation
  const isValidPriceRange = () => {
    const minPrice = parseInt(watchMinPrice, 10);
    const maxPrice = parseInt(watchMaxPrice, 10);
    if (isNaN(minPrice) || isNaN(maxPrice)) {
      return false;
    } else if (minPrice > maxPrice) {
      return false;
    } else if (maxPrice < minPrice) {
      return false;
    } else {
      return true;
    }
  };

  // reset inputs
  const resetInputs = () => {
    reset();
    setMaleCategory(null);
    setFemaleCategory(null);
    setPickedImage(undefined);
  };

  const uploadHandler = async (data) => {
    if (!isValidPriceRange) {
      Alert.alert(
        "Upload failed!",
        "Please ensure prices are whole numbers and min price is less than max price",
        [{ text: "Okay" }]
      );
      return;
    }
    if (!isValidCategory()) {
      Alert.alert("Upload failed!", "Please select exactly one category.", [
        { text: "Okay" },
      ]);
      return;
    }
    if (!isValidImage()) {
      Alert.alert("Upload failed!", "Please select an image for your item.", [
        { text: "Okay" },
      ]);
      return;
    }

    setIsLoading(true);
    const imageUrl = await uploadImageHandler(pickedImage);
    data.imageUrl = imageUrl;
    data.minPrice = parseInt(watchMinPrice, 10);
    data.maxPrice = parseInt(watchMaxPrice, 10);
    data.category = maleCategory !== null ? maleCategory : femaleCategory;
    data.creator = loggedInUserId;

    try {
      await request.post("/api/products/", data, jwtToken);
      resetInputs();
      setIsLoading(false);
    } catch (err) {
      Alert.alert("Request failed", `${err.response.data.message}`, [
        {
          text: "Okay",
          onPress: () => {
            setIsLoading(false);
          },
        },
      ]);
    }
  };

  // Side Effects //
  // header upload button
  useLayoutEffect(() => {
    props.navigation.setOptions({
      headerLeft: () => <View></View>,
      headerRight: () => (
        <IconButton
          style={{ paddingRight: 16 }}
          size={22}
          color={Colors.primary}
          name="upload"
          onPress={handleSubmit(uploadHandler)}
        />
      ),
    });
  }, [props.navigation, maleCategory, femaleCategory, pickedImage]);

  // effect is ran when screen comes into focus: ensures inputs are cleared when screen is blurred (goes out of focus)
  useFocusEffect(
    useCallback(() => {
      return () => resetInputs();
    }, [])
  );

  // Render //
  if (isLoading) {
    return <Loader isLoading={true} />;
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS == "ios" ? "padding" : "height"}
      style={styles.screenContainer}
    >
      <ScrollView style={styles.formContainer}>
        <View style={styles.imageContainer}>
          <View style={styles.imagePreview}>
            {pickedImage === undefined ? (
              <IconButton
                size={24}
                color={Colors.primary}
                name="plussquareo"
                onPress={showActionSheet}
              />
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
            <Text style={styles.errorText}>
              Required field cannot be empty.
            </Text>
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
            <Text style={styles.errorText}>
              Required field cannot be empty.
            </Text>
          )}
        </View>
        <View style={styles.formBoxContainer}>
          <DefaultText style={styles.inputHeader}>Price Range</DefaultText>
          <View style={styles.priceRangeContainer}>
            <Controller
              name="minPrice"
              defaultValue=""
              rules={{
                required: {
                  value: true,
                  message: "Minimum price range cannot be empty.",
                },
              }}
              control={control}
              render={({ onChange, value }) => (
                <TextInput
                  value={value}
                  onChangeText={(value) => {
                    onChange(value);
                  }}
                  style={styles.priceRangeInput}
                  keyboardType="numeric"
                />
              )}
            />
            <DefaultText style={styles.toText}>to</DefaultText>
            <Controller
              name="maxPrice"
              defaultValue=""
              rules={{
                required: {
                  value: true,
                  message: "Minimum price range cannot be empty.",
                },
              }}
              control={control}
              render={({ onChange, value }) => (
                <TextInput
                  value={value}
                  onChangeText={(value) => {
                    onChange(value);
                  }}
                  style={styles.priceRangeInput}
                  keyboardType="decimal-pad"
                  returnKeyType="done"
                />
              )}
            />
            <View style={styles.priceErrorContainer}>
              {errors.minPrice && (
                <Text style={styles.errorText}>{errors.minPrice.message}</Text>
              )}
              {errors.maxPrice && (
                <Text style={styles.errorText}>{errors.maxPrice.message}</Text>
              )}
            </View>
          </View>
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
        <View style={styles.space}></View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default UploadScreen;

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    alignItems: "center",
  },
  formContainer: {
    width: "100%",
    backgroundColor: Colors.background,
    paddingHorizontal: 26,
  },
  imageContainer: {
    height: "40%",
    justifyContent: "center",
    alignItems: "center",
  },
  imagePreview: {
    width: 200,
    height: 200,
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    borderColor: Colors.primary,
    borderWidth: 0.8,
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
  errorText: {
    marginVertical: 5,
    fontSize: 10,
    color: Colors.darkPink,
  },
  formBoxContainer: {
    marginVertical: 10,
    width: "100%",
  },
  inputHeader: {
    marginVertical: 6,
  },
  titleInput: {
    width: "95%",
    height: 25,
    borderRadius: 8,
    paddingHorizontal: 5,
    backgroundColor: Colors.textInput,
  },
  descriptionInput: {
    width: "95%",
    height: 100,
    borderRadius: 8,
    paddingHorizontal: 5,
    backgroundColor: Colors.textInput,
  },
  priceRangeContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  priceRangeInput: {
    width: "15%",
    height: 40,
    borderRadius: 8,
    paddingHorizontal: 5,
    backgroundColor: Colors.textInput,
  },
  priceErrorContainer: {
    marginLeft: 12,
    width: "70%",
  },
  toText: {
    marginHorizontal: 10,
  },
  space: {
    height: 160,
  },
});
