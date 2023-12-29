import { Pressable, View } from "react-native";
import React, { FC } from "react";
import { StyledComponent } from "nativewind";
import CustomText from "./texts/CustomText";
import { DailyPlanDetailsType, RootStackParamList } from "../types";
import { NavigationProp, useNavigation } from "@react-navigation/native";

type DailyPlanProps = {
  data: DailyPlanDetailsType[];
};

const DailyPlan: FC<DailyPlanProps> = ({ data }) => {
  console.log("data daily plan ~ ", data);
  const navigation =
    useNavigation<NavigationProp<RootStackParamList, "WorkOutDetail">>();
  return (
    <StyledComponent component={View} className="space-y-2 pt-7">
      <CustomText fontFamily="Montserrat-SemiBold" classes="text-base px-5">
        Daily Plan
      </CustomText>
      <StyledComponent component={View} className="px-4">
        {data.map((item, index) => (
          <StyledComponent
            key={index}
            component={Pressable}
            className="px-3 py-2 rounded-xl mx-1 mt-1 mb-3"
            style={{ backgroundColor: "#fff", elevation: 5 }}
            onPress={() =>
              navigation.navigate("DailyPlanDetail", { daily_plan: item })
            }
          >
            <CustomText fontFamily="Montserrat-Medium">
              Day {item.day} - {item.name}
            </CustomText>
            <CustomText
              textProps={{ numberOfLines: 1, ellipsizeMode: "middle" }}
            >
              {item.description}
            </CustomText>
          </StyledComponent>
        ))}
      </StyledComponent>
    </StyledComponent>
  );
};

export default DailyPlan;
