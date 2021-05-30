import React from "react";
import { StyleSheet, View, TextInput } from "react-native";

import Colors from "constants/Colors";
import DefaultText from "components/DefaultText";

const DefaultTextInput = (props) => {
  return (
    <View style={{ ...styles.inputTextContainer, ...props.containerStyle }}>
      <DefaultText style={styles.label}>{props.label}</DefaultText>
      <TextInput
        value={props.value}
        multiline={props.multiline}
        onChangeText={props.onChangeText}
        style={{ ...styles.textInput, ...props.style }}
      />
    </View>
  );
};

export default DefaultTextInput;

const styles = StyleSheet.create({
  inputTextContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 20,
    borderBottomColor: "rgba(196, 196, 196, 0.3)",
    borderBottomWidth: 1,
  },
  label: {
    marginLeft: 40,
    width: "20%",
    fontFamily: "latoBold",
  },
  textInput: {
    fontSize: 12,
    fontFamily: "lato",
    color: Colors.primary,
    marginLeft: 40,
    width: "50%",
  },
});
