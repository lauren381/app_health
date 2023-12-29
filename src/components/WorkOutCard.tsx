import { View, Image, Pressable } from "react-native";
import React, { FC } from "react";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList, WorkOutType } from "../types";
import { StyledComponent } from "nativewind";
import { DEFAULT_IMAGE, PADDING, SCREEN_WIDTH, dayFormat } from "../contants";
import CustomText from "./texts/CustomText";

type WorkOutCardProps = { data: WorkOutType; horizontal?: boolean };

const WorkOutCard: FC<WorkOutCardProps> = ({ data, horizontal = false }) => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  return (
    <StyledComponent
      onPress={() =>
        navigation.navigate("WorkOutDetail", { work_out_id: data.plan_id })
      }
      component={Pressable}
      className={`space-y-3`}
      style={
        horizontal
          ? {
              width: 0.7 * SCREEN_WIDTH,
              paddingLeft: PADDING,
            }
          : undefined
      }
    >
      <StyledComponent
        component={Image}
        source={{
          uri: data.image ? data.image : DEFAULT_IMAGE,
        }}
        className="w-full rounded-xl object-cover"
        style={{ height: horizontal ? 150 : 250 }}
      />
      <StyledComponent component={View}>
        {data.plan_name ? (
          <CustomText fontFamily="Montserrat-SemiBold">
            {data.plan_name}
          </CustomText>
        ) : null}
        <CustomText>Goal: {data.goal}</CustomText>
        <CustomText>Fitness level: {data.fitness_level}</CustomText>
        <CustomText>Total time: {data.total_time} day</CustomText>
      </StyledComponent>
    </StyledComponent>
  );
};

export default WorkOutCard;
