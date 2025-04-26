
import React from "react";
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
import { allPosts } from "@/lib/dummyData";

const PostsList = () => {
  const navigate = useNavigate();
  
  const handleEdit = (id: string) => {
    navigate(`/admin/edit-post/${id}`);
  };
  
  const handleDelete = (id: string) => {
    // In a real app, you would call an API to delete the post
    toast({
      title: "Post deleted",
      description: "The post has been deleted successfully.",
    });
    // For now we'll just show a toast as we're using mock data
  };
  
  const handleView = (id: string) => {
    navigate(`/blog/${id}`);
  };

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
          {allPosts.map((post) => (
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
                  {post.author.name}
                  <Badge variant={post.author.role === "admin" ? "default" : "outline"} className="text-xs">
                    {post.author.role}
                  </Badge>
                </div>
              </TableCell>
              <TableCell>{post.createdAt}</TableCell>
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
