/*
# Scriptura Bible App - RPC functions for counter management

Creates SECURITY DEFINER functions to safely increment/decrement counters on community tables.
These allow authenticated users to update counts (likes, comments, members, attendance) 
without needing direct UPDATE access to other users' rows.
*/

-- Increment praying count on a prayer request
CREATE OR REPLACE FUNCTION public.increment_praying(request_id uuid)
RETURNS void AS $$
BEGIN
  UPDATE public.prayer_requests SET praying_count = praying_count + 1 WHERE id = request_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Mark prayer as answered
CREATE OR REPLACE FUNCTION public.mark_prayer_as_answered(request_id uuid)
RETURNS void AS $$
BEGIN
  UPDATE public.prayer_requests SET is_answered = true, updated_at = now() WHERE id = request_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Increment/decrement discussion likes
CREATE OR REPLACE FUNCTION public.increment_discussion_likes(discussion_id uuid)
RETURNS void AS $$
BEGIN
  UPDATE public.discussions SET likes_count = likes_count + 1 WHERE id = discussion_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE FUNCTION public.decrement_discussion_likes(discussion_id uuid)
RETURNS void AS $$
BEGIN
  UPDATE public.discussions SET likes_count = GREATEST(0, likes_count - 1) WHERE id = discussion_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Increment/decrement discussion comments
CREATE OR REPLACE FUNCTION public.increment_discussion_comments(discussion_id uuid)
RETURNS void AS $$
BEGIN
  UPDATE public.discussions SET comments_count = comments_count + 1 WHERE id = discussion_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE FUNCTION public.decrement_discussion_comments(discussion_id uuid)
RETURNS void AS $$
BEGIN
  UPDATE public.discussions SET comments_count = GREATEST(0, comments_count - 1) WHERE id = discussion_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Increment/decrement comment likes
CREATE OR REPLACE FUNCTION public.increment_comment_likes(comment_id uuid)
RETURNS void AS $$
BEGIN
  UPDATE public.discussion_comments SET likes_count = likes_count + 1 WHERE id = comment_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE FUNCTION public.decrement_comment_likes(comment_id uuid)
RETURNS void AS $$
BEGIN
  UPDATE public.discussion_comments SET likes_count = GREATEST(0, likes_count - 1) WHERE id = comment_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Increment/decrement group members
CREATE OR REPLACE FUNCTION public.increment_group_members(group_id uuid)
RETURNS void AS $$
BEGIN
  UPDATE public.groups SET member_count = member_count + 1 WHERE id = group_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE FUNCTION public.decrement_group_members(group_id uuid)
RETURNS void AS $$
BEGIN
  UPDATE public.groups SET member_count = GREATEST(1, member_count - 1) WHERE id = group_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Increment/decrement event attending
CREATE OR REPLACE FUNCTION public.increment_event_attending(event_id uuid)
RETURNS void AS $$
BEGIN
  UPDATE public.events SET attending_count = attending_count + 1 WHERE id = event_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE FUNCTION public.decrement_event_attending(event_id uuid)
RETURNS void AS $$
BEGIN
  UPDATE public.events SET attending_count = GREATEST(0, attending_count - 1) WHERE id = event_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
