import React, { useState, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { useMutation } from "@apollo/client";
import { REGISTER_USER } from "../../graphql/queries";

const backGroundImage = {
  uri: "https://art-u1.infcdn.net/articles_uploads/2/2270/Tindog_Main.png",
};
import { AuthContext } from "../../context/Auth";

export const Signup = ({ navigation }) => {
  const [variables, setVariables] = useState({
    full_name: "",
    userName: "",
    email: "",
    password: "",
    address: "asd",
    city: "asd",
    imageUrl: "",
  });
  const { signIn, signUp } = useContext(AuthContext);
  const [registerUser, { loading }] = useMutation(REGISTER_USER, {
    onError: (err) => console.log(err.graphQLErrors[0].extensions.errors),
    onCompleted(data) {
      console.log(data);
      navigation.navigate("Login");
    },
  });

  const submitRegisterForm = (e) => {
    e.preventDefault();

    registerUser({ variables });
  };

  return (
    <View style={styles.container}>
      <ImageBackground source={backGroundImage} style={styles.image}>
        <Text style={styles.logoText}>Discover. Chat. Meet.</Text>
        <Text style={styles.logo}>Sign up</Text>
        <View style={styles.inputView}>
          <TextInput
            style={styles.inputText}
            placeholder="Full name..."
            placeholderTextColor="#003f5c"
            value={variables.full_name}
            onChangeText={(text) =>
              setVariables({ ...variables, full_name: text })
            }
          />
        </View>
        <View style={styles.inputView}>
          <TextInput
            style={styles.inputText}
            placeholder="Username..."
            placeholderTextColor="#003f5c"
            value={variables.userName}
            onChangeText={(text) =>
              setVariables({ ...variables, userName: text })
            }
          />
        </View>
        <View style={styles.inputView}>
          <TextInput
            style={styles.inputText}
            placeholder="Email..."
            placeholderTextColor="#003f5c"
            value={variables.email}
            onChangeText={(text) => setVariables({ ...variables, email: text })}
          />
        </View>
        <View style={styles.inputView}>
          <TextInput
            style={styles.inputText}
            placeholder="Image URL..."
            placeholderTextColor="#003f5c"
            value={variables.imageUrl}
            onChangeText={(text) =>
              setVariables({ ...variables, imageUrl: text })
            }
          />
        </View>
        <View style={styles.inputView}>
          <TextInput
            secureTextEntry
            style={styles.inputText}
            placeholder="Password..."
            placeholderTextColor="#003f5c"
            value={variables.password}
            onChangeText={(text) =>
              setVariables({ ...variables, password: text })
            }
          />
        </View>
        <TouchableOpacity style={styles.loginBtn} onPress={submitRegisterForm}>
          <Text style={styles.loginText}>Signup</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Text style={styles.loginText}>
            Already have an account? Log in here
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
