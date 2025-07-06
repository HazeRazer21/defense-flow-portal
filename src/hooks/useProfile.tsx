
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';

interface Profile {
  id: string;
  email: string;
  name: string | null;
  role: string;
}

export const useProfile = () => {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  const fetchProfile = async () => {
    if (!user) {
      setProfile(null);
      setLoading(false);
      return;
    }

    console.log('Fetching profile for user:', user.id);
    
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      console.log('Profile fetch result:', { data, error });

      if (error && error.code !== 'PGRST116') {
        console.error('Error fetching profile:', error);
        setLoading(false);
        return;
      }

      if (data) {
        console.log('Profile data found:', data);
        setProfile(data);
      } else {
        console.log('No profile found, creating default profile');
        // If no profile exists, create one with student role
        const defaultProfile = {
          id: user.id,
          email: user.email || '',
          name: user.name || user.email?.split('@')[0] || '',
          role: 'student'
        };
        setProfile(defaultProfile);
      }
    } catch (error) {
      console.error('Error in fetchProfile:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, [user?.id]);

  const isAdmin = profile?.role === 'admin';
  
  console.log('Current profile state:', { profile, isAdmin, loading });

  return {
    profile,
    loading,
    isAdmin,
    refetch: fetchProfile
  };
};
