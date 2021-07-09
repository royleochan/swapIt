/**
 * Navigates to EditProfileScreen
 *
 * @param props: props from source screen
 */
const navigateToEditProfile = (props) => {
  props.navigation.navigate("EditProfile");
};

/**
 * Navigates to ChangePasswordScreen
 *
 * @param props: props from source screen
 */
const navigateToChangePassword = (props) => {
  props.navigation.navigate("ChangePassword");
};

/**
 * Navigates to HelpAndSupportScreen
 *
 * @param props: props from source screen
 */
const navigateToHelpAndSupport = (props) => {
  props.navigation.navigate("HelpAndSupport");
};

export {
  navigateToEditProfile,
  navigateToChangePassword,
  navigateToHelpAndSupport,
};
