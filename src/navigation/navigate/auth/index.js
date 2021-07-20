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

export { navigateToSignUp, navigateToSignUpTwo, navigateToLogin };