import React, { useState, useEffect } from "react";
import { ScrollView, TextInput, View, StyleSheet, Alert } from "react-native";
import { ListItem, Avatar, Button } from "react-native-elements";
import { useQuery, useSubscription } from "@apollo/client";
import { GET_MESSAGES, SUB_MESSAGE } from "../../graphql/queries";

export const ChatWindow = ({ navigation, route }) => {
  const [text, setText] = useState("");
  const [messages, setMessages] = useState([]);

  const { loading: subLoading, data: subData } = useSubscription(SUB_MESSAGE, {
    variables: {
      userId: route.params.userId,
      recipientId: route.params.userId,
    },
  });

  useEffect(() => {
    setMessages(route.params.messages);
  }, []);

  useEffect(() => {
    if (subData != null) {
      const newMessage = [...messages, subData.chatMessage];
      setMessages(newMessage);
    }
  }, [subData]);

  console.log("chatwindow", route);
  return (
    <View style={styles.container}>
      <ScrollView style={styles.messageContainer}>
        {messages.map((message, i) => (
          <ListItem key={`chatwindow-${i}`}>
            <Avatar rounded source={{ uri: message.imageUrl }} />
            <ListItem.Content>
              <ListItem.Title>{message.message}</ListItem.Title>
            </ListItem.Content>
          </ListItem>
        ))}
      </ScrollView>
      <View style={styles.messageInput}>
        <View>
          <TextInput
            style={styles.textInput}
            onChangeText={(text) => setText(text)}
            value={text}
            placeholder="Type here...."
          />
          <Button
            style={styles.textButton}
            title="Press me"
            onPress={() => Alert.alert("Simple Button pressed")}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  messageContainer: {
    flex: 8,
    backgroundColor: "#fff",
  },
  messageInput: {
    height: 50,
    borderColor: "gray",
    borderWidth: 1,
  },
  textInput: {
    flex: 9,
    alignItems: "stretch",
  },
  textButton: {
    flex: 1,
    alignSelf: "flex-end",
  },
});
