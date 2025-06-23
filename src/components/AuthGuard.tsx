
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface User {
  email: string;
  name: string;
  role: 'admin' | 'student';
}

interface AuthGuardProps {
  children: React.ReactNode;
  requireAuth?: boolean;
  requireRole?: 'admin' | 'student';
}

const AuthGuard = ({ children, requireAuth = false, requireRole }: AuthGuardProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    if (!loading) {
      if (requireAuth && !user) {
        navigate('/login');
      } else if (requireRole && user?.role !== requireRole) {
        navigate('/');
      }
    }
  }, [user, loading, requireAuth, requireRole, navigate]);

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
