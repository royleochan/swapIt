import React from "react";
import { View, StyleSheet } from "react-native";
import RNPickerSelect from "react-native-picker-select";

const DropDown = (props) => {
  const { placeholder, items } = props;
  return (
    <View style={styles.container}>
      <RNPickerSelect
        placeholder={{ label: placeholder, value: null, color: "#939AA4" }}
        onValueChange={(value) => console.log(value)}
        items={items}
      />
    </View>
  );
};

export default DropDown;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 4,
  },
});
