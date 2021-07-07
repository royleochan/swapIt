import React, { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useFocusEffect } from "@react-navigation/native";
import { View, StyleSheet, FlatList } from "react-native";

import * as notificationActions from "store/actions/notifications";
import Colors from "constants/Colors";
import DefaultText from "components/DefaultText";
import AlertRow from "components/AlertRow";

const AlertsScreen = () => {
  const [isRefreshing, setIsRefreshing] = useState(false);

  const dispatch = useDispatch();
  const notifications = useSelector(
    (state) => state.notifications.notifications
  );
  const unreadNotifications = notifications.filter(
    (notification) => notification.isRead === false
  );

  const loadNotifications = async () => {
    setIsRefreshing(true);
    await dispatch(notificationActions.fetchNotifications());
    setIsRefreshing(false);
  };

  useEffect(() => {
    loadNotifications();
  }, []);

  useFocusEffect(
    useCallback(() => {
      return () =>
        dispatch(
          notificationActions.markAllNotificationsAsRead(
            unreadNotifications.map((notification) => notification._id)
          )
        );
    }, [])
  );

  return (
    <View style={styles.screenContainer}>
      <View style={styles.headerContainer}>
        <DefaultText style={styles.header}>Alerts</DefaultText>
      </View>
      <FlatList
        onRefresh={loadNotifications}
        style={styles.list}
        refreshing={isRefreshing}
        data={notifications}
        horizontal={false}
        keyExtractor={(item) => item._id}
        renderItem={(itemData) => {
          return <AlertRow notification={itemData.item} />;
        }}
      ></FlatList>
    </View>
  );
};

export default AlertsScreen;

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  headerContainer: {
    marginLeft: 24,
    marginTop: 64,
  },
  header: {
    fontFamily: "latoBold",
    fontSize: 28,
  },
  list: {
    marginTop: 8,
  },
});
