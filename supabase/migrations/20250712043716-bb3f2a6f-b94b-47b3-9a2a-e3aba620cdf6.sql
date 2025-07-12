-- Fix the database relationship issues
-- Add foreign key constraint between items and profiles via user_id
ALTER TABLE items 
ADD CONSTRAINT fk_items_user_id 
FOREIGN KEY (user_id) REFERENCES profiles(user_id) ON DELETE CASCADE;

-- Add foreign key constraint between items and categories
ALTER TABLE items 
ADD CONSTRAINT fk_items_category_id 
FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE SET NULL;

-- Create a favorites table for users to save favorite items
CREATE TABLE public.favorites (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  item_id UUID NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, item_id)
);

-- Enable RLS on favorites table
ALTER TABLE public.favorites ENABLE ROW LEVEL SECURITY;

-- Create policies for favorites table
CREATE POLICY "Users can view their own favorites" 
ON public.favorites 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can add their own favorites" 
ON public.favorites 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can remove their own favorites" 
ON public.favorites 
FOR DELETE 
USING (auth.uid() = user_id);

-- Add foreign key constraints for favorites
ALTER TABLE favorites 
ADD CONSTRAINT fk_favorites_user_id 
FOREIGN KEY (user_id) REFERENCES profiles(user_id) ON DELETE CASCADE;

ALTER TABLE favorites 
ADD CONSTRAINT fk_favorites_item_id 
FOREIGN KEY (item_id) REFERENCES items(id) ON DELETE CASCADE;