import { TextProps } from "react-native";

export type RootStackParamList = {
  Loading: undefined;
  LogIn: undefined;
  SignIn: undefined;
  Home: undefined;
  WorkOutDetail: { work_out_id: number };
  Profile: undefined;
  DailyPlanDetail: { daily_plan: DailyPlanDetailsType };
  ExcerciseDetail: { excercise: ExerciseType };
};

export type TextComponentProps = {
  classes?: string | undefined;
  children: React.ReactNode;
  fontFamily?:
    | "Montserrat"
    | "Montserrat-Medium"
    | "Montserrat-SemiBold"
    | "Montserrat-Bold";
  textProps?: TextProps;
};

export type AuthType = {
  user_id: string;
  full_name: string;
  email: string;
  password: string;
  phone_number: string;
  height: number;
  weight: number;
  health_index: number;
  message: string;
  image: string;
  status: "active" | "banned";
};

export type ExerciseType = {
  exercise_id: number;
  exercise_name: string;
  description: string;
  video_url: string;
  image: string;
};

export type PlanExerciseType = {
  id: number;
  plan_id: number;
  exercise_id: number;
  exercise: ExerciseType;
};

export type MealType = {
  meal_id: number;
  meal_name: string;
  description: string;
  calories: number;
  image: string;
};

export type PlanMealType = {
  id: 2;
  plan_id: "1";
  meal_id: "2";
  meal: MealType;
};

export type DailyPlanDetailsType = {
  detail_id: number;
  plan_id: number;
  name: string;
  description: string;
  exercise_id: number;
  meal_id: number;
  day: number;
  exercise: ExerciseType;
  meal: MealType;
};

export type WorkOutType = {
  plan_id: number;
  goal: string;
  total_time: number;
  fitness_level: string;
  category_id: number;
  plan_name: string | null;
  image: string | null;
  PlanExercises: PlanExerciseType[];
  PlanMeals: PlanMealType[];
  DailyPlanDetails: DailyPlanDetailsType[];
};

export type UserChooseWorkOutType = {
  selection_id: string;
  user_id: string;
  plan_id: number;
  workout_date: Date;
  plan: WorkOutType;
};

export type CategoryType = {
  category_id: number;
  category_name: string;
  description: string;
  image: string;
};
