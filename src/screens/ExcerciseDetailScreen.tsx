import { View, Pressable } from "react-native";
import React, { FC } from "react";
import { StyledComponent } from "nativewind";
import { NavigationProp, RouteProp } from "@react-navigation/native";
import { RootStackParamList } from "../types";
import { SvgXml } from "react-native-svg";
import { arrowUturnLeftXML } from "../icons";
import CustomText from "../components/texts/CustomText";
import YoutubePlayer from "react-native-youtube-iframe";

type ExcerciseDetailScreenProps = {
  navigation: NavigationProp<RootStackParamList, "ExcerciseDetail">;
  route: RouteProp<RootStackParamList, "ExcerciseDetail">;
};
function getYoutubeVideoId(url: string) {
  // Biểu thức chính quy để tìm ID video trong URL YouTube
  var regExp =
    /^.*(?:youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#\&\?]*).*/;
  var match = url.match(regExp);

  // Nếu có khớp, trả về ID video; ngược lại, trả về null
  return match && match[1].length === 11 ? match[1] : null;
}

const ExcerciseDetailScreen: FC<ExcerciseDetailScreenProps> = ({
  navigation,
  route,
}) => {
  const exercise = route.params.excercise;
  const youtube_id = getYoutubeVideoId(exercise.video_url) || "abc";
  return (
    <StyledComponent component={View} className="flex-1 bg-white">
      <StyledComponent
        component={View}
        className="px-5 py-3 items-start justify-between flex-row z-10"
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
        <StyledComponent component={View} className="items-center w-3/4">
          <CustomText fontFamily="Montserrat-SemiBold" classes="text-base">
            {exercise.exercise_name}
          </CustomText>
          <CustomText fontFamily="Montserrat-Medium" classes="text-center">
            {exercise.description}
          </CustomText>
        </StyledComponent>
        <StyledComponent component={Pressable} className="w-9 h-9" />
      </StyledComponent>
      <StyledComponent component={View} className="flex-1 mt-10">
        <YoutubePlayer height={300} videoId={youtube_id} />
      </StyledComponent>
    </StyledComponent>
  );
};

export default ExcerciseDetailScreen;
