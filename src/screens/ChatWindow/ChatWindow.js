import React, { useState } from "react";
import { ScrollView, TextInput, View, StyleSheet } from "react-native";
import { ListItem, Avatar } from "react-native-elements";

export const ChatWindow = ({ navigation, route }) => {
  const [text, setText] = useState("");
  console.log("chatwindow", route);
  return (
    <View style={styles.container}>
      <ScrollView>
        {route.params.messages.map((message, i) => {
          if (
            message.recipientId === route.params.id ||
            message.userId === route.params.id
          ) {
            return (
              <ListItem key={`chatwindow-${i}`}>
                <Avatar rounded source={{ uri: message.imageUrl }} />
                <ListItem.Content>
                  <ListItem.Title>{message.message}</ListItem.Title>
                </ListItem.Content>
              </ListItem>
            );
          } else {
            return null;
          }
        })}
      </ScrollView>
      <TextInput
        style={styles.messageInput}
        onChangeText={(text) => setText(text)}
        value={text}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  messageInput: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    justifyContent: "flex-end",
  },
});
