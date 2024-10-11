import { createContext, useState } from "react";
import { AuthContextType, AuthData, AuthProvideProps } from "../types";

// const AuthContext = createContext({});
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<AuthProvideProps> = ({ children }) => {
  const [Auth, setAuth] = useState<AuthData>({});

  return <AuthContext.Provider value={{ Auth, setAuth }}>{children}</AuthContext.Provider>;
};

export default AuthContext;

//Older Code

// import { createContext, useState } from "react";
// import { AuthContextType } from "../types";

// const AuthContext = createContext({});

// export const AuthProvider = ({ children }) => {
//   const [Auth, setAuth] = useStat({});

//   return <AuthContext.Provider value={{ Auth, setAuth }}>{children}</AuthContext.Provider>;
// };
// export default AuthContext;
