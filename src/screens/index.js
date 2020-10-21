import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useQuery } from "@apollo/client";
import { GET_USER } from "../graphql/queries";

export const Main = () => {
  const { data } = useQuery(GET_USER, {
    variables: {
      id: 4,
    },
  });
  console.log(data);
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});