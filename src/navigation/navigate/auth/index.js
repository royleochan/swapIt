/**
 * Navigates to SignupScreen
 *
 * @param props: props from source screen
 */
const navigateToSignUp = (props) => {
  props.navigation.push("Signup");
};

/**
 * Navigates to SignupScreenTwo
 *
 * @param props: props from source screen
 * @param data: object containing data from sign up screen one
 */
const navigateToSignUpTwo = (props, data) => {
  props.navigation.push("SignupTwo", data);
};

/**
 * Navigates to LoginScreen
 *
 * @param props: props from source screen
 */
const navigateToLogin = (props) => {
  props.navigation.push("Login");
};

/**
 * Navigates to ResetPasswordScreen
 *
 * @param props: props from source screen
 */
const navigateToResetPassword = (props) => {
  props.navigation.push("ResetPassword");
};

/**
 * Navigates to CreateNewPasswordScreen
 *
 * @param props: props from source screen
 * @param email: email of user to create new password
 * @param userId: id of user to create new password
 */
const navigateToCreateNewPassword = (props, email, userId) => {
  props.navigation.push("CreateNewPassword", { email, userId });
};

export {
  navigateToSignUp,
  navigateToSignUpTwo,
  navigateToLogin,
  navigateToResetPassword,
  navigateToCreateNewPassword,
};
