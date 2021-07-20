// React Imports //
import React from "react";
import { StyleSheet, View } from "react-native";

// Components Imports //
import DefaultText from "components/DefaultText";

// Svg Imports //
import Error from "assets/svg/Error";

const ErrorSplash = (props) => {
  return (
    <View style={styles.screen}>
      <Error />
      <DefaultText style={styles.text}>
        {props.message !== undefined ? props.message : "Something went wrong"}
      </DefaultText>
    </View>
  );
};

export default ErrorSplash;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    padding: 12,
    fontSize: 16,
  },
});
