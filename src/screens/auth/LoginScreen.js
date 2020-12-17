import React from "react";
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { useForm, Controller } from "react-hook-form";

import Colors from "constants/Colors";
import DefaultText from "components/DefaultText";
import GlassTextInput from "components/GlassTextInput";
import MainButton from "components/MainButton";

const LoginScreen = (props) => {
  const { control, handleSubmit, errors } = useForm();
  const submitHandler = (d) => {
    console.log(d);
  };

  const signupHandler = () => {
    props.navigation.navigate("Signup");
  };

  return (
    <View style={styles.screen}>
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
          rules={{ required: "This is required." }}
          render={({ onChange, onBlur, value }) => (
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
        <Controller
          name="password"
          defaultValue=""
          control={control}
          rules={{ required: "This is required." }}
          render={({ onChange, onBlur, value }) => (
            <GlassTextInput
              value={value}
              onChangeText={(value) => {
                onChange(value);
              }}
            >
              Password
            </GlassTextInput>
          )}
        />
      </View>
      <View style={styles.emailContainer}>
        <DefaultText style={styles.emailText}>Login using gmail: </DefaultText>
        <Image
          style={styles.gmailLogo}
          source={require("assets/logo/gmail-logo.png")}
        />
      </View>
      <View style={styles.buttonContainer}>
        <MainButton style={styles.button} onPress={handleSubmit(submitHandler)}>
          Login
        </MainButton>
      </View>
      <View style={styles.signupContainer}>
        <DefaultText style={styles.signupText}>
          Don't have an account?{" "}
        </DefaultText>
        <TouchableOpacity onPress={signupHandler}>
          <DefaultText style={styles.signupTextAccent}>Sign Up!</DefaultText>
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
