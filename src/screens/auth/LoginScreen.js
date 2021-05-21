import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  Text,
  Alert,
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import { useDispatch } from "react-redux";

import Colors from "constants/Colors";
import DefaultText from "components/DefaultText";
import GlassTextInput from "components/GlassTextInput";
import MainButton from "components/MainButton";
import Loader from "components/Loader";
import * as authActions from "store/actions/auth";

const LoginScreen = (props) => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const { control, handleSubmit, errors } = useForm();

  const loginHandler = async (data) => {
    setIsLoading(true);
    try {
      await dispatch(authActions.authenticate(data.username, data.password));
    } catch (err) {
      Alert.alert("Login failed!", `${err}`, [
        { text: "Okay", onPress: () => setIsLoading(false) },
      ]);
    }
  };

  const signupHandler = () => {
    props.navigation.navigate("Signup");
  };

  useEffect(() => {
    return () => setIsLoading(false);
  }, []);

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
        <TouchableOpacity onPress={signupHandler}>
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
