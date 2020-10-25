import React, {
  useState,
  useEffect,
  createContext,
  useMemo,
  useReducer,
} from "react";
import jwtDecode from "jwt-decode";
import { StyleSheet, View, SafeAreaView } from "react-native";
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

const AuthStateContext = createContext();
const Tab = createMaterialTopTabNavigator();
const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

export default function App({ navigation }) {
  useEffect(() => {
    const bootstrapAsync = async () => {
      let userToken;

      try {
        userToken = await AsyncStorage.getItem("userToken");
      } catch (e) {}
      const { id } = userToken ? jwtDecode(userToken) : false;

      dispatch({
        type: "RESTORE_TOKEN",
        token: { userToken, id },
      });
    };
    bootstrapAsync();
  }, []);

  const authContextValue = React.useMemo(
    () => ({
      signIn: async (data) => {
        const { id } = jwtDecode(data);
        dispatch({ type: "SIGN_IN", token: { data, id } });
      },
      signOut: async () => {
        await AsyncStorage.removeItem("userToken");
        dispatch({ type: "SIGN_OUT" });
      },
      signUp: async (data) => {
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
            userToken: action.token.userToken,
            isLoading: false,
            userId: action.token.id,
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
            userToken: action.token.data,
            userId: action.token.id,
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
      userToken: false,
      userId: false,
    }
  );
  console.log(state);
  return (
    <AuthContext.Provider value={authContextValue}>
      <ApolloProvider client={client}>
        <AuthStateContext.Provider value={state}>
          <SafeAreaView style={styles.container}>
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
          </SafeAreaView>
        </AuthStateContext.Provider>
      </ApolloProvider>
    </AuthContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
