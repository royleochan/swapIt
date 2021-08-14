// React Imports //
import React, { useState } from "react";
import { StyleSheet, View, TextInput, Text } from "react-native";

// React Hook Form Imports //
import { useForm, Controller } from "react-hook-form";

// Navigation Imports //
import { navigateToCreateNewPassword } from "navigation/navigate/auth/index";

// Utils Imports //
import request from "utils/request";
import showAlert from "utils/showAlert";

// Colors Import //
import Colors from "constants/Colors";

// Components Imports //
import DefaultText from "components/DefaultText";
import IconButton from "components/IconButton";
import MainButton from "components/MainButton";
import Loader from "components/Loader";

// Main Component //
const ResetPasswordScreen = (props) => {
  // Init //
  const [isLoading, setIsLoading] = useState(false);
  const { control, handleSubmit, errors } = useForm();

  // Functions //
  const submitHandler = async (data) => {
    const { email } = data;
    await sendOtp(email);
  };

  // Functions //
  const sendOtp = async (email) => {
    setIsLoading(true);
    try {
      const response = await request.post("/api/otp/generate/", {
        email,
        type: "password",
      });
      setIsLoading(false);
      navigateToCreateNewPassword(props, email, response.data.userId);
    } catch (err) {
      showAlert("Failed", err.response.data.message, () => setIsLoading(false));
    }
  };

  // Render //
  return (
    <View style={styles.screen}>
      {isLoading && <Loader isLoading={true} />}
      <IconButton
        style={styles.arrow}
        size={23}
        color={Colors.primary}
        name="arrowleft"
        onPress={() => props.navigation.goBack()}
      />
      <View style={styles.textContainer}>
        <DefaultText style={styles.headerText}>Reset Password</DefaultText>
        <DefaultText style={styles.descriptionText}>
          Enter the email associated with your account and we'll send an email
          with instructions to reset your password.
        </DefaultText>
        <View style={styles.textInputContainer}>
          <Controller
            name="email"
            defaultValue=""
            control={control}
            rules={{
              required: {
                value: true,
                message: "Required field cannot be empty",
              },
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Please enter valid email",
              },
            }}
            render={({ onChange, value }) => (
              <TextInput
                style={styles.textInput}
                value={value}
                autoCapitalize="none"
                placeholder="Email"
                onChangeText={(value) => {
                  onChange(value);
                }}
              ></TextInput>
            )}
          />
          {errors.email && (
            <Text style={styles.errorText}>{errors.email.message}</Text>
          )}
        </View>
        <View style={styles.buttonContainer}>
          <MainButton
            style={styles.button}
            styleText={styles.buttonText}
            onPress={handleSubmit(submitHandler)}
          >
            Send Instructions
          </MainButton>
        </View>
      </View>
    </View>
  );
};

export default ResetPasswordScreen;

const styles = StyleSheet.create({
  screen: {
    backgroundColor: Colors.background,
    flex: 1,
    alignItems: "center",
  },
  arrow: {
    zIndex: 1,
    position: "absolute",
    left: 20,
    top: 40,
  },
  textContainer: {
    paddingHorizontal: 20,
    paddingTop: 100,
  },
  headerText: {
    fontFamily: "latoBold",
    fontSize: 24,
  },
  descriptionText: {
    paddingTop: 20,
    fontSize: 14,
    paddingRight: 30,
  },
  textInputContainer: {
    paddingTop: 20,
  },
  textInput: {
    height: 30,
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
