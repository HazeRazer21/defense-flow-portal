
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
  const { profile, loading: profileLoading } = useProfile();
  const [authChecked, setAuthChecked] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Only run auth check when profile loading is complete
    if (!profileLoading) {
      if (requireAuth && !isAuthenticated) {
        navigate('/login');
        return;
      }
      
      if (requireRole && (!profile || profile.role !== requireRole)) {
        navigate('/');
        return;
      }
      
      setAuthChecked(true);
    }
  }, [user, profile, profileLoading, requireAuth, requireRole, navigate, isAuthenticated]);

  // Show loading only when we haven't checked auth yet
  if (!authChecked || profileLoading) {
    return (
      <div className="min-h-screen bg-martial-dark flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  return <>{children}</>;
};

export default AuthGuard;
