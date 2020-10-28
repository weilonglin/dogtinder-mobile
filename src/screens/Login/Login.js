import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import AsyncStorage from "@react-native-community/async-storage";
import { useLazyQuery } from "@apollo/client";
import { LOGIN_USER } from "../../graphql/queries";
import { AuthContext } from "../../context/Auth";

const backGroundImage = {
  uri: "https://art-u1.infcdn.net/articles_uploads/2/2270/Tindog_Main.png",
};

export const Login = ({ navigation, route }) => {
  const [variables, setVariables] = useState({
    userName: "",
    password: "",
  });
  const { signIn, signUp } = useContext(AuthContext);

  const [loginUser, { loading }] = useLazyQuery(LOGIN_USER, {
    onError: (err) => console.log(err.graphQLErrors),
    onCompleted(data) {
      console.log("data", data);
      try {
        const setStorage = async () => {
          await AsyncStorage.setItem("userToken", data.login.token);
        };
        setStorage();
        signIn(data.login.token);
      } catch (error) {
        // Error saving data
      }
    },
  });

  const submitLoginForm = (e) => {
    e.preventDefault();

    loginUser({ variables });
  };

  return (
    <View style={styles.container}>
      <ImageBackground source={backGroundImage} style={styles.image}>
        <Text style={styles.logoText}>Discover. Chat. Meet.</Text>
        <Text style={styles.logo}>Log in</Text>
        <View style={styles.inputView}>
          <TextInput
            style={styles.inputText}
            placeholder="Username..."
            placeholderTextColor="#003f5c"
            onChangeText={(text) =>
              setVariables({ ...variables, userName: text })
            }
          />
        </View>
        <View style={styles.inputView}>
          <TextInput
            secureTextEntry
            style={styles.inputText}
            placeholder="Password..."
            placeholderTextColor="#003f5c"
            onChangeText={(text) =>
              setVariables({ ...variables, password: text })
            }
          />
        </View>
        <TouchableOpacity style={styles.loginBtn} onPress={submitLoginForm}>
          <Text style={styles.loginText}>Log in</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
          <Text style={styles.loginText}>
            Don't have an account yet? Signup here!
          </Text>
        </TouchableOpacity>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,

    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    fontWeight: "bold",
    fontSize: 50,
    color: "#ffffff",
    marginBottom: 40,
  },
  logoText: {
    fontWeight: "bold",
    fontSize: 20,
    color: "#ffffff",
    marginBottom: 40,
  },
  inputView: {
    width: "80%",
    backgroundColor: "#fff",
    borderRadius: 25,
    height: 50,
    marginBottom: 20,
    justifyContent: "center",
    padding: 20,
  },
  inputText: {
    height: 50,
    color: "grey",
  },
  forgot: {
    color: "white",
    fontSize: 11,
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
  image: {
    flex: 1,
    resizeMode: "cover",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "100%",
  },
});
