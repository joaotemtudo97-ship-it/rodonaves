-- Run this script in your Supabase SQL Editor

-- 1. Create the packages table
CREATE TABLE IF NOT EXISTS public.packages (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  tracking_code text UNIQUE NOT NULL,
  sender_name text NOT NULL,
  sender_city text NOT NULL,
  sender_cep text NOT NULL,
  recipient_name text NOT NULL,
  recipient_city text NOT NULL,
  recipient_cep text NOT NULL,
  weight numeric NOT NULL,
  posted_at timestamp with time zone NOT NULL,
  created_at timestamp with time zone DEFAULT now()
);

-- 2. Create the package_updates table
CREATE TABLE IF NOT EXISTS public.package_updates (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  package_id uuid REFERENCES public.packages(id) ON DELETE CASCADE,
  status text NOT NULL,
  location text NOT NULL,
  scheduled_for timestamp with time zone NOT NULL,
  created_at timestamp with time zone DEFAULT now()
);

-- 3. Enable RLS (Row Level Security) - simple open policies for demo purposes
ALTER TABLE public.packages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.package_updates ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow anonymous read access to packages"
ON public.packages FOR SELECT TO anon USING (true);

CREATE POLICY "Allow anonymous insert access to packages"
ON public.packages FOR INSERT TO anon WITH CHECK (true);

CREATE POLICY "Allow anonymous read access to package_updates"
ON public.package_updates FOR SELECT TO anon USING (true);

CREATE POLICY "Allow anonymous insert access to package_updates"
ON public.package_updates FOR INSERT TO anon WITH CHECK (true);
