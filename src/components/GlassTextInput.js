import React from "react";
import { StyleSheet, TextInput, View } from "react-native";

import Colors from "constants/Colors";

const GlassTextInput = (props) => {
  return (
    <View opacity={0.3} style={styles.container}>
      <TextInput
        style={styles.textInput}
        placeholder={props.children}
        placeholderTextColor="white"
      />
    </View>
  );
};

export default GlassTextInput;

const styles = StyleSheet.create({
  container: {
    paddingTop: 25,
    width: "80%",
  },
  textInput: {
    backgroundColor: Colors.glass,
    fontFamily: "lato",
    fontSize: 16,
    borderRadius: 30,
    height: 45,
    paddingLeft: 10,
  },
});
