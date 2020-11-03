import React, { useState, useEffect } from "react";
import {
  ScrollView,
  TextInput,
  View,
  StyleSheet,
  Alert,
  Text,
} from "react-native";
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
        {messages.map((message, i) => {
          if (message.userId === route.params.userId) {
            return (
              <ListItem
                key={`chatwindow-${i}`}
                styles={styles.litsItemBackground}
              >
                <ListItem.Content style={styles.messageTextContainer}>
                  <ListItem.Title style={styles.messageText}>
                    {message.message}
                  </ListItem.Title>
                </ListItem.Content>
                <Avatar rounded source={{ uri: message.imageUrl }} />
              </ListItem>
            );
          } else {
            return (
              <ListItem key={`chatwindow-${i}`}>
                <View>
                  <Avatar rounded source={{ uri: message.imageUrl }} />
                </View>
                <ListItem.Content>
                  <ListItem.Title>{message.message}</ListItem.Title>
                </ListItem.Content>
              </ListItem>
            );
          }
        })}
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
    padding: 10,
    backgroundColor: "#fff",
  },
  messageContainer: {
    flex: 8,
    backgroundColor: "grey",
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
  messageTextContainer: {
    justifyContent: "space-between",
    backgroundColor: "transparent",
  },
  messageText: {
    alignSelf: "flex-end",
  },
  litsItemBackground: {
    backgroundColor: "red",
  },
});
