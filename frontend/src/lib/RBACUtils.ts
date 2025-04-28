
import { supabase } from './supabase';
import { toast } from '@/components/ui/use-toast';

export const RBACUtils = {
  // Check if user has admin role
  async isUserAdmin(userId: string): Promise<boolean> {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', userId)
        .single();
      
      if (error || !data) {
        return false;
      }
      
      return data.role === 'admin';
    } catch (error) {
      console.error('Error checking admin status:', error);
      return false;
    }
  },
  
  // Verify user can edit a post (admin can edit any, users can only edit their own)
  async canEditPost(userId: string, postId: string): Promise<boolean> {
    try {
      // Check if user is admin
      const isAdmin = await this.isUserAdmin(userId);
      if (isAdmin) return true;
      
      // If not admin, check if post belongs to user
      const { data, error } = await supabase
        .from('posts')
        .select('author_id')
        .eq('id', postId)
        .single();
      
      if (error || !data) {
        return false;
      }
      
      return data.author_id === userId;
    } catch (error) {
      console.error('Error checking edit permission:', error);
      return false;
    }
  }
};

// Middleware for checking user permissions
export const checkPermission = async (
  userId: string | undefined,
  permission: 'admin' | 'owner',
  resourceId?: string
): Promise<boolean> => {
  if (!userId) return false;
  
  try {
    switch (permission) {
      case 'admin':
        return await RBACUtils.isUserAdmin(userId);
      case 'owner':
        if (!resourceId) return false;
        return await RBACUtils.canEditPost(userId, resourceId);
      default:
        return false;
    }
  } catch (error) {
    console.error('Permission check error:', error);
    toast({
      title: 'Permission Error',
      description: 'Unable to verify permissions',
      variant: 'destructive'
    });
    return false;
  }
};
