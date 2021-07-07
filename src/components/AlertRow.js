import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Avatar } from "react-native-elements";

import * as notificationActions from "store/actions/notifications";
import parseTimeAgo from "utils/parseTimeAgo";
import Colors from "constants/Colors";
import DefaultText from "components/DefaultText";
import IconButton from "components/IconButton";

const AlertRow = (props) => {
  const {
    _id,
    creator,
    targetUser,
    productId,
    matchedProductId,
    description,
    type,
    isRead,
    createdAt,
  } = props.notification;

  const dispatch = useDispatch();

  const dismissNotification = (notificationId) => {
    dispatch(notificationActions.dismissNotification(notificationId));
  };

  return (
    <TouchableOpacity
      onPress={() => console.log("mark as read and navigate")} // TODO
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
            uri: type !== "MATCH" ? creator.profilePic : productId.imageUrl,
          }}
        />
        <View style={styles.textContainer}>
          <DefaultText style={styles.subtitle}>NEW {type}</DefaultText>
          <DefaultText>{description}</DefaultText>
          <DefaultText>{parseTimeAgo(createdAt)}</DefaultText>
        </View>
      </View>
      {type === "MATCH" && (
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
        size={18}
        onPress={() => dismissNotification(_id)}
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
