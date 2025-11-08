-- Drop the existing public policy
DROP POLICY IF EXISTS "Herkes profilleri görebilir" ON public.profiles;

-- Create a new policy that requires authentication
CREATE POLICY "Authenticated users can view profiles"
ON public.profiles
FOR SELECT
TO authenticated
USING (true);