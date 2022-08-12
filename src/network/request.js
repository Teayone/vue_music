import axios from "axios";
axios.defaults.withCredentials = true;
const baseURL =
  process.env.NODE_ENV === "production"
    ? "http://43.142.167.83:80"
    : "http://127.0.0.1:3000";
export function request(config) {
  const instance = axios.create({
    baseURL,
    timeout: 5000,
  });
  return instance(config);
}
