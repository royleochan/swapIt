import React, { useLayoutEffect } from "react";
import { View, StyleSheet } from "react-native";
import { Rating } from "react-native-elements";

import Colors from "constants/Colors";
import IconButton from "components/IconButton";
import DefaultText from "components/DefaultText";

const ReviewsScreen = (props) => {
  const user = props.route.params.user;

  // header back button
  useLayoutEffect(() => {
    props.navigation.setOptions({
      headerLeft: () => (
        <IconButton
          style={{ marginLeft: 10 }}
          size={23}
          color={Colors.primary}
          name="arrowleft"
          onPress={() => props.navigation.goBack()}
        />
      ),
    });
  }, [props.navigation]);

  return (
    <View style={styles.screenContainer}>
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
