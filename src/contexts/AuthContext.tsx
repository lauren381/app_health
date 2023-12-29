import React, { createContext, useState, useContext } from "react";
import { AuthType } from "../types";

type AuthContextType = {
  auth: AuthType | undefined;
  setAuth: React.Dispatch<React.SetStateAction<AuthType | undefined>>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [auth, setAuth] = useState<AuthType>();

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined)
    throw new Error("useAuth must be used within a AuthProvider");
  return context;
};

export { useAuth, AuthProvider };
