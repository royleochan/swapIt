// React Imports //
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { useSelector } from "react-redux";

// RNE Imports //
import { Button, Overlay } from "react-native-elements";

// React Hook Form Imports //
import { useForm, Controller } from "react-hook-form";

// RNE Imports //
import { Rating } from "react-native-elements";

// Colors Imports //
import Colors from "constants/Colors";

// Utils Imports //
import request from "utils/request";
import showAlert from "utils/showAlert";

// Components Imports //
import Loader from "components/Loader";
import DefaultText from "components/DefaultText";
import MainButton from "components/MainButton";

// Success Modal Component //
const ReviewModal = ({
  isModalVisible,
  setIsModalVisible,
  resetNavBackToProfile,
}) => {
  // Functions //
  const handleModalClose = () => {
    setIsModalVisible(false);
    resetNavBackToProfile();
  };

  // Render //
  return (
    <Overlay isVisible={isModalVisible} onBackdropPress={handleModalClose}>
      <View style={{ width: "80%", padding: 10 }}>
        <DefaultText
          style={{
            textAlign: "center",
            fontFamily: "latoBold",
            marginBottom: 10,
            fontSize: 16,
          }}
        >
          Success
        </DefaultText>
        <DefaultText style={{ textAlign: "center" }}>
          Thank you for submitting a review for the swap. Your review can now be
          viewed in the user's reviews screen. We hope you enjoy ur new item!
        </DefaultText>
        <Button
          title="Done"
          type="clear"
          containerStyle={{ alignSelf: "center", marginTop: 20 }}
          buttonStyle={{
            width: 160,
            height: 40,
            backgroundColor: Colors.primary,
            borderRadius: 20,
            marginBottom: 10,
          }}
          titleStyle={{ fontSize: 14, color: "white" }}
          onPress={handleModalClose}
        />
      </View>
    </Overlay>
  );
};

// Main Component //
const CreateReviewScreen = (props) => {
  // Init //
  const [isLoading, setIsLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const loggedInUserId = useSelector((state) => state.auth.user.id);
  const jwtToken = useSelector((state) => state.auth.jwtToken);
  const { pid, matchId, reviewed, username } = props.route.params;
  const [userRating, setUserRating] = useState();
  const { control, handleSubmit, errors } = useForm();

  // Functions //
  const submitHandler = async (data) => {
    const { description } = data;
    try {
      setIsLoading(true);
      await request.post(
        "/api/reviews",
        {
          description,
          rating: userRating,
          creator: loggedInUserId,
          pid,
          matchId,
          reviewed,
        },
        jwtToken
      );
      setIsLoading(false);
      setIsModalVisible(true);
    } catch (err) {
      showAlert("Request failed", err.response.data.message, null);
    }
  };

  const resetNavBackToProfile = () => {
    props.navigation.popToTop();
  };

  // Render //
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.screenContainer}>
        {isLoading && <Loader isLoading={isLoading} />}
        <ReviewModal
          resetNavBackToProfile={resetNavBackToProfile}
          isModalVisible={isModalVisible}
          setIsModalVisible={setIsModalVisible}
        />
        <DefaultText style={styles.headerText}>Leave a Review</DefaultText>
        <View style={styles.ratingContainer}>
          <DefaultText
            style={styles.labelText}
          >{`Rate @${username}`}</DefaultText>
          {userRating !== undefined && (
            <DefaultText style={styles.labelText}>{userRating} / 5</DefaultText>
          )}
          <Rating
            type="custom"
            imageSize={28}
            ratingBackgroundColor={Colors.background}
            ratingColor={Colors.star}
            fractions={1}
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
    </TouchableWithoutFeedback>
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
    alignItems: "center",
  },
  textInput: {
    width: "90%",
    height: 120,
    borderRadius: 8,
    paddingHorizontal: 5,
    backgroundColor: Colors.textInput,
    color: "black",
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
