
import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Save } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "@/components/ui/use-toast";
import AdminLayout from "@/components/layouts/AdminLayout";
import { allPosts } from "@/lib/dummyData";

interface PostFormData {
  title: string;
  excerpt: string;
  content: string;
  category: string;
}

const CreateEditPost = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isEditMode = !!id;
  
  // Find post if in edit mode
  const post = isEditMode ? allPosts.find(post => post.id === id) : null;
  
  const { register, handleSubmit, setValue, formState: { errors } } = useForm<PostFormData>({
    defaultValues: {
      title: post?.title || "",
      excerpt: post?.excerpt || "",
      content: "", // In a real app, you would fetch the full content
      category: post?.category || "",
    },
  });
  
  const onSubmit = (data: PostFormData) => {
    // In a real app, you would call an API to save the post
    console.log("Form data:", data);
    
    toast({
      title: isEditMode ? "Post updated" : "Post created",
      description: isEditMode ? "The post has been updated successfully." : "The post has been created successfully.",
    });
    
    navigate("/admin/dashboard");
  };
  
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
                defaultValue={post?.category}
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
              <Button type="submit">
                <Save className="mr-2 h-4 w-4" />
                {isEditMode ? "Update Post" : "Create Post"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </AdminLayout>
  );
};

export default CreateEditPost;
