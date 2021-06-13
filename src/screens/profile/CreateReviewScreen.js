import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput } from "react-native";
import { Rating } from "react-native-elements";
import { useForm, Controller } from "react-hook-form";

import Colors from "constants/Colors";
import DefaultText from "components/DefaultText";
import MainButton from "components/MainButton";

const CreateReviewScreen = () => {
  const [userRating, setUserRating] = useState();
  const { control, handleSubmit, errors } = useForm();

  const submitHandler = async (data) => {
    console.log(userRating);
    console.log(data.description);
  };

  return (
    <View style={styles.screenContainer}>
      <DefaultText style={styles.headerText}>Leave a Review</DefaultText>
      <View style={styles.ratingContainer}>
        <DefaultText style={styles.labelText}>Rate the Swapper</DefaultText>
        {/* {userRating !== undefined && (
          <DefaultText style={styles.labelText}>{userRating} / 5</DefaultText>
        )} */}
        <Rating
          type="custom"
          imageSize={28}
          ratingBackgroundColor={Colors.background}
          ratingColor={Colors.star}
          fractions={0}
          startingValue={0}
          onFinishRating={(rating) => setUserRating(rating)}
          style={styles.rating}
        />
      </View>
      <DefaultText style={styles.labelText}>
        Describe Your Experience
      </DefaultText>
      <View style={styles.textInputContainer}>
        <Controller
          name="description"
          defaultValue=""
          control={control}
          rules={{ required: true }}
          render={({ onChange, value }) => (
            <TextInput
              style={styles.textInput}
              multiline={true}
              value={value}
              onChangeText={(value) => {
                onChange(value);
              }}
            />
          )}
        />
      </View>
      {errors.description && (
        <Text style={styles.errorText}>Required field cannot be empty.</Text>
      )}
      <View style={styles.buttonContainer}>
        <MainButton
          style={styles.button}
          styleText={styles.buttonText}
          onPress={handleSubmit(submitHandler)}
        >
          Submit
        </MainButton>
      </View>
    </View>
  );
};

export default CreateReviewScreen;

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    justifyContent: "flex-start",
    backgroundColor: Colors.background,
  },
  headerText: {
    fontSize: 24,
    fontFamily: "latoBold",
    padding: 20,
  },
  ratingContainer: {
    alignItems: "flex-start",
  },
  labelText: {
    fontSize: 14,
    paddingBottom: 20,
    paddingLeft: 20,
  },
  rating: {
    paddingBottom: 20,
    paddingLeft: 20,
  },
  textInputContainer: {
    marginHorizontal: 20,
    width: "90%",
    height: 120,
    backgroundColor: Colors.background,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 2,
  },
  textInput: {
    padding: 5,
  },
  errorText: {
    marginLeft: 20,
    marginTop: 5,
    color: Colors.darkPink,
  },
  buttonContainer: {
    alignItems: "flex-end",
    paddingTop: 20,
    marginRight: 20,
  },
  button: {
    width: 80,
    height: 30,
    backgroundColor: Colors.primary,
  },
  buttonText: {
    fontSize: 12,
  },
});