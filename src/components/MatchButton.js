import React, { useState, useEffect } from "react";
import { StyleSheet, TouchableOpacity, View, Alert } from "react-native";

import request from "utils/request";
import Colors from "constants/Colors";
import DefaultText from "components/DefaultText";
import SpinningLoader from "components/SpinningLoader";

const MatchButton = (props) => {
  const {
    style,
    match,
    navigateToCreateReview,
    navigateToCompletedReview,
    ownProduct,
    reviewed,
  } = props;
  const [isLoading, setIsLoading] = useState(false);
  const [matchState, setMatchState] = useState(match);

  useEffect(() => {
    setMatchState(match);
  }, [match]);

  const handleOnClick = async (type, pid) => {
    setIsLoading(true);
    try {
      const response = await request.patch(
        `/api/matches/request/${type}/${match._id}`,
        { pid }
      );
      setMatchState(response.data);
    } catch (err) {
      Alert.alert("Failed", err.response.data.message, [{ text: "Okay" }]);
    } finally {
      setIsLoading(false);
    }
  };

  const Button = ({ matchState }) => {
    let onPressFunction;
    let buttonTitle;

    const {
      isConfirmed,
      productOneId,
      productTwoId,
      productOneIsRequested,
      productOneIsReviewed,
      productTwoIsRequested,
      productTwoIsReviewed,
    } = matchState;

    if (productOneId === ownProduct) {
      if (productOneIsReviewed) {
        buttonTitle = "Review Made!";
        onPressFunction = () => navigateToCompletedReview(match.id);
      } else if (isConfirmed) {
        buttonTitle = "Make Review";
        onPressFunction = () =>
          navigateToCreateReview(ownProduct, match.id, reviewed);
      } else if (productTwoIsRequested) {
        buttonTitle = "Accept Request";
        onPressFunction = () => handleOnClick("accept", productOneId);
      } else if (productOneIsRequested) {
        buttonTitle = "Requested";
        onPressFunction = () => handleOnClick("cancel", productOneId);
      } else {
        buttonTitle = "Send Match Request";
        onPressFunction = () => handleOnClick("send", productOneId);
      }
    } else {
      if (productTwoIsReviewed) {
        buttonTitle = "Review Made!";
        onPressFunction = () => navigateToCompletedReview(match.id);
      } else if (isConfirmed) {
        buttonTitle = "Make Review";
        onPressFunction = () =>
          navigateToCreateReview(ownProduct, match.id, reviewed);
      } else if (productOneIsRequested) {
        buttonTitle = "Accept Request";
        onPressFunction = () => handleOnClick("accept", productTwoId);
      } else if (productTwoIsRequested) {
        buttonTitle = "Requested";
        onPressFunction = () => handleOnClick("cancel", productTwoId);
      } else {
        buttonTitle = "Send Match Request";
        onPressFunction = () => handleOnClick("send", productTwoId);
      }
    }

    return (
      <TouchableOpacity
        style={{ ...style, ...styles.matchButton }}
        onPress={onPressFunction}
      >
        <DefaultText style={styles.text}>{buttonTitle}</DefaultText>
      </TouchableOpacity>
    );
  };

  if (isLoading) {
    return (
      <View style={styles.loader}>
        <SpinningLoader />
      </View>
    );
  }

  return (
    <View style={{ zIndex: 1 }}>
      <Button matchState={matchState} />
    </View>
  );
};

export default MatchButton;

const styles = StyleSheet.create({
  matchButton: {
    backgroundColor: Colors.primary,
    padding: 2,
    width: 100,
    height: 34,
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 24,
    marginTop: 30,
  },
  text: {
    color: Colors.background,
    alignSelf: "center",
  },
  loader: {
    marginRight: 60,
    marginTop: 46,
  },
});
