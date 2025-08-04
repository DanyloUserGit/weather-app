import axios from "axios";

export const userInstance = axios.create({
  baseURL: "https://randomuser.me/api/",
});
