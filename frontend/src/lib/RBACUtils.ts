import axios from 'axios';
import { toast } from '../components/ui/use-toast';
import { API_URL } from '../config';

export const RBACUtils = {
  // Check if user has admin role
  async isUserAdmin(userId: string): Promise<boolean> {
    try {
      const token = localStorage.getItem('token');
      if (!token) return false;
      
      const response = await axios.get(`${API_URL}/auth/check-role`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      
      return response.data.isAdmin === true;
    } catch (error) {
      console.error('Error checking admin status:', error);
      return false;
    }
  },
  
  // Verify user can edit a post (admin can edit any, users can only edit their own)
  async canEditPost(userId: string, postId: string): Promise<boolean> {
    try {
      const token = localStorage.getItem('token');
      if (!token) return false;
      
      const response = await axios.get(`${API_URL}/posts/${postId}/can-edit`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      
      return response.data.canEdit === true;
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