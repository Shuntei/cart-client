import { JWT_LOGIN_POST } from "@/components/config/api-path";
import axios from "axios";

import React, {
  useState,
  createContext,
  useContext,
  ReactNode,
  useEffect,
} from "react";

interface AuthData {
  id: number;
  email: string;
  username: string;
  token: string;
}

interface Auth {
  success: boolean;
  error: string;
  code: number;
  data: AuthData;
}

type authContextType = {
  auth: Auth;
  login: (
    account: string | null,
    password: string | null
  ) => Promise<boolean | void>;
  logout: () => any;
  getAuthHeader: () => any;
};

const emptyAuthData: AuthData = {
  id: 0,
  email: "",
  username: "",
  token: "",
};

const emptyAuth: Auth = {
  success: false,
  error: "",
  code: 0,
  data: emptyAuthData,
};

const authContextDefaultValues: authContextType = {
  auth: emptyAuth,
  login: async () => {},
  logout: () => {},
  getAuthHeader: () => {},
};

const AuthContext = createContext<authContextType>(authContextDefaultValues);

const storageKey = "authKey";

type Props = {
  children: ReactNode;
};

export function AuthContextProvider({ children }: Props) {
  const [auth, setAuth] = useState(emptyAuth);

  const login = async (
    account: string | null,
    password: string | null
  ): Promise<boolean | void> => {
    try {
      const r = await axios.post(
        JWT_LOGIN_POST,
        {
          account,
          password,
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      console.log(r.data);
      if (r.data.success) {
        localStorage.setItem(storageKey, JSON.stringify(r.data));
        setAuth(r.data);

        return true;
      } else {
        return false;
      }
    } catch (e) {
      console.log(e);
    }
  };

  const logout = () => {
    localStorage.removeItem(storageKey);
    setAuth(emptyAuth);
  };

  const getAuthHeader = () => {
    if (auth.data.token) {
      return { Authorization: "Bearer" + auth.data.token };
    } else {
      return {};
    }
  };

  useEffect(() => {
    const str = localStorage.getItem(storageKey);
    try {
      const data = JSON.parse(str as string);
      setAuth(data);
    } catch (e) {
      console.log(e);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ auth, login, logout, getAuthHeader }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);

export default AuthContext;
