import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import Token from "./token";
import { ACCESS_TOKEN_KEY } from "../constants/token";
import { getLoginUser } from "../services/User";
import { QUERY_LOGIN_USER_KEY } from "../constants/query";
import { useGetUserPermission } from "../services/queries/userQuery";

const AuthContext = createContext();
const tokenManager = Token;

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [userToken, setUserToken] = useState(null);
  const [loginUser, setLoginUser] = useState(!!tokenManager.getCookie(QUERY_LOGIN_USER_KEY));
  const { data: userPermission } = useGetUserPermission()
  useEffect(() => {
    const tokenFromCookie = tokenManager.getToken(ACCESS_TOKEN_KEY);
    const userFromCookie = tokenManager.getCookie(QUERY_LOGIN_USER_KEY);
    try {
      if (tokenFromCookie && userFromCookie) {
        const parsedUser = JSON.parse(userFromCookie);
        const encodedUser = atobUser(parsedUser)
        setUserToken(tokenFromCookie);
        setLoginUser(encodedUser);
      } else {
        logout();
      }
    } catch (error) {
      console.error('Failed to parse user from cookie:', error);
      logout();
    }
    // eslint-disable-next-line
  }, [navigate]);
  const clearAllCookies = useCallback(
    () => {
      const cookies = document.cookie.split("; ");
      for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i];
        const eqPos = cookie.indexOf("=");
        const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
        document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`;
      }
    }, [])
  const btoaUser = useCallback(
    (user) => {
      const encodeInfo = {
        "id": user.id,
        "status": user.status,
        "dateOfBirth": user.dateOfBirth,
        "gender": user.gender,
        "email": user.email
      };
      const encodeUser = {
        name: user.name,
        permissionId: user.permissionId,
        info: btoa(JSON.stringify(encodeInfo))
      };
      return encodeUser
    }, [])
  const atobUser = useCallback((user) => {
    const decodedInfo = atob(user.info);
    const userInfo = JSON.parse(decodedInfo);
    return {
      name: user.name,
      permissionId: user.permissionId,
      ...userInfo,
    };
  }, []);
  const login = async (token, expiresIn) => {
    const expiryTime = dayjs().add(dayjs(expiresIn).locale('vn'), 'seconds').locale("vn");
    tokenManager.setToken(ACCESS_TOKEN_KEY, token, expiryTime.toDate());
    await getLoginUser(token).then(res => {
      const user = btoaUser(res.data)
      tokenManager.setCookie(QUERY_LOGIN_USER_KEY, JSON.stringify(user), expiryTime.toDate())
      setLoginUser(user)
    });
    setUserToken(token);
  };

  const logout = () => {
    navigate("/login", { replace: '/' });
    setUserToken(null); setLoginUser(null)
    clearAllCookies()
  };

  return (
    <AuthContext.Provider value={{ token: userToken, login, logout, loginUser, clearAllCookies }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;

export const useAuth = () => {
  return useContext(AuthContext)
}