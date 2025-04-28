
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "../../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Textarea } from "../../components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select";
import { ArrowLeft, Save } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "../../components/ui/use-toast";
import AdminLayout from "../../components/layouts/AdminLayout";
import { useAuth } from "../../hooks/useAuth";
import { blogService } from "../../lib/blogService";

interface PostFormData {
  title: string;
  excerpt: string;
  content: string;
  category: string;
}

const CreateEditPost = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const isEditMode = !!id;
  const [isLoading, setIsLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(isEditMode);
  
  const { register, handleSubmit, setValue, reset, formState: { errors } } = useForm<PostFormData>();
  
  // Fetch post data if in edit mode
  useEffect(() => {
    const fetchPost = async () => {
      if (isEditMode && id) {
        try {
          const post = await blogService.getPostById(id);
          
          if (post) {
            reset({
              title: post.title,
              excerpt: post.excerpt,
              content: post.content,
              category: post.category,
            });
          } else {
            toast({
              title: "Error",
              description: "Post not found",
              variant: "destructive",
            });
            navigate("/admin/dashboard");
          }
        } catch (error) {
          console.error("Error fetching post:", error);
          toast({
            title: "Error",
            description: "Failed to load the post",
            variant: "destructive",
          });
          navigate("/admin/dashboard");
        } finally {
          setInitialLoading(false);
        }
      } else {
        setInitialLoading(false);
      }
    };
    
    fetchPost();
  }, [id, isEditMode, navigate, reset]);
  
  const onSubmit = async (data: PostFormData) => {
    if (!user) {
      toast({
        title: "Error",
        description: "You must be logged in to create or edit posts",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    
    try {
      if (isEditMode && id) {
        await blogService.updatePost(id, data);
      } else {
        await blogService.createPost(data, user.id);
      }
      
      navigate("/admin/dashboard");
    } catch (error) {
      console.error("Error saving post:", error);
    } finally {
      setIsLoading(false);
    }
  };
  
  if (initialLoading) {
    return (
      <AdminLayout>
        <div className="flex justify-center items-center min-h-[60vh]">
          <p className="text-xl">Loading post data...</p>
        </div>
      </AdminLayout>
    );
  }
  
  return (
    <AdminLayout>
      <div className="mb-6">
        <Button
          variant="ghost"
          onClick={() => navigate("/admin/dashboard")}
          className="mb-4"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Dashboard
        </Button>
        <h1 className="text-2xl font-bold">
          {isEditMode ? "Edit Post" : "Create New Post"}
        </h1>
      </div>
      
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle>{isEditMode ? "Edit Post" : "Create New Post"}</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                placeholder="Enter post title"
                {...register("title", { required: "Title is required" })}
              />
              {errors.title && (
                <p className="text-sm text-red-500">{errors.title.message}</p>
              )}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="excerpt">Excerpt</Label>
              <Textarea
                id="excerpt"
                placeholder="Enter a brief excerpt of the post"
                className="resize-none"
                rows={3}
                {...register("excerpt", { required: "Excerpt is required" })}
              />
              {errors.excerpt && (
                <p className="text-sm text-red-500">{errors.excerpt.message}</p>
              )}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="content">Content</Label>
              <Textarea
                id="content"
                placeholder="Write your post content here (supports Markdown)"
                className="min-h-[300px]"
                {...register("content", { required: "Content is required" })}
              />
              {errors.content && (
                <p className="text-sm text-red-500">{errors.content.message}</p>
              )}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select
                onValueChange={(value) => setValue("category", value)}
                defaultValue=""
              >
                <SelectTrigger id="category">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Security">Security</SelectItem>
                  <SelectItem value="Development">Development</SelectItem>
                  <SelectItem value="Database">Database</SelectItem>
                  <SelectItem value="Frontend">Frontend</SelectItem>
                  <SelectItem value="Backend">Backend</SelectItem>
                  <SelectItem value="Full Stack">Full Stack</SelectItem>
                </SelectContent>
              </Select>
              {errors.category && (
                <p className="text-sm text-red-500">{errors.category.message}</p>
              )}
            </div>
            
            <div className="flex justify-end">
              <Button type="submit" disabled={isLoading}>
                <Save className="mr-2 h-4 w-4" />
                {isLoading 
                  ? isEditMode ? "Updating Post..." : "Creating Post..." 
                  : isEditMode ? "Update Post" : "Create Post"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </AdminLayout>
  );
};

export default CreateEditPost;
