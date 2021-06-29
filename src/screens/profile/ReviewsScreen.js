import React from "react";
import { View, StyleSheet } from "react-native";
import { Rating } from "react-native-elements";

import Colors from "constants/Colors";
import DefaultText from "components/DefaultText";
import ReviewRow from "components/ReviewRow";

const ReviewsScreen = (props) => {
  const { selectedUser } = props.route.params;

  // todo: Send request to fetch all reviews, also use flatlist for pull to refresh

  return (
    <View style={styles.screenContainer}>
      <View style={styles.header}>
        <DefaultText style={styles.numberRating}>
          {selectedUser.reviewRating}
        </DefaultText>
        <Rating
          type="custom"
          readonly
          imageSize={20}
          ratingBackgroundColor={Colors.background}
          ratingColor={Colors.star}
          fractions={1}
          startingValue={selectedUser.reviewRating}
        />
        <DefaultText style={styles.numReviews}>
          Based on {selectedUser.reviews.length} reviews
        </DefaultText>
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
});
