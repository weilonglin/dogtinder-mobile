import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { client } from "./src/graphql/client";
import { ApolloProvider } from "@apollo/client";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";

import { Main } from "./src/screens";
import { Home } from "./src/screens/Home/Home";
import { Login } from "./src/screens/Login/Login";
import { Signup } from "./src/screens/Signup/Signup";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

export default function App() {
  const [loggedIn, setloggedIn] = useState(false);

  return (
    <ApolloProvider client={client}>
      {loggedIn ? (
        <NavigationContainer>
          <Drawer.Navigator initialRouteName="Home">
            <Drawer.Screen name="My Profile" component={Main} />
            <Drawer.Screen name="Chat" component={Main} />
          </Drawer.Navigator>
        </NavigationContainer>
      ) : (
        <NavigationContainer>
          <Drawer.Navigator initialRouteName="Home">
            <Drawer.Screen name="Login" component={Login} />
            <Drawer.Screen name="Signup" component={Signup} />
          </Drawer.Navigator>
        </NavigationContainer>
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
