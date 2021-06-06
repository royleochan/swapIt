import React from "react";
import { View, StyleSheet } from "react-native";
import { Rating } from "react-native-elements";

import Colors from "constants/Colors";
import DefaultText from "components/DefaultText";
import ReviewRow from "components/ReviewRow";
import MainButton from "components/MainButton";

const ReviewsScreen = (props) => {
  const user = props.route.params.user;

  const navigateToCreateReview = () => {
    props.navigation.navigate("CreateReview");
  };

  return (
    <View style={styles.screenContainer}>
      <View style={styles.header}>
        <DefaultText style={styles.numberRating}>3.5</DefaultText>
        <Rating
          type="custom"
          readonly
          imageSize={20}
          ratingBackgroundColor={Colors.background}
          ratingColor={Colors.star}
          fractions={1}
          startingValue={3.5}
        />
        <DefaultText style={styles.numReviews}>Based on 5 reviews</DefaultText>
        <View style={styles.buttonContainer}>
          <MainButton
            style={styles.button}
            styleText={styles.buttonText}
            onPress={navigateToCreateReview}
          >
            Leave Review
          </MainButton>
        </View>
      </View>
      <ReviewRow />
    </View>
  );
};

export default ReviewsScreen;

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    justifyContent: "flex-start",
    backgroundColor: Colors.background,
  },
  header: {
    paddingBottom: 18,
    borderBottomColor: "rgba(196, 196, 196, 0.3)",
    borderBottomWidth: 1,
  },
  numberRating: {
    alignSelf: "center",
    fontFamily: "latoBold",
    fontSize: 32,
    marginBottom: 16,
    marginTop: 20,
  },
  numReviews: {
    alignSelf: "center",
    marginTop: 10,
  },
  buttonContainer: {
    alignItems: "flex-end",
    paddingTop: 20,
    marginRight: 20,
  },
  button: {
    width: 120,
    height: 35,
    backgroundColor: Colors.primary,
  },
  buttonText: {
    fontSize: 12,
  },
});
