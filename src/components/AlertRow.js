// React Imports //
import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { StyleSheet, TouchableWithoutFeedback, View } from "react-native";
import { Swipeable } from "react-native-gesture-handler";

// RNE imports //
import { Avatar, Button } from "react-native-elements";

// Navigation Imports //
import {
  navigateToReviewThroughProfileNavigator,
  navigateToProductDetailsThroughProfileNavigator,
  navigateToProfileNavigator,
} from "navigation/navigate/common/index";

// Redux Action Imports //
import {
  dismissNotification,
  setActiveNotification,
} from "store/actions/notifications";

// Custom Hook Imports //
import useDidMountEffect from "hooks/useDidMountEffect";

// Utils Imports //
import { parseTimeAgo } from "utils/date";

// Colors Imports //
import Colors from "constants/Colors";

// Components Imports //
import DefaultText from "components/DefaultText";

// Other Components //
const renderDeleteButton = (onPress) => {
  return (
    <Button
      onPress={onPress}
      title="Delete"
      icon={{ name: "delete", color: "white" }}
      titleStyle={{ fontSize: 14, fontFamily: "latoBold" }}
      containerStyle={{ borderRadius: 0 }}
      buttonStyle={{
        borderRadius: 0,
        minWidth: 80,
        minHeight: "100%",
        backgroundColor: Colors.delete,
        flexDirection: "column",
      }}
    />
  );
};

// Main Component //
const AlertRow = (props) => {
  // Init //
  const swipeableRef = useRef();
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

  const activeNotification = useSelector(
    (state) => state.notifications.activeNotification
  );
  const dispatch = useDispatch();

  // Functions //
  const closeNotification = (notificationId) => {
    dispatch(dismissNotification(notificationId));
  };

  const setActiveNotificationBeingSlided = (notificationId) => {
    dispatch(setActiveNotification(notificationId));
  };

  const navigate = (alertType) => {
    switch (alertType) {
      case "FOLLOW":
        return navigateToProfileNavigator(props, creator._id);
      case "REVIEW":
        return navigateToReviewThroughProfileNavigator(props, targetUser);
      case "LIKE":
      case "MATCH":
      case "REQUEST":
      case "SWAP":
        return navigateToProductDetailsThroughProfileNavigator(
          props,
          productId._id
        );
    }
  };

  // Side Effects //
  useDidMountEffect(() => {
    if (activeNotification !== _id) {
      swipeableRef.current.close();
    }
  }, [activeNotification]);

  // Render //
  return (
    <Swipeable
      ref={swipeableRef}
      friction={2}
      onSwipeableRightWillOpen={() => setActiveNotificationBeingSlided(_id)}
      renderRightActions={() =>
        renderDeleteButton(() => closeNotification(_id))
      }
    >
      <TouchableWithoutFeedback onPress={() => navigate(type)}>
        <View
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
        </View>
      </TouchableWithoutFeedback>
    </Swipeable>
  );
};

export default AlertRow;

const styles = StyleSheet.create({
  alertContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 15,
    height: 100,
  },
  imageTextContainer: {
    flexDirection: "row",
    width: "80%",
  },
  textContainer: {
    marginLeft: 10,
    alignSelf: "center",
    width: "70%",
  },
  subtitle: {
    fontFamily: "latoBold",
  },
});
