import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'

import Colors from 'constants/Colors';

const MainButton = (props) => {
    return (
      <TouchableOpacity activeOpacity={0.5} onPress={props.onPress}>
        <View style={{ ...styles.button, ...props.style }}>
          <Text style={{ ...styles.buttonText, ...props.styleText }}>
            {props.children}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };
  
  export default MainButton

  const styles = StyleSheet.create({
    button: {
      width: 240,
      height: 60,
      alignItems: "center",
      justifyContent: "center"
    },
    buttonText: {
      color: "white",
      fontSize: 16,
      fontFamily: "lato",
    },
  });

