import { View, ScrollView, Pressable, Image } from "react-native";
import React, { FC, useState } from "react";
import { StyledComponent } from "nativewind";
import { NavigationProp } from "@react-navigation/native";
import { AuthType, RootStackParamList } from "../types";
import { SvgXml } from "react-native-svg";
import { arrowUturnLeftXML } from "../icons";
import CustomText from "../components/texts/CustomText";
import { useAuth } from "../contexts/AuthContext";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { api } from "../../apis";
import { TextInput } from "react-native-gesture-handler";
import { DEFAULT_AVATAR } from "../contants";

type DataProfile = {
  email?: string;
  phone_number?: string;
  height?: string;
  weight?: string;
};

type ProfileScreenProps = { navigation: NavigationProp<RootStackParamList> };

const schema = yup
  .object({
    email: yup.string().required("Email không được để trống"),
    phone_number: yup.string().required("Số điện thoại không được để trống"),
    height: yup.string().required("Chiều cao không được để trống"),
    weight: yup.string().required("Cân nặng không được để trống"),
    // image: yup.string().required("Mật khẩu không được để trống"),
  })
  .required();

const ProfileScreen: FC<ProfileScreenProps> = ({ navigation }) => {
  const { auth, setAuth } = useAuth();
  const [editable, setEditable] = useState<boolean>(false);
  const {
    control,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      email: auth?.email,
      height: String(auth?.height),
      weight: String(auth?.weight),
      phone_number: auth?.phone_number,
    },
  });
  console.log("errors - ", errors);
  const onSubmit = async (data: DataProfile) => {
    if (auth && editable) {
      console.log("data - ", data);
      try {
        const result = await api.post<{ data: AuthType }>("/user/updateuser", {
          user_id: auth?.user_id,
          ...data,
        });
        console.log("result data - ", result.data);
        setAuth(result.data.data);
        navigation.navigate("Home");
      } catch (error) {
        console.log("error signin - ", error);
        setError("email", { message: "Xảy ra lỗi trong quá trình xử lý" });
      }
    }
  };
  if (auth)
    return (
      <View style={{ backgroundColor: "#fff", flex: 1 }}>
        <StyledComponent
          component={View}
          className="px-5 py-5 items-center justify-between flex-row"
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
            onPress={() => setEditable(true)}
            component={Pressable}
          >
            <CustomText
              classes="text-base text-[#75b8ed]"
              fontFamily="Montserrat-Medium"
            >
              Edit Profile
            </CustomText>
          </StyledComponent>
        </StyledComponent>
        <StyledComponent component={View} className="items-center">
          <StyledComponent
            component={Image}
            source={{ uri: auth.image ? auth.image : DEFAULT_AVATAR }}
            className="w-32 h-32 rounded-full object-cover mb-3 mt-3 bg-slate-400"
          />
          <CustomText classes="text-lg" fontFamily="Montserrat-Medium">
            {auth.full_name}
          </CustomText>
          <CustomText classes="text-center w-3/4">{auth.message}</CustomText>
        </StyledComponent>
        <StyledComponent component={View} className="mt-12 space-y-4 px-5">
          <StyledComponent component={View} className="space-y-2">
            <CustomText
              fontFamily="Montserrat-Medium"
              classes={`text-sm ${editable ? "text-black" : "text-gray-300"}`}
            >
              Email
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
                    className={`border rounded-lg px-4 py-2 text-sm ${
                      editable ? "border-black" : "border-gray-300"
                    }`}
                    style={{ fontFamily: "Montserrat-Medium" }}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    editable={editable}
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
            <CustomText
              fontFamily="Montserrat-Medium"
              classes={editable ? "text-black" : "text-gray-300"}
            >
              Phone number
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
                    className={`border rounded-lg px-4 py-2 text-sm ${
                      editable ? "border-black" : "border-gray-300"
                    }`}
                    style={{ fontFamily: "Montserrat-Medium" }}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    editable={editable}
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
          <StyledComponent component={View} className="flex-row space-x-5">
            <StyledComponent component={View} className="space-y-2 flex-1">
              <CustomText
                fontFamily="Montserrat-Medium"
                classes={editable ? "text-black" : "text-gray-300"}
              >
                Weight
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
                      className={`border rounded-lg px-4 py-2 text-sm ${
                        editable ? "border-black" : "border-gray-300"
                      }`}
                      style={{ fontFamily: "Montserrat-Medium" }}
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                      keyboardType="numeric"
                      editable={editable}
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
              <CustomText
                fontFamily="Montserrat-Medium"
                classes={editable ? "text-black" : "text-gray-300"}
              >
                Height
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
                      className={`border rounded-lg px-4 py-2 text-sm ${
                        editable ? "border-black" : "border-gray-300"
                      }`}
                      style={{ fontFamily: "Montserrat-Medium" }}
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                      keyboardType="numeric"
                      editable={editable}
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
          <StyledComponent
            component={Pressable}
            className={`h-12 rounded-lg items-center justify-center ${
              editable ? "bg-black" : "bg-[#0000008e]"
            }`}
            onPress={handleSubmit(onSubmit)}
          >
            <CustomText fontFamily="Montserrat-SemiBold" classes="text-white">
              Update Profile
            </CustomText>
          </StyledComponent>
        </StyledComponent>
      </View>
    );
  return;
};

export default ProfileScreen;
