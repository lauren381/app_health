import { Text } from "react-native";
import React, { FC } from "react";
import { TextComponentProps } from "../../types";
import { StyledComponent } from "nativewind";

const CustomText: FC<TextComponentProps> = ({
  classes,
  children,
  fontFamily = "Montserrat",
  textProps,
}) => {
  return (
    <StyledComponent
      {...textProps}
      component={Text}
      className={`text-sm text-black ${classes}`}
      style={{ fontFamily: fontFamily }}
    >
      {children}
    </StyledComponent>
  );
};

export default CustomText;
