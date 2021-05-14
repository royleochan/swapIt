import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import { AntDesign } from "@expo/vector-icons";

const IconButton = (props) => {
  const { onPress, name, color, style, backgroundColor, size } = props;

  return (
    <TouchableOpacity
      style={{
        ...styles.singleButton,
        ...style,
        backgroundColor: backgroundColor,
      }}
      onPress={onPress}
      activeOpacity={0.85}
    >
      <AntDesign name={name} size={size} color={color} />
    </TouchableOpacity>
  );
};

export default IconButton;

const styles = StyleSheet.create({
  singleButton: {
    alignItems: "center",
    justifyContent: "center",
  },
});
