import { useState, type FC, type PropsWithChildren } from "react";
import { AuthContext } from "./AuthContext";

const USERNAME_KEY = "username";
const TOKEN_KEY = "token";

const getInitialToken = () => localStorage.getItem(TOKEN_KEY);

const getInitialUsername = () => localStorage.getItem(USERNAME_KEY);

const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
  const [token, setToken] = useState<string | null>(getInitialToken);

  const [username, setUsername] = useState<string | null>(getInitialUsername);

  const isAuthenticated = !!token;

  const login = (username: string, token: string) => {
    setToken(token);
    setUsername(username);

    localStorage.setItem(TOKEN_KEY, token);
    localStorage.setItem(USERNAME_KEY, username);
  };

  const logout = () => {
    setToken(null);
    setUsername(null);

    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USERNAME_KEY);
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        username,
        isAuthenticated,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
