import React, { useState, useEffect, useCallback } from "react";
import { View, StyleSheet, TouchableOpacity, FlatList } from "react-native";
import { AntDesign } from "@expo/vector-icons";

import request from "utils/request";
import Colors from "constants/Colors";
import ProductBox from "components/ProductBox";
import CustomSearchBar from "components/CustomSearchBar";

const ResultsScreen = (props) => {
  const [query, setQuery] = useState(props.route.params);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [products, setProducts] = useState([]);

  const navigateToProductDetails = (productData) => {
    props.navigation.navigate("Product", productData);
  };

  const handleSearch = (text) => {
    setQuery(text);
  };

  const searchHandler = useCallback(
    async (searchQuery) => {
      setIsRefreshing(true);
      try {
        const response = await request.get(
          `/api/products/search/${searchQuery}`
        );
        const resData = response.data.products;
        setProducts(resData);
      } catch (err) {
        setProducts([]);
      }
      setIsRefreshing(false);
    },
    [setIsRefreshing, setProducts]
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      searchHandler(query);
    }, 1000);

    return () => clearTimeout(timer);
  }, [query]);

  return (
    <View style={styles.screenContainer}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => props.navigation.goBack()}>
          <AntDesign name={"arrowleft"} size={23} color={Colors.primary} />
        </TouchableOpacity>
        <CustomSearchBar
          query={query}
          handleSearch={handleSearch}
          style={styles.searchBar}
          onSubmit={() => searchHandler(query)}
        />
      </View>
      <View style={styles.mainContainer}>
        <FlatList
          onRefresh={searchHandler}
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
    justifyContent: "space-evenly",
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
