import { View, Text, Pressable, Image } from "react-native";
import React, { FC, useEffect, useState } from "react";
import { NavigationProp, RouteProp } from "@react-navigation/native";
import {
  RootStackParamList,
  UserChooseWorkOutType,
  WorkOutType,
} from "../types";
import { ScrollView } from "react-native-gesture-handler";
import { DEFAULT_IMAGE, PADDING, dayFormat } from "../contants";
import { SvgXml } from "react-native-svg";
import { arrowUturnLeftXML, clockXML, heartSolidXML, heartXML } from "../icons";
import { StyledComponent } from "nativewind";
import { api } from "../../apis";
import CustomText from "../components/texts/CustomText";
import PlanExercises from "../components/PlanExercises";
import PlanMeals from "../components/PlanMeals";
import { useMyWorkout } from "../contexts/MyWorkoutContext";
import { useAuth } from "../contexts/AuthContext";
import DailyPlan from "../components/DailyPlan";

type WorkOutDetailScreenProps = {
  navigation: NavigationProp<RootStackParamList, "WorkOutDetail">;
  route: RouteProp<RootStackParamList, "WorkOutDetail">;
};

const WorkOutDetailScreen: FC<WorkOutDetailScreenProps> = ({
  navigation,
  route,
}) => {
  const workoutId = route.params?.work_out_id;
  console.log("work out id ~ ", workoutId);
  const { auth } = useAuth();
  const { myWorkout, updateData } = useMyWorkout();
  const [workout, setWorkout] = useState<WorkOutType>();
  const [userChooseWorkout, setUserChooseWorkout] = useState<boolean>(false);
  const [selectionId, setSelectionId] = useState<string>();
  console.log("user choose wworkout ~ ", userChooseWorkout);
  useEffect(() => {
    (async () => {
      try {
        const resultWorkout = await api.get(
          `/workout/getworkoutbyid/${workoutId}`
        );
        console.log("result data workout detail ~ ", resultWorkout.data.data);
        console.log("result data user choose workout detail ~ ", myWorkout);
        setWorkout(resultWorkout.data.data);
        setUserChooseWorkout(
          myWorkout.some((item) => item.plan_id === workoutId)
        );
        setSelectionId(
          myWorkout.find((item) => item.plan_id === workoutId)?.selection_id
        );
      } catch (error) {
        console.log("error fetch data workout detail ~ ", error);
      }
    })();
  }, []);
  const createUserChooseWorkout = async () => {
    if (auth?.user_id) {
      try {
        const result = await api.post<{
          data: { plan_id: number; selection_id: string };
        }>("/selectworkout/createchooseworkout", {
          user_id: auth.user_id,
          plan_id: workoutId,
        });
        console.log("result create choose workout ~ ", result.data.data);
        if (result.data.data.plan_id === workoutId) {
          setSelectionId(result.data.data.selection_id);
          setUserChooseWorkout(true);
          updateData();
        }
      } catch (error) {
        console.log("error create choose workout ~ ", error);
      }
    }
  };
  const deleteUserChooseWorkout = async () => {
    try {
      if (auth?.user_id && selectionId) {
        const result = await api.delete(
          `/selectworkout/deletechooseworkout/${selectionId}/${auth.user_id}`
        );
        console.log(result.data);
        setUserChooseWorkout(false);
        updateData();
      }
    } catch (error) {
      console.log("error delete choose workout ~ ", error);
    }
  };
  if (workout)
    return (
      <View style={{ backgroundColor: "#fff", flex: 1 }}>
        <ScrollView>
          <StyledComponent
            component={View}
            className="absolute top-5 right-0 left-0 px-5 items-center justify-between flex-row z-10"
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
            <StyledComponent
              onPress={() =>
                userChooseWorkout
                  ? deleteUserChooseWorkout()
                  : createUserChooseWorkout()
              }
              component={Pressable}
              className="w-9 h-9 rounded-full justify-center items-center"
              style={{ elevation: 3, backgroundColor: "#fff" }}
            >
              {userChooseWorkout ? (
                <SvgXml
                  xml={heartSolidXML}
                  width={20}
                  height={20}
                  color={"#e74c3c"}
                />
              ) : (
                <SvgXml xml={heartXML} width={20} height={20} color={"#000"} />
              )}
            </StyledComponent>
          </StyledComponent>
          <StyledComponent
            component={Image}
            source={{ uri: workout.image ? workout.image : DEFAULT_IMAGE }}
            className="w-full h-[250] object-cover"
          />
          <StyledComponent component={View} className="py-4">
            <StyledComponent component={View} className="px-5">
              {workout.plan_name ? (
                <CustomText fontFamily="Montserrat-SemiBold">
                  {workout.plan_name}
                </CustomText>
              ) : null}
              <StyledComponent
                component={View}
                className="items-center flex-row"
              >
                <SvgXml xml={clockXML} width={16} height={16} color={"#000"} />
                <CustomText classes="ml-1">
                  Total time: {workout.total_time} day
                </CustomText>
              </StyledComponent>
              <CustomText>
                <CustomText fontFamily="Montserrat-Medium">Goal:</CustomText>{" "}
                {workout.goal}
              </CustomText>
              <CustomText>
                <CustomText fontFamily="Montserrat-Medium">
                  Fitness level:
                </CustomText>{" "}
                {workout.fitness_level}
              </CustomText>
            </StyledComponent>
            {workout.DailyPlanDetails.length > 0 ? (
              <DailyPlan data={workout.DailyPlanDetails} />
            ) : null}
            {/* {workout.PlanExercises.length > 0 ? (
              <PlanExercises data={workout.PlanExercises} />
            ) : null}
            {workout.PlanMeals.length > 0 ? (
              <PlanMeals data={workout.PlanMeals} />
            ) : null} */}
          </StyledComponent>
        </ScrollView>
      </View>
    );
  return;
};

export default WorkOutDetailScreen;
