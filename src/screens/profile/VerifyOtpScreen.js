// React Imports //
import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from "react-native-confirmation-code-field";

// RNE Imports //
import { Button } from "react-native-elements";

// Redux Action Imports //
import { refreshUser } from "store/actions/auth";

// Util Imports //
import request from "utils/request";
import showAlert from "utils/showAlert";

// Colors Imports //
import Colors from "constants/Colors";

// Components Imports //
import Loader from "components/Loader";
import DefaultText from "components/DefaultText";

// Constants //
const CELL_COUNT = 6;

// Main Component //
const VerifyOtpScreen = (props) => {
  // Init //
  const dispatch = useDispatch();
  const jwtToken = useSelector((state) => state.auth.jwtToken);
  const loggedInUserId = useSelector((state) => state.auth.user.id);
  const loggedInUserEmail = useSelector((state) => state.auth.user.email);

  const [value, setValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
  const [properties, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  // Functions //
  const sendOtp = async () => {
    setIsLoading(true);
    try {
      await request.get(`/api/otp/generate/${loggedInUserId}`);
    } catch (err) {
      showAlert("Failed", err.response.data.message, null);
    } finally {
      setIsLoading(false);
    }
  };

  const verifyOtp = async () => {
    setIsLoading(true);
    try {
      const response = await request.post(
        `/api/otp/verify/email`,
        {
          uid: loggedInUserId,
          otpValue: value,
        },
        jwtToken
      );
      dispatch(refreshUser(response.data.user));
      setIsLoading(false);
      props.navigation.goBack();
    } catch (err) {
      showAlert("Failed", err.response.data.message, () => setIsLoading(false));
    }
  };

  // Side Effects //
  useEffect(() => {
    sendOtp();
  }, []);

  // Render //
  return (
    <View style={styles.screen}>
      {isLoading && <Loader isLoading={true} />}
      <DefaultText style={styles.headerText}>We've sent you a code</DefaultText>
      <DefaultText style={styles.bodyText}>
        Enter it below to verify {loggedInUserEmail}
      </DefaultText>
      <SafeAreaView style={styles.root}>
        <CodeField
          ref={ref}
          {...properties}
          value={value}
          onChangeText={setValue}
          cellCount={CELL_COUNT}
          rootStyle={styles.codeFieldRoot}
          keyboardType="number-pad"
          textContentType="oneTimeCode"
          renderCell={({ index, symbol, isFocused }) => (
            <View
              onLayout={getCellOnLayoutHandler(index)}
              key={index}
              style={[styles.cellRoot, isFocused && styles.focusCell]}
            >
              <Text style={styles.cellText}>
                {symbol || (isFocused ? <Cursor /> : null)}
              </Text>
            </View>
          )}
        />
      </SafeAreaView>
      <Button
        title="Verify"
        type="clear"
        containerStyle={styles.buttonContainer}
        buttonStyle={styles.button}
        titleStyle={styles.buttonText}
        disabled={value.length !== 6 ? true : false}
        onPress={() => verifyOtp()}
      />
      <TouchableOpacity onPress={sendOtp}>
        <DefaultText>Resend email</DefaultText>
      </TouchableOpacity>
    </View>
  );
};

export default VerifyOtpScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.background,
    alignItems: "center",
  },
  headerText: {
    fontFamily: "latoBold",
    fontSize: 20,
    paddingTop: 40,
    paddingBottom: 20,
  },
  bodyText: {
    fontSize: 14,
    paddingBottom: 20,
    width: "80%",
    textAlign: "center",
  },
  root: { padding: 20 },
  codeFieldRoot: {
    marginTop: 20,
    width: "70%",
    marginLeft: "auto",
    marginRight: "auto",
  },
  cellRoot: {
    width: "14%",
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
  },
  cellText: {
    color: "#000",
    fontSize: 36,
    textAlign: "center",
  },
  focusCell: {
    borderBottomColor: "#007AFF",
    borderBottomWidth: 2,
  },
  buttonContainer: {
    paddingTop: 25,
    alignItems: "center",
  },
  button: {
    width: 200,
    height: 40,
    backgroundColor: Colors.primary,
    borderRadius: 20,
    marginBottom: 10,
  },
  buttonText: {
    fontSize: 14,
    color: "white",
  },
});
