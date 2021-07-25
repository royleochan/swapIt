// React Imports //
import React, { useCallback } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { useFocusEffect } from "@react-navigation/native";

// Redux Action Imports //
import {
  fetchNotifications,
  markAllNotificationsAsRead,
} from "store/actions/notifications";

// Custom Hook Imports //
import useFlatListRequest from "hooks/useFlatListRequest";

// Colors Imports //
import Colors from "constants/Colors";

// Component Imports //
import DefaultText from "components/DefaultText";
import AlertRow from "components/AlertRow";
import Empty from "components/Empty";
import ErrorSplash from "components/ErrorSplash";
import AlertSkeleton from "components/skeletons/AlertSkeleton";

// Main Component //
const AlertsScreen = (props) => {
  // Init //
  const dispatch = useDispatch();
  const notifications = useSelector(
    (state) => state.notifications.notifications
  );
  const unreadNotifications = notifications.filter(
    (notification) => notification.isRead === false
  );

  // Side Effects //
  const { isRefreshing, isError, isLoading, setIsRefreshing } =
    useFlatListRequest(() => dispatch(fetchNotifications()));

  useFocusEffect(
    useCallback(() => {
      return () =>
        dispatch(
          markAllNotificationsAsRead(
            unreadNotifications.map((notification) => notification._id)
          )
        );
    }, [])
  );

  // Render //
  return (
    <View style={styles.screenContainer}>
      <View style={styles.headerContainer}>
        <DefaultText style={styles.header}>Alerts</DefaultText>
      </View>
      {isLoading ? (
        <AlertSkeleton />
      ) : (
        <FlatList
          onRefresh={() => setIsRefreshing(true)}
          contentContainerStyle={{ flexGrow: 1 }}
          ListEmptyComponent={
            isError ? (
              <ErrorSplash />
            ) : (
              <Empty message="No alerts found" width={128} height={128} />
            )
          }
          style={styles.list}
          refreshing={isRefreshing}
          data={notifications}
          horizontal={false}
          keyExtractor={(item) => item._id}
          renderItem={(itemData) => {
            return (
              <AlertRow
                notification={itemData.item}
                navigation={props.navigation}
              />
            );
          }}
        ></FlatList>
      )}
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
