import React from "react";
import { StyleSheet, View, ScrollView } from "react-native";

import DefaultText from "components/DefaultText";
import Chip from "components/Chip";

const CategoryRow = (props) => {
  const { filterState, setFilterState } = props;
  return (
    <View style={styles.categoriesContainer}>
      <DefaultText style={styles.categoriesText}>Categories</DefaultText>
      <ScrollView horizontal={true}>
        <View style={styles.categories}>
          <Chip
            filterState={filterState}
            setFilterState={setFilterState}
            value={"isMensTop"}
            text={"Men's Top"}
          />
          <Chip
            filterState={filterState}
            setFilterState={setFilterState}
            value={"isMensBottoms"}
            text={"Men's Pants, Jeans & Shorts"}
          />
          <Chip
            filterState={filterState}
            setFilterState={setFilterState}
            value={"isMensOuterwear"}
            text={"Men's Outerwear"}
          />
          <Chip
            filterState={filterState}
            setFilterState={setFilterState}
            value={"isWomensTop"}
            text={"Women's Top"}
          />
          <Chip
            filterState={filterState}
            setFilterState={setFilterState}
            value={"isWomensBottoms"}
            text={"Women's Pants, Jeans & Shorts"}
          />
          <Chip
            filterState={filterState}
            setFilterState={setFilterState}
            value={"isWomensSkirts"}
            text={"Women's Skirts"}
          />
          <Chip
            filterState={filterState}
            setFilterState={setFilterState}
            value={"isWomensOnePiece"}
            text={"Women's Rompers, Dresses & Jumpsuits"}
          />
          <Chip
            filterState={filterState}
            setFilterState={setFilterState}
            value={"isWomensOuterwear"}
            text={"Women's Outerwear"}
          />
          <Chip
            filterState={filterState}
            setFilterState={setFilterState}
            value={"isOthers"}
            text={"Others"}
          />
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
