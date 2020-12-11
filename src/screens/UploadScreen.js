import React from "react";
import { View, StyleSheet, TouchableOpacity, TextInput } from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";

import Colors from "constants/Colors";
import FemaleCategories from "constants/FemaleCategories";
import MaleCategories from "constants/MaleCategories";
import DefaultText from "components/DefaultText";
import DropDown from "components/DropDown";

const UploadScreen = (props) => {
  return (
    <View style={styles.screenContainer}>
      <View style={styles.imageContainer}>
        <View style={styles.imagePreview}>
          <TouchableOpacity
            style={styles.iconContainer}
            onPress={() => {
              console.log("Select Picture");
            }}
          >
            <AntDesign name="plussquareo" size={24} color={Colors.primary} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.formContainer}>
        <View style={styles.formBoxContainer}>
          <DefaultText style={styles.inputHeader}>Title</DefaultText>
          <TextInput style={styles.titleInput} />
        </View>
        <View style={styles.formBoxContainer}>
          <DefaultText style={styles.inputHeader}>Description</DefaultText>
          <TextInput style={styles.descriptionInput} multiline={true} />
        </View>
        <View style={styles.formBoxContainer}>
          <DefaultText style={styles.inputHeader}>Price Range</DefaultText>
          <View style={styles.priceRangeContainer}>
            <TextInput style={styles.priceRangeInput} />
            <DefaultText style={styles.toText}>to</DefaultText>
            <TextInput style={styles.priceRangeInput} />
          </View>
        </View>
        <View style={styles.formBoxContainer}>
          <DefaultText style={styles.inputHeader}>Category</DefaultText>
          <DropDown placeholder="Male" items={MaleCategories} />
          <DropDown placeholder="Female" items={FemaleCategories} />
        </View>
      </View>
    </View>
  );
};

export default UploadScreen;

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    alignItems: "center",
  },
  imageContainer: {
    height: "40%",
    justifyContent: "center",
  },
  imagePreview: {
    width: 200,
    height: 200,
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    borderColor: Colors.gray,
    borderWidth: 3,
  },
  formContainer: {
    height: "65%",
    width: "100%",
    backgroundColor: Colors.gray,
    padding: 26,
  },
  formBoxContainer: {
    marginVertical: 10,
  },
  inputHeader: {
    marginVertical: 6,
  },
  titleInput: {
    width: "95%",
    height: 25,
    borderRadius: 8,
    paddingHorizontal: 2,
    backgroundColor: Colors.glass,
    opacity: 0.3,
  },
  descriptionInput: {
    width: "95%",
    height: 100,
    borderRadius: 8,
    paddingHorizontal: 2,
    backgroundColor: Colors.glass,
    opacity: 0.3,
  },
  priceRangeContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  priceRangeInput: {
    width: "10%",
    height: 40,
    borderRadius: 8,
    paddingHorizontal: 2,
    backgroundColor: Colors.glass,
    opacity: 0.3,
  },
  toText: {
    marginHorizontal: 10,
  },
});
