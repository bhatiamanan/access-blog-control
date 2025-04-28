
import React from "react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  author: {
    name: string;
    role: string;
  };
  createdAt: string;
  category: string;
}

interface BlogCardProps {
  post: BlogPost;
}

const BlogCard = ({ post }: BlogCardProps) => {
  const navigate = useNavigate();
  
  return (
    <Card 
      className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
      onClick={() => navigate(`/blog/${post.id}`)}
    >
      <CardHeader className="p-0">
        <div className="h-48 bg-gray-200"></div>
      </CardHeader>
      <CardContent className="pt-6 pb-2">
        <div className="flex justify-between items-center mb-2">
          <Badge variant="outline" className="bg-blue-50 text-blue-700 hover:bg-blue-100">
            {post.category}
          </Badge>
          <div className="flex items-center text-gray-500 text-sm">
            <Calendar className="h-4 w-4 mr-1" />
            {post.createdAt}
          </div>
        </div>
        <h3 className="text-xl font-bold mb-2 text-gray-800 line-clamp-2">
          {post.title}
        </h3>
        <p className="text-gray-600 line-clamp-3">
          {post.excerpt}
        </p>
      </CardContent>
      <CardFooter className="pt-2 pb-6 text-sm text-gray-500 flex justify-between items-center">
        <div>By {post.author.name}</div>
        <Badge variant={post.author.role === "admin" ? "default" : "outline"} className="text-xs">
          {post.author.role}
        </Badge>
      </CardFooter>
    </Card>
  );
};

export default BlogCard;
