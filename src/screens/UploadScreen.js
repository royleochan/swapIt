import React from "react";
import { View, Text, StyleSheet } from "react-native";

const UploadScreen = (props) => {
  return (
    <View style={styles.screenContainer}>
      <Text>Upload Screen</Text>
    </View>
  );
};

export default UploadScreen;

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
