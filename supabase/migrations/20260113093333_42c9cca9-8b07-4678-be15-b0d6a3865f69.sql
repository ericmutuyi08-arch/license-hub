-- Create storage bucket for gift card images
INSERT INTO storage.buckets (id, name, public)
VALUES ('gift-cards', 'gift-cards', true);

-- Allow public read access to gift card images
CREATE POLICY "Gift card images are publicly accessible"
ON storage.objects FOR SELECT
USING (bucket_id = 'gift-cards');

-- Allow admins to upload gift card images
CREATE POLICY "Admins can upload gift card images"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'gift-cards' AND public.has_role(auth.uid(), 'admin'));

-- Allow admins to update gift card images
CREATE POLICY "Admins can update gift card images"
ON storage.objects FOR UPDATE
USING (bucket_id = 'gift-cards' AND public.has_role(auth.uid(), 'admin'));

-- Allow admins to delete gift card images
CREATE POLICY "Admins can delete gift card images"
ON storage.objects FOR DELETE
USING (bucket_id = 'gift-cards' AND public.has_role(auth.uid(), 'admin'));