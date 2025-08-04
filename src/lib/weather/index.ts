import axios from "axios";

export const weatherInstance = axios.create({
  baseURL: "/api/weather",
});
