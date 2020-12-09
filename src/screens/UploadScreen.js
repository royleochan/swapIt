import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";

import Colors from "constants/Colors";

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
          <Text style={styles.inputHeader}>Title</Text>
          <TextInput style={styles.titleInput} />
        </View>
        <View style={styles.formBoxContainer}>
          <Text style={styles.inputHeader}>Description</Text>
          <TextInput style={styles.descriptionInput} multiline={true} />
        </View>
        <View style={styles.formBoxContainer}>
          <Text style={styles.inputHeader}>Price Range</Text>
          <View style={styles.priceRangeContainer}>
            <TextInput style={styles.priceRangeInput} />
            <Text style={styles.toText}>to</Text>
            <TextInput style={styles.priceRangeInput} />
          </View>
        </View>
        <View style={styles.formBoxContainer}>
          <Text style={styles.inputHeader}>Category</Text>
          {/*Insert Drop Down Menu Here */}
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
    color: Colors.primary,
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
