
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import MainLayout from "@/components/layouts/MainLayout";
import { toast } from "@/components/ui/use-toast";
import { checkPermission } from "@/lib/RBACUtils";

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
  const { user, isAuthenticated, isLoading } = useAuth();
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const verifyAdmin = async () => {
      if (isAuthenticated && user) {
        const hasAdminPermission = await checkPermission(user.id, 'admin');
        setIsAdmin(hasAdminPermission);
        
        if (!hasAdminPermission) {
          toast({
            title: "Access Denied",
            description: "You don't have permission to access this page.",
            variant: "destructive",
          });
          navigate("/blogs");
        }
      } else if (!isLoading && !isAuthenticated) {
        toast({
          title: "Authentication Required",
          description: "Please log in to access this page.",
          variant: "destructive",
        });
        navigate("/login");
      }
    };
    
    verifyAdmin();
  }, [isAuthenticated, isLoading, user, navigate]);

  if (isLoading || isAdmin === null) {
    return (
      <MainLayout>
        <div className="flex justify-center items-center min-h-[60vh]">
          <p className="text-xl">Loading...</p>
        </div>
      </MainLayout>
    );
  }

  if (!isAuthenticated || !isAdmin) {
    return null; // Will redirect in the useEffect
  }

  return (
    <MainLayout>
      <div className="container px-4 mx-auto py-8">
        {children}
      </div>
    </MainLayout>
  );
};

export default AdminLayout;
