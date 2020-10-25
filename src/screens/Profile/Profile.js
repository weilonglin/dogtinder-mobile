import React, { useContext } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

import { AuthContext } from "../../context/Auth";

export const Profile = () => {
  const { signOut } = useContext(AuthContext);
  return (
    <View style={styles.container}>
      <Text>My profile</Text>
      <TouchableOpacity style={styles.loginBtn} onPress={() => signOut()}>
        <Text style={styles.loginText}>Sign out</Text>
      </TouchableOpacity>
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
});
