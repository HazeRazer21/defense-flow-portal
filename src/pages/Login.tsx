
import { useState } from 'react';
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

const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters')
});

type LoginFormData = z.infer<typeof loginSchema>;

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema)
  });

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    console.log('Login attempt:', data);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock authentication - in real app, this would validate against backend
      if (data.email === 'admin@martialarts.com' && data.password === 'admin123') {
        localStorage.setItem('user', JSON.stringify({ 
          email: data.email, 
          role: 'admin',
          name: 'Admin User'
        }));
        toast({
          title: "Login Successful",
          description: "Welcome back! Redirecting to dashboard...",
        });
        setTimeout(() => navigate('/admin'), 1500);
      } else if (data.email && data.password) {
        localStorage.setItem('user', JSON.stringify({ 
          email: data.email, 
          role: 'student',
          name: 'Student User'
        }));
        toast({
          title: "Login Successful",
          description: "Welcome back! Redirecting to classes...",
        });
        setTimeout(() => navigate('/classes'), 1500);
      } else {
        throw new Error('Invalid credentials');
      }
    } catch (error) {
      toast({
        title: "Login Failed",
        description: "Invalid email or password. Try admin@martialarts.com / admin123",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

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
              <p className="mb-2">Demo credentials:</p>
              <p>Admin: admin@martialarts.com / admin123</p>
              <p>Student: any@email.com / password123</p>
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
