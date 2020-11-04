import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
} from "react-native";
import { useMutation } from "@apollo/client";

import { SEND_MESSAGE } from "../../../graphql/queries";

import { MaterialIcons } from "@expo/vector-icons";

export const InputField = (props) => {
  let today = new Date();

  const [message, setMessage] = useState("");

  const [sendMessage] = useMutation(SEND_MESSAGE, {
    onError: (err) => console.log(err.graphQLErrors),
    onCompleted: () => console.log("mutation completed..."),
  });

  const submitMessage = (e) => {
    e.preventDefault();
    sendMessage({
      variables: {
        userId: props.userId,
        message: message,
        recipientId: props.otherId,
        recipientName: props.recipientName,
        imageUrl: props.userImg,
        date: `${
          today.getFullYear() +
          "-" +
          (today.getMonth() + 1) +
          "-" +
          today.getDate()
        }`,
        time: `${
          today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds()
        }`,
      },
    });
    setMessage("");
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS == "ios" ? "padding" : "height"}
      keyboardVerticalOffset={120}
      style={{ width: "100%" }}
    >
      <View style={styles.container}>
        <View style={styles.mainContainer}>
          <TextInput
            placeholder={"Type a message"}
            style={styles.textInput}
            multiline
            value={message}
            onChangeText={setMessage}
          />
        </View>
        <TouchableOpacity onPress={submitMessage}>
          <View style={styles.buttonContainer}>
            <MaterialIcons name="send" size={28} color="white" />
          </View>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    margin: 10,
    alignItems: "flex-end",
  },
  mainContainer: {
    flexDirection: "row",
    backgroundColor: "white",
    padding: 10,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: "#fd267d",
    marginRight: 10,
    flex: 1,
    alignItems: "flex-end",
  },
  textInput: {
    flex: 1,
    marginHorizontal: 10,
  },
  icon: {
    marginHorizontal: 5,
  },
  buttonContainer: {
    backgroundColor: "#ff7854",
    borderRadius: 25,
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },
});
