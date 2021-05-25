import React, { useRef, useEffect } from "react";
import { View, StyleSheet, TouchableOpacity, TextInput } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { useForm, Controller } from "react-hook-form";
import { AntDesign } from "@expo/vector-icons";
import RBSheet from "react-native-raw-bottom-sheet";

import * as sortActions from "store/actions/sort";
import * as filterActions from "store/actions/filter";
import Colors from "constants/Colors";
import DefaultText from "components/DefaultText";
import IconButton from "components/IconButton";
import MainButton from "components/MainButton";

const SortFilterMenu = (props) => {
  const refRBSheetSort = useRef();
  const refRBSheetFilter = useRef();

  const sortState = useSelector((state) => state.sort);
  const filterState = useSelector((state) => state.filter);
  const dispatch = useDispatch();

  const { control, handleSubmit, errors } = useForm();

  const filterHandler = (data) => {
    dispatch(
      filterActions.updateFilterState({
        minPrice: data.minPrice,
        maxPrice: data.maxPrice,
      })
    );
    refRBSheetFilter.current.close();
  };

  useEffect(() => {
    return () => {
      dispatch(
        filterActions.updateFilterState({ minPrice: null, maxPrice: null })
      );
      dispatch(sortActions.updateSortState({ 0: true }));
    };
  }, []);

  const SortLabel = (props) => {
    return (
      <TouchableOpacity
        onPress={() => {
          dispatch(sortActions.updateSortState({ [props.index]: true }));
          refRBSheetSort.current.close();
        }}
        style={styles.sortLabel}
      >
        <DefaultText style={styles.option}>{props.children}</DefaultText>
        {sortState[props.index] === true && (
          <AntDesign
            name="check"
            size={20}
            color={Colors.primary}
            style={styles.tickIcon}
          />
        )}
      </TouchableOpacity>
    );
  };

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
            backgroundColor: "rgba(100, 100, 100, 0.15)",
          },
        }}
      >
        <View style={styles.modalHeader}>
          <DefaultText style={styles.subHeader}>Sort</DefaultText>
          <IconButton
            name="close"
            size={20}
            style={styles.iconButton}
            onPress={() => refRBSheetSort.current.close()}
            color={Colors.primary}
          />
        </View>
        <View style={styles.optionsHeader}>
          <SortLabel index={0}>Latest</SortLabel>
          <SortLabel index={1}>Min Price (Low to High)</SortLabel>
          <SortLabel index={2}>Min Price (High to Low)</SortLabel>
          <SortLabel index={3}>Max Price (Low to High)</SortLabel>
          <SortLabel index={4}>Max Price (High to Low)</SortLabel>
        </View>
      </RBSheet>
      <RBSheet
        ref={refRBSheetFilter}
        openDuration={250}
        height={300}
        customStyles={{
          wrapper: {
            backgroundColor: "rgba(100, 100, 100, 0.15)",
          },
        }}
      >
        <View style={styles.modalHeader}>
          <DefaultText style={styles.subHeader}>Filter</DefaultText>
          <IconButton
            name="close"
            size={20}
            style={styles.iconButton}
            onPress={() => refRBSheetFilter.current.close()}
            color={Colors.primary}
          />
        </View>
        <View>
          <View style={styles.filterHeaderContainer}>
            <DefaultText style={styles.filterHeader}>Price</DefaultText>
            <TouchableOpacity
              style={styles.resetButton}
              onPress={() => {
                dispatch(
                  filterActions.updateFilterState({
                    minPrice: null,
                    maxPrice: null,
                  })
                );
                refRBSheetFilter.current.close();
              }}
            >
              <AntDesign name="reload1" size={16} color={Colors.primary} />
              <DefaultText style={styles.resetText}>Reset</DefaultText>
            </TouchableOpacity>
          </View>
          <DefaultText style={styles.option}>Minimum Price</DefaultText>
          <Controller
            name="minPrice"
            defaultValue={
              filterState.minPrice === null ? "" : filterState.minPrice
            }
            control={control}
            rules={{
              required: {
                value: true,
                message: "Required field cannot be empty",
              },
              pattern: {
                value: /^[0-9\b]+$/,
                message: "Only numbers allowed",
              },
            }}
            render={({ onChange, value }) => (
              <TextInput
                autoCorrect={false}
                keyboardType="numeric"
                autoCapitalize="none"
                value={value.toString()}
                style={styles.priceInput}
                onChangeText={(value) => {
                  onChange(value);
                }}
                placeholder="$"
                placeholderTextColor={Colors.glass}
              />
            )}
          />
          {errors.minPrice && (
            <DefaultText style={styles.errorText}>
              {errors.minPrice.message}
            </DefaultText>
          )}
          <DefaultText style={styles.option}>Maximum Price</DefaultText>
          <Controller
            name="maxPrice"
            defaultValue={
              filterState.maxPrice === null ? "" : filterState.maxPrice
            }
            control={control}
            rules={{
              required: {
                value: true,
                message: "Required field cannot be empty",
              },
              pattern: {
                value: /^[0-9\b]+$/,
                message: "Only numbers allowed",
              },
            }}
            render={({ onChange, value }) => (
              <TextInput
                autoCorrect={false}
                keyboardType="numeric"
                autoCapitalize="none"
                value={value.toString()}
                style={styles.priceInput}
                onChangeText={(value) => {
                  onChange(value);
                }}
                placeholder="$"
                placeholderTextColor={Colors.glass}
              />
            )}
          />
          {errors.maxPrice && (
            <DefaultText style={styles.errorText}>
              {errors.maxPrice.message}
            </DefaultText>
          )}
          <MainButton
            style={styles.button}
            onPress={handleSubmit(filterHandler)}
          >
            Apply
          </MainButton>
        </View>
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
  modalHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  subHeader: {
    alignSelf: "center",
    marginTop: 16,
    marginLeft: 16,
    fontSize: 18,
    fontFamily: "latoBold",
    marginBottom: 8,
  },
  iconButton: {
    marginRight: 16,
    marginTop: 8,
  },
  option: {
    fontSize: 14,
    marginLeft: 16,
    marginVertical: 8,
  },
  sortLabel: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  tickIcon: {
    marginRight: 16,
  },
  filterHeaderContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  filterHeader: {
    fontSize: 16,
    fontFamily: "latoBold",
    marginLeft: 16,
    marginVertical: 8,
  },
  resetButton: {
    flexDirection: "row",
    marginLeft: 10,
    alignItems: "center",
  },
  resetText: {
    marginLeft: 5,
  },
  button: {
    marginTop: 20,
    height: 40,
    width: 120,
    alignSelf: "center",
  },
  priceInput: {
    marginLeft: 12,
    width: "80%",
    height: 30,
    padding: 6,
  },
  errorText: {
    marginLeft: 16,
    color: Colors.darkPink,
  },
});
