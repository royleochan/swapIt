import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import useDebouncedCallback from "use-debounce/lib/useDebouncedCallback";

import * as authActions from "store/actions/auth";
import useDidMountEffect from "hooks/useDidMountEffect";
import IconButton from "components/IconButton";
import DefaultText from "components/DefaultText";

const LikeButton = (props) => {
  const {
    productId,
    numLikes,
    size,
    color,
    buttonStyle,
    textStyle,
  } = props;
  const dispatch = useDispatch();
  const loggedInUser = useSelector((state) => state.auth.user);
  const token = useSelector((state) => state.auth.jwtToken);

  const [numberOfLikes, setNumberOfLikes] = useState(numLikes);
  const [actualIsLiked, setActualIsLiked] = useState(
    loggedInUser.likes.includes(productId)
  );
  const [debouncedIsLiked, setDebouncedIsLiked] = useState(
    loggedInUser.likes.includes(productId)
  );
  const debounced = useDebouncedCallback((val) => {
    setDebouncedIsLiked(val);
  }, 1500);

  useDidMountEffect(() => {
    console.log("request sent");
    dispatch(
      authActions.updateUserLikes(
        productId,
        loggedInUser.id,
        token,
        debouncedIsLiked
      )
    );
  }, [debouncedIsLiked]);

  return (
    <>
      <IconButton
        name={actualIsLiked ? "heart" : "hearto"}
        size={size}
        style={{ ...buttonStyle }}
        onPress={() => {
          setActualIsLiked(!actualIsLiked);
          setNumberOfLikes(!actualIsLiked ? numLikes + 1 : numLikes - 1);
          debounced(!actualIsLiked);
        }}
        color={color}
      />
      <DefaultText style={{ ...textStyle }}>{numberOfLikes}</DefaultText>
    </>
  );
};

export default LikeButton;
