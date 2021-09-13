import React, { useEffect, useState, useRef } from "react";
import {
  View,
  StyleSheet,
  TouchableHighlight,
  ActivityIndicator,
} from "react-native";
import {useDispatch, useSelector} from "react-redux";
import { Avatar } from "react-native-elements";

import {
  fetchChats,
  fetchSearch,
  findRoom,
} from "store/actions/chatscreen";

import Colors from "constants/Colors";
import useDidMountEffect from "hooks/useDidMountEffect";
import DefaultText from "components/DefaultText";
import CustomSearchBar from "components/CustomSearchBar";
import IconButton from "components/IconButton";

const ChatsScreenRevised = (props) => {

  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const activeChats = useSelector((state) => state.chatScreen.activeChats);
  const searchedChats = useSelector((state) => state.chatScreen.searchedChats);
  const loggedInUserId = useSelector((state) => state.auth.user.id);
  const dispatch = useDispatch();

  const handleSearch = (text) => {
    setQuery(text);
  };

  const pressSearchedUserHandler = (opposingId) => {
    console.log('press searched user')
    const chat = dispatch(findRoom(loggedInUserId, opposingId));
    props.navigation.push("Chat", chat);
  };

  const searchHandler = async () => {
    setIsLoading(true);
    dispatch(fetchSearch(loggedInUserId, query));
    setIsLoading(false);
  };

  useEffect(() => {
    dispatch(fetchChats(loggedInUserId));
  }, []);

  useDidMountEffect(() => {
    if (query !== "") {
      setIsLoading(true);
      // Executes searchHandler after 1000ms, returns a positive integer which uniquely identifies the timer created
      const timer = setTimeout(() => searchHandler(), 1000);
      // Cancels the timer given the timer id
      return () => clearTimeout(timer);
    }
  }, [query]);

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
        />
      </View>
      <View style={styles.mainContainer}>
        {isLoading && <ActivityIndicator size={30} />}
        {query === ""
          ? activeChats.map((chat) => {
              return (
                <TouchableHighlight
                  key={chat.chatId}
                  activeOpacity={0.9}
                  underlayColor={"#F6F4F4"}
                  onPress={() => props.navigation.push("Chat", chat)}
                >
                  <View style={styles.userRow}>
                    <View style={styles.avatarTextContainer}>
                      <Avatar
                        rounded
                        size={64}
                        source={{
                          uri: chat.user.profilePic,
                        }}
                      />
                      <DefaultText style={styles.username}>
                        {chat.user.username}
                      </DefaultText>
                    </View>
                  </View>
                </TouchableHighlight>
              );
            })
          : searchedChats.map((chat) => {
              return (
                <TouchableHighlight
                  key={chat.user._id}
                  activeOpacity={0.9}
                  underlayColor={"#F6F4F4"}
                  onPress={() => pressSearchedUserHandler(chat.user._id)}
                >
                  <View style={styles.userRow}>
                    <View style={styles.avatarTextContainer}>
                      <Avatar
                        rounded
                        size={64}
                        source={{
                          uri: chat.user.profilePic,
                        }}
                      />
                      <DefaultText style={styles.username}>
                        {chat.user.username}
                      </DefaultText>
                    </View>
                  </View>
                </TouchableHighlight>
              );
            })}
      </View>
    </View>
  );
};

export default ChatsScreenRevised;

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
  mainContainer: {
    marginTop: 18,
  },
  userRow: {
    width: "100%",
    paddingHorizontal: 16,
    paddingVertical: 4,
  },
  avatarTextContainer: {
    flexDirection: "row",
  },
  username: {
    fontFamily: "latoBold",
    fontSize: 16,
    marginLeft: 14,
  },
});
