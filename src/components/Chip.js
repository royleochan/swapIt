import React, { useState } from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";

import DefaultText from "components/DefaultText";
import Colors from "constants/Colors";

const Chip = (props) => {
  const { filterState, setFilterState, value } = props;

  const [selected, setSelected] = useState(false);

  const updateState = () => {
    const result = filterState;
    result[value] = !filterState[value];
    setFilterState(result);
    setSelected(!selected);
  };

  return (
    <TouchableOpacity onPress={updateState}>
      <View
        style={selected ? styles.chipContainerOutline : styles.chipContainer}
      >
        <DefaultText>{props.text}</DefaultText>
      </View>
    </TouchableOpacity>
  );
};

export default Chip;

const styles = StyleSheet.create({
  chipContainer: {
    padding: 10,
    backgroundColor: Colors.lightGray,
    borderRadius: 30,
    alignItems: "center",
    margin: 5,
  },
  chipContainerOutline: {
    padding: 10,
    backgroundColor: Colors.lightGray,
    borderRadius: 30,
    alignItems: "center",
    margin: 5,
    borderWidth: 2,
    borderColor: Colors.primary,
  },
});
