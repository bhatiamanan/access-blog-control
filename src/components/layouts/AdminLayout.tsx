
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import MainLayout from "@/components/layouts/MainLayout";
import { toast } from "@/components/ui/use-toast";

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
  const { user, isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is authenticated and is admin
    if (!isLoading && (!isAuthenticated || user?.role !== "admin")) {
      toast({
        title: "Access Denied",
        description: "You don't have permission to access this page.",
        variant: "destructive",
      });
      navigate("/login");
    }
  }, [isAuthenticated, isLoading, user, navigate]);

  if (isLoading) {
    return (
      <MainLayout>
        <div className="flex justify-center items-center min-h-[60vh]">
          <p className="text-xl">Loading...</p>
        </div>
      </MainLayout>
    );
  }

  if (!isAuthenticated || user?.role !== "admin") {
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
