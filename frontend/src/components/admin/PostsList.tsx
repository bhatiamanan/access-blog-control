
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Edit, Trash2, Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "@/components/ui/use-toast";
import { blogService } from "@/lib/blogService";
import { Post } from "@/lib/supabase";
import { format } from "date-fns";

const PostsList = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const fetchPosts = async () => {
      setIsLoading(true);
      const data = await blogService.getAllPosts();
      setPosts(data);
      setIsLoading(false);
    };
    
    fetchPosts();
  }, []);
  
  const handleEdit = (id: string) => {
    navigate(`/admin/edit-post/${id}`);
  };
  
  const handleDelete = async (id: string) => {
    const confirmed = window.confirm('Are you sure you want to delete this post?');
    
    if (confirmed) {
      const success = await blogService.deletePost(id);
      
      if (success) {
        // Remove the deleted post from state
        setPosts(posts.filter(post => post.id !== id));
      }
    }
  };
  
  const handleView = (id: string) => {
    navigate(`/blog/${id}`);
  };
  
  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-8">
        <p>Loading posts...</p>
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">No posts found.</p>
        <Button 
          onClick={() => navigate('/admin/create-post')}
          variant="outline"
          className="mt-4"
        >
          Create Your First Post
        </Button>
      </div>
    );
  }

  return (
    <div className="rounded-md border overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Author</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="w-[120px]">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {posts.map((post) => (
            <TableRow key={post.id}>
              <TableCell className="font-medium max-w-[300px] truncate">
                {post.title}
              </TableCell>
              <TableCell>
                <Badge variant="outline" className="bg-blue-50 text-blue-700">
                  {post.category}
                </Badge>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  {post.profiles?.name || 'Unknown'}
                  <Badge variant={post.profiles?.role === "admin" ? "default" : "outline"} className="text-xs">
                    {post.profiles?.role || 'user'}
                  </Badge>
                </div>
              </TableCell>
              <TableCell>
                {post.created_at ? format(new Date(post.created_at), 'MMM d, yyyy') : 'Unknown'}
              </TableCell>
              <TableCell>
                <div className="flex gap-2">
                  <Button size="icon" variant="ghost" onClick={() => handleView(post.id)}>
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button size="icon" variant="ghost" onClick={() => handleEdit(post.id)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button size="icon" variant="ghost" className="text-red-500" onClick={() => handleDelete(post.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default PostsList;
