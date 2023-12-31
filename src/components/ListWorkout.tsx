import { View, FlatListProps, Pressable } from "react-native";
import React, { FC } from "react";
import { StyledComponent } from "nativewind";
import CustomText from "./texts/CustomText";
import { FlatList } from "react-native-gesture-handler";
import { PADDING, SCREEN_WIDTH, SEPARATOR } from "../contants";
import { CategoryType, WorkOutType } from "../types";
import WorkOutCard from "./WorkOutCard";
import Animated, {
  useAnimatedStyle,
  useDerivedValue,
  withTiming,
} from "react-native-reanimated";

type ListWorkoutProps = {
  data: WorkOutType[];
  flatListProps?: FlatListProps<WorkOutType>;
  updateCategory: (category: CategoryType | undefined) => void;
  categories: CategoryType[];
  tabIndex: number;
  updateTabIndex: (index: number) => void;
};

const ListWorkout: FC<ListWorkoutProps> = ({
  data,
  flatListProps,
  updateCategory,
  categories,
  tabIndex,
  updateTabIndex,
}) => {
  const TAB_WIDTH = (SCREEN_WIDTH - 2 * PADDING) / (categories.length + 1);
  const animatedIndex = useDerivedValue(() => {
    return tabIndex;
  });
  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: withTiming(animatedIndex.value * TAB_WIDTH) }],
    };
  });
  return (
    <StyledComponent component={View} className="space-y-3 px-5">
      <CustomText fontFamily="Montserrat-SemiBold" classes="text-lg uppercase">
        Danh sách kế hoạch
      </CustomText>
      {categories.length > 0 ? (
        <StyledComponent
          component={View}
          className="flex-row items-start justify-around mb-2"
        >
          <Animated.View
            style={[
              {
                width: TAB_WIDTH,
                height: 2,
                borderRadius: 2,
                backgroundColor: "#000",
                position: "absolute",
                bottom: 0,
              },
              animatedStyles,
            ]}
          />
          <Pressable
            onPress={() => {
              updateCategory(undefined);
              updateTabIndex(0);
            }}
            style={{
              width: TAB_WIDTH,
              paddingVertical: 5,
            }}
          >
            <CustomText fontFamily="Montserrat-Medium" classes="text-center">
              Tất cả
            </CustomText>
          </Pressable>
          {categories.map((item, index) => (
            <Pressable
              key={item.category_id}
              onPress={() => {
                updateCategory(item);
                updateTabIndex(index + 1);
              }}
              style={{
                width: TAB_WIDTH,
                paddingVertical: 10,
              }}
            >
              <CustomText fontFamily="Montserrat-Medium" classes="text-center">
                {item.category_name}
              </CustomText>
            </Pressable>
          ))}
        </StyledComponent>
      ) : null}
      <FlatList
        {...flatListProps}
        contentContainerStyle={{ paddingBottom: SEPARATOR }}
        data={data}
        keyExtractor={(item, index) => `${item.plan_id}-${index}`}
        renderItem={({ item }) => <WorkOutCard data={item} />}
        ItemSeparatorComponent={() => <View style={{ height: SEPARATOR }} />}
        showsVerticalScrollIndicator={false}
      />
    </StyledComponent>
  );
};

export default ListWorkout;
