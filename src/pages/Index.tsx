
import React from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Home, BookOpen, LogIn, UserPlus } from "lucide-react";
import BlogCard from "@/components/BlogCard";
import MainLayout from "@/components/layouts/MainLayout";
import HeroSection from "@/components/HeroSection";
import { featuredPosts } from "@/lib/dummyData";

const Index = () => {
  const navigate = useNavigate();

  return (
    <MainLayout>
      <HeroSection />
      
      <section className="py-12 bg-gray-50">
        <div className="container px-4 mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-4 md:mb-0">Featured Posts</h2>
            <div className="space-x-3">
              <Button 
                variant="outline"
                className="bg-white" 
                onClick={() => navigate("/blogs")}
              >
                <BookOpen className="mr-2 h-4 w-4" />
                All Posts
              </Button>
              <Button onClick={() => navigate("/login")}>
                <LogIn className="mr-2 h-4 w-4" />
                Log In
              </Button>
              <Button 
                variant="outline" 
                className="bg-white border-primary text-primary hover:bg-primary/10"
                onClick={() => navigate("/signup")}
              >
                <UserPlus className="mr-2 h-4 w-4" />
                Sign Up
              </Button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredPosts.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default Index;
