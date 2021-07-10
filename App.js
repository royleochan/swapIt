import React, { useState } from "react";
import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import ReduxThunk from "redux-thunk";
import * as Font from "expo-font";
import AppLoading from "expo-app-loading";
import { ActionSheetProvider } from "@expo/react-native-action-sheet";
import * as Notifications from "expo-notifications";

import AppNavigator from "navigation/AppNavigator";
import authReducer from "store/reducers/auth";
import sortReducer from "store/reducers/sort";
import filterReducer from "store/reducers/filter";
import productsReducer from "store/reducers/products";
import notificationsReducer from "store/reducers/notifications";
import followInfoReducer from "store/reducers/followInfo";

// Set settings for foreground notifications //
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

// Load fonts required //
const fetchFonts = () => {
  return Font.loadAsync({
    lato: require("assets/fonts/Lato-Regular.ttf"),
    latoBold: require("assets/fonts/Lato-Bold.ttf"),
  });
};

// Setup redux store //
const rootReducer = combineReducers({
  auth: authReducer,
  sort: sortReducer,
  filter: filterReducer,
  products: productsReducer,
  notifications: notificationsReducer,
  followInfo: followInfoReducer,
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

export default function App() {
  // Init //
  const [dataLoaded, setDataLoaded] = useState(false);

  // Main component //
  if (!dataLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setDataLoaded(true)}
        onError={console.warn}
      />
    );
  }

  return (
    <Provider store={store}>
      <ActionSheetProvider>
        <>
          <AppNavigator />
          <StatusBar style="auto" />
        </>
      </ActionSheetProvider>
    </Provider>
  );
}
