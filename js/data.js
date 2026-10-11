import { supabase } from './supabase-client.js';
import { getCurrentUser } from './auth.js';

// ============ BOOKMARKS ============
export async function getBookmarks() {
  const user = await getCurrentUser();
  if (!user) return [];
  const { data, error } = await supabase
    .from('bookmarks')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false });
  if (error) throw error;
  return data;
}

export async function addBookmark(bookId, bookName, chapter, verse, verseText, translation, note = '') {
  const user = await getCurrentUser();
  if (!user) throw new Error('Not authenticated');
  const { data, error } = await supabase
    .from('bookmarks')
    .insert({ book_id: bookId, book_name: bookName, chapter, verse, verse_text: verseText, translation, note })
    .select()
    .maybeSingle();
  if (error) throw error;
  return data;
}

export async function deleteBookmark(id) {
  const { error } = await supabase.from('bookmarks').delete().eq('id', id);
  if (error) throw error;
}

export async function isBookmarked(bookId, chapter, verse) {
  const user = await getCurrentUser();
  if (!user) return false;
  const { data } = await supabase
    .from('bookmarks')
    .select('id')
    .eq('user_id', user.id)
    .eq('book_id', bookId)
    .eq('chapter', chapter)
    .eq('verse', verse)
    .maybeSingle();
  return !!data;
}

// ============ HIGHLIGHTS ============
export async function getHighlights() {
  const user = await getCurrentUser();
  if (!user) return [];
  const { data, error } = await supabase
    .from('highlights')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false });
  if (error) throw error;
  return data;
}

export async function addHighlight(bookId, bookName, chapter, verse, verseText, translation, color = 'yellow') {
  const user = await getCurrentUser();
  if (!user) throw new Error('Not authenticated');
  const { data, error } = await supabase
    .from('highlights')
    .insert({ book_id: bookId, book_name: bookName, chapter, verse, verse_text: verseText, translation, color })
    .select()
    .maybeSingle();
  if (error) throw error;
  return data;
}

export async function deleteHighlight(id) {
  const { error } = await supabase.from('highlights').delete().eq('id', id);
  if (error) throw error;
}

// ============ PRAYERS ============
export async function getPrayers() {
  const user = await getCurrentUser();
  if (!user) return [];
  const { data, error } = await supabase
    .from('prayers')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false });
  if (error) throw error;
  return data;
}

export async function addPrayer(title, content, category = 'petition') {
  const user = await getCurrentUser();
  if (!user) throw new Error('Not authenticated');
  const { data, error } = await supabase
    .from('prayers')
    .insert({ title, content, category })
    .select()
    .maybeSingle();
  if (error) throw error;
  return data;
}

export async function updatePrayer(id, updates) {
  const { data, error } = await supabase
    .from('prayers')
    .update(updates)
    .eq('id', id)
    .select()
    .maybeSingle();
  if (error) throw error;
  return data;
}

export async function deletePrayer(id) {
  const { error } = await supabase.from('prayers').delete().eq('id', id);
  if (error) throw error;
}

// ============ PRAYER REQUESTS (COMMUNITY) ============
export async function getPrayerRequests() {
  const { data, error } = await supabase
    .from('prayer_requests')
    .select('*')
    .eq('is_public', true)
    .order('created_at', { ascending: false });
  if (error) throw error;
  return data;
}

export async function addPrayerRequest(title, content, isPublic = true) {
  const user = await getCurrentUser();
  if (!user) throw new Error('Not authenticated');
  const { data: profile } = await supabase
    .from('profiles')
    .select('full_name')
    .eq('id', user.id)
    .maybeSingle();
  const { data, error } = await supabase
    .from('prayer_requests')
    .insert({
      title, content, is_public: isPublic,
      author_name: profile?.full_name || user.email?.split('@')[0] || 'Anonymous',
    })
    .select()
    .maybeSingle();
  if (error) throw error;
  return data;
}

export async function markPrayerAnswered(id) {
  const { data, error } = await supabase
    .from('prayer_requests')
    .update({ is_answered: true, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .maybeSingle();
  if (error) throw error;
  return data;
}

export async function prayForRequest(id) {
  const { data, error } = await supabase.rpc('increment_praying', { request_id: id });
  if (error) {
    // Fallback: manual increment
    const { data: req } = await supabase.from('prayer_requests').select('praying_count').eq('id', id).maybeSingle();
    if (req) {
      await supabase.from('prayer_requests').update({ praying_count: req.praying_count + 1 }).eq('id', id);
    }
  }
  return data;
}

// ============ PRAYER JOURNALS ============
export async function getJournalEntries() {
  const user = await getCurrentUser();
  if (!user) return [];
  const { data, error } = await supabase
    .from('prayer_journals')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false });
  if (error) throw error;
  return data;
}

export async function addJournalEntry(title, content, bibleVerse = '') {
  const user = await getCurrentUser();
  if (!user) throw new Error('Not authenticated');
  const { data, error } = await supabase
    .from('prayer_journals')
    .insert({ title, content, bible_verse: bibleVerse })
    .select()
    .maybeSingle();
  if (error) throw error;
  return data;
}

export async function deleteJournalEntry(id) {
  const { error } = await supabase.from('prayer_journals').delete().eq('id', id);
  if (error) throw error;
}

// ============ DISCUSSIONS ============
export async function getDiscussions() {
  const { data, error } = await supabase
    .from('discussions')
    .select('*')
    .order('created_at', { ascending: false });
  if (error) throw error;
  return data;
}

export async function getJoinedDiscussions() {
  const user = await getCurrentUser();
  if (!user) return [];
  // Get discussions the user has commented on or liked
  const { data: comments } = await supabase
    .from('discussion_comments')
    .select('discussion_id')
    .eq('user_id', user.id);
  const { data: likes } = await supabase
    .from('discussion_likes')
    .select('discussion_id')
    .eq('user_id', user.id);
  const { data: ownDiscussions } = await supabase
    .from('discussions')
    .select('id')
    .eq('user_id', user.id);

  const joinedIds = new Set([
    ...(comments || []).map(c => c.discussion_id),
    ...(likes || []).map(l => l.discussion_id),
    ...(ownDiscussions || []).map(d => d.id),
  ]);

  if (joinedIds.size === 0) return [];

  const { data, error } = await supabase
    .from('discussions')
    .select('*')
    .in('id', [...joinedIds])
    .order('created_at', { ascending: false });
  if (error) throw error;
  return data;
}

export async function addDiscussion(title, content) {
  const user = await getCurrentUser();
  if (!user) throw new Error('Not authenticated');
  const { data: profile } = await supabase
    .from('profiles')
    .select('full_name')
    .eq('id', user.id)
    .maybeSingle();
  const { data, error } = await supabase
    .from('discussions')
    .insert({
      title, content,
      author_name: profile?.full_name || user.email?.split('@')[0] || 'Anonymous',
    })
    .select()
    .maybeSingle();
  if (error) throw error;
  return data;
}

export async function deleteDiscussion(id) {
  const { error } = await supabase.from('discussions').delete().eq('id', id);
  if (error) throw error;
}

export async function likeDiscussion(discussionId) {
  const user = await getCurrentUser();
  if (!user) throw new Error('Not authenticated');
  const { data: existing } = await supabase
    .from('discussion_likes')
    .select('id')
    .eq('user_id', user.id)
    .eq('discussion_id', discussionId)
    .maybeSingle();
  if (existing) {
    await supabase.from('discussion_likes').delete().eq('id', existing.id);
    await supabase.rpc('decrement_discussion_likes', { discussion_id: discussionId });
    return { liked: false };
  } else {
    await supabase.from('discussion_likes').insert({ discussion_id: discussionId });
    await supabase.rpc('increment_discussion_likes', { discussion_id: discussionId });
    return { liked: true };
  }
}

// ============ DISCUSSION COMMENTS ============
export async function getComments(discussionId) {
  const { data, error } = await supabase
    .from('discussion_comments')
    .select('*')
    .eq('discussion_id', discussionId)
    .order('created_at', { ascending: true });
  if (error) throw error;
  return data;
}

export async function addComment(discussionId, content) {
  const user = await getCurrentUser();
  if (!user) throw new Error('Not authenticated');
  const { data: profile } = await supabase
    .from('profiles')
    .select('full_name')
    .eq('id', user.id)
    .maybeSingle();
  const { data, error } = await supabase
    .from('discussion_comments')
    .insert({
      discussion_id: discussionId, content,
      author_name: profile?.full_name || user.email?.split('@')[0] || 'Anonymous',
    })
    .select()
    .maybeSingle();
  if (error) throw error;
  // Increment comment count
  await supabase.rpc('increment_discussion_comments', { discussion_id: discussionId });
  return data;
}

// ============ GROUPS ============
export async function getGroups() {
  const { data, error } = await supabase
    .from('groups')
    .select('*')
    .order('created_at', { ascending: false });
  if (error) throw error;
  return data;
}

export async function getJoinedGroups() {
  const user = await getCurrentUser();
  if (!user) return [];
  const { data, error } = await supabase
    .from('group_members')
    .select('group_id')
    .eq('user_id', user.id);
  if (error) throw error;
  if (!data || data.length === 0) return [];
  const groupIds = data.map(g => g.group_id);
  const { data: groups, error: gErr } = await supabase
    .from('groups')
    .select('*')
    .in('id', groupIds);
  if (gErr) throw gErr;
  return groups;
}

export async function joinGroup(groupId) {
  const user = await getCurrentUser();
  if (!user) throw new Error('Not authenticated');
  const { error } = await supabase
    .from('group_members')
    .insert({ group_id: groupId });
  if (error && !error.message.includes('duplicate')) throw error;
  await supabase.rpc('increment_group_members', { group_id: groupId });
  return true;
}

export async function leaveGroup(groupId) {
  const user = await getCurrentUser();
  if (!user) throw new Error('Not authenticated');
  const { error } = await supabase
    .from('group_members')
    .delete()
    .eq('group_id', groupId)
    .eq('user_id', user.id);
  if (error) throw error;
  await supabase.rpc('decrement_group_members', { group_id: groupId });
  return true;
}

export async function isGroupMember(groupId) {
  const user = await getCurrentUser();
  if (!user) return false;
  const { data } = await supabase
    .from('group_members')
    .select('id')
    .eq('group_id', groupId)
    .eq('user_id', user.id)
    .maybeSingle();
  return !!data;
}

// ============ EVENTS ============
export async function getEvents() {
  const { data, error } = await supabase
    .from('events')
    .select('*')
    .order('event_date', { ascending: true });
  if (error) throw error;
  return data;
}

export async function attendEvent(eventId) {
  const user = await getCurrentUser();
  if (!user) throw new Error('Not authenticated');
  const { error } = await supabase
    .from('event_attendance')
    .insert({ event_id: eventId });
  if (error && !error.message.includes('duplicate')) throw error;
  await supabase.rpc('increment_event_attending', { event_id: eventId });
  return true;
}

export async function unattendEvent(eventId) {
  const user = await getCurrentUser();
  if (!user) throw new Error('Not authenticated');
  const { error } = await supabase
    .from('event_attendance')
    .delete()
    .eq('event_id', eventId)
    .eq('user_id', user.id);
  if (error) throw error;
  await supabase.rpc('decrement_event_attending', { event_id: eventId });
  return true;
}

export async function isAttending(eventId) {
  const user = await getCurrentUser();
  if (!user) return false;
  const { data } = await supabase
    .from('event_attendance')
    .select('id')
    .eq('event_id', eventId)
    .eq('user_id', user.id)
    .maybeSingle();
  return !!data;
}

// ============ NOTIFICATIONS ============
export async function getNotifications() {
  const user = await getCurrentUser();
  if (!user) return [];
  const { data, error } = await supabase
    .from('notifications')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false });
  if (error) throw error;
  return data;
}

export async function markNotificationRead(id) {
  const { error } = await supabase
    .from('notifications')
    .update({ is_read: true })
    .eq('id', id);
  if (error) throw error;
}

export async function markAllNotificationsRead() {
  const user = await getCurrentUser();
  if (!user) return;
  const { error } = await supabase
    .from('notifications')
    .update({ is_read: true })
    .eq('user_id', user.id)
    .eq('is_read', false);
  if (error) throw error;
}

export async function deleteNotification(id) {
  const { error } = await supabase.from('notifications').delete().eq('id', id);
  if (error) throw error;
}

export async function addNotification(type, title, message, isUrgent = false) {
  const user = await getCurrentUser();
  if (!user) throw new Error('Not authenticated');
  const { data, error } = await supabase
    .from('notifications')
    .insert({ type, title, message, is_urgent: isUrgent })
    .select()
    .maybeSingle();
  if (error) throw error;
  return data;
}

// ============ DEVOTIONS ============
export async function getDevotions() {
  const { data, error } = await supabase
    .from('devotions')
    .select('*')
    .order('devotion_date', { ascending: false })
    .limit(10);
  if (error) throw error;
  return data;
}

export async function getTodaysDevotion() {
  const today = new Date().toISOString().split('T')[0];
  const { data, error } = await supabase
    .from('devotions')
    .select('*')
    .eq('devotion_date', today)
    .maybeSingle();
  if (error) throw error;
  return data;
}

// ============ BOOK LIKES ============
export async function getBookLikes(bookId) {
  const { count, error } = await supabase
    .from('book_likes')
    .select('*', { count: 'exact', head: true })
    .eq('book_id', bookId);
  if (error) return 0;
  return count;
}

export async function toggleBookLike(bookId, bookName) {
  const user = await getCurrentUser();
  if (!user) throw new Error('Not authenticated');
  const { data: existing } = await supabase
    .from('book_likes')
    .select('id')
    .eq('user_id', user.id)
    .eq('book_id', bookId)
    .maybeSingle();
  if (existing) {
    await supabase.from('book_likes').delete().eq('id', existing.id);
    return { liked: false };
  } else {
    await supabase.from('book_likes').insert({ book_id: bookId, book_name: bookName });
    return { liked: true };
  }
}

export async function isBookLiked(bookId) {
  const user = await getCurrentUser();
  if (!user) return false;
  const { data } = await supabase
    .from('book_likes')
    .select('id')
    .eq('user_id', user.id)
    .eq('book_id', bookId)
    .maybeSingle();
  return !!data;
}

// ============ READING PROGRESS ============
export async function updateReadingProgress(bookId, bookName, chapter) {
  const user = await getCurrentUser();
  if (!user) return;
  const { data: existing } = await supabase
    .from('user_reading_progress')
    .select('id')
    .eq('user_id', user.id)
    .eq('book_id', bookId)
    .maybeSingle();
  if (existing) {
    await supabase
      .from('user_reading_progress')
      .update({ chapter, last_read: new Date().toISOString() })
      .eq('id', existing.id);
  } else {
    await supabase
      .from('user_reading_progress')
      .insert({ book_id: bookId, book_name: bookName, chapter });
  }
}

export async function getReadingProgress() {
  const user = await getCurrentUser();
  if (!user) return [];
  const { data, error } = await supabase
    .from('user_reading_progress')
    .select('*')
    .eq('user_id', user.id)
    .order('last_read', { ascending: false });
  if (error) throw error;
  return data;
}

// ============ CHATBOT ============
export async function getChatHistory() {
  const user = await getCurrentUser();
  if (!user) return [];
  const { data, error } = await supabase
    .from('chatbot_conversations')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: true })
    .limit(50);
  if (error) throw error;
  return data;
}

export async function saveChatMessage(role, content) {
  const user = await getCurrentUser();
  if (!user) return;
  const { error } = await supabase
    .from('chatbot_conversations')
    .insert({ role, content });
  if (error) throw error;
}

export async function clearChatHistory() {
  const user = await getCurrentUser();
  if (!user) return;
  const { error } = await supabase
    .from('chatbot_conversations')
    .delete()
    .eq('user_id', user.id);
  if (error) throw error;
}
