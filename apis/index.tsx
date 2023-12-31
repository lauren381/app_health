import axios from "axios";

export const BASE_USRL = "http://192.168.0.102:5000/api/v1";
export const api = axios.create({
  baseURL: BASE_USRL,
  headers: {
    "Content-Type": "application/json",
  },
});
