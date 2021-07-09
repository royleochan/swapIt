/**
 * Navigates to ProductDetailsScreen
 *
 * @param props: props from source screen
 * @param productId: string representing id of product
 */
const navigateToProductDetails = (props, productId) => {
  props.navigation.push("Product", {
    productId,
  });
};

/**
 * Navigates to ProfileScreen
 *
 * @param props: props from source screen
 * @param userId: string representing id of selected user
 */
const navigateToProfile = (props, userId) => {
  props.navigation.push("Profile", { userId });
};

export { navigateToProductDetails, navigateToProfile };
