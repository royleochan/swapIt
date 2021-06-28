import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { StyleSheet, Text, View } from "react-native";

import request from "utils/request";
import Loader from "components/Loader";

const CompletedReviewScreen = (props) => {
  const { matchId } = props.route.params;
  const loggedInUserId = useSelector((state) => state.auth.user.id);

  const [review, setReview] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getReview = async () => {
      try {
        const response = await request.get(
          `/api/reviews/${loggedInUserId}/${matchId}`
        );
        setReview(response.data.review);
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    };

    setIsLoading(true);
    getReview();
  }, []);

  if (isLoading) {
    return <Loader isLoading={isLoading} />;
  }

  return (
    <View>
      <Text>{review.rating}</Text>
      <Text>{review.description}</Text>
    </View>
  );
};

export default CompletedReviewScreen;

const styles = StyleSheet.create({});
