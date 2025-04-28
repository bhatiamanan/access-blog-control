import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "../components/ui/use-toast";
import axios from "axios"; // Add axios for API calls
import { API_URL } from "../config";

// Define User type locally
interface User {
  id: string;
  name: string;
  email: string;
  role: "admin" | "user";
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  // Check for stored token and fetch user on mount
  useEffect(() => {
    const checkUser = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setIsLoading(false);
        return;
      }

      try {
        // Get user profile from backend
        const response = await axios.get(`${API_URL}/auth/profile`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        const userData = response.data;
        setUser({
          id: userData._id,
          name: userData.name,
          email: userData.email,
          role: userData.role
        });
      } catch (error) {
        console.error("Error fetching user profile:", error);
        localStorage.removeItem("token");
      } finally {
        setIsLoading(false);
      }
    };

    checkUser();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      
      // Sign in with backend API
      const response = await axios.post(`${API_URL}/auth/login`, {
        email,
        password
      });
      
      const { token, user: userData } = response.data;
      
      // Store token
      localStorage.setItem("token", token);
      
      // Set user state
      setUser({
        id: userData._id || userData.id,
        name: userData.name,
        email: userData.email,
        role: userData.role
      });
      
      toast({
        title: "Login successful",
        description: `Welcome back, ${userData.name}!`,
      });
      
      if (userData.role === "admin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/blogs");
      }
    } catch (error: any) {
      toast({
        title: "Login failed",
        description: error.response?.data?.message || "Invalid email or password",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (name: string, email: string, password: string) => {
    try {
      setIsLoading(true);
      
      // Sign up with backend API
      const response = await axios.post(`${API_URL}/auth/register`, {
        name,
        email,
        password
      });
      
      const { token, user: userData } = response.data;
      
      // Store token
      localStorage.setItem("token", token);
      
      // Set user state
      setUser({
        id: userData._id || userData.id,
        name: userData.name,
        email: userData.email,
        role: userData.role
      });
      
      toast({
        title: "Account created successfully!",
        description: "Your account has been created and you are now logged in.",
      });
      
      navigate("/blogs");
    } catch (error: any) {
      toast({
        title: "Failed to create account",
        description: error.response?.data?.message || "An error occurred during signup",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      // Remove token
      localStorage.removeItem("token");
      
      // Clear user state
      setUser(null);
      
      toast({
        title: "Logged out",
        description: "You have been successfully logged out.",
      });
      
      navigate("/");
    } catch (error: any) {
      toast({
        title: "Logout error",
        description: "Something went wrong during logout.",
        variant: "destructive",
      });
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        signup,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  
  return context;
};