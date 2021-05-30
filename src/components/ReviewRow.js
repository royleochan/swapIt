import React from "react";
import { StyleSheet, View } from "react-native";
import { Avatar } from "react-native-elements";
import { Rating } from "react-native-elements";

import Colors from "constants/Colors";
import DefaultText from "components/DefaultText";

const ReviewRow = () => {
  const reviewer = {
    name: "Roy Chan",
    profilePic:
      "https://res.cloudinary.com/dey8rgnvh/image/upload/v1597938408/qtdgn69johypeadagidn.jpg",
  };

  const review = {
    rating: 5,
    description:
      "Remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently",
    date: "28/12/2020",
  };

  return (
    <View style={styles.rowContainer}>
      <View style={styles.rowHeaderContainer}>
        <View style={styles.reviewDetailsContainer}>
          <Avatar
            rounded
            size={60}
            source={{
              uri: reviewer.profilePic,
            }}
          />
          <View style={styles.reviewerNameAndRating}>
            <DefaultText style={styles.reviewerName}>
              {reviewer.name}
            </DefaultText>
            <View style={styles.rating}>
              <Rating
                type="custom"
                readonly
                imageSize={20}
                ratingBackgroundColor={Colors.background}
                ratingColor={Colors.star}
                fractions={1}
                startingValue={review.rating}
              />
            </View>
          </View>
        </View>
        <DefaultText style={styles.date}>{review.date}</DefaultText>
      </View>
      <DefaultText style={styles.description}>{review.description}</DefaultText>
    </View>
  );
};

export default ReviewRow;

const styles = StyleSheet.create({
  rowContainer: {
    flexDirection: "column",
    borderBottomColor: "rgba(196, 196, 196, 0.3)",
    borderBottomWidth: 1,
  },
  rowHeaderContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    paddingTop: 18,
    paddingBottom: 10,
  },
  reviewDetailsContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 18,
  },
  reviewerNameAndRating: {
    flexDirection: "column",
    justifyContent: "flex-start",
  },
  reviewerName: {
    fontSize: 14,
    fontFamily: "latoBold",
    marginLeft: 18,
  },
  rating: {
    paddingTop: 5,
    marginLeft: 18,
  },
  date: {
    marginRight: 18,
  },
  description: {
    marginHorizontal: 18,
    paddingBottom: 18,
  },
});
