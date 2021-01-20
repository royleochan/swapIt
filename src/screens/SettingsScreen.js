import React from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";

import Colors from "constants/Colors";
import SettingsRow from "components/SettingsRow";
import DefaultText from "components/DefaultText";

const SettingsScreen = (props) => {
  props.navigation.setOptions({
    headerLeft: () => (
      <TouchableOpacity
        style={{ paddingLeft: 16 }}
        onPress={() => {
          props.navigation.goBack();
        }}
      >
        <AntDesign
          name="arrowleft"
          size={24}
          color={Colors.primary}
          style={styles.icon}
        />
      </TouchableOpacity>
    ),
  });

  return (
    <View style={styles.screen}>
      <SettingsRow
        iconName="file-document-edit-outline"
        rowName="Edit Profile"
      />
    </View>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "white",
  },
  headerIcon: {
    height: "10%",
  },
});
