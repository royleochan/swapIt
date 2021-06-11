import React from "react";
import { StyleSheet, View } from "react-native";
import { Avatar } from "react-native-elements";

import Colors from "constants/Colors";
import DefaultText from "components/DefaultText";
import IconButton from "components/IconButton";
import MatchButton from "components/MatchButton";

const MatchRow = (props) => {
  const { match } = props;
  const { id, title, minPrice, maxPrice, imageUrl, creator } = props.product;

  return (
    <View style={styles.rowContainer}>
      <View style={styles.avatarInfoContainer}>
        <Avatar
          rounded
          size={66}
          source={{
            uri: imageUrl,
          }}
        />
        <View style={styles.infoContainer}>
          <DefaultText style={styles.title}>{title}</DefaultText>
          <DefaultText style={styles.price}>
            S$ {minPrice} - {maxPrice}
          </DefaultText>

          <DefaultText style={styles.username}>@{creator.username}</DefaultText>
        </View>
      </View>
      <View style={styles.buttonsContainer}>
        <IconButton
          style={styles.messageIcon}
          size={23}
          color={Colors.primary}
          name="message1"
          onPress={() => console.log("navigate")}
        />
        <MatchButton match={match} productId={id} />
      </View>
    </View>
  );
};

export default MatchRow;

const styles = StyleSheet.create({
  rowContainer: {
    marginBottom: 30,
    paddingBottom: 26,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    borderBottomColor: "rgba(196, 196, 196, 0.3)",
    borderBottomWidth: 3,
  },
  avatarInfoContainer: {
    flexDirection: "row",
    alignItems: "flex-end",
    marginLeft: 20,
  },
  infoContainer: {
    marginLeft: 20,
  },
  title: {
    fontFamily: "latoBold",
    fontSize: 12,
  },
  price: {
    marginTop: 3,
  },
  time: {
    marginTop: 3,
  },
  messageIcon: {
    position: "absolute",
    right: 0,
    top: -10,
    marginRight: 16,
  },
  username: {
    marginTop: 3,
    color: Colors.darkPink,
  },
});
