import { toast } from "../components/ui/use-toast";
import api from "./api";

export interface Post {
  id: string;
  title: string;
  content: string;
  excerpt?: string;
  category?: string;
  author: string;
  author_id: string;
  created_at: string;
  profiles?: {
    name: string;
    role: string;
  };
}

export const blogService = {
  // Fetch all blog posts
  async getAllPosts(): Promise<Post[]> {
    try {
      const response = await api.get('/posts');
      return response.data;
    } catch (error: any) {
      console.error('Error fetching posts:', error);
      toast({
        title: 'Error',
        description: 'Failed to load blog posts',
        variant: 'destructive',
      });
      return [];
    }
  },
  
  // Fetch a single blog post by ID
  async getPostById(id: string): Promise<Post | null> {
    try {
      const response = await api.get(`/posts/${id}`);
      return response.data;
    } catch (error: any) {
      console.error(`Error fetching post ${id}:`, error);
      toast({
        title: 'Error',
        description: 'Failed to load the blog post',
        variant: 'destructive',
      });
      return null;
    }
  },
  
  // Create a new blog post
  async createPost(post: Omit<Post, 'id' | 'created_at' | 'author' | 'author_id' | 'profiles'>): Promise<Post | null> {
    try {
      const response = await api.post('/posts', post);
      
      toast({
        title: 'Success',
        description: 'Blog post created successfully',
      });
      
      return response.data;
    } catch (error: any) {
      console.error('Error creating post:', error);
      toast({
        title: 'Error',
        description: error.response?.data?.message || 'Failed to create the blog post',
        variant: 'destructive',
      });
      return null;
    }
  },
  
  // Update an existing blog post
  async updatePost(id: string, post: Partial<Omit<Post, 'id' | 'created_at' | 'author' | 'author_id' | 'profiles'>>): Promise<Post | null> {
    try {
      const response = await api.put(`/posts/${id}`, post);
      
      toast({
        title: 'Success',
        description: 'Blog post updated successfully',
      });
      
      return response.data;
    } catch (error: any) {
      console.error(`Error updating post ${id}:`, error);
      toast({
        title: 'Error',
        description: error.response?.data?.message || 'Failed to update the blog post',
        variant: 'destructive',
      });
      return null;
    }
  },
  
  // Delete a blog post
  async deletePost(id: string): Promise<boolean> {
    try {
      await api.delete(`/posts/${id}`);
      
      toast({
        title: 'Success',
        description: 'Blog post deleted successfully',
      });
      
      return true;
    } catch (error: any) {
      console.error(`Error deleting post ${id}:`, error);
      toast({
        title: 'Error',
        description: error.response?.data?.message || 'Failed to delete the blog post',
        variant: 'destructive',
      });
      return false;
    }
  },
  
  // Get posts by user ID
  async getPostsByUser(): Promise<Post[]> {
    try {
      const response = await api.get('/posts/user/posts');
      return response.data;
    } catch (error: any) {
      console.error('Error fetching user posts:', error);
      toast({
        title: 'Error',
        description: 'Failed to load your blog posts',
        variant: 'destructive',
      });
      return [];
    }
  },
};