
import React from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const navigate = useNavigate();
  
  const handleGetStarted = () => {
    navigate("/signup");
  };

  const handleBrowsePosts = () => {
    navigate("/blogs");
  };
  
  return (
    <div className="relative bg-gradient-to-r from-blue-600 to-indigo-700 min-h-[500px] flex items-center justify-center">
      <div className="container px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
          A secure platform with role-based access control, allowing different permissions for admins and regular users.
        </h1>
        
        <div className="flex justify-center space-x-4">
          <Button 
            size="lg" 
            className="bg-white text-blue-700 hover:bg-blue-50"
            onClick={handleGetStarted}
          >
            Get Started
          </Button>
          <Button 
            size="lg" 
            variant="outline" 
            className="border-2 border-white text-white hover:bg-white/10"
            onClick={handleBrowsePosts}
          >
            Browse Posts
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
