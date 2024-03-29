// React Imports //
import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import { ActionSheetProvider } from "@expo/react-native-action-sheet";
import ReduxThunk from "redux-thunk";
import AppLoading from "expo-app-loading";
import * as Font from "expo-font";
import * as Notifications from "expo-notifications";
import "react-native-gesture-handler";

// Navigator Imports //
import AppNavigator from "navigation/AppNavigator";

// Redux Reducer Imports //
import authReducer from "store/reducers/auth";
import productsReducer from "store/reducers/products";
import notificationsReducer from "store/reducers/notifications";
import followInfoReducer from "store/reducers/followInfo";
import chatScreenReducer from "store/reducers/chatscreen";
import chatRoomReducer from "store/reducers/chatroom";

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
  products: productsReducer,
  notifications: notificationsReducer,
  followInfo: followInfoReducer,
  chatScreen: chatScreenReducer,
  chatRoom: chatRoomReducer,
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

// Main component //
export default function App() {
  // Init //
  const [dataLoaded, setDataLoaded] = useState(false);

  // Render //
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
