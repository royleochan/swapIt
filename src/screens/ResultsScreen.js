import React, { useState, useEffect, useCallback } from "react";
import { View, StyleSheet, FlatList, ActivityIndicator } from "react-native";

import request from "utils/request";
import Colors from "constants/Colors";
import ProductBox from "components/ProductBox";
import IconButton from "components/IconButton";
import DefaultText from "components/DefaultText";
import SortFilterMenu from "components/SortFilterMenu";

const ResultsScreen = (props) => {
  const [query, setQuery] = useState(props.route.params);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [products, setProducts] = useState([]);

  const navigateToProductDetails = (productData) => {
    props.navigation.navigate("Product", productData);
  };

  const searchHandler = useCallback(
    async (searchQuery) => {
      try {
        const response = await request.get(
          `/api/products/search/${searchQuery}`
        );
        const resData = response.data.products;
        setProducts(resData);
      } catch (err) {
        setProducts([]);
      }
      setIsLoading(false);
    },
    [setIsLoading, setProducts]
  );

  useEffect(() => {
    setIsLoading(true);
    // Executes searchHandler after 1000ms, returns a positive integer which uniquely identifies the timer created
    const timer = setTimeout(() => searchHandler(query), 1000);

    // Cancels the timer given the timer id
    return () => clearTimeout(timer);
  }, [query]);

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
      {isLoading && <ActivityIndicator size={36} style={styles.loading} />}
      <View>
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
  loading: {
    marginTop: 10,
  },
  searchBar: {
    width: "80%",
  },
  list: {
    justifyContent: "center",
    marginTop: 10,
  },
});
