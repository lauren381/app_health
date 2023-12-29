import { View, Image, Pressable } from "react-native";
import React, { FC, useEffect, useState } from "react";
import { FlatList } from "react-native-gesture-handler";
import { StyledComponent } from "nativewind";
import CustomText from "../components/texts/CustomText";
import SuggestWorkout from "../components/SuggestWorkout";
import ListWorkout from "../components/ListWorkout";
import { api } from "../../apis";
import { CategoryType, RootStackParamList, WorkOutType } from "../types";
import { NavigationProp } from "@react-navigation/native";
import { DEFAULT_AVATAR, PADDING } from "../contants";
import { useAuth } from "../contexts/AuthContext";
import MyWorkout from "../components/MyWorkout";
import { useMyWorkout } from "../contexts/MyWorkoutContext";
import { SvgXml } from "react-native-svg";
import { logoutXML } from "../icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

type HomeScreenProps = { navigation: NavigationProp<RootStackParamList> };

const HomeScreen: FC<HomeScreenProps> = ({ navigation }) => {
  const { auth, setAuth } = useAuth();
  const { myWorkout } = useMyWorkout();
  console.log("log auth home screen ~ ", auth);
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [category, setCategory] = useState<CategoryType>();
  const [tabIndex, setTabIndex] = useState<number>(0);
  console.log("================================== ", tabIndex);
  console.log("select category ~ ", category);
  const [suggestWorkout, setSuggestWorkout] = useState<WorkOutType[]>([]);
  const [listWorkout, setListWorkout] = useState<WorkOutType[]>([]);
  useEffect(() => {
    (async () => {
      try {
        const resultSuggestWorkout = await api.get(
          `/workout/suggestworkout/${auth?.user_id}`
        );
        setSuggestWorkout(resultSuggestWorkout.data.data);
        console.log(resultSuggestWorkout.data, listWorkout);
      } catch (error) {
        console.log("error fetch data home screen - ", error);
      }
    })();
  }, []);
  useEffect(() => {
    (async () => {
      try {
        if (category) {
          const resultListWorkOut = await api.get(
            `/workout/getlistworkoutbycategory/${category.category_id}`
          );
          setListWorkout(resultListWorkOut.data.data);
        } else {
          const resultListWorkOut = await api.get(`/workout/getlistworkout`);
          setListWorkout(resultListWorkOut.data.data);
        }
      } catch (error) {
        console.log("error fetch data home screen - ", error);
      }
    })();
  }, [category]);
  useEffect(() => {
    (async () => {
      try {
        const result = await api.get<{ data: CategoryType[] }>(
          "/category/getlistcategory"
        );
        console.log("result data categories ~ ", result.data.data);
        setCategories(result.data.data);
      } catch (error) {
        console.log("error get categories ~ ", error);
      }
    })();
  }, []);
  if (auth)
    return (
      <StyledComponent component={View} className="bg-white flex-1">
        <View
          style={{
            elevation: 3,
            backgroundColor: "#fff",
            paddingHorizontal: PADDING,
          }}
        >
          <StyledComponent
            component={View}
            className="pt-4 pb-5 flex-row items-center space-x-3"
          >
            <StyledComponent
              onPress={() => navigation.navigate("Profile")}
              component={Pressable}
              className="px-2 py-2 flex-1 rounded-full flex-row items-center space-x-3"
              style={{ elevation: 3, backgroundColor: "#fff" }}
            >
              <StyledComponent
                component={Image}
                source={{
                  uri: auth?.image ? auth.image : DEFAULT_AVATAR,
                }}
                className="w-12 h-12 rounded-full object-cover bg-slate-500"
              />
              <StyledComponent component={View} className="flex-1">
                <CustomText fontFamily="Montserrat-Medium" classes="pb-1">
                  {auth.full_name} / {auth.weight}kg - {auth.height / 100}m
                </CustomText>
                <CustomText>
                  Your BMI is {auth.health_index.toFixed(2)}
                </CustomText>
              </StyledComponent>
            </StyledComponent>
            <StyledComponent
              onPress={async () => {
                await AsyncStorage.removeItem("auth");
                setAuth(undefined);
              }}
              component={Pressable}
              style={{ elevation: 3, backgroundColor: "#fff" }}
              className="w-12 h-12 rounded-full items-center justify-center"
            >
              <SvgXml xml={logoutXML} width={20} height={20} color={"#000"} />
            </StyledComponent>
          </StyledComponent>
        </View>
        <FlatList
          data={[]}
          keyExtractor={(_, index) => `${index}`}
          renderItem={() => <></>}
          contentContainerStyle={{ gap: 50 }}
          ListHeaderComponent={() =>
            myWorkout.length > 0 || suggestWorkout.length > 0 ? (
              <View style={{ gap: 50, paddingTop: PADDING }}>
                {myWorkout.length > 0 ? <MyWorkout data={myWorkout} /> : null}
                {suggestWorkout.length > 0 ? (
                  <SuggestWorkout data={suggestWorkout} />
                ) : null}
              </View>
            ) : null
          }
          ListFooterComponent={() => (
            <ListWorkout
              data={listWorkout}
              categories={categories}
              updateCategory={(category) => setCategory(category)}
              tabIndex={tabIndex}
              updateTabIndex={(index: number) => setTabIndex(index)}
            />
          )}
        />
      </StyledComponent>
    );
  return;
};

export default HomeScreen;
