
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Eye, EyeOff, UserPlus } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

const signupSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type SignupFormData = z.infer<typeof signupSchema>;

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema)
  });

  const onSubmit = async (data: SignupFormData) => {
    setIsLoading(true);
    console.log('Signup attempt:', data);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock user creation - in real app, this would create user in backend
      const newUser = {
        email: data.email,
        name: data.name,
        role: 'student'
      };
      
      localStorage.setItem('user', JSON.stringify(newUser));
      
      toast({
        title: "Account Created Successfully!",
        description: "Welcome to Martial Arts Academy. Redirecting to classes...",
      });
      
      setTimeout(() => navigate('/classes'), 1500);
    } catch (error) {
      toast({
        title: "Signup Failed",
        description: "Something went wrong. Please try again.",
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
          <CardTitle className="text-2xl text-white">Sign Up</CardTitle>
          <p className="text-gray-300">Create your training account</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label className="text-gray-300">Full Name</Label>
              <Input
                type="text"
                placeholder="Enter your full name"
                {...register('name')}
                className="bg-martial-dark border-martial-gray text-white"
              />
              {errors.name && (
                <p className="text-red-400 text-sm">{errors.name.message}</p>
              )}
            </div>
            
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
                  placeholder="Create a password"
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
            
            <div className="space-y-2">
              <Label className="text-gray-300">Confirm Password</Label>
              <Input
                type="password"
                placeholder="Confirm your password"
                {...register('confirmPassword')}
                className="bg-martial-dark border-martial-gray text-white"
              />
              {errors.confirmPassword && (
                <p className="text-red-400 text-sm">{errors.confirmPassword.message}</p>
              )}
            </div>
            
            <Button 
              type="submit" 
              className="btn-primary w-full" 
              disabled={isLoading}
            >
              <UserPlus size={16} className="mr-2" />
              {isLoading ? 'Creating Account...' : 'Sign Up'}
            </Button>
            
            <div className="text-center text-gray-300">
              Already have an account?{' '}
              <Link to="/login" className="text-martial-purple hover:underline">
                Login
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Signup;
