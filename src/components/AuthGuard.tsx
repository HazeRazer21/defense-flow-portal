
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { useProfile } from '@/hooks/useProfile';

interface AuthGuardProps {
  children: React.ReactNode;
  requireAuth?: boolean;
  requireRole?: 'admin' | 'student';
}

const AuthGuard = ({ children, requireAuth = false, requireRole }: AuthGuardProps) => {
  const { user, isAuthenticated } = useAuth();
  const { profile, loading: profileLoading, isAdmin } = useProfile();
  const [authChecked, setAuthChecked] = useState(false);
  const navigate = useNavigate();

  console.log('AuthGuard state:', { 
    requireAuth, 
    requireRole, 
    isAuthenticated, 
    profile, 
    profileLoading, 
    isAdmin,
    user: user?.email 
  });

  useEffect(() => {
    // Only run auth check when profile loading is complete
    if (!profileLoading) {
      console.log('Running auth check...');
      
      if (requireAuth && !isAuthenticated) {
        console.log('Redirecting to login - auth required but not authenticated');
        navigate('/login');
        return;
      }
      
      if (requireRole === 'admin' && (!profile || !isAdmin)) {
        console.log('Redirecting to home - admin required but user is not admin');
        navigate('/');
        return;
      }
      
      console.log('Auth check passed');
      setAuthChecked(true);
    }
  }, [user, profile, profileLoading, requireAuth, requireRole, navigate, isAuthenticated, isAdmin]);

  // Show loading only when we haven't checked auth yet
  if (!authChecked || profileLoading) {
    console.log('Showing loading screen');
    return (
      <div className="min-h-screen bg-martial-dark flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  console.log('Rendering protected content');
  return <>{children}</>;
};

export default AuthGuard;
