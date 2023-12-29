import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  useCallback,
} from "react";
import { UserChooseWorkOutType } from "../types";
import { useAuth } from "./AuthContext";
import { api } from "../../apis";

type MyWorkoutContextType = {
  myWorkout: UserChooseWorkOutType[] | [];
  updateData: () => void;
};

const MyWorkoutContext = createContext<MyWorkoutContextType | undefined>(
  undefined
);

const MyWorkoutProvider = ({ children }: { children: React.ReactNode }) => {
  const { auth } = useAuth();
  const [myWorkout, setMyWorkout] = useState<UserChooseWorkOutType[]>([]);
  useEffect(() => {
    updateData();
  }, [auth]);
  const updateData = async () => {
    if (auth?.user_id) {
      try {
        const result = await api.get<{ data: UserChooseWorkOutType[] }>(
          `/user/history/${auth?.user_id}`
        );
        setMyWorkout(result.data.data);
        console.log("==================================", result.data.data);
      } catch (error) {
        console.log("error fetch my workout ~ ", error);
      }
    }
  };
  return (
    <MyWorkoutContext.Provider value={{ myWorkout, updateData }}>
      {children}
    </MyWorkoutContext.Provider>
  );
};

const useMyWorkout = () => {
  const context = useContext(MyWorkoutContext);
  if (context === undefined)
    throw new Error("useMyWorkout must be used within a MyWorkoutProvider");
  return context;
};

export { useMyWorkout, MyWorkoutProvider };
