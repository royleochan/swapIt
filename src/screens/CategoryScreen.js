// React Imports //
import React, { useEffect } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import { useSelector, useDispatch } from "react-redux";

// Navigation Imports //
import { navigateToProductDetails } from "navigation/navigate/common/index";

// Redux Action Imports //
import {
  fetchCategoryProducts,
  applyFilterAndSortProducts,
} from "store/actions/products";

// Custom Hooks Imports //
import useFlatListRequest from "hooks/useFlatListRequest";

// Utils Imports //
import filter from "utils/filter";
import sort from "utils/sort";

// Components Imports //
import ProductBox from "components/ProductBox";
import SortFilterMenu from "components/SortFilterMenu";
import DefaultText from "components/DefaultText";
import Loader from "components/Loader";

// Main Component //
const CategoryScreen = (props) => {
  // Init //
  const category = props.route.params.label;

  const dispatch = useDispatch();
  const sortState = useSelector((state) => state.products.sortState);
  const filterState = useSelector((state) => state.products.filterState);
  const allProducts = useSelector((state) => state.products.allProducts);
  const filteredSortedProducts = useSelector(
    (state) => state.products.filteredSortedProducts
  );

  // Side Effects //
  const { isRefreshing, isError, isLoading, setIsRefreshing } =
    useFlatListRequest(() => dispatch(fetchCategoryProducts(category)));

  useEffect(() => {
    dispatch(
      applyFilterAndSortProducts(
        sort(filter(allProducts, filterState), sortState)
      )
    );
  }, [filterState]);

  useEffect(() => {
    dispatch(applyFilterAndSortProducts(sort([...allProducts], sortState)));
  }, [sortState]);

  // Render //
  if (isLoading) {
    return <Loader isLoading={isLoading} />;
  }

  return (
    <View style={styles.screenContainer}>
      <View style={styles.header}>
        <DefaultText style={styles.title}>{category}</DefaultText>
      </View>
      <SortFilterMenu />
      <FlatList
        onRefresh={() => setIsRefreshing(true)}
        refreshing={isRefreshing}
        columnWrapperStyle={styles.list}
        data={filteredSortedProducts}
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
