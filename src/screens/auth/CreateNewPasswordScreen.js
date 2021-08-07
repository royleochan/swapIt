// React Imports //
import React, { useState, useRef } from "react";
import {
  StyleSheet,
  View,
  TextInput,
  Text,
  TouchableOpacity,
} from "react-native";

// React Hook Form Imports //
import { useForm, Controller } from "react-hook-form";

// Icon Imports //
import Ionicons from "react-native-vector-icons/Ionicons";

// Colors Import //
import Colors from "constants/Colors";

// Components Imports //
import DefaultText from "components/DefaultText";
import MainButton from "components/MainButton";
import Loader from "components/Loader";

// Main Component //
const CreateNewPasswordScreen = (props) => {
  // Init //
  const { email, userId } = props.route.params;
  const [isLoading, setIsLoading] = useState(false);
  const [isHidden, setIsHidden] = useState(true);
  const { control, handleSubmit, errors, watch } = useForm();
  const password = useRef({});
  password.current = watch("newPassword", "");

  // Functions //
  const submitHandler = async (data) => {
    const { newPassword, newPasswordConfirm } = data;
    console.log(newPassword);
    console.log(newPasswordConfirm);
  };

  // Render //
  return (
    <View style={styles.screen}>
      {isLoading && <Loader isLoading={true} />}
      <DefaultText style={styles.headerText}>Create New Password</DefaultText>
      <DefaultText style={styles.descriptionText}>
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
  descriptionText: {
    paddingTop: 20,
    fontSize: 14,
    paddingRight: 30,
  },
  textInputContainer: {
    paddingTop: 30,
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
