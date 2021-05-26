import React, { useState } from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import { useDispatch } from "react-redux";
import useDebouncedCallback from "use-debounce/lib/useDebouncedCallback";

import * as authActions from "store/actions/auth";
import useDidMountEffect from "hooks/useDidMountEffect";
import Colors from "constants/Colors";
import DefaultText from "components/DefaultText";

const FollowButton = (props) => {
  const { loggedInUser, selectedUser, token, style } = props;
  const dispatch = useDispatch();

  const [actualIsFollowing, setActualIsFollowing] = useState(
    loggedInUser.following.includes(selectedUser.id)
  );
  const [debouncedIsFollowing, setDebouncedIsFollowing] = useState(
    loggedInUser.following.includes(selectedUser.id)
  );
  const debounced = useDebouncedCallback((val) => {
    setDebouncedIsFollowing(val);
  }, 1000);

  useDidMountEffect(() => {
    dispatch(
      authActions.updateUserFollowing(
        loggedInUser.id,
        selectedUser.id,
        token,
        debouncedIsFollowing
      )
    );
  }, [debouncedIsFollowing]);

  return (
    <View style={{ zIndex: 1 }}>
      <TouchableOpacity
        style={{ ...style, ...styles.followButton }}
        onPress={() => {
          setActualIsFollowing(!actualIsFollowing);
          debounced(!actualIsFollowing);
        }}
      >
        <DefaultText style={styles.followText}>
          {actualIsFollowing ? "Unfollow" : "Follow"}
        </DefaultText>
      </TouchableOpacity>
    </View>
  );
};

export default FollowButton;

const styles = StyleSheet.create({
  followButton: {
    backgroundColor: Colors.primary,
    padding: 5,
    width: 66,
    height: 26,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  followText: {
    color: Colors.background,
    alignSelf: "center",
  },
});
