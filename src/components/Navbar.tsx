
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { LogIn, Menu, X, User, LogOut } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { isAuthenticated, user, logout } = useAuth();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/" className="text-2xl font-bold text-blue-700">
              RBAC Blog
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-700 hover:text-blue-700 transition-colors">
              Home
            </Link>
            <Link to="/blogs" className="text-gray-700 hover:text-blue-700 transition-colors">
              Blogs
            </Link>
            {isAuthenticated && user?.role === "admin" && (
              <Link to="/admin/dashboard" className="text-gray-700 hover:text-blue-700 transition-colors">
                Admin
              </Link>
            )}
            
            {!isAuthenticated ? (
              <div className="flex items-center space-x-3">
                <Button variant="ghost" onClick={() => navigate("/login")}>
                  <LogIn className="mr-2 h-4 w-4" />
                  Login
                </Button>
                <Button onClick={() => navigate("/signup")}>
                  Sign Up
                </Button>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Button variant="ghost" onClick={() => navigate("/profile")}>
                  <User className="mr-2 h-4 w-4" />
                  Profile
                </Button>
                <Button variant="outline" onClick={logout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </Button>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button variant="ghost" size="icon" onClick={toggleMenu}>
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-white px-4 pt-2 pb-4 shadow-lg">
          <div className="space-y-3">
            <Link 
              to="/" 
              className="block py-2 text-gray-700 hover:text-blue-700"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/blogs"
              className="block py-2 text-gray-700 hover:text-blue-700"
              onClick={() => setIsMenuOpen(false)}
            >
              Blogs
            </Link>
            {isAuthenticated && user?.role === "admin" && (
              <Link 
                to="/admin/dashboard"
                className="block py-2 text-gray-700 hover:text-blue-700"
                onClick={() => setIsMenuOpen(false)}
              >
                Admin
              </Link>
            )}
            
            {!isAuthenticated ? (
              <div className="pt-3 space-y-3">
                <Button 
                  className="w-full" 
                  variant="outline"
                  onClick={() => {
                    navigate("/login");
                    setIsMenuOpen(false);
                  }}
                >
                  <LogIn className="mr-2 h-4 w-4" />
                  Login
                </Button>
                <Button 
                  className="w-full"
                  onClick={() => {
                    navigate("/signup");
                    setIsMenuOpen(false);
                  }}
                >
                  Sign Up
                </Button>
              </div>
            ) : (
              <div className="pt-3 space-y-3">
                <Button 
                  className="w-full" 
                  variant="outline"
                  onClick={() => {
                    navigate("/profile");
                    setIsMenuOpen(false);
                  }}
                >
                  <User className="mr-2 h-4 w-4" />
                  Profile
                </Button>
                <Button 
                  className="w-full"
                  variant="outline"
                  onClick={() => {
                    logout();
                    setIsMenuOpen(false);
                  }}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
