import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface User {
  email: string;
  role: "user" | "seller" | "admin";
}

interface AuthContextType {
  user: User | null;
  login: (email: string, role?: "user" | "seller" | "admin") => void;
  logout: () => void;
  updateRole: (role: "seller" | "admin") => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check local storage on initial load
    const storedEmail = localStorage.getItem("user_email");
    const storedRole = localStorage.getItem("user_role") as "user" | "seller" | "admin" || "user";
    if (storedEmail) {
      setUser({ email: storedEmail, role: storedRole });
    }
    setIsLoading(false);
  }, []);

  const login = (email: string, role: "user" | "seller" | "admin" = "user") => {
    localStorage.setItem("user_email", email);
    localStorage.setItem("user_role", role);
    // Setting password for completion per user requirements (mock check)
    localStorage.setItem("user_password", "demo123"); 
    setUser({ email, role });
  };

  const logout = () => {
    localStorage.removeItem("user_email");
    localStorage.removeItem("user_password");
    localStorage.removeItem("user_role");
    setUser(null);
  };

  const updateRole = (role: "seller" | "admin") => {
    if (user) {
      localStorage.setItem("user_role", role);
      setUser({ ...user, role });
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, updateRole, isLoading }}>
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
