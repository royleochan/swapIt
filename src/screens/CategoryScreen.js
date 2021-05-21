import React, { useState, useEffect, useCallback } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import { useSelector, useDispatch } from "react-redux";

import * as productsActions from "store/actions/products";
import request from "utils/request";
import filter from "utils/filter";
import sort from "utils/sort";
import ProductBox from "components/ProductBox";
import SortFilterMenu from "components/SortFilterMenu";
import DefaultText from "components/DefaultText";

const CategoryScreen = (props) => {
  const category = props.route.params.label;
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [products, setProducts] = useState([]);

  const dispatch = useDispatch();
  const sortState = useSelector((state) => state.sort);
  const filterState = useSelector((state) => state.filter);
  const storeProducts = useSelector((state) => state.products);

  const navigateToProductDetails = (productData) => {
    props.navigation.navigate("Product", productData);
  };

  const categoryHandler = useCallback(async () => {
    setIsRefreshing(true);
    try {
      const response = await request.get(`/api/products/category/${category}`);
      const resData = response.data.products;
      dispatch(productsActions.updateProducts(resData));
      setProducts(resData);
    } catch (err) {
      dispatch(productsActions.updateProducts([]));
      setProducts([]);
    }
    setIsRefreshing(false);
  }, [setIsRefreshing, dispatch]);

  useEffect(() => {
    categoryHandler();
  }, []);

  useEffect(() => {
    setProducts(filter(storeProducts, filterState));
  }, [filterState]);

  useEffect(() => {
    setProducts(sort([...products], sortState));
  }, [sortState]);

  return (
    <View style={styles.screenContainer}>
      <View style={styles.header}>
        <DefaultText style={styles.title}>{category}</DefaultText>
      </View>
      <SortFilterMenu />
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
