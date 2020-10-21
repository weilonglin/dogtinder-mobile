import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { client } from "./src/graphql/client";
import { ApolloProvider } from "@apollo/client";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Main } from "./src/screens";
import { Home } from "./src/screens/Home/Home";

const Tab = createBottomTabNavigator();

export default function App() {
  const [loggedIn, setloggedIn] = useState(false);

  return (
    <ApolloProvider client={client}>
      {loggedIn ? (
        <NavigationContainer>
          <Tab.Navigator initialRouteName="Home">
            <Tab.Screen name="My Profile" component={Main} />
            <Tab.Screen name="Chat" component={Main} />
          </Tab.Navigator>
        </NavigationContainer>
      ) : (
        <View style={styles.container}>
          <Home />
        </View>
      )}
    </ApolloProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
