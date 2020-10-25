import React, { useContext, useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Avatar, Accessory, Icon } from "react-native-elements";
import { LinearGradient } from "expo-linear-gradient";
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
          <View>
            <Icon
              reverse
              name="cog"
              type="font-awesome"
              color="#CDCDCD"
              size={30}
            ></Icon>
            <Text style={styles.buttonText}>Edit info</Text>
          </View>
          <View>
            <Icon
              reverse
              name="paw"
              type="font-awesome"
              color="#fd267d"
              size={45}
            ></Icon>
            <Text style={styles.buttonText}>Add dog</Text>
          </View>

          <View>
            <Icon
              reverse
              name="pencil"
              type="font-awesome"
              color="#CDCDCD"
              size={30}
            ></Icon>
            <Text style={styles.buttonText}>Settings</Text>
          </View>
        </View>
        <View style={styles.logOutButtonSection}>
          <LinearGradient
            colors={["#fd267d", "#ff7854"]}
            start={{ x: 0, y: 1 }}
            end={{ x: 1, y: 0 }}
            style={styles.loginBtn}
            onPress={() => signOut()}
          >
            <Text style={styles.loginText}>Sign out</Text>
          </LinearGradient>
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
    backgroundColor: "#fff",
  },
  loginBtn: {
    width: "80%",
    backgroundColor: "#fb5b5a",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  loginText: {
    color: "white",
    fontSize: 20,
  },
  avatarSection: {
    flex: 3,
    alignItems: "center",
    justifyContent: "center",
  },
  userInfoSection: {
    flex: 2,
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
  buttonText: {
    fontSize: 15,
    color: "#CDCDCD",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
  },
  buttonSection: {
    width: "100%",
    flex: 2,
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "center",
  },
  logOutButtonSection: {
    width: "100%",
    flex: 2,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
});
