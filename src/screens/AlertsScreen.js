import React from "react";
import { View, Text, StyleSheet } from "react-native";

const AlertsScreen = (props) => {
  return (
    <View style={styles.screenContainer}>
      <Text>Notifications Screen</Text>
    </View>
  );
};

export default AlertsScreen;

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
