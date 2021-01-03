import React, { useState } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { useSelector } from "react-redux";
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import request from "utils/request";
import Colors from "constants/Colors";
import DefaultText from "components/DefaultText";
import ProductBox from "components/ProductBox";
import CategoryRow from "components/CategoryRow";

const HomeScreen = (props) => {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [products, setProducts] = useState([]);
  const [gridMode, setGridMode] = useState(true);

  let user = useSelector((state) => state.auth.user);

  const loadProducts = async () => {
    setIsRefreshing(true);
    try {
      const response = await request
        .get(`/api/products/user/all/${user.id}`)
        .catch((error) => {
          throw new Error(error.response.data.message);
        });
      const resData = response.data.products;
      setProducts(resData);
      setIsRefreshing(false);
    } catch (err) {
      setProducts([]);
      setIsRefreshing(false);
    }
  };

  const toggleGridMode = () => {
    setGridMode(!gridMode);
  };

  const navigateToProductDetails = (productData) => {
    props.navigation.navigate("Product", productData);
  };

  return (
    <View style={styles.screenContainer}>
      <View style={styles.searchContainer}>
        <TextInput
          placeholder="Search"
          placeholderTextColor="black"
          style={styles.searchBar}
        />
      </View>
      <View style={styles.mode}>
        <View style={styles.exploreContainer}>
          <DefaultText>What do you wish to view?</DefaultText>
          <View style={styles.exploreIconsContainer}>
            <View style={styles.iconContainer}>
              <SimpleLineIcons
                name="user-following"
                size={24}
                color={Colors.primary}
              />
              <DefaultText>Following</DefaultText>
            </View>
            <View style={styles.iconContainer}>
              <MaterialIcons name="explore" size={24} color={Colors.primary} />
              <DefaultText>Explore</DefaultText>
            </View>
          </View>
        </View>
        <View style={styles.exploreContainer}>
          <DefaultText>Viewing mode</DefaultText>
          <View style={styles.exploreIconsContainer}>
            <TouchableOpacity onPress={toggleGridMode}>
              <View
                style={
                  gridMode ? styles.iconContainerOutlined : styles.iconContainer
                }
              >
                <SimpleLineIcons name="grid" size={24} color={Colors.primary} />
                <DefaultText>Grid</DefaultText>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={toggleGridMode}>
              <View
                style={
                  gridMode ? styles.iconContainer : styles.iconContainerOutlined
                }
              >
                <MaterialCommunityIcons
                  name="gesture-swipe"
                  size={24}
                  color={Colors.primary}
                />
                <DefaultText>Swipe</DefaultText>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <CategoryRow />
      <FlatList
        onRefresh={loadProducts}
        refreshing={isRefreshing}
        columnWrapperStyle={styles.list}
        data={products}
        horizontal={false}
        numColumns={2}
        keyExtractor={(item) => item.id}
        renderItem={(itemData) => (
          <ProductBox
            productCreator={user}
            item={itemData.item}
            navigate={() =>
              navigateToProductDetails({ ...itemData.item, user })
            }
          />
        )}
      />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: "white",
  },
  searchContainer: {
    paddingTop: 20,
    alignItems: "center",
  },
  searchBar: {
    backgroundColor: Colors.glass,
    width: 350,
    height: 32,
    borderRadius: 20,
    opacity: 0.2,
    paddingHorizontal: 8,
  },
  mode: {
    flexDirection: "row",
  },
  exploreContainer: {
    paddingTop: 20,
    width: "50%",
    alignItems: "center",
  },
  exploreIconsContainer: {
    paddingTop: 10,
    flexDirection: "row",
    justifyContent: "space-evenly",
    width: "100%",
    alignItems: "center",
  },
  iconContainer: {
    width: 66,
    height: 66,
    backgroundColor: Colors.lightGray,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
  },
  iconContainerOutlined: {
    width: 66,
    height: 66,
    backgroundColor: Colors.lightGray,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    borderWidth: 2,
    borderColor: Colors.primary,
  },
  list: {
    justifyContent: "center",
  },
});
