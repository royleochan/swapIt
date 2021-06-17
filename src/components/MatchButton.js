import React, { useState, useEffect } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import useDebouncedCallback from "use-debounce/lib/useDebouncedCallback";

import useDidMountEffect from "hooks/useDidMountEffect";
import request from "utils/request";
import Colors from "constants/Colors";
import DefaultText from "components/DefaultText";

const MatchButton = (props) => {
  const { style, match, productId } = props;
  const [actualState, setActualState] = useState(match);
  const [debouncedState, setDebouncedState] = useState(match);

  const debounced = useDebouncedCallback((val) => {
    setDebouncedState(val);
  }, 1500);

  useEffect(() => {
    setActualState(match);
  }, [match]);

  useDidMountEffect(() => {
    const { type, pid } = actualState;
    console.log(type);
    console.log(match._id);
    console.log(pid);
    const sendRequest = async () => {
      try {
        const response = await request.patch(
          `/api/matches/request/${type}/${match._id}`,
          { pid }
        );
        console.log(response.data);
      } catch (err) {
        console.log(err.response.data.message);
      }
    };

    sendRequest();
  }, [debouncedState]);

  const Button = () => {
    let onPressFunction;
    let buttonTitle;

    const {
      isConfirmed,
      productOneId,
      productOneIsRequested,
      productOneIsReviewed,
      productTwoIsRequested,
      productTwoIsReviewed,
    } = actualState;

    if (productOneId === productId) {
      if (productOneIsReviewed) {
        buttonTitle = "Review Made!";
        onPressFunction = () => {
          setActualState({ ...match, productOneIsReviewed: true });
          debounced({ ...match, productOneIsReviewed: true });
        };
      } else if (isConfirmed) {
        buttonTitle = "Make Review";
        onPressFunction = () => {
          setActualState({
            ...match,
            productOneIsReviewed: true,
            type: "review",
            pid: productOneId,
          });
          debounced({ ...match, productOneIsReviewed: true });
        };
      } else if (productTwoIsRequested) {
        buttonTitle = "Accept Request";
        onPressFunction = () => {
          setActualState({
            ...match,
            isConfirmed: true,
            type: "accept",
            pid: productOneId,
          });
          debounced({ ...match, isConfirmed: true });
        };
      } else if (productOneIsRequested) {
        buttonTitle = "Requested";
        onPressFunction = () => {
          setActualState({
            ...match,
            productOneIsRequested: false,
            type: "cancel",
            pid: productOneId,
          });
          debounced({ ...match, productOneIsRequested: false });
        };
      } else {
        buttonTitle = "Send Match Request";
        onPressFunction = () => {
          setActualState({
            ...match,
            productOneIsRequested: true,
            type: "send",
            pid: productOneId,
          });
          debounced({ ...match, productOneIsRequested: true });
        };
      }
    } else {
      if (productTwoIsReviewed) {
        buttonTitle = "Review Made!";
        onPressFunction = () => {
          setActualState({ ...match, productTwoIsReviewed: true });
          debounced({ ...match, productTwoIsReviewed: true });
        };
      } else if (isConfirmed) {
        buttonTitle = "Make Review";
        onPressFunction = () => {
          setActualState({
            ...match,
            productTwoIsReviewed: true,
            type: "review",
            pid: productOneId,
          });
          debounced({ ...match, productTwoIsReviewed: true });
        };
      } else if (productOneIsRequested) {
        buttonTitle = "Accept Request";
        onPressFunction = () => {
          setActualState({
            ...match,
            isConfirmed: true,
            type: "accept",
            pid: productOneId,
          });
          debounced({ ...match, isConfirmed: true });
        };
      } else if (productTwoIsRequested) {
        buttonTitle = "Requested";
        onPressFunction = () => {
          setActualState({
            ...match,
            productTwoIsRequested: false,
            type: "cancel",
            pid: productOneId,
          });
          debounced({ ...match, productTwoIsRequested: false });
        };
      } else {
        buttonTitle = "Send Match Request";
        onPressFunction = () => {
          setActualState({
            ...match,
            productTwoIsRequested: true,
            type: "send",
            pid: productOneId,
          });
          debounced({ ...match, productTwoIsRequested: true });
        };
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

  return (
    <View style={{ zIndex: 1 }}>
      <Button />
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
});
