
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Eye, EyeOff, LogIn } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/useAuth';
import { useProfile } from '@/hooks/useProfile';

const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters')
});

type LoginFormData = z.infer<typeof loginSchema>;

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loginAttempted, setLoginAttempted] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  const { login, isAuthenticated, user } = useAuth();
  const { isAdmin, loading: profileLoading } = useProfile();

  // Redirect if already authenticated
  useEffect(() => {
    console.log('Login redirect check:', { 
      isAuthenticated, 
      user: user?.email, 
      isAdmin, 
      profileLoading,
      loginAttempted 
    });
    
    if (isAuthenticated && user && !profileLoading) {
      console.log('Conditions met for redirect. isAdmin:', isAdmin);
      
      // Add small delay to ensure state is fully updated
      setTimeout(() => {
        if (isAdmin) {
          console.log('Redirecting admin user to /admin');
          navigate('/admin', { replace: true });
        } else {
          console.log('Redirecting regular user to /');
          navigate('/', { replace: true });
        }
      }, 100);
    }
  }, [isAuthenticated, user, isAdmin, profileLoading, navigate, loginAttempted]);

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema)
  });

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    setLoginAttempted(true);
    console.log('Login attempt for:', data.email);
    
    try {
      const { error } = await login(data.email, data.password);
      
      if (error) {
        console.error('Login error:', error);
        toast({
          title: "Login Failed",
          description: error,
          variant: "destructive"
        });
        setLoginAttempted(false);
      } else {
        console.log('Login successful, waiting for profile data...');
        toast({
          title: "Login Successful",
          description: "Welcome back!",
        });
        // Don't reset loginAttempted here - let useEffect handle the redirect
      }
    } catch (error) {
      console.error('Login exception:', error);
      toast({
        title: "Login Failed",
        description: "Something went wrong. Please try again.",
        variant: "destructive"
      });
      setLoginAttempted(false);
    } finally {
      setIsLoading(false);
    }
  };

  // Don't show login form if user is already authenticated and we're processing redirect
  if (isAuthenticated && user && loginAttempted) {
    return (
      <div className="min-h-screen bg-martial-dark flex items-center justify-center">
        <div className="text-white text-xl">Redirecting...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-martial-dark flex items-center justify-center px-4">
      <Card className="w-full max-w-md bg-martial-gray border-martial-gray">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl text-white">Login</CardTitle>
          <p className="text-gray-300">Access your training account</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label className="text-gray-300">Email</Label>
              <Input
                type="email"
                placeholder="Enter your email"
                {...register('email')}
                className="bg-martial-dark border-martial-gray text-white"
              />
              {errors.email && (
                <p className="text-red-400 text-sm">{errors.email.message}</p>
              )}
            </div>
            
            <div className="space-y-2">
              <Label className="text-gray-300">Password</Label>
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  {...register('password')}
                  className="bg-martial-dark border-martial-gray text-white pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-400 text-sm">{errors.password.message}</p>
              )}
            </div>
            
            <Button 
              type="submit" 
              className="btn-primary w-full" 
              disabled={isLoading}
            >
              <LogIn size={16} className="mr-2" />
              {isLoading ? 'Logging in...' : 'Login'}
            </Button>
            
            <div className="text-center text-gray-300 text-sm">
              <p className="mb-2">Create an account to get started</p>
            </div>
            
            <div className="text-center text-gray-300">
              Don't have an account?{' '}
              <Link to="/signup" className="text-martial-purple hover:underline">
                Sign up
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
