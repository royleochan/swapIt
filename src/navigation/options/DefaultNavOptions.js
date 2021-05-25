import React from "react";

import Colors from "constants/Colors";
import Header from "components/Header";
import IconButton from "components/IconButton";

export const DefaultNavOptions = ({ navigation }) => ({
  headerLeft: () => (
    <IconButton
      style={{ marginLeft: 10 }}
      size={23}
      color={Colors.primary}
      name="arrowleft"
      onPress={() => navigation.goBack()}
    />
  ),
  headerTitle: <Header />,
});
