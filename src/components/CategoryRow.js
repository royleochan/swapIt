import React from "react";
import { StyleSheet, View, ScrollView } from "react-native";

import DefaultText from "components/DefaultText";
import Chip from "components/Chip";

const CategoryRow = () => {
  return (
    <View style={styles.categoriesContainer}>
      <DefaultText style={styles.categoriesText}>Categories</DefaultText>
      <ScrollView horizontal={true}>
        <View style={styles.categories}>
          <Chip text={"Men's Tops"} />
          <Chip text={"Men's Pants, Jeans & Shorts"} />
          <Chip text={"Men's Outerwear"} />
          <Chip text={"Women's Tops"} />
          <Chip text={"Women's Dresses & Skirts"} />
          <Chip text={"Women's Pants, Jeans & Shorts"} />
          <Chip text={"Women's Rompers & Jumpsuits"} />
          <Chip text={"Women's Outerwear"} />
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
