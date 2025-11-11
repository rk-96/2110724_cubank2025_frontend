import axios from "axios";
import authHeader from "./auth-header";

const MAIN_URL_BACKEND = process.env.REACT_APP_MAIN_URL_BACKEND || "http://localhost:4000";
const API_URL = `${MAIN_URL_BACKEND}/api/v1/auth/`;

const register = (user) => {
  return axios.post(API_URL + "register", user);
};

const login = (accountId, password) => {
  return axios
    .post(API_URL + "login", {
      accountId,
      password,
    })
    .then((response) => {
      if (response.data.token) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }

      return response.data;
    });
};

const logout = () => {
  localStorage.removeItem("user");
  return axios.post(API_URL + "logout", { headers: authHeader() }).then((response) => {
    return response.data;
  });
};

const getCurrentUser = () => {
    let data = localStorage.getItem("user");
  return JSON.parse(data);
};

const AuthService = {
  register,
  login,
  logout,
  getCurrentUser,
};

export default AuthService;
