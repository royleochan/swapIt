import React from "react";
import { StyleSheet, TextInput, View } from "react-native";

import Colors from "constants/Colors";

const GlassTextInput = (props) => {
  return (
    <View opacity={0.3} style={styles.container}>
      <TextInput
        textContentType="oneTimeCode"
        autoCorrect={false}
        multiline={props.multiline}
        secureTextEntry={props.secureTextEntry}
        autoCapitalize="none"
        value={props.value}
        style={{ ...styles.textInput, ...props.style }}
        onChangeText={props.onChangeText}
        placeholder={props.children}
        placeholderTextColor={Colors.glass}
      />
    </View>
  );
};

export default GlassTextInput;

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    width: "80%",
  },
  textInput: {
    backgroundColor: Colors.glass,
    backgroundColor: "#00000070",
    color: Colors.background,
    fontFamily: "lato",
    fontSize: 14,
    borderRadius: 30,
    height: 40,
    paddingLeft: 10,
  },
});
