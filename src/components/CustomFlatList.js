import React, { useState, useEffect, useRef } from "react";
import { View, FlatList, StyleSheet, Animated, Easing } from "react-native";

import LottieView from "lottie-react-native";

const clothesAnimation = require("../../assets/loader/clothes-loader.json");

const refreshingHeight = 100;

const styles = StyleSheet.create({
  lottieView: {
    height: refreshingHeight,
    position: "absolute",
    top: 5,
    left: 0,
    right: 0,
  },
  headerComponent: {
    paddingTop: 20,
  },
});

const CustomFlatList = (props) => {
  const [offsetY, setOffsetY] = useState(0);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [extraPaddingTop] = useState(new Animated.Value(0));

  const lottieViewRef = useRef(null);

  useEffect(() => {
    if (isRefreshing) {
      Animated.timing(extraPaddingTop, {
        toValue: refreshingHeight,
        duration: 0,
        useNativeDriver: false,
      }).start();
      lottieViewRef.current.play();
    } else {
      Animated.timing(extraPaddingTop, {
        toValue: 0,
        duration: 400,
        easing: Easing.elastic(1.3),
        useNativeDriver: false,
      }).start();
    }
  }, [isRefreshing]);

  function onScroll(event) {
    const { nativeEvent } = event;
    const { contentOffset } = nativeEvent;
    const { y } = contentOffset;
    setOffsetY(y);
  }

  function onRelease() {
    if (offsetY <= -refreshingHeight && !isRefreshing) {
      setIsRefreshing(true);
      setTimeout(() => {
        setIsRefreshing(false);
      }, 2000);
    }
  }

  let progress;
  if (offsetY <= 0 && !isRefreshing) {
    progress = -offsetY / refreshingHeight;
  }

  const {
    ListHeaderComponent,
    onRefresh,
    columnWrapperStyle,
    data,
    numColumns,
    scrollIndicatorInsets,
    renderItem,
  } = props;

  return (
    <View>
      <LottieView
        ref={lottieViewRef}
        style={styles.lottieView}
        source={clothesAnimation}
        progress={progress}
      />
      <FlatList
        ListHeaderComponent={
          <Animated.View
            style={{ paddingTop: extraPaddingTop }}
          ></Animated.View>
        }
        style={{ paddingTop: 20 }}
        ListHeaderComponentStyle={styles.headerComponent}
        refreshing={false}
        columnWrapperStyle={columnWrapperStyle}
        data={data}
        horizontal={false}
        numColumns={numColumns}
        keyExtractor={(item) => item.id}
        scrollIndicatorInsets={scrollIndicatorInsets}
        renderItem={renderItem}
        onScroll={onScroll}
        onResponderRelease={onRelease}
      ></FlatList>
    </View>
  );
};

export default CustomFlatList;
