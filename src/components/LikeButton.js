// React Imports //
import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import useDebouncedCallback from "use-debounce/lib/useDebouncedCallback";

// Redux Action Imports //
import { likeProduct, unlikeProduct } from "store/actions/auth";

// Custom Hook Imports //
import useDidMountEffect from "hooks/useDidMountEffect";

// Component Imports //
import IconButton from "components/IconButton";
import DefaultText from "components/DefaultText";

// Main Component //
const LikeButton = (props) => {
  // Init //
  const {
    productId,
    productLikes,
    size,
    color,
    buttonStyle,
    textStyle,
    creatorId,
    type,
  } = props;
  const dispatch = useDispatch();
  const userLikes = useSelector((state) => state.auth.user.likes);
  const loggedInUserId = useSelector((state) => state.auth.user.id);

  const [numberOfLikes, setNumberOfLikes] = useState();
  const [actualIsLiked, setActualIsLiked] = useState();
  const [debouncedIsLiked, setDebouncedIsLiked] = useState();
  const debounced = useDebouncedCallback((val) => {
    setDebouncedIsLiked(val);
  }, 1500);

  // Side Effects //
  useDidMountEffect(() => {
    if (debouncedIsLiked) {
      dispatch(likeProduct(productId));
    } else {
      dispatch(unlikeProduct(productId));
    }
  }, [debouncedIsLiked]);

  useEffect(() => {
    setActualIsLiked(userLikes.includes(productId));
  }, [userLikes]);

  useEffect(() => {
    setNumberOfLikes(productLikes.length);
  }, [productLikes]);

  // Render //
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
        disabled={creatorId === loggedInUserId}
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
