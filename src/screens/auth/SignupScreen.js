// React Imports //
import React, { useRef } from "react";
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  Text,
  KeyboardAvoidingView,
} from "react-native";

// React Hook Form Imports //
import { useForm, Controller } from "react-hook-form";

// Navigation Imports //
import {
  navigateToLogin,
  navigateToSignUpTwo,
} from "navigation/navigate/auth/index";

// Colors Import //
import Colors from "constants/Colors";

// Components Imports //
import GlassTextInput from "components/GlassTextInput";
import DefaultText from "components/DefaultText";
import MainButton from "components/MainButton";

// Main Component //
const SignupScreen = (props) => {
  // Init //
  const { control, handleSubmit, errors, watch } = useForm();
  const password = useRef({});
  password.current = watch("password", "");

  // Functions //
  const signupHandler = (data) => {
    delete data.confirmPassword;
    navigateToSignUpTwo(props, data);
  };

  // Render //
  return (
    <View style={styles.screen}>
      <View style={styles.logoContainer}>
        <Image
          style={styles.logo}
          source={require("assets/logo/white-on-transparent.png")}
        />
      </View>
      <KeyboardAvoidingView
        behavior={Platform.OS == "ios" ? "padding" : "height"}
        style={styles.keyboard}
      >
        <Controller
          name="name"
          defaultValue=""
          control={control}
          rules={{ required: true }}
          render={({ onChange, value }) => (
            <GlassTextInput
              value={value}
              onChangeText={(value) => {
                onChange(value);
              }}
            >
              Name
            </GlassTextInput>
          )}
        />
        {errors.name && (
          <Text style={styles.errorText}>Required field cannot be empty</Text>
        )}
        <Controller
          name="username"
          defaultValue=""
          control={control}
          rules={{ required: true }}
          render={({ onChange, value }) => (
            <GlassTextInput
              value={value}
              onChangeText={(value) => {
                onChange(value);
              }}
            >
              Username
            </GlassTextInput>
          )}
        />
        {errors.username && (
          <Text style={styles.errorText}>Required field cannot be empty</Text>
        )}
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
            <GlassTextInput
              value={value}
              onChangeText={(value) => {
                onChange(value);
              }}
            >
              Email
            </GlassTextInput>
          )}
        />
        {errors.email && (
          <Text style={styles.errorText}>{errors.email.message}</Text>
        )}
        <Controller
          name="password"
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
            <GlassTextInput
              secureTextEntry={true}
              value={value}
              onChangeText={(value) => {
                onChange(value);
              }}
            >
              Password
            </GlassTextInput>
          )}
        />
        {errors.password && (
          <Text style={styles.errorText}>{errors.password.message}</Text>
        )}
        <Controller
          name="confirmPassword"
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
            <GlassTextInput
              secureTextEntry={true}
              value={value}
              onChangeText={(value) => {
                onChange(value);
              }}
            >
              Password
            </GlassTextInput>
          )}
        />
        {errors.confirmPassword && (
          <Text style={styles.errorText}>{errors.confirmPassword.message}</Text>
        )}
      </KeyboardAvoidingView>
      {/* <View style={styles.emailContainer}>
        <DefaultText style={styles.emailText}>Signup using gmail: </DefaultText>
        <Image
          style={styles.gmailLogo}
          source={require("assets/logo/gmail-logo.png")}
        />
      </View> */}
      <View style={styles.buttonContainer}>
        <MainButton onPress={handleSubmit(signupHandler)}>Register</MainButton>
      </View>
      <View style={styles.signInContainer}>
        <DefaultText style={styles.signInText}>
          Already have an account?
        </DefaultText>
        <TouchableOpacity onPress={() => navigateToLogin(props)}>
          <DefaultText style={styles.signInTextAccent}> Sign in!</DefaultText>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SignupScreen;

const styles = StyleSheet.create({
  screen: {
    backgroundColor: Colors.primary,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  logoContainer: {
    width: "100%",
    height: "20%",
    alignItems: "center",
    justifyContent: "flex-end",
    paddingBottom: 30,
  },
  logo: {
    width: 170,
    height: 45,
  },
  keyboard: {
    width: "100%",
    alignItems: "center",
  },
  errorText: {
    color: Colors.darkPink,
    fontSize: 12,
    paddingTop: 6,
  },
  emailContainer: {
    paddingTop: 30,
    flexDirection: "row",
  },
  emailText: {
    paddingTop: 10,
    color: Colors.gray,
    fontSize: 16,
  },
  gmailLogo: {
    width: 60,
    height: 40,
  },
  buttonContainer: {
    paddingTop: 15,
    marginTop: 15,
  },
  signInContainer: {
    paddingTop: 10,
    flexDirection: "row",
  },
  signInText: {
    color: "white",
    fontSize: 14,
  },
  signInTextAccent: {
    color: Colors.accent,
    fontSize: 14,
    textDecorationLine: "underline",
  },
});
