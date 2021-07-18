// React Imports //
import React, { useState, useEffect, useCallback } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import { useSelector, useDispatch } from "react-redux";

// Navigation Imports //
import { navigateToProductDetails } from "navigation/navigate/common/index";
import { updateProducts } from "store/actions/products";

// Utils Imports //
import request from "utils/request";
import filter from "utils/filter";
import sort from "utils/sort";
import showAlert from "utils/showAlert";

// Components Imports //
import ProductBox from "components/ProductBox";
import SortFilterMenu from "components/SortFilterMenu";
import DefaultText from "components/DefaultText";

// Main Component //
const CategoryScreen = (props) => {
  // Init //
  const category = props.route.params.label;
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [products, setProducts] = useState([]);

  const dispatch = useDispatch();
  const loggedInUserId = useSelector((state) => state.auth.user.id);
  const sortState = useSelector((state) => state.sort);
  const filterState = useSelector((state) => state.filter);
  const storeProducts = useSelector((state) => state.products);

  // Functions //
  const categoryHandler = useCallback(async () => {
    setIsRefreshing(true);
    try {
      let response;
      if (category === "Following") {
        response = await request.get(`/api/products/all/${loggedInUserId}`);
      } else {
        response = await request.get(`/api/products/category/${category}`);
      }
      const resData = response.data.products;
      dispatch(updateProducts(resData));
      setProducts(resData);
    } catch (err) {
      setIsRefreshing(false);
      dispatch(updateProducts([]));
      setProducts([]);
      showAlert("Request failed", err.response.data.message, null);
    }
    setIsRefreshing(false);
  }, [setIsRefreshing, dispatch]);

  // Side Effects //
  useEffect(() => {
    categoryHandler();
  }, []);

  useEffect(() => {
    setProducts(sort(filter(storeProducts, filterState), sortState));
  }, [filterState]);

  useEffect(() => {
    setProducts(sort([...products], sortState));
  }, [sortState]);

  // Render //
  return (
    <View style={styles.screenContainer}>
      <View style={styles.header}>
        <DefaultText style={styles.title}>{category}</DefaultText>
      </View>
      <SortFilterMenu />
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
                navigateToProductDetails(props, itemData.item._id)
              }
            />
          );
        }}
      ></FlatList>
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
