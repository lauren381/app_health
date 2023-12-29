import { View, Text } from "react-native";
import React from "react";
import { StyledComponent } from "nativewind";

const LoadingScreen = () => {
  return (
    <StyledComponent
      component={View}
      className="flex-1 bg-white"
    ></StyledComponent>
  );
};

export default LoadingScreen;
