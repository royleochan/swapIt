import React from "react";
import { StyleSheet, View, TextInput, Text } from "react-native";
import { useForm, Controller } from "react-hook-form";

import Colors from "constants/Colors";
import DefaultText from "components/DefaultText";
import MainButton from "components/MainButton";

const ReportScreen = (props) => {
  const title = props.route.params;
  const { control, handleSubmit, errors } = useForm();

  const submitHandler = async (data) => {
    console.log(data.description);
  };

  return (
    <View style={styles.screenContainer}>
      <DefaultText style={styles.headerText}>{title}</DefaultText>
      <View style={styles.textInputContainer}>
        <Controller
          name="description"
          defaultValue=""
          control={control}
          rules={{ required: true }}
          render={({ onChange, value }) => (
            <TextInput
              style={styles.textInput}
              placeholder="Description"
              multiline={true}
              value={value}
              onChangeText={(value) => {
                onChange(value);
              }}
            />
          )}
        />
      </View>
      {errors.description && (
        <Text style={styles.errorText}>Required field cannot be empty.</Text>
      )}
      <View style={styles.buttonContainer}>
        <MainButton
          style={styles.button}
          styleText={styles.buttonText}
          onPress={handleSubmit(submitHandler)}
        >
          Submit
        </MainButton>
      </View>
    </View>
  );
};

export default ReportScreen;

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
    marginHorizontal: 20,
    width: "90%",
    height: 120,
    backgroundColor: Colors.background,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 2,
  },
  textInput: {
    padding: 5,
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
    width: 80,
    height: 30,
    backgroundColor: Colors.primary,
  },
  buttonText: {
    fontSize: 12,
  },
});
