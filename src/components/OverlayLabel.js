import React from "react";
import { View, Text, StyleSheet } from "react-native";

const OverlayLabel = (props) => {
  const { label, color } = props;

  return (
    <View style={[styles.overlayLabel, { borderColor: color }]}>
      <Text style={[styles.overlayLabelText, { color }]}>{label}</Text>
    </View>
  );
};

export default OverlayLabel;

const styles = StyleSheet.create({
  overlayLabel: {
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    borderWidth: 4,
    borderRadius: 5,
  },
  overlayLabelText: {
    fontSize: 25,
    fontFamily: "latoBold",
    textAlign: "center",
  },
});
