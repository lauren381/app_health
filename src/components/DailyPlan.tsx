import { Pressable, View } from "react-native";
import React, { FC, useEffect, useState } from "react";
import { StyledComponent } from "nativewind";
import CustomText from "./texts/CustomText";
import { DailyPlanDetailsType, RootStackParamList } from "../types";
import {
  NavigationProp,
  useIsFocused,
  useNavigation,
} from "@react-navigation/native";
import { api } from "../../apis";
import { useAuth } from "../contexts/AuthContext";
import { SvgXml } from "react-native-svg";
import { checkBadgeXML } from "../icons";

type DailyPlanProps = {
  data: DailyPlanDetailsType[];
  plan_id: number;
};

const DailyPlan: FC<DailyPlanProps> = ({ data, plan_id }) => {
  // console.log("data daily plan ~ ", data);
  const { auth } = useAuth();
  console.log("plan id - ", plan_id);
  const navigation =
    useNavigation<NavigationProp<RootStackParamList, "WorkOutDetail">>();
  const isFocused = useIsFocused();
  const [historyDay, setHistoryDay] = useState<
    { detail_id: number; day: number }[]
  >([]);
  useEffect(() => {
    (async () => {
      if (isFocused) {
        try {
          const result = await api.get(
            `/user/historyday/${auth?.user_id}/${plan_id}`
          );
          console.log("result history day - ", result.data.data);
          setHistoryDay(result.data.data);
        } catch (error) {
          console.log(error);
        }
      }
    })();
  }, [isFocused]);
  return (
    <StyledComponent component={View} className="space-y-2 pt-7">
      <CustomText fontFamily="Montserrat-SemiBold" classes="text-base px-5">
        Daily Plan
      </CustomText>
      <StyledComponent component={View} className="px-4">
        {data.map((item, index) => {
          const complete = historyDay.some(
            (i) => i.detail_id === item.detail_id
          );
          return (
            <StyledComponent
              key={index}
              component={Pressable}
              className="px-3 py-2 rounded-xl mx-1 mt-1 mb-3 flex-row items-start justify-between"
              style={{ backgroundColor: "#fff", elevation: 5 }}
              onPress={() =>
                navigation.navigate("DailyPlanDetail", {
                  daily_plan: item,
                  recent_day:
                    historyDay.length > 0
                      ? historyDay[historyDay.length - 1].day
                      : undefined,
                })
              }
            >
              <StyledComponent component={View}>
                <CustomText fontFamily="Montserrat-Medium">
                  Day {item.day} - {item.name}
                </CustomText>
                {/* <CustomText
                  textProps={{ numberOfLines: 1, ellipsizeMode: "middle" }}
                >
                  {item.description}
                </CustomText> */}
              </StyledComponent>
              {complete ? (
                <SvgXml
                  xml={checkBadgeXML}
                  width={24}
                  height={24}
                  color={"#000"}
                />
              ) : null}
            </StyledComponent>
          );
        })}
      </StyledComponent>
    </StyledComponent>
  );
};

export default DailyPlan;
