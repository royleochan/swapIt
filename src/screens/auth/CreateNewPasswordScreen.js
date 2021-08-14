// React Imports //
import React, { useState, useRef } from "react";
import {
  StyleSheet,
  View,
  TextInput,
  Text,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from "react-native-confirmation-code-field";

// React Hook Form Imports //
import { useForm, Controller } from "react-hook-form";

// Utils Imports //
import request from "utils/request";
import showAlert from "utils/showAlert";

// Icon Imports //
import Ionicons from "react-native-vector-icons/Ionicons";

// Colors Import //
import Colors from "constants/Colors";

// Components Imports //
import DefaultText from "components/DefaultText";
import MainButton from "components/MainButton";
import Loader from "components/Loader";

// CONSTANTS //
const CELL_COUNT = 6;

// Main Component //
const CreateNewPasswordScreen = (props) => {
  // Init //
  const { email, userId } = props.route.params;

  const [value, setValue] = useState("");
  const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
  const [properties, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isHidden, setIsHidden] = useState(true);
  const { control, handleSubmit, errors, watch } = useForm();
  const password = useRef({});
  password.current = watch("newPassword", "");

  // Functions //
  const sendOtp = async () => {
    setIsLoading(true);
    try {
      await request.post("/api/otp/generate/", { email, type: "password" });
      setIsLoading(false);
    } catch (err) {
      showAlert("Failed", err.response.data.message, () => setIsLoading(false));
    }
  };

  const submitHandler = async (data) => {
    const { newPassword, newPasswordConfirm } = data;
    try {
      setIsLoading(true);
      await request.post("/api/otp/verify/password", {
        uid: userId,
        otpValue: value,
        newPassword,
        newPasswordConfirm,
      });
      showAlert("Success", "Password has been successfully changed.", () => {
        setIsLoading(false);
        props.navigation.popToTop();
      });
    } catch (err) {
      showAlert("Failed", err.response.data.message, () => setIsLoading(false));
    }
  };

  // Render //
  return (
    <View style={styles.screen}>
      {isLoading && <Loader isLoading={true} />}
      <DefaultText style={styles.headerText}>Create New Password</DefaultText>
      <DefaultText style={styles.bodyText}>
        We've sent you a code, enter it below to verify.
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
      <TouchableOpacity onPress={sendOtp}>
        <DefaultText style={styles.resendEmailText}>Resend email</DefaultText>
      </TouchableOpacity>

      <View>
        {isLoading && <Loader isLoading={true} />}
        <DefaultText style={styles.bodyText}>
          Your new password must be at least 8 characters.
        </DefaultText>
        <View style={styles.textInputContainer}>
          <View style={styles.iconTextContainer}>
            <Controller
              name="newPassword"
              defaultValue=""
              control={control}
              rules={{
                required: {
                  value: true,
                  message: "Required field cannot be empty",
                },
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters",
                },
                maxLength: {
                  value: 16,
                  message: "Password cannot exceed 16 characters",
                },
              }}
              render={({ onChange, value }) => (
                <TextInput
                  style={styles.textInputHidden}
                  value={value}
                  autoCapitalize="none"
                  secureTextEntry={isHidden ? true : false}
                  placeholder="New Password"
                  onChangeText={(value) => {
                    onChange(value);
                  }}
                />
              )}
            />
            <TouchableOpacity onPress={() => setIsHidden(!isHidden)}>
              <Ionicons
                name={isHidden ? "eye-outline" : "eye-off-outline"}
                style={{ padding: 10 }}
                size={18}
                color="black"
              />
            </TouchableOpacity>
          </View>
          {errors.newPassword && (
            <Text style={styles.errorText}>{errors.newPassword.message}</Text>
          )}
        </View>
        <View style={styles.textInputContainer}>
          <Controller
            name="newPasswordConfirm"
            defaultValue=""
            control={control}
            rules={{
              required: {
                value: true,
                message: "Required field cannot be empty",
              },
              minLength: {
                value: 8,
                message: "Password must be at least 8 characters",
              },
              maxLength: {
                value: 16,
                message: "Password cannot exceed 16 characters",
              },
              validate: (value) =>
                value === password.current || "The passwords do not match",
            }}
            render={({ onChange, value }) => (
              <TextInput
                style={styles.textInput}
                value={value}
                autoCapitalize="none"
                secureTextEntry={isHidden ? true : false}
                placeholder="Confirm New Password"
                onChangeText={(value) => {
                  onChange(value);
                }}
              />
            )}
          />
          {errors.newPasswordConfirm && (
            <Text style={styles.errorText}>
              {errors.newPasswordConfirm.message}
            </Text>
          )}
        </View>
        <View style={styles.buttonContainer}>
          <MainButton
            style={styles.button}
            styleText={styles.buttonText}
            onPress={handleSubmit(submitHandler)}
          >
            Reset password
          </MainButton>
        </View>
      </View>
    </View>
  );
};

export default CreateNewPasswordScreen;

const styles = StyleSheet.create({
  screen: {
    backgroundColor: Colors.background,
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 100,
  },
  headerText: {
    fontFamily: "latoBold",
    fontSize: 24,
  },
  bodyText: {
    paddingTop: 20,
    fontSize: 14,
    paddingRight: 30,
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
  resendEmailText: {
    textAlign: "center",
    paddingTop: 10,
  },
  textInputContainer: {
    paddingTop: 25,
  },
  iconTextContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.textInput,
    borderRadius: 8,
  },
  textInputHidden: {
    flex: 1,
    height: 40,
    borderRadius: 8,
    paddingHorizontal: 5,
    backgroundColor: "transparent",
    color: "black",
  },
  textInput: {
    height: 40,
    borderRadius: 8,
    paddingHorizontal: 5,
    backgroundColor: Colors.textInput,
    color: "black",
  },
  errorText: {
    marginTop: 5,
    color: Colors.darkPink,
  },
  buttonContainer: {
    alignItems: "flex-end",
    paddingTop: 20,
  },
  button: {
    width: 120,
    height: 30,
    backgroundColor: Colors.primary,
  },
  buttonText: {
    fontSize: 12,
  },
});
