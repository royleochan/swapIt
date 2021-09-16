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
 * Navigates to ChatsScreen
 *
 * @param props: props from source screen
 */
const navigateToChats = (props) => {
  props.navigation.push("Chats");
};

/**
 * Navigates to ChatRoomScreen
 *
 * @param props: props from source screen
 * @param chat: object representing chat
 */
const navigateToChatRoom = (props, chat) => {
  props.navigation.push("ChatRoom", chat);
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

/**
 * Navigates to Reviews Screen through Profile Navigator
 *
 * @param props: props from source screen
 * @param selectedUserId: string representing id of selected user
 */
const navigateToReviewThroughProfileNavigator = (props, selectedUserId) => {
  props.navigation.push("ProfileScreen", {
    screen: "Reviews",
    params: {
      selectedUserId,
    },
  });
};

/**
 * Navigates to Product Details Screen through Profile Navigator
 *
 * @param props: props from source screen
 * @param selectedUserId: string representing id of selected user
 */
const navigateToProductDetailsThroughProfileNavigator = (props, productId) => {
  props.navigation.push("ProfileScreen", {
    screen: "Product",
    params: {
      productId,
    },
  });
};

export {
  navigateToProductDetails,
  navigateToCategory,
  navigateToSearchUser,
  navigateToResults,
  navigateToChats,
  navigateToChatRoom,
  navigateToProfileNavigator,
  navigateToReviewThroughProfileNavigator,
  navigateToProductDetailsThroughProfileNavigator,
};
