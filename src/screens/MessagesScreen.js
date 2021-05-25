import React, { useEffect, useState } from "react";
import { REACT_APP_BACKEND_URL } from "@env";
import {
  View,
  StyleSheet,
  TouchableHighlight,
  ActivityIndicator,
} from "react-native";
import { useSelector } from "react-redux";
import { Avatar } from "react-native-elements";
import { io } from "socket.io-client";

import request from "utils/request";
import Colors from "constants/Colors";
import useDidMountEffect from "hooks/useDidMountEffect";
import DefaultText from "components/DefaultText";
import CustomSearchBar from "components/CustomSearchBar";
import IconButton from "components/IconButton";
import uuid from "react-native-uuid";

const MessagesScreen = (props) => {
  const [socket] = useState(
      io(`${REACT_APP_BACKEND_URL}/chatSocket`, {
        autoConnect: false,
      })
  );
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
      const response = await request.get(
        `/api/users/search/${query}/${loggedInUserId}`
      );
      const searchChats = response.data.users.map((usr) => {
        return {
          socket: socket,
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

  const getChats = async () => {
    try {
      let response = await request.get(`/api/chats/rooms/${loggedInUserId}`);
      return response.data.rooms.chats.map((chat) => {
        return {
          socket: socket,
          user: chat.users.find((usr) => usr.id !== loggedInUserId),
          chatId: chat.id,
          messages: chat.messages,
          numUnseen: chat.messages.filter(msg => !msg.seen).length,
        };
      });
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    socket.connect();
    socket.on("connect", () => {
      socket.emit("messages screen", loggedInUserId);
    });
    socket.on("messages joined", async () => {
      setIsLoading(true);
      await getChats()
          .then((response) => {
            setUserChats(response);
            setIsLoading(false);
          })
          .catch((err) => {
            setIsLoading(false);
            console.error(err);
          });
    });
    socket.on("new message", ({ creator, content, imageUrl }) => {
      const newMessageFromSchema = {
        _id: uuid.v4(),
        creator: creator,
        content: content,
        imageUrl: imageUrl,
        seen: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      }
      let reqChat = userChats.find(chat => chat.user._id === creator);
      reqChat.messages.push(newMessageFromSchema);
      reqChat.numUnseen += 1;
    });
    return () => {
      socket.disconnect();
    };
  }, [])

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
        {query === ""
          ? userChats.map((chat) => {
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
            })}
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
