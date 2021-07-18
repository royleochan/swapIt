// React Imports //
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { StyleSheet, View, Image, TouchableOpacity, Text } from "react-native";

// React Hook Form Imports //
import { useForm, Controller } from "react-hook-form";

// Navigation Imports //
import { navigateToSignUp } from "navigation/navigate/auth/index";

// Redux Action Imports //
import { authenticate } from "store/actions/auth";

// Colors Import //
import Colors from "constants/Colors";

// Utils Imports //
import showAlert from "utils/showAlert";

// Components Imports //
import DefaultText from "components/DefaultText";
import GlassTextInput from "components/GlassTextInput";
import MainButton from "components/MainButton";
import Loader from "components/Loader";

// Main Component //
const LoginScreen = (props) => {
  // Init //
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const { control, handleSubmit, errors } = useForm();

  // Functions //
  const loginHandler = async (data) => {
    setIsLoading(true);
    try {
      await dispatch(authenticate(data.username, data.password));
    } catch (err) {
      showAlert("Login failed", err.message, () => setIsLoading(false));
    }
  };

  // Side Effects //
  useEffect(() => {
    return () => setIsLoading(false);
  }, []);

  // Render //
  return (
    <View style={styles.screen}>
      {isLoading && <Loader isLoading={true} />}
      <View style={styles.logoContainer}>
        <Image
          style={styles.logo}
          source={require("assets/logo/white-on-transparent.png")}
        />
      </View>
      <View style={styles.welcomeTextContainer}>
        <DefaultText style={styles.welcomeText}>Welcome Back!</DefaultText>
      </View>
      <View style={styles.inputContainer}>
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
          <Text style={styles.errorText}>Required field cannot be empty.</Text>
        )}
        <Controller
          name="password"
          defaultValue=""
          control={control}
          rules={{ required: true }}
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
          <Text style={styles.errorText}>Required field cannot be empty.</Text>
        )}
      </View>
      <View style={styles.emailContainer}>
        <DefaultText style={styles.emailText}>Login using gmail: </DefaultText>
        <Image
          style={styles.gmailLogo}
          source={require("assets/logo/gmail-logo.png")}
        />
      </View>
      <View style={styles.buttonContainer}>
        <MainButton style={styles.button} onPress={handleSubmit(loginHandler)}>
          Login
        </MainButton>
      </View>
      <View style={styles.signupContainer}>
        <DefaultText style={styles.signupText}>
          Don't have an account?
        </DefaultText>
        <TouchableOpacity onPress={() => navigateToSignUp(props)}>
          <DefaultText style={styles.signupTextAccent}> Sign Up!</DefaultText>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  screen: {
    backgroundColor: Colors.primary,
    flex: 1,
  },
  logoContainer: {
    width: "100%",
    height: "30%",
    alignItems: "center",
    justifyContent: "flex-end",
    paddingBottom: 30,
  },
  logo: {
    width: 170,
    height: 45,
  },
  welcomeTextContainer: {
    alignItems: "center",
    padding: 10,
  },
  welcomeText: {
    color: Colors.accent,
    fontFamily: "latoBold",
    fontSize: 16,
  },
  inputContainer: {
    alignItems: "center",
  },
  errorText: {
    marginTop: 10,
    color: Colors.darkPink,
  },
  emailContainer: {
    paddingTop: 30,
    flexDirection: "row",
    justifyContent: "center",
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
    alignItems: "center",
  },
  button: {
    backgroundColor: "#B18197",
  },
  signupContainer: {
    paddingTop: 10,
    flexDirection: "row",
    justifyContent: "center",
  },
  signupText: {
    color: "white",
    fontSize: 14,
  },
  signupTextAccent: {
    color: Colors.accent,
    fontSize: 14,
    textDecorationLine: "underline",
  },
});
