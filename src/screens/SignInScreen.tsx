import {
  View,
  ImageBackground,
  TextInput,
  Pressable,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import React, { FC } from "react";
import { StyledComponent } from "nativewind";
import CustomText from "../components/texts/CustomText";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { api } from "../../apis";
import { NavigationProp } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAuth } from "../contexts/AuthContext";

type SignInScreenProps = { navigation: NavigationProp<any> };
type DataLogin = {
  full_name: string;
  email: string;
  password: string;
  phone_number: string;
  height: string;
  weight: string;
};

const schema = yup
  .object({
    full_name: yup.string().required("Username is required"),
    email: yup.string().required("Email is required"),
    password: yup.string().required("Password is required"),
    phone_number: yup.string().required("Phone number is required"),
    height: yup.string().required("Height is required"),
    weight: yup.string().required("Weight is required"),
    // image: yup.string().required("Mật khẩu không được để trống"),
  })
  .required();
const SignInScreen: FC<SignInScreenProps> = ({ navigation }) => {
  const { setAuth } = useAuth();
  const {
    control,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm({
    resolver: yupResolver(schema),
  });
  console.log("errors - ", errors);
  const onSubmit = async (data: DataLogin) => {
    console.log("data - ", data);
    try {
      const result = await api.post("/user/createuser", data);
      console.log("result data - ", result.data);
      await AsyncStorage.setItem("auth", JSON.stringify(result.data.data));
      setAuth(result.data.data);
      navigation.navigate("Home");
    } catch (error) {
      console.log("error signin - ", error);
      setError("email", { message: "Email is registered" });
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
      <StyledComponent component={View} className="flex-1 px-5 pt-10">
        <CustomText fontFamily="Montserrat-Medium" classes="text-2xl">
          Đăng ký
        </CustomText>
        <StyledComponent component={View} className="mt-7 space-y-3">
          <StyledComponent component={View} className="space-y-2">
            <CustomText fontFamily="Montserrat-Medium">
              Tên người dùng
            </CustomText>
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
                name="full_name"
              />
              {errors.full_name ? (
                <CustomText classes="text-[#ff7675] text-sm">
                  {errors.full_name.message}
                </CustomText>
              ) : null}
            </View>
          </StyledComponent>
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
            <StyledComponent component={View} className="space-y-2">
              <CustomText fontFamily="Montserrat-Medium">
                Số điện thoại
              </CustomText>
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
                  name="phone_number"
                />
                {errors.phone_number ? (
                  <CustomText classes="text-[#ff7675] text-sm">
                    {errors.phone_number.message}
                  </CustomText>
                ) : null}
              </View>
            </StyledComponent>
          </StyledComponent>
          <StyledComponent component={View} className="flex-row space-x-5">
            <StyledComponent component={View} className="space-y-2 flex-1">
              <CustomText fontFamily="Montserrat-Medium">Cân nặng</CustomText>
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
                      keyboardType="numeric"
                    />
                  )}
                  name="weight"
                />
                {errors.weight ? (
                  <CustomText classes="text-[#ff7675] text-sm">
                    {errors.weight.message}
                  </CustomText>
                ) : null}
              </View>
            </StyledComponent>
            <StyledComponent component={View} className="space-y-2 flex-1">
              <CustomText fontFamily="Montserrat-Medium">Chiều cao</CustomText>
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
                      keyboardType="numeric"
                    />
                  )}
                  name="height"
                />
                {errors.height ? (
                  <CustomText classes="text-[#ff7675] text-sm">
                    {errors.height.message}
                  </CustomText>
                ) : null}
              </View>
            </StyledComponent>
          </StyledComponent>
          <StyledComponent component={View} className="space-y-2">
            <CustomText fontFamily="Montserrat-Medium">Mật khẩu</CustomText>
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
            Đăng ký
          </CustomText>
        </StyledComponent>
        <CustomText classes="text-center pt-7">
          Bạn đã có tài khoản?{" "}
          <CustomText
            textProps={{ onPress: () => navigation.navigate("LogIn") }}
            classes="underline"
            fontFamily="Montserrat-Medium"
          >
            Đăng nhập
          </CustomText>
        </CustomText>
      </StyledComponent>
    </StyledComponent>
  );
};

export default SignInScreen;
