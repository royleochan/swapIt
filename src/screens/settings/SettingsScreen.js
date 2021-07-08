import React from "react";
import { StyleSheet, View } from "react-native";
import { useDispatch } from "react-redux";

import * as authActions from "store/actions/auth";
import Colors from "constants/Colors";
import DefaultText from "components/DefaultText";
import SettingRow from "components/SettingRow";

const SettingsScreen = (props) => {
  const dispatch = useDispatch();

  const navigateToEditProfile = () => {
    props.navigation.navigate("EditProfile");
  };

  const navigateToChangePassword = () => {
    props.navigation.navigate("ChangePassword");
  };

  const navigateToHelpAndSupport = () => {
    props.navigation.navigate("HelpAndSupport");
  };

  return (
    <View style={styles.screenContainer}>
      <DefaultText style={styles.headerText}>Settings</DefaultText>
      <SettingRow
        iconSet="MaterialCommunity"
        iconName="account-edit-outline"
        rowTitle="Edit Profile"
        size={26}
        navigate={navigateToEditProfile}
      />
      <SettingRow
        iconSet="Feather"
        iconName="lock"
        rowTitle="Change Password"
        size={24}
        navigate={navigateToChangePassword}
      />
      <SettingRow
        iconSet="MaterialIcons"
        iconName="support-agent"
        rowTitle="Help & Support"
        size={26}
        navigate={navigateToHelpAndSupport}
      />
      <SettingRow
        iconSet="Ionicons"
        iconName="notifications-outline"
        rowTitle="Notifications"
        size={24}
        navigate={() => console.log("Notifications")} // todo: set notification settings
      />
      <SettingRow
        iconSet="AntDesign"
        iconName="questioncircleo"
        rowTitle="About"
        size={22}
        navigate={() => console.log("About")} // todo: make about screen
      />
      <SettingRow
        iconSet="AntDesign"
        iconName="logout"
        rowTitle="Logout"
        size={22}
        navigate={() => dispatch(authActions.logout())}
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
