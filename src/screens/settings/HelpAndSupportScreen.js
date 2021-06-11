import React from "react";
import { StyleSheet, View } from "react-native";

import Colors from "constants/Colors";
import DefaultText from "components/DefaultText";
import SettingRow from "components/SettingRow";

const HelpAndSupportScreen = (props) => {
  return (
    <View style={styles.screenContainer}>
      <DefaultText style={styles.headerText}>Help & Support</DefaultText>
      <SettingRow
        iconSet="AntDesign"
        iconName="deleteuser"
        rowTitle="Report a User"
        size={26}
        navigate={() =>
          props.navigation.navigate("Report", {
            title: "Report a User",
            subject: "Report User",
          })
        }
      />
      <SettingRow
        iconSet="AntDesign"
        iconName="user"
        rowTitle="Problems With My Account"
        size={24}
        navigate={() =>
          props.navigation.navigate("Report", {
            title: "Problems with my Account",
            subject: "Account Problems",
          })
        }
      />
      <SettingRow
        iconSet="Feather"
        iconName="tool"
        rowTitle="Report a Technical Issue"
        size={22}
        navigate={() =>
          props.navigation.navigate("Report", {
            title: "Report a Technical Issue",
            subject: "Bug",
          })
        }
      />
      <SettingRow
        iconSet="MaterialCommunity"
        iconName="note-text-outline"
        rowTitle="General Enquiries"
        size={24}
        navigate={() =>
          props.navigation.navigate("Report", {
            title: "General Enquires",
            subject: "General",
          })
        }
      />
      <SettingRow
        iconSet="Ionicons"
        iconName="chatbubble-ellipses-outline"
        rowTitle="Others"
        size={24}
        navigate={() =>
          props.navigation.navigate("Report", {
            title: "Others",
            subject: "Others",
          })
        }
      />
    </View>
  );
};

export default HelpAndSupportScreen;

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
