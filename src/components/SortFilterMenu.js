import React, { useState, useRef } from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import RBSheet from "react-native-raw-bottom-sheet";

import Colors from "constants/Colors";
import DefaultText from "components/DefaultText";

const SortFilterMenu = (props) => {
  const refRBSheetSort = useRef();
  const refRBSheetFilter = useRef();

  return (
    <View style={styles.headerContainer}>
      <TouchableOpacity
        style={styles.labelContainer}
        onPress={() => refRBSheetSort.current.open()}
      >
        <DefaultText style={styles.label}>Sort</DefaultText>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.labelContainer}
        onPress={() => refRBSheetFilter.current.open()}
      >
        <DefaultText style={styles.label}>Filter</DefaultText>
      </TouchableOpacity>
      <RBSheet
        ref={refRBSheetSort}
        openDuration={250}
        height={300}
        customStyles={{
          wrapper: {
            backgroundColor: "rgba(52, 52, 52, 0.2)",
          },
        }}
      >
        <DefaultText style={styles.subHeader}>Sort</DefaultText>
      </RBSheet>
      <RBSheet
        ref={refRBSheetFilter}
        openDuration={250}
        height={300}
        customStyles={{
          wrapper: {
            backgroundColor: "rgba(52, 52, 52, 0.2)",
          },
        }}
      >
        <DefaultText style={styles.subHeader}>Filter</DefaultText>
      </RBSheet>
    </View>
  );
};

export default SortFilterMenu;

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-evenly",
    alignItems: "center",
    marginTop: 14,
  },
  labelContainer: {
    width: "50%",
    alignItems: "center",
    padding: 10,
    backgroundColor: Colors.background,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.5,
  },
  label: {
    fontSize: 14,
  },
  bottomSheet: {
    height: 100,
    backgroundColor: Colors.background,
  },
  subHeader: {
    alignSelf: "center",
    marginTop: 10,
    fontSize: 20,
    fontFamily: "latoBold",
  },
});
