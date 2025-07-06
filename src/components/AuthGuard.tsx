
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
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!profileLoading) {
      setLoading(false);
    }
  }, [profileLoading]);

  useEffect(() => {
    if (!loading) {
      if (requireAuth && !isAuthenticated) {
        navigate('/login');
      } else if (requireRole && (!profile || profile.role !== requireRole)) {
        navigate('/');
      }
    }
  }, [user, profile, loading, requireAuth, requireRole, navigate, isAuthenticated]);

  if (loading) {
    return (
      <div className="min-h-screen bg-martial-dark flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  return <>{children}</>;
};

export default AuthGuard;
