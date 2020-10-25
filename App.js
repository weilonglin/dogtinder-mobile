import React, {
  useState,
  useEffect,
  createContext,
  useMemo,
  useReducer,
} from "react";
import { StyleSheet, View } from "react-native";
import { client } from "./src/graphql/client";
import { ApolloProvider } from "@apollo/client";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

import AsyncStorage from "@react-native-community/async-storage";

import { Main } from "./src/screens";
import { Home } from "./src/screens/Home/Home";
import { Login } from "./src/screens/Login/Login";
import { Signup } from "./src/screens/Signup/Signup";
import { Profile } from "./src/screens/Profile/Profile";

import { AuthContext } from "./src/context/Auth";

const Tab = createMaterialTopTabNavigator();
const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

export default function App({ navigation }) {
  useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    const bootstrapAsync = async () => {
      let userToken;

      try {
        userToken = await AsyncStorage.getItem("userToken");
      } catch (e) {
        // Restoring token failed
      }
      dispatch({ type: "RESTORE_TOKEN", token: userToken });
    };
    bootstrapAsync();
  }, []);

  const authContextValue = React.useMemo(
    () => ({
      signIn: async (data) => {
        console.log("do i get here", data);
        dispatch({ type: "SIGN_IN", token: data });
      },
      signOut: async () => {
        await AsyncStorage.removeItem("userToken");
        dispatch({ type: "SIGN_OUT" });
      },
      signUp: async (data) => {
        // In a production app, we need to send user data to server and get a token
        // We will also need to handle errors if sign up failed
        // After getting token, we need to persist the token using `AsyncStorage`
        // In the example, we'll use a dummy token

        dispatch({ type: "SIGN_IN", token: "dummy-auth-token" });
      },
    }),
    []
  );
  const [state, dispatch] = useReducer(
    (prevState, action) => {
      switch (action.type) {
        case "TO_SIGNUP_PAGE":
          return {
            ...prevState,
            isLoading: false,
            isSignedUp: false,
            noAccount: true,
          };
        case "TO_SIGNIN_PAGE":
          return {
            ...prevState,
            isLoading: false,
            isSignedIn: false,
            noAccount: false,
          };
        case "RESTORE_TOKEN":
          return {
            ...prevState,
            userToken: action.token,
            isLoading: false,
          };
        case "SIGNED_UP":
          return {
            ...prevState,
            isSignedIn: true,
            isSignedUp: true,
            isLoading: false,
            userToken: action.token,
          };
        case "SIGN_IN":
          return {
            ...prevState,
            isSignedOut: false,
            isSignedIn: true,
            isSignedUp: true,
            userToken: action.token,
          };
        case "SIGN_OUT":
          return {
            ...prevState,
            isSignedOut: true,
            isSignedIn: false,
            isSignedUp: true,
            userToken: null,
          };
      }
    },
    {
      isLoading: true,
      isSignedOut: false,
      isSignedUp: false,
      noAccount: false,
      isSignedIn: false,
      userToken: null,
    }
  );
  return (
    <AuthContext.Provider value={authContextValue}>
      <ApolloProvider client={client}>
        <NavigationContainer>
          {state.userToken != null ? (
            <Tab.Navigator initialRouteName="My Profile">
              <Tab.Screen name="My Profile" component={Profile} />
              <Tab.Screen name="Chat" component={Main} />
              <Tab.Screen name="Discover" component={Main} />
            </Tab.Navigator>
          ) : (
            <Drawer.Navigator initialRouteName="Home">
              <Drawer.Screen name="Home" component={Home} />
              <Drawer.Screen name="Login" component={Login} />
              <Drawer.Screen name="Signup" component={Signup} />
            </Drawer.Navigator>
          )}
        </NavigationContainer>
      </ApolloProvider>
    </AuthContext.Provider>
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
