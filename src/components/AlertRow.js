// React Imports //
import React from "react";
import { useDispatch } from "react-redux";
import { StyleSheet, TouchableOpacity, View } from "react-native";

// RNE imports //
import { Avatar } from "react-native-elements";

// Navigation Imports //
import {
  navigateToProfileNavigator,
  navigateToProductDetails,
} from "navigation/navigate/common/index";

// Redux Action Imports //
import { dismissNotification } from "store/actions/notifications";

// Utils Imports //
import { parseTimeAgo } from "utils/date";

// Colors Imports //
import Colors from "constants/Colors";

// Components Imports //
import DefaultText from "components/DefaultText";
import IconButton from "components/IconButton";

// Main Component //
const AlertRow = (props) => {
  // Init //
  const {
    _id,
    creator, // object of shape {_id: "", imageUrl: ""}
    targetUser,
    productId, // object of shape {_id: "", imageUrl: ""}
    matchedProductId,
    description,
    type,
    isRead,
    createdAt,
  } = props.notification;

  const dispatch = useDispatch();

  // Functions //
  const closeNotification = (notificationId) => {
    dispatch(dismissNotification(notificationId));
  };

  const navigate = (alertType) => {
    switch (alertType) {
      case "FOLLOW":
        return navigateToProfileNavigator(props, creator._id);
      case "REVIEW":
        return navigateToProfileNavigator(props, targetUser);
      case "LIKE":
      case "MATCH":
      case "REQUEST":
      case "SWAP":
        return navigateToProductDetails(props, productId._id);
    }
  };

  // Render //
  return (
    <TouchableOpacity
      onPress={() => navigate(type)}
      style={{
        ...styles.alertContainer,
        ...{ backgroundColor: !isRead ? Colors.gray : Colors.background },
      }}
    >
      <View style={styles.imageTextContainer}>
        <Avatar
          rounded
          size={66}
          source={{
            uri:
              type === "MATCH" || type === "REQUEST" || type === "SWAP"
                ? productId.imageUrl
                : creator.profilePic,
          }}
        />
        <View style={styles.textContainer}>
          <DefaultText style={styles.subtitle}>NEW {type}</DefaultText>
          <DefaultText>{description}</DefaultText>
          <DefaultText>{parseTimeAgo(createdAt)}</DefaultText>
        </View>
      </View>
      {(type === "MATCH" || type === "REQUEST" || type === "SWAP") && (
        <Avatar
          rounded
          size={66}
          source={{
            uri: matchedProductId.imageUrl,
          }}
        />
      )}
      <IconButton
        name="close"
        style={styles.closeButton}
        size={22}
        onPress={() => closeNotification(_id)}
        color={Colors.primary}
      />
    </TouchableOpacity>
  );
};

export default AlertRow;

const styles = StyleSheet.create({
  alertContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    height: 100,
  },
  imageTextContainer: {
    flexDirection: "row",
    width: "70%",
  },
  textContainer: {
    marginLeft: 10,
    alignSelf: "center",
    width: "70%",
  },
  subtitle: {
    fontFamily: "latoBold",
  },
  closeButton: {
    marginRight: 8,
  },
});
