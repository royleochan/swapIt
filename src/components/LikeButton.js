import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import useDebouncedCallback from "use-debounce/lib/useDebouncedCallback";

import * as authActions from "store/actions/auth";
import useDidMountEffect from "hooks/useDidMountEffect";
import IconButton from "components/IconButton";
import DefaultText from "components/DefaultText";

const LikeButton = (props) => {
  const { productId, productLikes, size, color, buttonStyle, textStyle, type } =
    props;
  const dispatch = useDispatch();
  const loggedInUser = useSelector((state) => state.auth.user);
  const token = useSelector((state) => state.auth.jwtToken);

  const [numberOfLikes, setNumberOfLikes] = useState(productLikes.length);
  const [actualIsLiked, setActualIsLiked] = useState();
  const [debouncedIsLiked, setDebouncedIsLiked] = useState();
  const debounced = useDebouncedCallback((val) => {
    setDebouncedIsLiked(val);
  }, 1500);

  useDidMountEffect(() => {
    dispatch(
      authActions.updateUserLikes(
        productId,
        loggedInUser.id,
        token,
        debouncedIsLiked
      )
    );
  }, [debouncedIsLiked]);

  useEffect(() => {
    setActualIsLiked(loggedInUser.likes.includes(productId));
  }, [loggedInUser]);

  useEffect(() => {
    setNumberOfLikes(productLikes.length);
  }, [productLikes]);

  return (
    <View style={styles.likesContainer}>
      <IconButton
        name={actualIsLiked ? "heart" : "hearto"}
        size={size}
        style={{ ...buttonStyle }}
        onPress={() => {
          setActualIsLiked(!actualIsLiked);
          setNumberOfLikes(
            !actualIsLiked ? numberOfLikes + 1 : numberOfLikes - 1
          );
          debounced(!actualIsLiked);
        }}
        color={color}
      />
      {type === "box" && (
        <DefaultText style={{ ...textStyle }}>{numberOfLikes}</DefaultText>
      )}
      {type === "details" && (
        <DefaultText style={{ ...textStyle }}>
          {numberOfLikes} {numberOfLikes === 1 ? "like" : "likes"}
        </DefaultText>
      )}
    </View>
  );
};

export default LikeButton;

const styles = StyleSheet.create({
  likesContainer: {
    flexDirection: "row",
    paddingTop: 5,
    alignItems: "center",
  },
});
