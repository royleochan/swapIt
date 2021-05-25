import React, { useLayoutEffect } from "react";
import { StyleSheet, View } from "react-native";

import SettingRow from "components/SettingRow";

import Colors from "constants/Colors";
import IconButton from "components/IconButton";
import DefaultText from "components/DefaultText";

const SettingsScreen = (props) => {
  const user = props.route.params.selectedUser;

  // header back button
  useLayoutEffect(() => {
    props.navigation.setOptions({
      headerLeft: () => (
        <IconButton
          style={{ marginLeft: 10 }}
          size={23}
          color={Colors.primary}
          name="arrowleft"
          onPress={() => props.navigation.goBack()}
        />
      ),
    });
  }, [props.navigation]);

  return (
    <View style={styles.screenContainer}>
      <DefaultText style={styles.headerText}>Settings</DefaultText>
      <SettingRow
        iconSet="MaterialCommunity"
        iconName="account-edit-outline"
        rowTitle="Edit Profile"
        size={26}
        navigate={() => console.log("Edit Profile")}
      />
      <SettingRow
        iconSet="Feather"
        iconName="lock"
        rowTitle="Change Password"
        size={24}
        navigate={() => console.log("Change Password")}
      />
      <SettingRow
        iconSet="MaterialIcons"
        iconName="support-agent"
        rowTitle="Help & Support"
        size={26}
        navigate={() => console.log("Help & Support")}
      />
      <SettingRow
        iconSet="Ionicons"
        iconName="notifications-outline"
        rowTitle="Notifications"
        size={24}
        navigate={() => console.log("Notifications")}
      />
      <SettingRow
        iconSet="AntDesign"
        iconName="questioncircleo"
        rowTitle="About"
        size={22}
        navigate={() => console.log("About")}
      />
      <SettingRow
        iconSet="AntDesign"
        iconName="logout"
        rowTitle="Logout"
        size={22}
        navigate={() => console.log("Logout")}
      />
    </View>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    justifyContent: "flex-start",
    backgroundColor: Colors.background,
  },
  headerText: {
    fontSize: 26,
    fontFamily: "latoBold",
    padding: 20,
  },
});
