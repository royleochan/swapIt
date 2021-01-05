import React from "react";
import { StyleSheet, View, ScrollView } from "react-native";

import DefaultText from "components/DefaultText";
import Chip from "components/Chip";

const CategoryRow = (props) => {
    const {filterState, setFilterState} = props
  return (
    <View style={styles.categoriesContainer}>
      <DefaultText style={styles.categoriesText}>Categories</DefaultText>
      <ScrollView horizontal={true}>
        <View style={styles.categories}>
          <Chip filterState={filterState} setFilterState={setFilterState} value={10} text={"Men's Tops"} />
          <Chip filterState={filterState} setFilterState={setFilterState} value={11} text={"Men's Pants, Jeans & Shorts"} />
          <Chip filterState={filterState} setFilterState={setFilterState} value={12}text={"Men's Outerwear"} />
          <Chip filterState={filterState} setFilterState={setFilterState} value={20} text={"Women's Tops"} />
          <Chip filterState={filterState} setFilterState={setFilterState} value={21} text={"Women's Dresses & Skirts"} />
          <Chip filterState={filterState} setFilterState={setFilterState} value={22} text={"Women's Pants, Jeans & Shorts"} />
          <Chip filterState={filterState} setFilterState={setFilterState} value={23} text={"Women's Rompers & Jumpsuits"} />
          <Chip filterState={filterState} setFilterState={setFilterState} value={24} text={"Women's Outerwear"} />
          <Chip filterState={filterState} setFilterState={setFilterState} value={25} text={"Others"} />
        </View>
      </ScrollView>
    </View>
  );
};

export default CategoryRow;

const styles = StyleSheet.create({
  categoriesContainer: {
    alignItems: "center",
    paddingTop: 10,
  },
  categoriesText: {
    alignItems: "flex-start",
  },
  categories: {
    flexDirection: "row",
    padding: 10,
  },
});
