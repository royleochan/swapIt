// React Imports //
import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { useDispatch } from "react-redux";

// Navigation Imports //
import {
  navigateToLikedProducts,
  navigateToEditProfile,
  navigateToChangePassword,
  navigateToHelpAndSupport,
} from "navigation/navigate/settings/index";

// Redux Action Imports //
import { logout } from "store/actions/auth";

// Colors Import //
import Colors from "constants/Colors";

// Components Import //
import DefaultText from "components/DefaultText";
import SettingRow from "components/SettingRow";
import Loader from "components/Loader";

// Main Component //
const SettingsScreen = (props) => {
  // Init //
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  // Render //
  return (
    <View style={styles.screenContainer}>
      {isLoading && <Loader isLoading={true} />}
      <DefaultText style={styles.headerText}>Settings</DefaultText>
      <SettingRow
        iconSet="MaterialCommunity"
        iconName="heart-outline"
        rowTitle="Liked Products"
        size={26}
        navigate={() => navigateToLikedProducts(props)}
      />
      <SettingRow
        iconSet="MaterialCommunity"
        iconName="account-edit-outline"
        rowTitle="Edit Profile"
        size={26}
        navigate={() => navigateToEditProfile(props)}
      />
      <SettingRow
        iconSet="Feather"
        iconName="lock"
        rowTitle="Change Password"
        size={24}
        navigate={() => navigateToChangePassword(props)}
      />
      <SettingRow
        iconSet="MaterialIcons"
        iconName="support-agent"
        rowTitle="Help & Support"
        size={26}
        navigate={() => navigateToHelpAndSupport(props)}
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
        navigate={() => {
          setIsLoading(true);
          dispatch(logout());
        }}
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
