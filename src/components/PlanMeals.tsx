import { View, Text, Image, FlatList } from "react-native";
import React, { FC } from "react";
import { StyledComponent } from "nativewind";
import CustomText from "./texts/CustomText";
import { PlanMealType } from "../types";
import { DEFAULT_IMAGE, PADDING, SCREEN_WIDTH } from "../contants";

type PlanMealsProps = { data: PlanMealType[] };

const PlanMeals: FC<PlanMealsProps> = ({ data }) => {
  return (
    <StyledComponent component={View} className="space-y-3 pt-7">
      <CustomText fontFamily="Montserrat-SemiBold" classes="text-base px-5">
        Plan Meals
      </CustomText>
      <FlatList
        style={{
          paddingHorizontal: data.length > 1 ? 0 : PADDING,
        }}
        data={data}
        keyExtractor={(item, index) => `${item.plan_id}-${index}`}
        renderItem={({ item }) => (
          <StyledComponent
            key={item.id}
            component={View}
            className="space-y-3"
            style={
              data.length > 1
                ? {
                    width: 0.70 * SCREEN_WIDTH,
                    paddingLeft: PADDING,
                  }
                : { width: SCREEN_WIDTH - 2 * PADDING }
            }
          >
            <StyledComponent
              component={Image}
              source={{
                uri: item.meal.image ? item.meal.image : DEFAULT_IMAGE,
              }}
              className="w-full h-[185] rounded-xl"
            />
            <StyledComponent component={View}>
              <CustomText>
                {item.meal.meal_name} -{" "}
                <CustomText fontFamily="Montserrat-Medium">
                  {item.meal.calories}Cal
                </CustomText>
              </CustomText>
              <CustomText>{item.meal.description}</CustomText>
            </StyledComponent>
          </StyledComponent>
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
    </StyledComponent>
  );
};

export default PlanMeals;
