import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import token from "./token";
import { ACCESS_TOKEN_KEY } from "../constants/token";

const AuthContext = createContext();
const tokenManager = token;

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [userToken, setUserToken] = useState(null);

  useEffect(() => {
    const tokenFromStorage = tokenManager.getToken(ACCESS_TOKEN_KEY);
    const expiryTime = localStorage.getItem("expiryTime");
    if (tokenFromStorage && expiryTime && dayjs(expiryTime).isAfter(dayjs())) {
      setUserToken(tokenFromStorage);
    } else {
      logout();
    }
  }, [navigate]);

  const login = (token, expiresIn) => {
    const expiryTime = dayjs(expiresIn);
    console.log(dayjs(expiryTime).isAfter(dayjs()));

    tokenManager.setToken(ACCESS_TOKEN_KEY, token);
    localStorage.setItem("expiryTime", expiryTime.toISOString());
    setUserToken(token);
  };

  const logout = () => {
    tokenManager.removeToken(ACCESS_TOKEN_KEY);
    localStorage.removeItem("expiryTime");
    navigate("/login");
    setUserToken(null);
  };

  return (
    <AuthContext.Provider value={{ token: userToken, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
