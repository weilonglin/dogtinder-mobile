import React, { useRef } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import { useQuery } from "@apollo/client";
import CardStack, { Card } from "react-native-card-stack-swiper";

import { GET_ALL_DOGS } from "../../graphql/queries";

export const Deck = () => {
  const { loading, error, data } = useQuery(GET_ALL_DOGS);
  console.log("dog data", data);
  const swiper = useRef(null);
  if (!data) {
    return (
      <View>
        <Text>...loading</Text>
      </View>
    );
  } else {
    return (
      <View style={styles.container}>
        <CardStack style={styles.content} ref={swiper}>
          {data.allDogs.map((dog) => {
            return (
              <Card style={[styles.card, styles.card1]} key={`dogs-{dog.id}`}>
                <Text style={styles.label}>A</Text>
              </Card>
            );
          })}
        </CardStack>
        <View style={styles.footer}>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.button, styles.red]}
              onPress={() => {
                this.swiper.swipeLeft();
              }}
            >
              <Image
                source={require("../../../assets/red.png")}
                resizeMode={"contain"}
                style={{ height: 62, width: 62 }}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.orange]}
              onPress={() => {
                this.swiper.goBackFromLeft();
              }}
            >
              <Image
                source={require("../../../assets/back.png")}
                resizeMode={"contain"}
                style={{ height: 32, width: 32, borderRadius: 5 }}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.green]}
              onPress={() => {
                this.swiper.swipeRight();
              }}
            >
              <Image
                source={require("../../../assets/green.png")}
                resizeMode={"contain"}
                style={{ height: 62, width: 62 }}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  card: {
    width: 320,
    height: 470,
    backgroundColor: "#FE474C",
    borderRadius: 5,
    shadowColor: "rgba(0,0,0,0.5)",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.5,
  },
  card1: {
    backgroundColor: "#FE474C",
  },
  card2: {
    backgroundColor: "#FEB12C",
  },
  label: {
    lineHeight: 400,
    textAlign: "center",
    fontSize: 55,
    fontFamily: "System",
    color: "#ffffff",
    backgroundColor: "transparent",
  },
  footer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonContainer: {
    width: 220,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  button: {
    shadowColor: "rgba(0,0,0,0.3)",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.5,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 0,
  },
  orange: {
    width: 55,
    height: 55,
    borderWidth: 6,
    borderColor: "rgb(246,190,66)",
    borderRadius: 55,
    marginTop: -15,
  },
  green: {
    width: 75,
    height: 75,
    backgroundColor: "#fff",
    borderRadius: 75,
    borderWidth: 6,
    borderColor: "#01df8a",
  },
  red: {
    width: 75,
    height: 75,
    backgroundColor: "#fff",
    borderRadius: 75,
    borderWidth: 6,
    borderColor: "#fd267d",
  },
});
