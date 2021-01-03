import React from "react";
import { StyleSheet, View } from "react-native";

import DefaultText from "components/DefaultText";
import Colors from "constants/Colors";

const Chip = (props) => {
  return (
    <View style={styles.chipContainer}>
      <DefaultText>{props.text}</DefaultText>
    </View>
  );
};

export default Chip;

const styles = StyleSheet.create({
  chipContainer: {
    paddingHorizontal: 10,
    backgroundColor: Colors.lightGray,
    borderRadius: 30,
    alignItems: "center",
    margin: 5,
  },
});
