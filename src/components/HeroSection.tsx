
import React from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const navigate = useNavigate();
  
  const handleBrowsePosts = () => {
    console.log("Navigating to blogs page");
    navigate("/blogs");
  };
  
  return (
    <div className="relative bg-gradient-to-r from-blue-600 to-indigo-700 overflow-hidden">
      <div className="absolute inset-0">
        <svg
          className="absolute left-0 top-0 h-full w-full text-white opacity-10"
          preserveAspectRatio="xMinYMin slice"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 1440 560"
        >
          <path
            fill="currentColor"
            d="M0,224L40,229.3C80,235,160,245,240,250.7C320,256,400,256,480,240C560,224,640,192,720,176C800,160,880,160,960,186.7C1040,213,1120,267,1200,277.3C1280,288,1360,256,1400,240L1440,224L1440,320L1400,320C1360,320,1280,320,1200,320C1120,320,1040,320,960,320C880,320,800,320,720,320C640,320,560,320,480,320C400,320,320,320,240,320C160,320,80,320,40,320L0,320Z"
          ></path>
        </svg>
      </div>
      <div className="container px-4 mx-auto relative">
        <div className="pt-16 pb-20 md:pt-24 md:pb-28 max-w-4xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
            Welcome to RBAC Blog Platform
          </h1>
          <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-2xl">
            A secure platform with role-based access control, allowing different permissions for admins and regular users.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button 
              size="lg" 
              className="bg-white text-blue-700 hover:bg-blue-50"
              onClick={() => navigate("/signup")}
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
    </div>
  );
};

export default HeroSection;

