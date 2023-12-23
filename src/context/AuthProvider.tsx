import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  SetStateAction,
} from "react";
interface AuthState {
  isAuthenticated: boolean;
  user: string;
  roles: any;
  accessToken: string | null;
}
export const AuthContext = createContext<
  | {
      authState: AuthState;
      setAuthState: React.Dispatch<SetStateAction<AuthState>>;
    }
  | undefined
>(undefined);
interface AuthenticationProps {
  children: ReactNode;
}
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [authState, setAuthState] = useState<AuthState>({
    isAuthenticated: false,
    user: "",
    roles: null,
    accessToken: null,
  });

  return (
    <AuthContext.Provider value={{ authState, setAuthState }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export default { AuthContext, useAuth };
