import React from "react";

import Colors from "constants/Colors";
import IconButton from "components/IconButton";

export const FollowOptions = ({ navigation }) => ({
  headerStyle: { shadowColor: "transparent" },
  headerTitleStyle: {
    color: Colors.primary,
    fontFamily: "latoBold",
    fontSize: 20,
  },
  headerLeft: () => (
    <IconButton
      style={{ marginLeft: 10 }}
      size={23}
      color={Colors.primary}
      name="arrowleft"
      onPress={() => navigation.goBack()}
    />
  ),
});
