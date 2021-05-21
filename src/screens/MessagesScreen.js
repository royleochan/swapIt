import React, {useEffect, useState} from "react";
import {
  View,
  StyleSheet,
  TouchableHighlight,
  ActivityIndicator,
} from "react-native";
import { Avatar } from "react-native-elements";

import request from "utils/request";
import Colors from "constants/Colors";
import useDidMountEffect from "hooks/useDidMountEffect";
import DefaultText from "components/DefaultText";
import CustomSearchBar from "components/CustomSearchBar";
import IconButton from "components/IconButton";
import {useSelector} from "react-redux";

const MessagesScreen = (props) => {
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [searchedChats, setSearchedChats] = useState([]);
  const [userChats, setUserChats] = useState([]);

  const loggedInUserId = useSelector((state) => state.auth.user.id);

  const handleSearch = (text) => {
    setQuery(text);
  };

  const searchHandler = async () => {
    try {
      const response = await request.get(`/api/users/search/${query}`);
      const searchChats = response.data.users.map((usr) => {
        return {
          user: usr,
          chatId: null,
        };
      });
      setSearchedChats(searchChats);
      setIsLoading(false);
    } catch (err) {
      setSearchedChats([]);
      setIsLoading(false);
    }
  };

  //Get an array of chats with the following format:
  //{ user: The opposing party's user object,
  //chatId: The ObjectId of the Chat object }
  const getChats = async () => {
    try {
      let response = await request.get(`/api/chats/rooms/${loggedInUserId}`);
      return response.data.rooms.chats.map((chat) => {
        return {
          user: chat.users.find(usr => usr.id !== loggedInUserId),
          chatId: chat.id,
        }
      });
    } catch (e) {
      console.error(e);
    }
  };

  //Initial loading of active chats
  useEffect(() => {
    setIsLoading(true);
    getChats()
        .then((response) => {
          setUserChats(response);
          setIsLoading(false);
        })
        .catch((err) => {
          setIsLoading(false);
          console.error(err);
        });
  }, []);

  useDidMountEffect(() => {
    if (query !== "") {
      setIsLoading(true);
      // Executes searchHandler after 1000ms, returns a positive integer which uniquely identifies the timer created
      const timer = setTimeout(() => searchHandler(query), 1000);
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
        {query === "" ?
            userChats.map((chat) => {
                return (
                    <TouchableHighlight
                        key={chat.chatId}
                        activeOpacity={0.9}
                        underlayColor={"#F6F4F4"}
                        onPress={() => props.navigation.navigate("Chat", chat)}
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
            :
            searchedChats.map((chat) => {
              return (
                  <TouchableHighlight
                      key={chat.user._id}
                      activeOpacity={0.9}
                      underlayColor={"#F6F4F4"}
                      onPress={() => props.navigation.navigate("Chat", chat)}
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
        }
      </View>
    </View>
  );
};

export default MessagesScreen;

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: "white",
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
