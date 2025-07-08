
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
    console.log('fetchProfile called for user:', user?.id);
    
    if (!user) {
      console.log('No user found, setting profile to null');
      setProfile(null);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      
      // Try to get existing profile
      const { data: existingProfile, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      console.log('Profile query result:', { data: existingProfile, error });

      if (error) {
        if (error.code === 'PGRST116') {
          // No profile found, create new one
          console.log('No profile found, creating new profile');
          
          const newProfile = {
            id: user.id,
            email: user.email || '',
            name: user.name || user.email?.split('@')[0] || '',
            role: 'student'
          };

          const { data: createdProfile, error: insertError } = await supabase
            .from('profiles')
            .insert(newProfile)
            .select()
            .single();

          if (insertError) {
            console.error('Error creating profile:', insertError);
            // Use in-memory profile if database insert fails
            setProfile(newProfile);
          } else {
            console.log('Successfully created profile:', createdProfile);
            setProfile(createdProfile);
          }
        } else {
          console.error('Error fetching profile:', error);
          setProfile(null);
        }
      } else {
        console.log('Found existing profile:', existingProfile);
        setProfile(existingProfile);
      }
    } catch (error) {
      console.error('Error in fetchProfile:', error);
      setProfile(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log('useProfile useEffect triggered, user:', user?.id);
    fetchProfile();
  }, [user?.id]);

  const isAdmin = profile?.role === 'admin';
  
  console.log('Profile hook state:', { 
    profile: profile ? { id: profile.id, email: profile.email, role: profile.role } : null, 
    isAdmin, 
    loading, 
    userId: user?.id 
  });

  return {
    profile,
    loading,
    isAdmin,
    refetch: fetchProfile
  };
};
