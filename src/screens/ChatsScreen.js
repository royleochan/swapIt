// React Imports //
import React, { useState, useCallback } from "react";
import {
  View,
  StyleSheet,
  TouchableHighlight,
  FlatList,
  useWindowDimensions,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useDebounce } from "use-debounce";

// RNE Imports //
import { Avatar } from "react-native-elements";

// Redux Action Imports //
import { fetchChats, filterChats } from "store/actions/chatscreen";

// Navigation Imports //
import { navigateToChatRoom } from "navigation/navigate/common/index";

// Constants Imports //
import Colors from "constants/Colors";

// Utils Imports //
import { parseTimeAgo } from "utils/date";

// Custom Hook Imports //
import useDidMountEffect from "hooks/useDidMountEffect";
import useFlatListRequest from "hooks/useFlatListRequest";

// Local Component Imports //
import Empty from "components/Empty";
import ErrorSplash from "components/ErrorSplash";
import AlertSkeleton from "components/skeletons/AlertSkeleton";
import DefaultText from "components/DefaultText";
import CustomSearchBar from "components/CustomSearchBar";
import IconButton from "components/IconButton";

// Other Components //
const ChatRow = ({ chat, onPress }) => {
  const { width } = useWindowDimensions();
  const { chatId, product, user, latestMessage, updatedAt } = chat;

  return (
    <TouchableHighlight
      key={chatId}
      activeOpacity={0.9}
      underlayColor={"#F6F4F4"}
      onPress={onPress}
    >
      <View style={styles.userRow}>
        <View style={styles.avatarTextContainer}>
          <Avatar
            rounded
            size={64}
            source={{
              uri: user.profilePic,
            }}
          />
          <View style={styles.chatDetailsContainer}>
            <DefaultText style={styles.productTitle}>
              {product.title}
            </DefaultText>
            <DefaultText
              style={styles.username}
            >{`@${user.username}`}</DefaultText>
            <DefaultText style={{ ...styles.message, width: width * 0.5 }}>
              {latestMessage}
            </DefaultText>
            <DefaultText style={styles.time}>
              {parseTimeAgo(updatedAt)}
            </DefaultText>
          </View>
        </View>
        <Avatar
          avatarStyle={{ borderRadius: 10 }}
          size={64}
          source={{
            uri: product.imageUrl,
          }}
        />
      </View>
    </TouchableHighlight>
  );
};

// Main Component //
const ChatsScreen = (props) => {
  // Init //
  const [query, setQuery] = useState("");
  const [toggleRender, setToggleRender] = useState(false); // needed for cancel bug
  const [debouncedQuery] = useDebounce(query, 300);

  const activeChats = useSelector((state) => state.chatScreen.activeChats);
  const filteredChats = useSelector((state) => state.chatScreen.filteredChats);
  const loggedInUserId = useSelector((state) => state.auth.user.id);
  const dispatch = useDispatch();

  // Functions //
  const handleSearch = (text) => {
    setIsLoading(true);
    setQuery(text);
  };

  // Side Effects //
  const { isRefreshing, isError, isLoading, setIsRefreshing, setIsLoading } =
    useFlatListRequest(() => dispatch(fetchChats(loggedInUserId)));

  useDidMountEffect(() => {
    const queryChats = async () => {
      await dispatch(filterChats(debouncedQuery));
      setIsLoading(false);
    };
    queryChats();
  }, [debouncedQuery, toggleRender]);

  // FlatList Renderers //
  const renderFlatListItem = useCallback((itemData) => {
    return (
      <ChatRow
        chat={itemData.item}
        onPress={() => navigateToChatRoom(props, itemData.item)}
      />
    );
  }, []);

  // Render //
  return (
    <View style={styles.screenContainer}>
      <View style={styles.header}>
        <IconButton
          size={23}
          color={Colors.primary}
          name="arrowleft"
          onPress={() => props.navigation.goBack()}
        />
        <CustomSearchBar
          query={query}
          handleSearch={handleSearch}
          style={styles.searchBar}
          handleBlur={() => setToggleRender(!toggleRender)}
        />
      </View>
      {isLoading ? (
        <AlertSkeleton />
      ) : (
        <FlatList
          onRefresh={() => setIsRefreshing(true)}
          contentContainerStyle={{ flexGrow: 1 }}
          ListEmptyComponent={
            isError ? (
              <ErrorSplash />
            ) : (
              <Empty message="No chats found" width={128} height={128} />
            )
          }
          style={styles.list}
          refreshing={isRefreshing}
          data={query === "" ? activeChats : filteredChats}
          horizontal={false}
          keyExtractor={(item) => item.chatId}
          renderItem={renderFlatListItem}
        ></FlatList>
      )}
    </View>
  );
};

export default ChatsScreen;

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    marginTop: 50,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  searchBar: {
    width: "80%",
  },
  list: {
    marginTop: 9,
  },
  userRow: {
    width: "100%",
    paddingHorizontal: 16,
    paddingVertical: 4,
    marginVertical: 8,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  avatarTextContainer: {
    flexDirection: "row",
  },
  chatDetailsContainer: {
    marginLeft: 14,
  },
  productTitle: {
    fontFamily: "latoBold",
    fontSize: 16,
  },
  username: {
    fontSize: 12,
  },
  message: {
    marginTop: 4,
    width: 10,
    height: 14,
    opacity: 0.5,
  },
  time: {
    marginTop: 4,
  },
});
