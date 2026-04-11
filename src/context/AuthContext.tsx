import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface User {
  email: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string) => void;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check local storage on initial load
    const storedEmail = localStorage.getItem("user_email");
    if (storedEmail) {
      setUser({ email: storedEmail });
    }
    setIsLoading(false);
  }, []);

  const login = (email: string) => {
    localStorage.setItem("user_email", email);
    // Setting password for completion per user requirements (mock check)
    localStorage.setItem("user_password", "demo123"); 
    setUser({ email });
  };

  const logout = () => {
    localStorage.removeItem("user_email");
    localStorage.removeItem("user_password");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
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
