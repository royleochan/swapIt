import React from "react";
import { StyleSheet, View, Image, TouchableOpacity } from "react-native";

import Colors from "constants/Colors";
import GlassTextInput from "components/GlassTextInput";
import DefaultText from "components/DefaultText";
import MainButton from "components/MainButton";

const SignupScreen = (props) => {
  const loginHandler = () => {
    props.navigation.navigate("Login");
  };

  return (
    <View style={styles.screen}>
      <View style={styles.logoContainer}>
        <Image
          style={styles.logo}
          source={require("assets/logo/white-on-transparent.png")}
        />
      </View>
      <GlassTextInput>Username</GlassTextInput>
      <GlassTextInput>Email</GlassTextInput>
      <GlassTextInput>Password</GlassTextInput>
      <GlassTextInput>Re-enter Password</GlassTextInput>
      <View style={styles.emailContainer}>
        <DefaultText style={styles.emailText}>Signup using gmail: </DefaultText>
        <Image
          style={styles.gmailLogo}
          source={require("assets/logo/gmail-logo.png")}
        />
      </View>
      <View style={styles.buttonContainer}>
        <MainButton>Register</MainButton>
      </View>
      <View style={styles.signInContainer}>
        <DefaultText style={styles.signInText}>
          Already have an account?{" "}
        </DefaultText>
        <TouchableOpacity onPress={loginHandler}>
          <DefaultText style={styles.signInTextAccent}>Sign in!</DefaultText>
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
