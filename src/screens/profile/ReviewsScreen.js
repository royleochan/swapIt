// React Imports //
import React from "react";
import { View, StyleSheet, FlatList } from "react-native";
import { useSelector } from "react-redux";

// RNE Imports //
import { Rating } from "react-native-elements";

// Custom Hook Imports //
import useFlatListRequest from "hooks/useFlatListRequest";

// Util Imports //
import request from "utils/request";

// Colors Import //
import Colors from "constants/Colors";

// Components Import //
import Loader from "components/Loader";
import DefaultText from "components/DefaultText";
import ReviewRow from "components/ReviewRow";
import Empty from "components/Empty";
import ErrorSplash from "components/ErrorSplash";

// Review Header Component //
const ReviewHeader = ({ reviewRating, reviewsLength }) => {
  return (
    <>
      <View style={styles.header}>
        <DefaultText style={styles.numberRating}>{reviewRating}</DefaultText>
        <Rating
          type="custom"
          readonly
          imageSize={20}
          ratingBackgroundColor={Colors.background}
          ratingColor={Colors.star}
          fractions={1}
          startingValue={reviewRating}
        />
        <DefaultText style={styles.numReviews}>
          Based on {reviewsLength}
          {reviewsLength === 1 ? " review" : " reviews"}
        </DefaultText>
      </View>
    </>
  );
};

// Main Component //
const ReviewsScreen = (props) => {
  // Init //
  const { selectedUserId } = props.route.params;
  const loggedInUserId = useSelector((state) => state.auth.user.id);
  const isLoggedInUser = loggedInUserId === selectedUserId;

  // Side Effects //
  const {
    data,
    isError,
    isRefreshing,
    isLoading,
    setIsRefreshing,
  } = useFlatListRequest(() => request.get(`/api/reviews/${selectedUserId}`));

  // Render //
  if (isLoading) {
    return <Loader isLoading={isLoading} />;
  } else {
    const reviewsInfo = data;

    return (
      <View style={styles.screenContainer}>
        <FlatList
          ListHeaderComponent={
            !isError && (
              <ReviewHeader
                reviewRating={reviewsInfo.reviewRating}
                reviewsLength={reviewsInfo.reviews.length}
              />
            )
          }
          onRefresh={() => setIsRefreshing(true)}
          contentContainerStyle={{ flexGrow: 1 }}
          ListEmptyComponent={
            isError ? (
              <ErrorSplash />
            ) : (
              <Empty
                message={
                  isLoggedInUser ? "You have no reviews" : "User has no reviews"
                }
                width={128}
                height={128}
              />
            )
          }
          refreshing={isRefreshing}
          data={isError ? [] : reviewsInfo.reviews}
          horizontal={false}
          keyExtractor={(item) => item._id}
          renderItem={(itemData) => <ReviewRow review={itemData.item} />}
        />
      </View>
    );
  }
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
