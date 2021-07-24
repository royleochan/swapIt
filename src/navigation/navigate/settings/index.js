/**
 * Navigates to LikedProductsScreen
 *
 * @param props: props from source screen
 */
const navigateToLikedProducts = (props) => {
  props.navigation.push("LikedProducts");
};

/**
 * Navigates to EditProfileScreen
 *
 * @param props: props from source screen
 */
const navigateToEditProfile = (props) => {
  props.navigation.push("EditProfile");
};

/**
 * Navigates to ChangePasswordScreen
 *
 * @param props: props from source screen
 */
const navigateToChangePassword = (props) => {
  props.navigation.push("ChangePassword");
};

/**
 * Navigates to HelpAndSupportScreen
 *
 * @param props: props from source screen
 */
const navigateToHelpAndSupport = (props) => {
  props.navigation.push("HelpAndSupport");
};

export {
  navigateToLikedProducts,
  navigateToEditProfile,
  navigateToChangePassword,
  navigateToHelpAndSupport,
};
