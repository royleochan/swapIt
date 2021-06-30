import React from "react";
import { StyleSheet, View } from "react-native";
import { Avatar } from "react-native-elements";
import { Rating } from "react-native-elements";

import parseDateToYYYYMMDD from "utils/date";
import Colors from "constants/Colors";
import DefaultText from "components/DefaultText";

const ReviewRow = (props) => {
  const { review } = props;
  const { creator, description, rating, createdAt } = review;

  return (
    <View style={styles.rowContainer}>
      <View style={styles.rowHeaderContainer}>
        <View style={styles.reviewDetailsContainer}>
          <Avatar
            rounded
            size={60}
            source={{
              uri: creator.profilePic,
            }}
          />
          <View style={styles.reviewerNameAndRating}>
            <DefaultText style={styles.reviewerName}>
              {creator.name}
            </DefaultText>
            <View style={styles.rating}>
              <Rating
                type="custom"
                readonly
                imageSize={20}
                ratingBackgroundColor={Colors.background}
                ratingColor={Colors.star}
                fractions={1}
                startingValue={rating}
              />
            </View>
          </View>
        </View>
        <DefaultText style={styles.date}>
          {parseDateToYYYYMMDD(createdAt)}
        </DefaultText>
      </View>
      <DefaultText style={styles.description}>{description}</DefaultText>
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
