import React, { useEffect, useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "../screens/LoginScreen";
import SignInScreen from "../screens/SignInScreen";
import HomeScreen from "../screens/HomeScreen";
import WorkOutDetailScreen from "../screens/WorkOutDetailScreen";
import { AuthType, RootStackParamList } from "../types";
import { useAuth } from "../contexts/AuthContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import LoadingScreen from "../screens/LoadingScreen";
import ProfileScreen from "../screens/ProfileScreen";
import DailyPlanDetailScreen from "../screens/DailyPlanDetailScreen";
import ExcerciseDetailScreen from "../screens/ExcerciseDetailScreen";

const Stack = createStackNavigator<RootStackParamList>();

const Navigator = () => {
  const { auth, setAuth } = useAuth();
  const [loading, setLoading] = useState<boolean>(true);
  console.log("auth - ", auth);
  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const jsonAuth = await AsyncStorage.getItem("auth");
        console.log(
          "auth AsyncStorage ~ ",
          jsonAuth ? JSON.parse(jsonAuth) : undefined
        );
        setAuth(jsonAuth ? (JSON.parse(jsonAuth) as AuthType) : undefined);
        setLoading(false);
      } catch (error) {
        console.log("error get auth AsyncStorage ~ ", error);
      }
    })();
  }, []);
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {!loading ? (
        <>
          {auth ? (
            <>
              <Stack.Screen name="Home" component={HomeScreen} />
              <Stack.Screen
                name="WorkOutDetail"
                component={WorkOutDetailScreen}
              />
              <Stack.Screen name="Profile" component={ProfileScreen} />
              <Stack.Screen
                name="DailyPlanDetail"
                component={DailyPlanDetailScreen}
              />
              <Stack.Screen
                name="ExcerciseDetail"
                component={ExcerciseDetailScreen}
              />
            </>
          ) : (
            <>
              <Stack.Screen name="LogIn" component={LoginScreen} />
              <Stack.Screen name="SignIn" component={SignInScreen} />
            </>
          )}
        </>
      ) : (
        <Stack.Screen name="Loading" component={LoadingScreen}></Stack.Screen>
      )}
    </Stack.Navigator>
  );
};

export default Navigator;
