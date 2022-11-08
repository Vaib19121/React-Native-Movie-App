import React from "react";
import { StatusBar } from "expo-status-bar";

const AppStatusbar = ({style, translucent, backgroundColor}) => {
  return (
    <StatusBar style={style} translucent={translucent} backgroundColor={backgroundColor} />
  );
}

export default AppStatusbar;