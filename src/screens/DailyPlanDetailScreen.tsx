import { View, Pressable, Image, ScrollView, Alert } from "react-native";
import React, { FC, useEffect, useState } from "react";
import { NavigationProp, RouteProp } from "@react-navigation/native";
import { RootStackParamList } from "../types";
import { StyledComponent } from "nativewind";
import { arrowUturnLeftXML, playCircleXML } from "../icons";
import { SvgXml } from "react-native-svg";
import CustomText from "../components/texts/CustomText";
import { DEFAULT_IMAGE } from "../contants";
import { api } from "../../apis";
import { useAuth } from "../contexts/AuthContext";

type DailyPlanDetailScreenProps = {
  navigation: NavigationProp<RootStackParamList, "DailyPlanDetail">;
  route: RouteProp<RootStackParamList, "DailyPlanDetail">;
};

const DailyPlanDetailScreen: FC<DailyPlanDetailScreenProps> = ({
  navigation,
  route,
}) => {
  const { day, description, name, exercise, meal, detail_id } =
    route.params.daily_plan;
  const recent_day = route.params.recent_day;
  console.log("recent_day", recent_day);
  const { auth } = useAuth();
  const [error, setError] = useState<string>();
  console.log("excersie ----------------------- ", exercise);
  return (
    <StyledComponent component={ScrollView} className="flex-1 bg-white">
      <StyledComponent
        component={View}
        className="px-5 py-3 items-start justify-between flex-row z-10"
      >
        <StyledComponent
          onPress={() => navigation.goBack()}
          component={Pressable}
          className="w-9 h-9 rounded-full justify-center items-center"
          style={{ elevation: 3, backgroundColor: "#fff" }}
        >
          <SvgXml
            xml={arrowUturnLeftXML}
            width={20}
            height={20}
            color={"#000"}
          />
        </StyledComponent>
        <StyledComponent component={View} className="items-center w-3/4">
          <CustomText fontFamily="Montserrat-SemiBold" classes="text-base">
            Ngày {day} - {name}
          </CustomText>
          <CustomText fontFamily="Montserrat-Medium" classes="text-center">
            {description}
          </CustomText>
        </StyledComponent>
        <StyledComponent component={View} className="w-9 h-9" />
      </StyledComponent>
      {error ? (
        <CustomText classes="ml-5 text-[#d63031]">{error}</CustomText>
      ) : null}
      <StyledComponent component={View} className="px-5 pt-5 space-y-6">
        {exercise ? (
          <StyledComponent component={View} className="space-y-3">
            <CustomText fontFamily="Montserrat-SemiBold" classes="text-base">
              Bài tập
            </CustomText>
            <StyledComponent
              component={Pressable}
              className="space-y-3"
              onPress={() =>
                navigation.navigate("ExcerciseDetail", { excercise: exercise })
              }
            >
              <StyledComponent component={View}>
                <StyledComponent
                  component={View}
                  className="absolute z-10 inset-0 bg-[#0000007b] w-full h-full rounded-xl items-center justify-center"
                >
                  <SvgXml
                    xml={playCircleXML}
                    width={34}
                    height={34}
                    color={"#fff"}
                  />
                </StyledComponent>
                <StyledComponent
                  component={Image}
                  source={{
                    uri: exercise.image ? exercise.image : DEFAULT_IMAGE,
                  }}
                  className="w-full h-[210] rounded-xl"
                />
              </StyledComponent>
              <StyledComponent component={View}>
                <CustomText>{exercise.exercise_name}</CustomText>
                {/* <CustomText>{exercise.description}</CustomText> */}
              </StyledComponent>
            </StyledComponent>
          </StyledComponent>
        ) : null}
        {meal ? (
          <StyledComponent component={View} className="space-y-3">
            <CustomText fontFamily="Montserrat-SemiBold" classes="text-base">
              Thực đơn
            </CustomText>
            <StyledComponent component={View} className="space-y-3">
              <StyledComponent
                component={Image}
                source={{
                  uri: meal.image ? meal.image : DEFAULT_IMAGE,
                }}
                className="w-full h-[200] rounded-xl"
              />
              <StyledComponent component={View}>
                <CustomText fontFamily="Montserrat-SemiBold">
                  {meal.meal_name} -{" "}
                  <CustomText fontFamily="Montserrat-Medium">
                    {meal.calories}Cal
                  </CustomText>
                </CustomText>
                <CustomText>{meal.description}</CustomText>
              </StyledComponent>
            </StyledComponent>
          </StyledComponent>
        ) : null}
      </StyledComponent>
      <StyledComponent
        component={Pressable}
        className="mx-5 rounded-lg bg-black items-center h-11 justify-center my-5"
        onPress={async () => {
          if ((recent_day && day > recent_day) || (!recent_day && day === 1)) {
            if (recent_day === day - 1 || day === 1) {
              try {
                const result = await api.post(
                  "/dailycomplete/createdailycomplete",
                  { user_id: auth?.user_id, detail_id: detail_id }
                );
                console.log(
                  "/dailycomplete/createdailycomplete - ",
                  result.data.data
                );
                navigation.goBack();
              } catch (error) {
                console.log("error - ", error);
              }
            } else {
              Alert.alert(
                "Thông báo",
                "Bạn chưa hoàn thành bài tập ngày trước đó!",
                [{ text: "OK", onPress: () => console.log("OK Pressed") }]
              );
            }
          } else {
            console.log("error");
            Alert.alert("Thông báo", "Bạn đã hoàn thành!", [
              { text: "OK", onPress: () => console.log("OK Pressed") },
            ]);
          }
        }}
      >
        <CustomText classes="text-white" fontFamily="Montserrat-Medium">
          {recent_day && day <= recent_day ? "Đã hoàn thành" : "Hoàn thành"}
        </CustomText>
      </StyledComponent>
    </StyledComponent>
  );
};

export default DailyPlanDetailScreen;
