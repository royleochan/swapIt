import React from "react";
import { View, Text, StyleSheet } from "react-native";

const NotificationsScreen = (props) => {
  return (
    <View style={styles.screenContainer}>
      <Text>Notifications Screen</Text>
    </View>
  );
};

export default NotificationsScreen;

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
