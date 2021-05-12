import React, { useState, useEffect, useCallback } from "react";
import { View, StyleSheet, TouchableOpacity, FlatList } from "react-native";

import request from "utils/request";
import ProductBox from "components/ProductBox";
import DefaultText from "components/DefaultText";

const CategoryScreen = (props) => {
  const category = props.route.params.label;
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [products, setProducts] = useState([]);

  const navigateToProductDetails = (productData) => {
    props.navigation.navigate("Product", productData);
  };

  const categoryHandler = useCallback(async () => {
    setIsRefreshing(true);
    try {
      const response = await request.get(`/api/products/category/${category}`);
      const resData = response.data.products;
      setProducts(resData);
    } catch (err) {
      setProducts([]);
    }
    setIsRefreshing(false);
  }, [setIsRefreshing, setProducts]);

  useEffect(() => {
    categoryHandler();
  }, []);

  return (
    <View style={styles.screenContainer}>
      <View style={styles.header}>
        <DefaultText style={styles.title}>{category}</DefaultText>
      </View>
      <View style={styles.mainContainer}>
        <FlatList
          onRefresh={categoryHandler}
          refreshing={isRefreshing}
          columnWrapperStyle={styles.list}
          data={products}
          horizontal={false}
          numColumns={2}
          keyExtractor={(item) => item.id}
          renderItem={(itemData) => {
            return (
              <ProductBox
                item={itemData.item}
                productCreator={itemData.item.creator}
                navigate={() =>
                  navigateToProductDetails({
                    ...itemData.item,
                    user: itemData.item.creator,
                  })
                }
              />
            );
          }}
        ></FlatList>
      </View>
    </View>
  );
};

export default CategoryScreen;

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: "white",
  },
  header: {
    marginTop: 30,
    marginLeft: 16,
  },
  title: {
    fontFamily: "latoBold",
    fontSize: 24,
  },
  searchBar: {
    width: "80%",
  },
  mainContainer: {
    marginTop: 10,
  },
  list: {
    justifyContent: "center",
    marginTop: 10,
  },
});