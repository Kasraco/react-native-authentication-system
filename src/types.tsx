import { ReactNode } from "react";

export interface AuthData {
  user?: {
    username: string;
  };
  roles?: [];
  token?: string;
}

export interface AuthContextType {
  Auth: AuthData;
  setAuth: React.Dispatch<React.SetStateAction<AuthData>>;
}

export interface AuthProvideProps {
  children: ReactNode;
}
