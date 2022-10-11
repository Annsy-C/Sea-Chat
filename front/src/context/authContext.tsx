import React , { useState } from "react";

type AuthContextProps = {
    children: React.ReactNode,
}

type ContextProps = React.Context<{
    bearerToken: string,
    setBearerToken : any,
    //setBearerToken: React.Dispatch<React.SetStateAction<string>> | (() => void),
}>

const AuthContext: ContextProps = React.createContext({
  bearerToken : "",
  setBearerToken: () => {},
});

const AuthContextProvider = ({ children } : AuthContextProps) => {
  const [bearerToken, setBearerToken] = useState("");

  return (
    <AuthContext.Provider
      value={{
        bearerToken,
        setBearerToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
export { AuthContext };
