// React Imports //
import React, { useState, useEffect } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import { useSelector, useDispatch } from "react-redux";

// Navigation Imports //
import { navigateToProductDetails } from "navigation/navigate/common/index";

// Redux Action Imports //
import {
  searchProductsHandler,
  applyFilterAndSortProducts,
} from "store/actions/products";

// Custom Hooks Imports //
import useDidMountEffect from "hooks/useDidMountEffect";
import useFlatListRequest from "hooks/useFlatListRequest";

// Utils Imports //
import filter from "utils/filter";
import sort from "utils/sort";

// Colors Import //
import Colors from "constants/Colors";

// Components Imports //
import ProductBox from "components/ProductBox";
import IconButton from "components/IconButton";
import DefaultText from "components/DefaultText";
import SortFilterMenu from "components/SortFilterMenu";
import Loader from "components/Loader";
import Empty from "components/Empty";
import ErrorSplash from "components/ErrorSplash";

// Main Component //
const ResultsScreen = (props) => {
  // Init //
  const [query, setQuery] = useState(props.route.params);

  const dispatch = useDispatch();
  const sortState = useSelector((state) => state.products.sortState);
  const filterState = useSelector((state) => state.products.filterState);
  const allProducts = useSelector((state) => state.products.allProducts);
  const filteredSortedProducts = useSelector(
    (state) => state.products.filteredSortedProducts
  );

  // Side Effects //
  const {
    isRefreshing,
    isError,
    isLoading,
    setIsRefreshing,
  } = useFlatListRequest(() => dispatch(searchProductsHandler(query)));

  useDidMountEffect(() => {
    // Executes after 1000ms, returns a positive integer which uniquely identifies the timer created
    const timer = setTimeout(() => setIsRefreshing(true), 1000);

    // Cancels the timer given the timer id
    return () => clearTimeout(timer);
  }, [query]);

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
        onRefresh={() => setIsRefreshing(true)}
        contentContainerStyle={{ flexGrow: 1 }}
        ListEmptyComponent={
          isError ? (
            <ErrorSplash />
          ) : (
            <Empty message="No results found" width={128} height={128} />
          )
        }
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
