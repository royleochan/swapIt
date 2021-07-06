import React, { useRef, useState, useEffect, useCallback } from "react";
import { View, StyleSheet, Platform, Alert } from "react-native";
import { useSelector } from "react-redux";
import Swiper from "react-native-deck-swiper";

import Colors from "constants/Colors";
import request from "utils/request";
import IconButton from "components/IconButton";
import DefaultText from "components/DefaultText";
import OverlayLabel from "components/OverlayLabel";
import SwipeProduct from "components/SwipeProduct";

const ExploreScreen = (props) => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const useSwiper = useRef();

  const user = useSelector((state) => state.auth.user);

  const handleOnSwipedLeft = () => useSwiper.current.swipeLeft();

  const handleOnSwipedRight = () => useSwiper.current.swipeRight();

  // Need to change to explore products
  const loadProducts = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await request.get(`/api/products/all/${user.id}`);
      const resData = response.data.products;
      setProducts(resData);
      setIsLoading(false);
    } catch (err) {
      Alert.alert("Request failed", `${err.response.data.message}`, [
        {
          text: "Okay",
          onPress: () => {
            setIsLoading(false);
          },
        },
      ]);
    }
  }, [setProducts]);

  useEffect(() => {
    loadProducts();
  }, []);

  const likeProduct = () => {
    console.log("Like product");
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <DefaultText style={styles.header}>Explore</DefaultText>
      </View>
      {!isLoading && (
        <>
          {products.length > 0 && (
            <View style={styles.swiperContainer}>
              <Swiper
                ref={useSwiper}
                cards={products}
                renderCard={(product) => {
                  return <SwipeProduct item={product} />;
                }}
                useViewOverflow={Platform.OS === "ios"}
                infinite={true}
                verticalSwipe={false}
                onSwipedRight={(cardIndex) => {
                  likeProduct(cardIndex);
                }}
                overlayLabels={{
                  left: {
                    title: "SKIP",
                    element: (
                      <OverlayLabel label="SKIP" color={Colors.accent} />
                    ),
                    style: {
                      wrapper: styles.overlayWrapper,
                    },
                  },
                  right: {
                    title: "LIKE",
                    element: (
                      <OverlayLabel label="LIKE" color={Colors.background} />
                    ),
                    style: {
                      wrapper: {
                        ...styles.overlayWrapper,
                        alignItems: "flex-start",
                        marginLeft: 30,
                      },
                    },
                  },
                }}
                animateOverlayLabelsOpacity
                animateCardOpacity
                stackSize={4}
                cardVerticalMargin={20}
                cardIndex={0}
                backgroundColor={Colors.background}
              />
            </View>
          )}
          {products.length > 0 && (
            <View style={styles.buttonsContainer}>
              <IconButton
                name="close"
                size={20}
                style={styles.iconButton}
                onPress={handleOnSwipedLeft}
                color={Colors.background}
                backgroundColor={Colors.primary}
              />
              <IconButton
                name="heart"
                size={20}
                style={styles.iconButton}
                onPress={handleOnSwipedRight}
                color={Colors.accent}
                backgroundColor={Colors.background}
              />
            </View>
          )}
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.background,
  },
  headerContainer: {
    marginLeft: 24,
    marginTop: 64,
  },
  header: {
    fontFamily: "latoBold",
    fontSize: 28,
  },
  swiperContainer: {
    height: "70%",
  },
  overlayWrapper: {
    flexDirection: "column",
    alignItems: "flex-end",
    justifyContent: "flex-start",
    marginTop: 10,
    marginLeft: -30,
  },
  buttonsContainer: {
    justifyContent: "space-around",
    alignItems: "center",
    flexDirection: "row",
    paddingHorizontal: "15%",
    height: "19%",
  },
  iconButton: {
    borderRadius: 50,
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 6,
    shadowOpacity: 0.3,
    elevation: 2,
    padding: 15,
  },
});

export default ExploreScreen;
