
import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "@/components/ui/use-toast";

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
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  // Check if user is already logged in on mount
  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("token");
      
      if (token) {
        try {
          // In a real app, you would verify the token with your backend
          // For now, we'll simulate this with a timeout
          setTimeout(() => {
            // Mock user data (in a real app, this would come from the backend)
            const userData = JSON.parse(localStorage.getItem("user") || "null");
            
            if (userData) {
              setUser(userData);
            } else {
              // If user data is missing but token exists, clear storage
              localStorage.removeItem("token");
            }
            
            setIsLoading(false);
          }, 500);
        } catch (error) {
          console.error("Auth error:", error);
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          setIsLoading(false);
        }
      } else {
        setIsLoading(false);
      }
    };
    
    checkAuth();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      
      // Simulate API call with a timeout (replace with actual API call)
      setTimeout(() => {
        // Mock successful login - in a real app this would be an API call
        // Here we're just checking a few mock users for demonstration
        
        const mockUsers = [
          { 
            id: "1", 
            name: "Admin User", 
            email: "admin@example.com", 
            password: "admin123", 
            role: "admin" 
          },
          { 
            id: "2", 
            name: "Regular User", 
            email: "user@example.com", 
            password: "user123", 
            role: "user" 
          },
        ];
        
        const foundUser = mockUsers.find(
          (user) => user.email === email && user.password === password
        );
        
        if (foundUser) {
          // Store user data except password
          const { password, ...userWithoutPassword } = foundUser;
          
          // Store token and user data
          localStorage.setItem("token", "mock-jwt-token");
          localStorage.setItem("user", JSON.stringify(userWithoutPassword));
          
          setUser(userWithoutPassword as User);
          
          toast({
            title: "Login successful",
            description: `Welcome back, ${userWithoutPassword.name}!`,
          });
          
          // Redirect based on role
          if (userWithoutPassword.role === "admin") {
            navigate("/admin/dashboard");
          } else {
            navigate("/blogs");
          }
        } else {
          toast({
            title: "Login failed",
            description: "Invalid email or password",
            variant: "destructive",
          });
        }
        
        setIsLoading(false);
      }, 1000);
      
    } catch (error) {
      console.error("Login error:", error);
      toast({
        title: "Login error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
      setIsLoading(false);
    }
  };

  const signup = async (name: string, email: string, password: string) => {
    try {
      setIsLoading(true);
      
      // Simulate API call with a timeout
      setTimeout(() => {
        // Mock successful signup - in a real app this would be an API call
        const newUser = {
          id: `user-${Date.now()}`,
          name,
          email,
          role: "user" as const,
        };
        
        // Store token and user data
        localStorage.setItem("token", "mock-jwt-token");
        localStorage.setItem("user", JSON.stringify(newUser));
        
        setUser(newUser);
        
        toast({
          title: "Account created",
          description: "Your account has been created successfully!",
        });
        
        navigate("/blogs");
        setIsLoading(false);
      }, 1000);
      
    } catch (error) {
      console.error("Signup error:", error);
      toast({
        title: "Signup error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
    navigate("/");
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
