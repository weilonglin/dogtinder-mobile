import React, { useContext, useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Avatar, Accessory } from "react-native-elements";

import { useQuery } from "@apollo/client";
import jwtDecode from "jwt-decode";
import { GET_USER } from "../../graphql/queries";
import { AuthContext } from "../../context/Auth";
import AsyncStorage from "@react-native-community/async-storage";

export const Profile = ({ navigation, route }) => {
  const [user, setUser] = useState();
  const { signOut } = useContext(AuthContext);
  const { data } = useQuery(GET_USER, {
    variables: {
      id: user,
    },
  });
  console.log(data);

  useEffect(() => {
    async function getUserId() {
      try {
        const storeToken = await AsyncStorage.getItem("userToken");
        const decodedToken = jwtDecode(storeToken);

        setUser(decodedToken.id);
      } catch (error) {
        console.log("error", error.message);
      }
    }
    getUserId();
  }, []);
  if (data) {
    return (
      <View style={styles.container}>
        <View style={styles.avatarSection}>
          <Avatar
            rounded
            source={{
              uri: data.user.imageUrl,
            }}
            size="xlarge"
          />
        </View>
        <View style={styles.userInfoSection}>
          <Text style={styles.userName}>{data.user.userName}</Text>
          <Text style={styles.userInfo}>{data.user.email}</Text>
        </View>
        <View style={styles.buttonSection}>
          <TouchableOpacity style={styles.loginBtn} onPress={() => signOut()}>
            <Text style={styles.loginText}>Sign out</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View>
      <Text>...Loading</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  loginBtn: {
    width: "80%",
    backgroundColor: "#fb5b5a",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    marginBottom: 10,
  },
  loginText: {
    color: "white",
  },
  avatarSection: {
    flex: 2,
    alignItems: "center",
    justifyContent: "center",
  },
  userInfoSection: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  userName: {
    fontSize: 30,
    fontWeight: "bold",
    padding: 5,
  },
  userInfo: {
    fontSize: 20,
  },
  buttonSection: {
    width: "100%",
    flex: 2,
    alignItems: "center",
    justifyContent: "center",
  },
});
