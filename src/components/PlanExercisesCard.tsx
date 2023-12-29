import { View, Image, Pressable } from "react-native";
import React, { FC } from "react";
import { StyledComponent } from "nativewind";
import CustomText from "./texts/CustomText";
import { DEFAULT_IMAGE, PADDING, SCREEN_WIDTH } from "../contants";
import { playCircleXML } from "../icons";
import { SvgXml } from "react-native-svg";
import { PlanExerciseType, RootStackParamList } from "../types";
import { NavigationProp, useNavigation } from "@react-navigation/native";

type PlanExercisesCard = { data: PlanExerciseType; horizontal: boolean };

const PlanExercisesCard: FC<PlanExercisesCard> = ({ data, horizontal }) => {
  const navigation =
    useNavigation<NavigationProp<RootStackParamList, "WorkOutDetail">>();
  return (
    <StyledComponent
      component={View}
      className="space-y-3"
      style={
        horizontal
          ? {
              width: 0.7 * SCREEN_WIDTH,
              paddingLeft: PADDING,
            }
          : { width: SCREEN_WIDTH - 2 * PADDING }
      }
    >
      <StyledComponent
        component={Pressable}
        onPress={() =>
          navigation.navigate("ExcerciseDetail", { excercise: data.exercise })
        }
      >
        <StyledComponent
          component={View}
          className="absolute z-10 inset-0 bg-[#0000007b] w-full h-full rounded-xl items-center justify-center"
        >
          <SvgXml xml={playCircleXML} width={34} height={34} color={"#fff"} />
        </StyledComponent>
        <StyledComponent
          component={Image}
          source={{
            uri: data.exercise.image ? data.exercise.image : DEFAULT_IMAGE,
          }}
          className="w-full rounded-xl"
          style={{ height: horizontal ? 150 : 240 }}
        />
      </StyledComponent>
      <StyledComponent component={View}>
        <CustomText>{data.exercise.exercise_name}</CustomText>
        <CustomText>{data.exercise.description}</CustomText>
      </StyledComponent>
    </StyledComponent>
  );
};

export default PlanExercisesCard;
