// React Imports //
import React from "react";
import { StyleSheet, View } from "react-native";

// Components Imports //
import DefaultText from "components/DefaultText";

// Svg Imports //
import EmptyFolder from "assets/svg/EmptyFolder";

const Empty = (props) => {
  const { width, height, fontSize, message } = props;

  return (
    <View style={styles.screen}>
      <EmptyFolder width={width} height={height} />
      <DefaultText style={{ ...styles.text, fontSize: true ? fontSize : 16 }}>
        {message}
      </DefaultText>
    </View>
  );
};

export default Empty;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 16,
    paddingBottom: 10,
  },
});
