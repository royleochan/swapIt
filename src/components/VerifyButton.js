// React Imports //
import React from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";

// Colors Import //
import Colors from "constants/Colors";

// Components Import //
import DefaultText from "components/DefaultText";

// Main Component //
const VerifyButton = ({ style, onPress }) => {
  // Render //
  return (
    <View style={{ zIndex: 1 }}>
      <TouchableOpacity
        style={{ ...style, ...styles.verifyButton }}
        onPress={onPress}
      >
        <DefaultText style={styles.verifyText}>Verify</DefaultText>
      </TouchableOpacity>
    </View>
  );
};

export default VerifyButton;

const styles = StyleSheet.create({
  verifyButton: {
    backgroundColor: Colors.primary,
    padding: 5,
    width: 66,
    height: 26,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  verifyText: {
    color: Colors.background,
    alignSelf: "center",
  },
});
