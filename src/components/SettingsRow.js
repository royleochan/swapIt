import React from "react";
import { StyleSheet, View } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { AntDesign } from "@expo/vector-icons";

import Colors from "constants/Colors";
import DefaultText from "components/DefaultText";

const SettingsRow = (props) => {
  const { iconName, rowName } = props;
  return (
    <View style={styles.row}>
      <View style={styles.labelContainer}>
        <View style={styles.iconContainer}>
          <MaterialCommunityIcons name={iconName} size={22} color="white" />
        </View>
        <DefaultText style={styles.text}>
          {"     "}
          {rowName}
        </DefaultText>
      </View>
      <View style={styles.arrowContainer}>
        <MaterialIcons name="keyboard-arrow-right" size={22} color={Colors.gray}/>
      </View>
    </View>
  );
};

export default SettingsRow;

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    borderBottomColor: Colors.lightGray,
    borderBottomWidth: 2,
    padding: 10,
    justifyContent: "space-between",
  },
  labelContainer: {
    flexDirection: "row",
  },
  iconContainer: {
    backgroundColor: Colors.accent,
    borderRadius: 100,
    padding: 5,
  },
  text: {
    fontSize: 20,
  },
  arrowContainer: {},
});
