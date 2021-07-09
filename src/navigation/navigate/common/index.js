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
 * Navigates to CategoryScreen
 *
 * @param props: props from source screen
 * @param label: string representing label of selected category
 */
const navigateToCategory = (props, label) => {
  props.navigation.push("Category", label);
};

/**
 * Navigates to SearchUserScreen
 *
 * @param props: props from source screen
 */
const navigateToSearchUser = (props) => {
  props.navigation.push("Search");
};

/**
 * Navigates to ResultsScreen
 *
 * @param props: props from source screen
 * @param props: string representing search query
 */
const navigateToResults = (props, searchQuery) => {
  props.navigation.push("Results", searchQuery);
};

/**
 * Navigates to MessagesScreen
 *
 * @param props: props from source screen
 */
const navigateToMessagesScreen = (props) => {
  props.navigation.push("Messages");
};

/**
 * Navigates to ProfileNavigator
 *
 * @param props: props from source screen
 * @param userId: string representing id of selected user
 */
const navigateToProfileNavigator = (props, userId) => {
  props.navigation.push("ProfileScreen", {
    screen: "Profile",
    params: {
      userId,
    },
  });
};

export {
  navigateToProductDetails,
  navigateToCategory,
  navigateToSearchUser,
  navigateToResults,
  navigateToMessagesScreen,
  navigateToProfileNavigator,
};
