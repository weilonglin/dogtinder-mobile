import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { useQuery, useSubscription } from "@apollo/client";
import AsyncStorage from "@react-native-community/async-storage";
import { ListItem } from "react-native-elements";
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
        .map((e) => flatFilterUnique[e]);
      console.log(uniqueUserName);
      return uniqueUserName;
    }
  }

  useEffect(() => {
    const filter = getUnique(msgT);
    setAllnames(filter);
  }, [msgT]);

  useEffect(() => {
    if (subData != null) {
      const filter = getUnique(subData);
      console.log("useeffect else", filter);

      const newArray = filter != null ? [...allNames, ...filter] : null;

      const unique =
        newArray === null
          ? null
          : newArray
              .map((e) => e["userName"])
              .map((e, i, final) => final.indexOf(e) === i && i)
              .filter((e) => newArray[e])
              .map((e) => newArray[e]);

      setAllnames(unique);
    }
  }, [subData]);

  if (allNames === []) {
    return (
      <View>
        <Text>...Loading</Text>
      </View>
    );
  }
  {
    return (
      <View>
        {allNames == null ? (
          <Text>"No messages"</Text>
        ) : (
          allNames.map((user) => {
            console.log(user);
            console.log(allNames);
            if (user.id !== parseInt(route.params.userId)) {
              return (
                <ListItem
                  leftAvatar={{
                    title: user.userName,
                    source: { uri: user.imageUrl },
                    showAccessory: true,
                    size: 80,
                  }}
                  title={user.userName}
                  subtitle={`${user.id}`}
                  key={`listItem-${user.id}`}
                  chevron
                />
              );
            } else {
              return null;
            }
          })
        )}
      </View>
    );
  }
};
