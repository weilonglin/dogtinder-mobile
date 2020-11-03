import React, { useEffect, useState } from "react";
import { ScrollView, Text } from "react-native";
import { useQuery, useSubscription } from "@apollo/client";
import AsyncStorage from "@react-native-community/async-storage";
import { ListItem, Avatar } from "react-native-elements";
import jwtDecode from "jwt-decode";
import { GET_MESSAGES, SUB_MESSAGE } from "../../graphql/queries";

export const Chat = ({ navigation, route }) => {
  const [allNames, setAllnames] = useState([]);
  const [sender, setSender] = useState([]);

  const { data: msgData } = useQuery(GET_MESSAGES, {
    variables: {
      id: route.params.userId,
    },
  });
  console.log("messages", msgData);

  const msgT = msgData === undefined ? null : msgData["chatMessage"];

  const { loading: subLoading, data: subData } = useSubscription(SUB_MESSAGE, {
    variables: {
      userId: route.params.userId,
      recipientId: route.params.userId,
    },
  });

  function getUnique(arr) {
    if (arr != null) {
      const uniqueRecipient = arr
        .map((e) => e["recipient"])
        .map((e, i, final) => final.indexOf(e) === i && i)
        .filter((e) => arr[e])
        .map((e) => arr[e]);
      const uniqueSender = arr
        .map((e) => e["sender"])
        .map((e, i, final) => final.indexOf(e) === i && i)
        .filter((e) => arr[e])
        .map((e) => arr[e]);

      const mergeUnique = uniqueRecipient.concat(uniqueSender);

      const filterUnique = mergeUnique.map((filter) => {
        return [filter.recipient, filter.sender];
      });

      console.log(filterUnique);
      const flatFilterUnique = filterUnique.flat();

      const uniqueUserName = flatFilterUnique
        .map((e) => e["userName"])
        .map((e, i, final) => final.indexOf(e) === i && i)
        .filter((e) => flatFilterUnique[e])
        .map((e) => flatFilterUnique[e])
        .filter((e) => e.id != route.params.userId);
      console.log(uniqueUserName);
      return uniqueUserName;
    }
  }

  useEffect(() => {
    console.log("msgT", msgT);
    const filter = getUnique(msgT);
    setAllnames(filter);
    setSender(msgT);
  }, [msgT]);

  useEffect(() => {
    if (subData != null) {
      const newArray = [
        ...allNames,
        [subData.chatMessage.sender],
        [subData.chatMessage.recipient],
      ];

      console.log("newArr", newArray.flat());

      const newArr = newArray.flat();
      const unique =
        newArr === null
          ? null
          : newArr
              .flat()
              .map((e) => e["userName"])
              .map((e, i, final) => final.indexOf(e) === i && i)
              .filter((e) => newArr[e])
              .map((e) => newArr[e])
              .filter((e) => e.id != route.params.userId);
      console.log("sub final arr", unique);
      setAllnames(unique);

      const newMessage = [...sender, subData.chatMessage];
      setSender(newMessage);
    }
  }, [subData]);

  if (allNames === []) {
    return (
      <View>
        <Text>...Loading</Text>
      </View>
    );
  } else {
    return (
      <ScrollView>
        {allNames == null ? (
          <Text>No messages</Text>
        ) : (
          allNames.map((user) => {
            const chatsSender = sender.filter((name) => {
              if (
                name.recipientName === user.userName ||
                parseInt(name.userId) === parseInt(user.id)
              ) {
                return name;
              } else {
                return null;
              }
            });
            return (
              <ListItem
                extraData
                key={`listItem-${user.id}`}
                bottomDivider
                onPress={() =>
                  navigation.navigate("Chat Window", {
                    messages: chatsSender,
                    id: user.id,
                  })
                }
              >
                <Avatar rounded source={{ uri: user.imageUrl }} size={50} />
                <ListItem.Content>
                  <ListItem.Title>{user.userName}</ListItem.Title>
                  <ListItem.Subtitle>Last message: {user.id}</ListItem.Subtitle>
                </ListItem.Content>
                <ListItem.Chevron color="gray" />
              </ListItem>
            );
          })
        )}
      </ScrollView>
    );
  }
};
