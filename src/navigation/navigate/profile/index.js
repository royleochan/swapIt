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
 * Navigates to CreateReviewScreen
 *
 * @param props: props from source screen
 * @param pid: product id of the product being viewed
 * @param matchId: match id of the match row
 * @param reviewed: string representing id of user being reviewed
 */
const navigateToCreateReview = (props, pid, matchId, reviewed) => {
  props.navigation.push("CreateReview", { pid, matchId, reviewed });
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
 * @param username: string representing username of selected user
 */
const navigateToFollowing = (props, selectedUserId, username) => {
  props.navigation.push("Follow", {
    screen: "Following",
    params: {
      selectedUserId,
      username,
    },
  });
};

/**
 * Navigates to FollowersScreen
 *
 * @param props: props from source screen
 * @param selectedUserId: string representing id of selected user
 * @param username: string representing username of selected user
 */
const navigateToFollowers = (props, selectedUserId, username) => {
  props.navigation.push("Follow", {
    screen: "Followers",
    params: {
      selectedUserId,
      username,
    },
  });
};

/**
 * Navigates to VerifyEmailScreen
 *
 * @param props: props from source screen
 */
const navigateToVerifyScreen = (props) => {
  return props.navigation.push("Verify");
};

export {
  navigateToProfile,
  navigateToReviews,
  navigateToCreateReview,
  navigateToSettings,
  navigateToFollowing,
  navigateToFollowers,
  navigateToVerifyScreen,
};
