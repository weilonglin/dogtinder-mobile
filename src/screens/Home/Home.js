import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import { ImageBackground, StyleSheet, Text, View, Alert } from "react-native";
import { Button } from "react-native-elements";
import { useQuery } from "@apollo/client";
import { GET_USER } from "../../graphql/queries";
import { visitWithTypeInfo } from "graphql";

const backGroundImage = {
  uri: "https://art-u1.infcdn.net/articles_uploads/2/2270/Tindog_Main.png",
};

export const Home = ({ navigation, route }) => {
  const { data } = useQuery(GET_USER, {
    variables: {
      id: 4,
    },
  });

  return (
    <ImageBackground source={backGroundImage} style={styles.image}>
      <Text style={styles.header}>Discover. Chat. Meet.</Text>
      <View style={styles.rowContainer}>
        <Button
          title="Login"
          buttonStyle={{
            backgroundColor: "#fd5068",
            width: 100,
            height: 50,
          }}
          style={styles.button}
          onPress={() => navigation.navigate("Login")}
        />
        <Button
          title="Sign up"
          buttonStyle={{
            backgroundColor: "#fd5068",
            width: 100,
            height: 50,
            paddingLeft: 10,
          }}
          onPress={() => navigation.navigate("Signup")}
        />
      </View>
      <StatusBar style="auto" />
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "100%",
  },
  header: {
    fontSize: 30,
    color: "white",
    alignItems: "center",
    justifyContent: "center",
    bottom: 50,
  },
  button: {
    color: "#fd5068",
    paddingLeft: 10,
    paddingRight: 10,
  },
  rowContainer: {
    flexDirection: "row",
  },
});
