import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "@/components/ui/use-toast";
// Uncomment these lines to use Supabase
import { supabase } from "@/lib/supabase"; 
import { User } from "@/lib/supabase"; // Import the User type from our supabase.ts

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

  // Use Supabase auth state listener
  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setIsLoading(true);
        
        if (event === 'SIGNED_IN' && session) {
          // Get user profile from Supabase
          const { data, error } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', session.user.id)
            .single();
            
          if (data) {
            // Profile exists, set user state
            setUser(data as User);
          } else if (!error || error.code === 'PGRST116') {
            // Profile doesn't exist, create one
            const newUser: Omit<User, 'created_at'> = {
              id: session.user.id,
              email: session.user.email || '',
              name: session.user.email?.split('@')[0] || '',
              role: 'user',
            };
            
            await supabase.from('profiles').insert([newUser]);
            
            // Set user with created_at timestamp
            setUser({
              ...newUser,
              created_at: new Date().toISOString(),
            } as User);
          }
        } else if (event === 'SIGNED_OUT') {
          setUser(null);
        }
        
        setIsLoading(false);
      }
    );

    // Check for existing session
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (session) {
        // Get user profile from Supabase
        const { data } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', session.user.id)
          .single();
          
        if (data) {
          setUser(data as User);
        }
      }
      
      setIsLoading(false);
    };
    
    checkUser();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const login = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      
      // Sign in with Supabase
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) throw error;

      if (data.user) {
        // Get user profile
        const { data: profile } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', data.user.id)
          .single();
          
        if (profile) {
          toast({
            title: "Login successful",
            description: `Welcome back, ${profile.name}!`,
          });
          
          if (profile.role === "admin") {
            navigate("/admin/dashboard");
          } else {
            navigate("/blogs");
          }
        }
      }
    } catch (error: any) {
      toast({
        title: "Login failed",
        description: error.message || "Invalid email or password",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (name: string, email: string, password: string) => {
    try {
      setIsLoading(true);
      
      // Sign up with Supabase
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });
      
      if (error) throw error;
      
      if (data.user) {
        // Create user profile
        const newUser = {
          id: data.user.id,
          email: email,
          name: name,
          role: 'user' as const,
        };
        
        const { error: profileError } = await supabase
          .from('profiles')
          .insert([newUser]);
          
        if (profileError) throw profileError;
        
        toast({
          title: "Account created successfully!",
          description: "Please check your email to verify your account.",
        });
        
        navigate("/");
      }
    } catch (error: any) {
      toast({
        title: "Failed to create account",
        description: error.message || "An error occurred during signup",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      // Sign out with Supabase
      const { error } = await supabase.auth.signOut();
      
      if (error) throw error;
      
      setUser(null);
      
      toast({
        title: "Logged out",
        description: "You have been successfully logged out.",
      });
      
      navigate("/");
    } catch (error: any) {
      toast({
        title: "Logout error",
        description: error.message || "Something went wrong during logout.",
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