-- Add last_seen column to profiles table
ALTER TABLE public.profiles 
ADD COLUMN last_seen TIMESTAMP WITH TIME ZONE DEFAULT now();

-- Create index for better performance
CREATE INDEX idx_profiles_last_seen ON public.profiles(last_seen);

-- Create function to update last_seen
CREATE OR REPLACE FUNCTION public.update_last_seen()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  UPDATE public.profiles
  SET last_seen = now()
  WHERE id = auth.uid();
END;
$$;

-- Grant execute permission to authenticated users
GRANT EXECUTE ON FUNCTION public.update_last_seen() TO authenticated;