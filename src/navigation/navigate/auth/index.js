/**
 * Navigates to SignupScreen
 *
 * @param props: props from source screen
 */
const navigateToSignUp = (props) => {
  props.navigation.push("Signup");
};

/**
 * Navigates to LoginScreen
 *
 * @param props: props from source screen
 */
const navigateToLogin = (props) => {
  props.navigation.push("Login");
};

export { navigateToSignUp, navigateToLogin };
