import React from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import MaterialCommunity from "react-native-vector-icons/MaterialCommunityIcons";
import Feather from "react-native-vector-icons/Feather";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import AntDesign from "react-native-vector-icons/AntDesign";

import Colors from "constants/Colors";
import DefaultText from "components/DefaultText";

const SettingRow = (props) => {
  const { iconSet, iconName, rowTitle, navigate, size } = props;
  return (
    <View style={styles.rowContainer}>
      <View style={styles.iconTextContainer}>
        {(iconSet === "MaterialCommunity" && (
          <MaterialCommunity
            name={iconName}
            size={size}
            color={Colors.primary}
          />
        )) ||
          (iconSet === "Feather" && (
            <Feather name={iconName} size={size} color={Colors.primary} />
          )) ||
          (iconSet === "MaterialIcons" && (
            <MaterialIcons name={iconName} size={size} color={Colors.primary} />
          )) ||
          (iconSet === "Ionicons" && (
            <Ionicons name={iconName} size={size} color={Colors.primary} />
          )) ||
          (iconSet === "AntDesign" && (
            <AntDesign name={iconName} size={size} color={Colors.primary} />
          ))}
        <DefaultText style={styles.title}>{rowTitle}</DefaultText>
      </View>
      {rowTitle !== "Logout" && (
        <TouchableOpacity onPress={() => navigate}>
          <MaterialIcons
            name="keyboard-arrow-right"
            color={Colors.glass}
            size={28}
            style={styles.arrowIcon}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default SettingRow;

const styles = StyleSheet.create({
  rowContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 18,
    borderBottomColor: "rgba(196, 196, 196, 0.3)",
    borderBottomWidth: 1,
  },
  iconTextContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 40,
  },
  title: {
    fontSize: 18,
    marginLeft: 20,
  },
  arrowIcon: {
    marginRight: 20,
  },
});
