// React Imports //
import React, { useState, useEffect } from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import useDebouncedCallback from "use-debounce/lib/useDebouncedCallback";

// Redux Action Imports //
import { followUser, unfollowUser } from "store/actions/followInfo";

// Custom Hook Imports //
import useDidMountEffect from "hooks/useDidMountEffect";

// Colors Import //
import Colors from "constants/Colors";

// Components Import //
import DefaultText from "components/DefaultText";

// Main Component //
const FollowButton = (props) => {
  // Init //
  const { selectedUserId, style } = props;
  const dispatch = useDispatch();
  const following = useSelector((state) => state.followInfo.following);

  const [actualIsFollowing, setActualIsFollowing] = useState();
  const [debouncedIsFollowing, setDebouncedIsFollowing] = useState();
  const debounced = useDebouncedCallback((val) => {
    setDebouncedIsFollowing(val);
  }, 1000);

  // Side Effects //
  useDidMountEffect(() => {
    if (debouncedIsFollowing) {
      dispatch(followUser(selectedUserId));
    } else {
      dispatch(unfollowUser(selectedUserId));
    }
  }, [debouncedIsFollowing]);

  useEffect(() => {
    setActualIsFollowing(
      following.map((user) => user._id).includes(selectedUserId)
    );
  }, [following]);

  // Render //
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
