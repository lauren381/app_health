import dayjs from "dayjs";
import { Dimensions } from "react-native";

export const DEFAULT_IMAGE =
  "https://media.istockphoto.com/id/618982838/fr/photo/la-dentelle-pour-lentra%C3%AEnement-de-votre-vie.webp?b=1&s=170667a&w=0&k=20&c=GtQvkwmwYpQWnEHQsH3GSE9luI90fosvdu17HXB-USY=";
export const DEFAULT_AVATAR =
  "https://images.unsplash.com/photo-1682687220777-2c60708d6889?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
export const SCREEN_WIDTH = Dimensions.get("window").width;
export const SCREEN_HEIGHT = Dimensions.get("window").width;
export const PADDING = 20;
export const SEPARATOR = 30;
export const dayFormat = (date: Date) => dayjs(date).format("DD/MM/YYYY");
