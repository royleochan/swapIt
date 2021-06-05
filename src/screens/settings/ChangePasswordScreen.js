import React from "react";
import { StyleSheet, Text, View, TextInput } from "react-native";
import { useForm, Controller } from "react-hook-form";

import Colors from "constants/Colors";
import DefaultText from "components/DefaultText";
import MainButton from "components/MainButton";

const ChangePasswordScreen = () => {
  const { control, handleSubmit, errors } = useForm();

  const submitHandler = async (data) => {
    console.log(data.currentPassword);
    console.log(data.newPassword);
    console.log(data.newPasswordConfirmation);
  };

  return (
    <View style={styles.screenContainer}>
      <DefaultText style={styles.headerText}>Change Password</DefaultText>
      <View style={styles.textInputContainer}>
        <DefaultText style={styles.inputLabelText}>
          Current Password
        </DefaultText>
        <Controller
          name="currentPassword"
          defaultValue=""
          control={control}
          rules={{ required: true }}
          render={({ onChange, value }) => (
            <TextInput
              autoCapitalize={false}
              value={value}
              onChangeText={(value) => {
                onChange(value);
              }}
            />
          )}
        />
      </View>
      {errors.currentPassword && (
        <Text style={styles.errorText}>Required field cannot be empty.</Text>
      )}
      <View style={styles.textInputContainer}>
        <DefaultText style={styles.inputLabelText}>New Password</DefaultText>
        <Controller
          name="newPassword"
          defaultValue=""
          control={control}
          rules={{ required: true }}
          render={({ onChange, value }) => (
            <TextInput
              autoCapitalize={false}
              value={value}
              onChangeText={(value) => {
                onChange(value);
              }}
            />
          )}
        />
      </View>
      {errors.newPassword && (
        <Text style={styles.errorText}>Required field cannot be empty.</Text>
      )}
      <View style={styles.textInputContainer}>
        <DefaultText style={styles.inputLabelText}>
          Confirm New Password
        </DefaultText>
        <Controller
          name="newPasswordConfirmation"
          defaultValue=""
          control={control}
          rules={{ required: true }}
          render={({ onChange, value }) => (
            <TextInput
              autoCapitalize={false}
              value={value}
              onChangeText={(value) => {
                onChange(value);
              }}
            />
          )}
        />
      </View>
      {errors.newPasswordConfirmation && (
        <Text style={styles.errorText}>Required field cannot be empty.</Text>
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
    fontSize: 26,
    fontFamily: "latoBold",
    padding: 20,
  },
  textInputContainer: {
    borderBottomColor: "rgba(196, 196, 196, 0.3)",
    borderBottomWidth: 1,
    padding: 20,
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
