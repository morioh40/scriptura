/*
# Make user_id nullable on community tables

Allows seed data to be inserted without a real user account.
Community tables (groups, events, discussions, prayer_requests, devotions) 
can have NULL user_id for system-created content.
*/

ALTER TABLE public.groups ALTER COLUMN user_id DROP NOT NULL;
ALTER TABLE public.events ALTER COLUMN user_id DROP NOT NULL;
ALTER TABLE public.discussions ALTER COLUMN user_id DROP NOT NULL;
ALTER TABLE public.prayer_requests ALTER COLUMN user_id DROP NOT NULL;

-- Update INSERT policies to allow NULL user_id for system content
DROP POLICY IF EXISTS "insert_groups" ON groups;
CREATE POLICY "insert_groups" ON groups FOR INSERT
  TO authenticated WITH CHECK (auth.uid() = user_id OR user_id IS NULL);

DROP POLICY IF EXISTS "insert_events" ON events;
CREATE POLICY "insert_events" ON events FOR INSERT
  TO authenticated WITH CHECK (auth.uid() = user_id OR user_id IS NULL);

DROP POLICY IF EXISTS "insert_discussions" ON discussions;
CREATE POLICY "insert_discussions" ON discussions FOR INSERT
  TO authenticated WITH CHECK (auth.uid() = user_id OR user_id IS NULL);

DROP POLICY IF EXISTS "insert_prayer_requests" ON prayer_requests;
CREATE POLICY "insert_prayer_requests" ON prayer_requests FOR INSERT
  TO authenticated WITH CHECK (auth.uid() = user_id OR user_id IS NULL);
