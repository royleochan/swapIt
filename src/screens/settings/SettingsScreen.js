import React, { useLayoutEffect } from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import { useDispatch } from "react-redux";

import * as authActions from "store/actions/auth";
import Colors from "constants/Colors";
import DefaultText from "components/DefaultText";
import SettingRow from "components/SettingRow";

const SettingsScreen = (props) => {
  const user = props.route.params.selectedUser;
  const dispatch = useDispatch();

  const navigateToEditProfile = () => {
    props.navigation.navigate("EditProfile", { loggedInUser: user });
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
      <TouchableOpacity onPress={() => dispatch(authActions.logout())}>
        <SettingRow
          iconSet="AntDesign"
          iconName="logout"
          rowTitle="Logout"
          size={22}
        />
      </TouchableOpacity>
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
