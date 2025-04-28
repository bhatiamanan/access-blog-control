
import { supabase, Post } from './supabase';
import { toast } from '@/components/ui/use-toast';

export const blogService = {
  // Fetch all blog posts
  async getAllPosts(): Promise<Post[]> {
    try {
      const { data, error } = await supabase
        .from('posts')
        .select(`
          *,
          profiles:author_id (name, role)
        `)
        .order('created_at', { ascending: false });
      
      if (error) {
        throw error;
      }
      
      return data || [];
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
      const { data, error } = await supabase
        .from('posts')
        .select(`
          *,
          profiles:author_id (name, role)
        `)
        .eq('id', id)
        .single();
      
      if (error) {
        throw error;
      }
      
      return data;
    } catch (error: any) {
      console.error('Error fetching post:', error);
      toast({
        title: 'Error',
        description: 'Failed to load the blog post',
        variant: 'destructive',
      });
      return null;
    }
  },
  
  // Create a new blog post
  async createPost(post: any, userId: string): Promise<Post | null> {
    try {
      const { data, error } = await supabase
        .from('posts')
        .insert([
          {
            ...post,
            author_id: userId,
          }
        ])
        .select()
        .single();
      
      if (error) {
        throw error;
      }
      
      toast({
        title: 'Success',
        description: 'Blog post created successfully',
      });
      
      return data;
    } catch (error: any) {
      console.error('Error creating post:', error);
      toast({
        title: 'Error',
        description: 'Failed to create the blog post',
        variant: 'destructive',
      });
      return null;
    }
  },
  
  // Update an existing blog post
  async updatePost(id: string, post: Partial<Post>): Promise<Post | null> {
    try {
      const { data, error } = await supabase
        .from('posts')
        .update({
          ...post,
        })
        .eq('id', id)
        .select()
        .single();
      
      if (error) {
        throw error;
      }
      
      toast({
        title: 'Success',
        description: 'Blog post updated successfully',
      });
      
      return data;
    } catch (error: any) {
      console.error('Error updating post:', error);
      toast({
        title: 'Error',
        description: 'Failed to update the blog post',
        variant: 'destructive',
      });
      return null;
    }
  },
  
  // Delete a blog post
  async deletePost(id: string): Promise<boolean> {
    try {
      const { error } = await supabase
        .from('posts')
        .delete()
        .eq('id', id);
      
      if (error) {
        throw error;
      }
      
      toast({
        title: 'Success',
        description: 'Blog post deleted successfully',
      });
      
      return true;
    } catch (error: any) {
      console.error('Error deleting post:', error);
      toast({
        title: 'Error',
        description: 'Failed to delete the blog post',
        variant: 'destructive',
      });
      return false;
    }
  },
  
  // Get posts by user ID
  async getPostsByUser(userId: string): Promise<Post[]> {
    try {
      const { data, error } = await supabase
        .from('posts')
        .select(`
          *,
          profiles:author_id (name, role)
        `)
        .eq('author_id', userId)
        .order('created_at', { ascending: false });
      
      if (error) {
        throw error;
      }
      
      return data || [];
    } catch (error: any) {
      console.error('Error fetching user posts:', error);
      toast({
        title: 'Error',
        description: 'Failed to load user blog posts',
        variant: 'destructive',
      });
      return [];
    }
  }
};
