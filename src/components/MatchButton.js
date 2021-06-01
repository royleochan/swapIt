import React, { useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";

import Colors from "constants/Colors";
import DefaultText from "components/DefaultText";

const initialState = {
  isMatched: false,
  isRequested: false,
  isSent: false,
};

const MatchButton = (props) => {
  const { style } = props;
  const [matchState, setMatchState] = useState(initialState);

  return (
    <View style={{ zIndex: 1 }}>
      <TouchableOpacity
        style={{ ...style, ...styles.matchButton }}
        onPress={() => {}}
      >
        <DefaultText style={styles.text}>Send Match Request</DefaultText>
      </TouchableOpacity>
    </View>
  );
};

export default MatchButton;

const styles = StyleSheet.create({
  matchButton: {
    backgroundColor: Colors.primary,
    padding: 2,
    width: 100,
    height: 34,
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 24,
    marginTop: 30,
  },
  text: {
    color: Colors.background,
    alignSelf: "center",
  },
});
