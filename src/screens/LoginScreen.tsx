import { View, ImageBackground, TextInput, Pressable } from "react-native";
import React, { FC } from "react";
import { StyledComponent } from "nativewind";
import CustomText from "../components/texts/CustomText";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { api } from "../../apis";
import { NavigationProp } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthType } from "../types";
import { useAuth } from "../contexts/AuthContext";

type LoginScreenProps = { navigation: NavigationProp<any> };
type DataLogin = { email: string; password: string };

const schema = yup
  .object({
    email: yup.string().required("Email is required"),
    password: yup.string().required("Password is required"),
  })
  .required();
const LoginScreen: FC<LoginScreenProps> = ({ navigation }) => {
  const { setAuth } = useAuth();
  const {
    control,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  console.log("errors - ", errors);
  const onSubmit = async (data: DataLogin) => {
    console.log("data - ", data);
    try {
      const result = await api.post<{ data: AuthType }>("/user/login", data);
      console.log("result data - ", result.data);
      if (result.data.data.status === "active") {
        await AsyncStorage.setItem("auth", JSON.stringify(result.data.data));
        setAuth(result.data.data);
        navigation.navigate("Home");
      }
      setError("password", { message: "Your account is deleted" });
    } catch (error) {
      console.log("error login - ", error);
      setError("password", { message: "Email or Password is wrong" });
    }
  };
  return (
    <StyledComponent
      component={ImageBackground}
      className="flex-1"
      source={require("../../assets/images/bg-login.jpg")}
    >
      <StyledComponent
        component={View}
        className="absolute inset-0 bg-[#ffffffda] w-full h-full"
      />
      <StyledComponent component={View} className="flex-1 px-5 pt-28">
        <CustomText fontFamily="Montserrat-Medium" classes="text-2xl">
          Login
        </CustomText>
        <StyledComponent component={View} className="mt-14 space-y-5">
          <StyledComponent component={View} className="space-y-2">
            <CustomText fontFamily="Montserrat-Medium">Email</CustomText>
            <View>
              <Controller
                control={control}
                rules={{
                  maxLength: 100,
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <StyledComponent
                    component={TextInput}
                    className="border border-black rounded-lg px-5 py-2 text-base"
                    style={{ fontFamily: "Montserrat-Medium" }}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                  />
                )}
                name="email"
              />
              {errors.email ? (
                <CustomText classes="text-[#ff7675] text-sm">
                  {errors.email.message}
                </CustomText>
              ) : null}
            </View>
          </StyledComponent>
          <StyledComponent component={View} className="space-y-2">
            <CustomText fontFamily="Montserrat-Medium">Password</CustomText>
            <View>
              <Controller
                control={control}
                rules={{
                  maxLength: 100,
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <StyledComponent
                    component={TextInput}
                    className="border border-black rounded-lg px-5 py-2 text-base"
                    style={{ fontFamily: "Montserrat-Medium" }}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    secureTextEntry
                  />
                )}
                name="password"
              />
              {errors.password ? (
                <CustomText classes="text-[#ff7675] text-sm">
                  {errors.password.message}
                </CustomText>
              ) : null}
            </View>
          </StyledComponent>
        </StyledComponent>
        <StyledComponent
          component={Pressable}
          className="h-12 bg-black rounded-lg items-center justify-center mt-8"
          onPress={handleSubmit(onSubmit)}
        >
          <CustomText fontFamily="Montserrat-SemiBold" classes="text-white">
            Login
          </CustomText>
        </StyledComponent>
        <CustomText classes="text-center pt-7">
          Donot you have an account?{" "}
          <CustomText
            textProps={{ onPress: () => navigation.navigate("SignIn") }}
            classes="underline"
            fontFamily="Montserrat-Medium"
          >
            Sign Up
          </CustomText>
        </CustomText>
      </StyledComponent>
    </StyledComponent>
  );
};

export default LoginScreen;
