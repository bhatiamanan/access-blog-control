
import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import MainLayout from "@/components/layouts/MainLayout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Calendar, User } from "lucide-react";
import { fullPostContent, allPosts } from "@/lib/dummyData";
import { useAuth } from "@/hooks/useAuth";
import ReactMarkdown from "react-markdown";

const BlogDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  
  // Find the post metadata
  const postMeta = allPosts.find((post) => post.id === id);
  
  // Get the full content for the post
  const postContent = id ? fullPostContent[id as keyof typeof fullPostContent] : null;
  
  if (!postMeta || !postContent) {
    return (
      <MainLayout>
        <div className="container px-4 mx-auto py-16">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl font-bold mb-4">Post Not Found</h1>
            <p className="mb-6 text-gray-600">
              The blog post you are looking for does not exist or has been removed.
            </p>
            <Button onClick={() => navigate("/blogs")}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Blogs
            </Button>
          </div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="container px-4 mx-auto py-10">
        <div className="max-w-3xl mx-auto">
          <Button
            variant="ghost"
            onClick={() => navigate("/blogs")}
            className="mb-6"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Blogs
          </Button>
          
          <Card className="p-6 md:p-8 shadow-lg">
            <div className="mb-6 flex justify-between items-center">
              <Badge variant="outline" className="bg-blue-50 text-blue-700">
                {postMeta.category}
              </Badge>
              <div className="flex items-center text-gray-500 text-sm">
                <Calendar className="h-4 w-4 mr-1" />
                {postMeta.createdAt}
              </div>
            </div>
            
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              {postContent.title}
            </h1>
            
            <div className="flex items-center mb-8 text-gray-600">
              <User className="h-4 w-4 mr-2" />
              <span>By {postContent.author.name}</span>
              <Badge 
                className="ml-3"
                variant={postContent.author.role === "admin" ? "default" : "outline"}
              >
                {postContent.author.role}
              </Badge>
            </div>
            
            <div className="prose max-w-none">
              <ReactMarkdown>
                {postContent.content}
              </ReactMarkdown>
            </div>
            
            {/* Edit button only for admins */}
            {user?.role === "admin" && (
              <div className="mt-8 flex justify-end">
                <Button
                  onClick={() => navigate(`/admin/edit-post/${id}`)}
                >
                  Edit Post
                </Button>
              </div>
            )}
          </Card>
        </div>
      </div>
    </MainLayout>
  );
};

export default BlogDetail;
