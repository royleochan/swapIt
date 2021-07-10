/**
 * Navigates to ProfileScreen
 *
 * @param props: props from source screen
 * @param selectedUserId: string representing id of selected user
 */
const navigateToProfile = (props, userId) => {
  props.navigation.push("Profile", {
    userId,
  });
};

/**
 * Navigates to ReviewsScreen
 *
 * @param props: props from source screen
 * @param selectedUserId: string representing id of selected user
 */
const navigateToReviews = (props, selectedUserId) => {
  props.navigation.push("Reviews", {
    selectedUserId,
  });
};

/**
 * Navigates to SettingsScreen
 *
 * @param props: props from source screen
 */
const navigateToSettings = (props) => {
  props.navigation.push("Settings");
};

/**
 * Navigates to FollowingScreen
 *
 * @param props: props from source screen
 * @param selectedUserId: string representing id of selected user
 */
const navigateToFollowing = (props, selectedUserId) => {
  props.navigation.push("Follow", {
    screen: "Following",
    params: {
      selectedUserId,
    },
  });
};

/**
 * Navigates to FollowersScreen
 *
 * @param props: props from source screen
 * @param selectedUserId: string representing id of selected user
 */
const navigateToFollowers = (props, selectedUserId) => {
  props.navigation.push("Follow", {
    screen: "Followers",
    params: {
      selectedUserId,
    },
  });
};

/**
 * Navigates to CompletedReviewScreen
 *
 * @param props: props from source screen
 * @param matchId: string match id that review is associated to
 */
const navigateToCompletedReviewScreen = (props, matchId) => {
  return props.navigation.push("CompletedReview", { matchId });
};

export {
  navigateToProfile,
  navigateToReviews,
  navigateToSettings,
  navigateToFollowing,
  navigateToFollowers,
  navigateToCompletedReviewScreen,
};
