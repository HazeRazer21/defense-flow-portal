
-- Update the first user in profiles table to have admin role
-- This assumes you have at least one user registered
UPDATE public.profiles 
SET role = 'admin' 
WHERE id = (
  SELECT id 
  FROM public.profiles 
  ORDER BY created_at ASC 
  LIMIT 1
);

-- Alternative: If you know your user email, you can use this instead:
-- UPDATE public.profiles 
-- SET role = 'admin' 
-- WHERE email = 'your-email@example.com';
