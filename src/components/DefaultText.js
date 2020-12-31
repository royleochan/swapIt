import React from "react";
import { Text, StyleSheet } from "react-native";

import Colors from "constants/Colors";

const DefaultText = (props) => {
  return (
    <Text style={{ ...styles.defaultText, ...props.style }}>
      {props.children}
    </Text>
  );
};

export default DefaultText;

const styles = StyleSheet.create({
  defaultText: {
    fontSize: 10,
    fontFamily: "lato",
    color: Colors.primary,
    marginVertical: 4,
  },
});
