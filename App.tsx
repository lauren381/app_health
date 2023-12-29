import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import Navigator from "./src/navigation/Navigator";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useCallback } from "react";
import { AuthProvider } from "./src/contexts/AuthContext";
import { MyWorkoutProvider } from "./src/contexts/MyWorkoutContext";

SplashScreen.preventAutoHideAsync();
export default function App() {
  const [fontsLoaded] = useFonts({
    Montserrat: require("./assets/fonts/Montserrat-Regular.ttf"),
    "Montserrat-Medium": require("./assets/fonts/Montserrat-Medium.ttf"),
    "Montserrat-SemiBold": require("./assets/fonts/Montserrat-SemiBold.ttf"),
    "Montserrat-Bold": require("./assets/fonts/Montserrat-Bold.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }
  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: "#fff" }}
      onLayout={onLayoutRootView}
    >
      <NavigationContainer>
        <AuthProvider>
          <MyWorkoutProvider>
            <Navigator />
          </MyWorkoutProvider>
        </AuthProvider>
      </NavigationContainer>
    </SafeAreaView>
  );
}
