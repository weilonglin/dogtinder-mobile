import React from "react";
import { Route, Redirect } from "react-router-dom";

import { useAuthState } from "./context/auth";

export default function DynamicRoute(props) {
  const { user } = useAuthState();

  if (props.authenticated && !user) {
    props.navigation.navigate("Login");
  } else if (props.guest && user) {
    props.navigation.navigate("My profile");
  } else if (props.guest && user) {
    props.navigation.navigate("Home");
  } else {
    props.navigation.navigate("Home");
  }
}
