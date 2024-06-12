import { createContext, useContext, useState, ReactNode } from "react";

interface AuthContextType {
  token: string;
  id: number;
  name: string;
  lastName: string;
  email: string;
  phone: string;
  userAllowed: boolean;
  removeAuthToken: () => void;
  setAuthToken: (newToken: string) => void;
  setUserAllowed: (userAllowed: boolean) => void;
  setId: (userId: number) => void;
  setUserId: (userId: number) => void;
  setEmailProfile: (email: string) => void;
  setName: (name: string) => void
  setLastName: (name: string) => void
  setPhone: (name: string) => void
  setEmail: (name: string) => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string>(
    localStorage.getItem("c__token") || ""
  );

  const [userAllowed, setUserAllowed] = useState<boolean>(false);
  const [id, setId] = useState<number>(0);
  const [name, setName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  
  const setAuthToken = (newToken: string) => {
    setToken(newToken);
    localStorage.setItem("c__token", newToken);
  };

  const setUserId = (userId: number) => {
    setId(userId);
  };

  const setEmailProfile = (email: string) => {
    setEmail(email);
  };

  const removeAuthToken = () => {
    setToken("");
    localStorage.removeItem("c__token");
  };


  return (
    <AuthContext.Provider
      value={{
        token,
        setAuthToken,
        setId,
        removeAuthToken,
        userAllowed,
        setName,
        setLastName,
        setPhone,
        setEmail,
        id,
        name,
        lastName,
        setUserAllowed,
        email,
        setUserId,
        phone,
        setEmailProfile
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth deve ser usado dentro de um AuthProvider");
  }
  return context;
}
