import { View } from "react-native";
import React, { FC } from "react";
import { StyledComponent } from "nativewind";
import CustomText from "./texts/CustomText";
import { FlatList } from "react-native-gesture-handler";
import { PADDING } from "../contants";
import { WorkOutType } from "../types";
import WorkOutCard from "./WorkOutCard";

type SuggestWorkoutProps = {
  data: WorkOutType[];
};

const SuggestWorkout: FC<SuggestWorkoutProps> = ({ data }) => {
  return (
    <StyledComponent component={View} className="space-y-5">
      <CustomText
        fontFamily="Montserrat-SemiBold"
        classes="text-lg uppercase mx-5"
      >
        Suggest Workout
      </CustomText>
      <FlatList
        contentContainerStyle={{
          paddingHorizontal: data.length > 1 ? 0 : PADDING,
        }}
        data={data}
        keyExtractor={(item, index) => `${item.plan_id}-${index}`}
        renderItem={({ item }) => (
          <WorkOutCard data={item} horizontal={data.length > 1} />
        )}
        pagingEnabled={data.length > 1}
        horizontal={data.length > 1}
        showsHorizontalScrollIndicator={false}
        snapToAlignment="start"
        snapToStart
        ListFooterComponent={() => <View style={{ width: PADDING }} />}
        bounces={false}
        overScrollMode="never"
        decelerationRate={"fast"}
      />
    </StyledComponent>
  );
};

export default SuggestWorkout;
