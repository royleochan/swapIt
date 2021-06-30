import React, { useState, useEffect } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import { Rating } from "react-native-elements";

import request from "utils/request";
import Colors from "constants/Colors";
import DefaultText from "components/DefaultText";
import ReviewRow from "components/ReviewRow";

const ReviewHeader = ({ selectedUser }) => {
  return (
    <>
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
          Based on {selectedUser.reviews.length}
          {selectedUser.reviews.length === 1 ? " review" : " reviews"}
        </DefaultText>
      </View>
    </>
  );
};

const ReviewsScreen = (props) => {
  const { selectedUser } = props.route.params;
  const [reviews, setReviews] = useState([]);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const fetchReviews = async () => {
    setIsRefreshing(true);
    try {
      const response = await request.get(`/api/reviews/${selectedUser.id}`);
      setReviews(response.data.reviews);
    } catch (err) {
      console.log(err);
    }
    setIsRefreshing(false);
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  return (
    <View style={styles.screenContainer}>
      <FlatList
        ListHeaderComponent={<ReviewHeader selectedUser={selectedUser} />}
        onRefresh={fetchReviews}
        refreshing={isRefreshing}
        data={reviews}
        horizontal={false}
        keyExtractor={(item) => item.id}
        renderItem={(itemData) => <ReviewRow review={itemData.item} />}
      />
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
