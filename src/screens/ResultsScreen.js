// React Imports //
import React, { useState, useEffect, useCallback } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import { useSelector, useDispatch } from "react-redux";

// Navigation Imports //
import { navigateToProductDetails } from "navigation/navigate/common/index";

// Redux Action Imports //
import { updateProducts } from "store/actions/products";

// Utils Imports //
import request from "utils/request";
import filter from "utils/filter";
import sort from "utils/sort";

// Colors Import //
import Colors from "constants/Colors";

// Components Imports //
import ProductBox from "components/ProductBox";
import IconButton from "components/IconButton";
import DefaultText from "components/DefaultText";
import SortFilterMenu from "components/SortFilterMenu";

// Main Component //
const ResultsScreen = (props) => {
  // Init //
  const [query, setQuery] = useState(props.route.params);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [products, setProducts] = useState([]);

  const dispatch = useDispatch();
  const sortState = useSelector((state) => state.sort);
  const filterState = useSelector((state) => state.filter);
  const storeProducts = useSelector((state) => state.products);

  // Functions //
  const searchHandler = useCallback(
    async (searchQuery) => {
      setIsRefreshing(true);
      try {
        const response = await request.get(
          `/api/products/search/${searchQuery}`
        );
        const resData = response.data.products;
        dispatch(updateProducts(resData));
        setProducts(resData);
      } catch (err) {
        dispatch(updateProducts([]));
        setProducts([]);
      }
      setIsRefreshing(false);
    },
    [setIsRefreshing, setProducts]
  );

  // Side Effects //
  useEffect(() => {
    setIsRefreshing(true);
    // Executes searchHandler after 1000ms, returns a positive integer which uniquely identifies the timer created
    const timer = setTimeout(() => searchHandler(query), 1000);

    // Cancels the timer given the timer id
    return () => clearTimeout(timer);
  }, [query]);

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
        <View style={styles.backButton}>
          <IconButton
            size={23}
            color={Colors.primary}
            name="arrowleft"
            onPress={() => props.navigation.goBack()}
          />
        </View>
        <View style={styles.headerTextContainer}>
          <DefaultText style={styles.headerText}>{query}</DefaultText>
        </View>
      </View>
      <SortFilterMenu />
      <FlatList
        onRefresh={() => searchHandler(query)}
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

export default ResultsScreen;

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: "white",
  },
  header: {
    marginTop: 50,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  backButton: {
    position: "absolute",
    marginLeft: 14,
    zIndex: 1,
  },
  headerTextContainer: {
    width: "100%",
    alignItems: "center",
  },
  headerText: {
    fontSize: 24,
  },
  searchBar: {
    width: "80%",
  },
  list: {
    justifyContent: "center",
    marginTop: 10,
  },
});
