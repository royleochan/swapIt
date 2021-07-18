// React Imports //
import React, { useRef, useState } from "react";
import { StyleSheet, Text, View, TextInput } from "react-native";
import { useDispatch } from "react-redux";

// React Hook Form Imports //
import { useForm, Controller } from "react-hook-form";

// Colors Import //
import Colors from "constants/Colors";

// Redux Actions Imports //
import { updatePassword } from "store/actions/auth";

// Utils Imports //
import showAlert from "utils/showAlert";

// Components Import //
import DefaultText from "components/DefaultText";
import MainButton from "components/MainButton";
import Loader from "components/Loader";

// Main Component //
const ChangePasswordScreen = () => {
  // Init //
  const { control, handleSubmit, errors, watch, reset } = useForm();
  const newPassword = useRef({});
  newPassword.current = watch("newPassword", "");

  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();

  // Functions //
  const submitHandler = async (data) => {
    setIsLoading(true);
    try {
      await dispatch(updatePassword(data));
      reset();
      setIsLoading(false);
    } catch (err) {
      showAlert("Failed to change password", err.message, () =>
        setIsLoading(false)
      );
    }
  };

  // Render //
  return (
    <View style={styles.screenContainer}>
      {isLoading && <Loader isLoading={isLoading} />}
      <DefaultText style={styles.headerText}>Change Password</DefaultText>
      <View style={styles.textInputContainer}>
        <DefaultText style={styles.inputLabelText}>
          Current Password
        </DefaultText>
        <Controller
          name="currentPassword"
          defaultValue=""
          control={control}
          rules={{
            required: {
              value: true,
              message: "Required field cannot be empty.",
            },
            minLength: {
              value: 8,
              message: "Password must be at least 8 characters",
            },
          }}
          render={({ onChange, value }) => (
            <TextInput
              secureTextEntry={true}
              autoCapitalize="none"
              style={styles.textInput}
              value={value}
              onChangeText={(value) => {
                onChange(value);
              }}
            />
          )}
        />
      </View>
      {errors.currentPassword && (
        <Text style={styles.errorText}>{errors.currentPassword.message}</Text>
      )}
      <View style={styles.textInputContainer}>
        <DefaultText style={styles.inputLabelText}>New Password</DefaultText>
        <Controller
          name="newPassword"
          defaultValue=""
          control={control}
          rules={{
            required: {
              value: true,
              message: "Required field cannot be empty.",
            },
            minLength: {
              value: 8,
              message: "Password must be at least 8 characters",
            },
          }}
          render={({ onChange, value }) => (
            <TextInput
              secureTextEntry={true}
              autoCapitalize="none"
              style={styles.textInput}
              value={value}
              onChangeText={(value) => {
                onChange(value);
              }}
            />
          )}
        />
      </View>
      {errors.newPassword && (
        <Text style={styles.errorText}>{errors.newPassword.message}</Text>
      )}
      <View style={styles.textInputContainer}>
        <DefaultText style={styles.inputLabelText}>
          Confirm New Password
        </DefaultText>
        <Controller
          name="newPasswordConfirmation"
          defaultValue=""
          control={control}
          rules={{
            required: {
              value: true,
              message: "Required field cannot be empty.",
            },
            minLength: {
              value: 8,
              message: "Password must be at least 8 characters",
            },
            validate: (value) =>
              value === newPassword.current || "The passwords do not match",
          }}
          render={({ onChange, value }) => (
            <TextInput
              secureTextEntry={true}
              autoCapitalize="none"
              style={styles.textInput}
              value={value}
              onChangeText={(value) => {
                onChange(value);
              }}
            />
          )}
        />
      </View>
      {errors.newPasswordConfirmation && (
        <Text style={styles.errorText}>
          {errors.newPasswordConfirmation.message}
        </Text>
      )}
      <View style={styles.buttonContainer}>
        <MainButton
          style={styles.button}
          styleText={styles.buttonText}
          onPress={handleSubmit(submitHandler)}
        >
          Update Password
        </MainButton>
      </View>
    </View>
  );
};

export default ChangePasswordScreen;

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    justifyContent: "flex-start",
    backgroundColor: Colors.background,
  },
  headerText: {
    fontSize: 24,
    fontFamily: "latoBold",
    padding: 20,
  },
  textInputContainer: {
    borderBottomColor: "rgba(196, 196, 196, 0.3)",
    borderBottomWidth: 1,
    margin: 20,
  },
  textInput: {
    height: 30,
  },
  inputLabelText: {
    fontSize: 14,
    paddingBottom: 8,
  },
  errorText: {
    marginLeft: 20,
    marginTop: 5,
    color: Colors.darkPink,
  },
  buttonContainer: {
    alignItems: "flex-end",
    paddingTop: 20,
    marginRight: 20,
  },
  button: {
    width: 120,
    height: 35,
    backgroundColor: Colors.primary,
  },
  buttonText: {
    fontSize: 12,
  },
});
