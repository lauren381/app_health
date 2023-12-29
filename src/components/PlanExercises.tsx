import { View, Text, Image, FlatList } from "react-native";
import React, { FC } from "react";
import { StyledComponent } from "nativewind";
import CustomText from "./texts/CustomText";
import { DEFAULT_IMAGE, PADDING, SCREEN_WIDTH } from "../contants";
import { SvgXml } from "react-native-svg";
import { playCircleXML } from "../icons";
import { PlanExerciseType } from "../types";
import PlanExercisesCard from "./PlanExercisesCard";

type PlanExercisesProps = {
  data: PlanExerciseType[];
};

const PlanExercises: FC<PlanExercisesProps> = ({ data }) => {
  return (
    <StyledComponent component={View} className="space-y-3 pt-7">
      <CustomText fontFamily="Montserrat-SemiBold" classes="text-base px-5">
        Plan Exercises
      </CustomText>
      <FlatList
        style={{
          paddingHorizontal: data.length > 1 ? 0 : PADDING,
        }}
        data={data}
        keyExtractor={(item, index) => `${item.plan_id}-${index}`}
        renderItem={({ item }) => (
          <PlanExercisesCard data={item} horizontal={data.length > 1} />
        )}
        pagingEnabled={data.length > 1}
        horizontal
        showsHorizontalScrollIndicator={false}
        snapToAlignment="start"
        snapToStart
        overScrollMode="never"
        bounces={false}
        ListFooterComponent={() => <View style={{ width: PADDING }} />}
        // decelerationRate={"fast"}
      />
      {/* <StyledComponent component={View} className="space-y-7">
        {data.map((item) => (
          <View key={item.id}>
            <PlanExercisesCard data={item} />
          </View>
        ))}
      </StyledComponent> */}
    </StyledComponent>
  );
};

export default PlanExercises;
