import React from "react";
import { View, StyleSheet } from "react-native";
import RNPickerSelect from "react-native-picker-select";

const DropDown = (props) => {
  const { placeholder, items, functions } = props;
  const [value, setValue] = functions;
  return (
    <View style={styles.container}>
      <RNPickerSelect
        value={value}
        placeholder={{ label: placeholder, value: null, color: "#939AA4" }}
        onValueChange={(value) => {
          setValue(value);
        }}
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
