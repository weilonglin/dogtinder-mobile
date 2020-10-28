import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { useQuery, useSubscription } from "@apollo/client";
import AsyncStorage from "@react-native-community/async-storage";
import { ListItem, Avatar } from "react-native-elements";
import jwtDecode from "jwt-decode";
import { GET_MESSAGES, SUB_MESSAGE } from "../../graphql/queries";

export const Chat = ({ route }) => {
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
      <View>
        {allNames == null ? (
          <Text>No messages</Text>
        ) : (
          allNames.map((user) => {
            return (
              <ListItem key={`listItem-${user.id}`} bottomDivider>
                <Avatar rounded source={{ uri: user.imageUrl }} size={50} />
                <ListItem.Content>
                  <ListItem.Title>{user.userName}</ListItem.Title>
                  <ListItem.Subtitle>Last message: {user.id}</ListItem.Subtitle>
                </ListItem.Content>
              </ListItem>
            );
          })
        )}
      </View>
    );
  }
};
