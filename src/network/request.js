import axios from "axios";
axios.defaults.withCredentials = true;
const baseURL =
  process.env.NODE_ENV === "production"
    ? "https://music-api-teayone.vercel.app/"
    : "http://127.0.0.1:3000";
export function request(config) {
  const instance = axios.create({
    baseURL,
    timeout: 5000,
  });
  return instance(config);
}
