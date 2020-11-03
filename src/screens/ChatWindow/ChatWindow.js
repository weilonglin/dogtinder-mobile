import React, { useState, useEffect } from "react";
import {
  ScrollView,
  TextInput,
  View,
  StyleSheet,
  Alert,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { ListItem, Avatar, Button } from "react-native-elements";
import { useQuery, useSubscription } from "@apollo/client";
import { GET_MESSAGES, SUB_MESSAGE } from "../../graphql/queries";

import { InputField } from "../../components/Chat/InputField/Index";

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
              <ListItem key={`chatwindow-${i}`}>
                <ListItem.Content style={styles.messageTextContainerRight}>
                  <View style={styles.messageTextBubleRight}>
                    <LinearGradient
                      colors={["#ff7854", "#fd267d"]}
                      start={{ x: 0, y: 1 }}
                      end={{ x: 1, y: 0 }}
                      style={styles.bubbleBackgroundColorRight}
                    >
                      <ListItem.Title style={styles.messageText}>
                        {message.message}
                      </ListItem.Title>
                    </LinearGradient>
                  </View>
                </ListItem.Content>
                <Avatar
                  rounded
                  size="medium"
                  source={{ uri: message.imageUrl }}
                />
              </ListItem>
            );
          } else {
            return (
              <ListItem key={`chatwindow-${i}`}>
                <Avatar
                  rounded
                  size="medium"
                  source={{ uri: message.imageUrl }}
                />
                <ListItem.Content style={styles.messageTextContainerLeft}>
                  <View style={styles.messageTextBubleLeft}>
                    <LinearGradient
                      colors={["#fd267d", "#ff7854"]}
                      start={{ x: 0, y: 1 }}
                      end={{ x: 1, y: 0 }}
                      style={styles.bubbleBackgroundColorLeft}
                    >
                      <ListItem.Title style={styles.messageText}>
                        {message.message}
                      </ListItem.Title>
                    </LinearGradient>
                  </View>
                </ListItem.Content>
              </ListItem>
            );
          }
        })}
      </ScrollView>
      <InputField />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#fff",
  },
  inputContainer: {
    flex: 1,
  },
  messageContainer: {
    flex: 1,
    backgroundColor: "transparent",
  },
  messageInput: {
    flex: 1,
    height: 50,
    borderColor: "#fd267d",
    borderWidth: 2,
    borderRadius: 20,
    marginLeft: 10,
    marginRight: 10,
    color: "black",
    backgroundColor: "#fff",
    flexDirection: "row",
  },
  textInput: {
    flex: 9,
    alignSelf: "flex-start",
    height: 40,
    paddingLeft: 15,
    paddingTop: 2,
  },
  textButton: {
    flex: 1,
    alignSelf: "flex-end",
    backgroundColor: "red",
  },
  messageTextContainerLeft: {
    justifyContent: "space-between",
    marginRight: 100,
  },
  messageTextContainerRight: {
    justifyContent: "space-between",
    marginLeft: 100,
  },
  messageText: {
    color: "#fff",
  },
  messageTextBubleRight: {
    overflow: "hidden",
    alignSelf: "flex-end",
    borderBottomLeftRadius: 15,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  bubbleBackgroundColorRight: {
    overflow: "hidden",
    padding: 10,
  },
  messageTextBubleLeft: {
    overflow: "hidden",
    alignSelf: "flex-start",
    borderBottomRightRadius: 15,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  bubbleBackgroundColorLeft: {
    overflow: "hidden",
    padding: 10,
  },
});
