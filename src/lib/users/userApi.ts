import axios from "axios";

export const userApiInstance = axios.create({
  baseURL: "/api/users/",
  headers: {
    "Content-Type": "application/json",
  },
});
