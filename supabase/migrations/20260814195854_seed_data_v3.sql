/*
# Scriptura Bible App - Seed Data

Seeds initial community data: devotions, groups, events, discussions, and prayer requests.
*/

-- Insert sample devotions
INSERT INTO public.devotions (title, content, scripture_ref, scripture_text, devotion_date, author_name)
VALUES
  ('Trust in the Lord', 'Trust in the LORD with all your heart and lean not on your own understanding; in all your ways submit to him, and he will make your paths straight. In times of uncertainty, we are called to rely not on our own limited perspective but on God''s infinite wisdom. When we surrender our plans to Him, He guides us in ways we could never imagine.', 'Proverbs 3:5-6', 'Trust in the LORD with all your heart and lean not on your own understanding; in all your ways submit to him, and he will make your paths straight.', CURRENT_DATE, 'Scriptura'),
  ('Finding Peace in Chaos', 'Peace I leave with you; my peace I give you. I do not give to you as the world gives. Do not let your hearts be troubled and do not be afraid. In our fast-paced world, true peace can only be found in Christ. Take time today to sit quietly in His presence and let His peace wash over you.', 'John 14:27', 'Peace I leave with you; my peace I give you. I do not give to you as the world gives. Do not let your hearts be troubled and do not be afraid.', CURRENT_DATE - 1, 'Scriptura'),
  ('The Power of Prayer', 'Do not be anxious about anything, but in every situation, by prayer and petition, with thanksgiving, present your requests to God. And the peace of God, which transcends all understanding, will guard your hearts and your minds in Christ Jesus.', 'Philippians 4:6-7', 'Do not be anxious about anything, but in every situation, by prayer and petition, with thanksgiving, present your requests to God.', CURRENT_DATE - 2, 'Scriptura')
ON CONFLICT DO NOTHING;

-- Insert sample groups
INSERT INTO public.groups (name, description, icon, member_count, user_id)
SELECT 'Prayer Warriors', 'A group dedicated to praying for one another and sharing prayer requests.', 'fa-hands-praying', 243, NULL
WHERE NOT EXISTS (SELECT 1 FROM public.groups WHERE name = 'Prayer Warriors');

INSERT INTO public.groups (name, description, icon, member_count, user_id)
SELECT 'Bible Study Group', 'Weekly virtual Bible study exploring books of the Bible together.', 'fa-book', 187, NULL
WHERE NOT EXISTS (SELECT 1 FROM public.groups WHERE name = 'Bible Study Group');

INSERT INTO public.groups (name, description, icon, member_count, user_id)
SELECT 'Christian Marriage', 'Support and discussion for married couples seeking to strengthen their relationship.', 'fa-ring', 156, NULL
WHERE NOT EXISTS (SELECT 1 FROM public.groups WHERE name = 'Christian Marriage');

INSERT INTO public.groups (name, description, icon, member_count, user_id)
SELECT 'Young Adults', 'Community for young adults navigating faith, career, and relationships.', 'fa-graduation-cap', 321, NULL
WHERE NOT EXISTS (SELECT 1 FROM public.groups WHERE name = 'Young Adults');

INSERT INTO public.groups (name, description, icon, member_count, user_id)
SELECT 'Serving Together', 'Organizing local service opportunities and mission projects.', 'fa-hands-helping', 134, NULL
WHERE NOT EXISTS (SELECT 1 FROM public.groups WHERE name = 'Serving Together');

INSERT INTO public.groups (name, description, icon, member_count, user_id)
SELECT 'Worship & Music', 'Sharing worship music, hymns, and discussing the role of music in faith.', 'fa-music', 210, NULL
WHERE NOT EXISTS (SELECT 1 FROM public.groups WHERE name = 'Worship & Music');

-- Insert sample events
INSERT INTO public.events (title, description, event_date, event_time, location, is_virtual, attending_count, user_id)
SELECT 'Virtual Prayer Night', 'Join us for a night of prayer and worship. We''ll be praying for our community, our leaders, and personal requests. All are welcome!', CURRENT_DATE + 7, '7:00 PM EST', 'Zoom', true, 48, NULL
WHERE NOT EXISTS (SELECT 1 FROM public.events WHERE title = 'Virtual Prayer Night');

INSERT INTO public.events (title, description, event_date, event_time, location, is_virtual, attending_count, user_id)
SELECT 'Bible Study: Book of James', 'Join our 6-week study on the Book of James. We''ll explore practical faith and how to live out our beliefs in daily life. No prior Bible study experience needed!', CURRENT_DATE + 12, '7:00 PM EST', 'Zoom', true, 32, NULL
WHERE NOT EXISTS (SELECT 1 FROM public.events WHERE title = 'Bible Study: Book of James');

INSERT INTO public.events (title, description, event_date, event_time, location, is_virtual, attending_count, user_id)
SELECT 'Community Service Day', 'We''re partnering with local food banks to serve our community. Join us for a day of service and making a difference. All ages welcome!', CURRENT_DATE + 22, '9:00 AM - 2:00 PM EST', 'City Community Center', false, 27, NULL
WHERE NOT EXISTS (SELECT 1 FROM public.events WHERE title = 'Community Service Day');

INSERT INTO public.events (title, description, event_date, event_time, location, is_virtual, attending_count, user_id)
SELECT 'Women''s Retreat', 'A weekend retreat for women to connect, reflect, and grow in faith. Featuring guest speakers, worship, and small group discussions.', CURRENT_DATE + 32, 'All weekend', 'Mountain View Retreat Center', false, 18, NULL
WHERE NOT EXISTS (SELECT 1 FROM public.events WHERE title = 'Women''s Retreat');

-- Insert sample discussions
INSERT INTO public.discussions (title, content, author_name, likes_count, comments_count, user_id)
SELECT 'How do I strengthen my faith during difficult times?', 'I''ve been going through a difficult season and sometimes my faith feels weak. What practices or habits help you stay strong in your faith when life gets hard?', 'Sarah', 24, 8, NULL
WHERE NOT EXISTS (SELECT 1 FROM public.discussions WHERE title = 'How do I strengthen my faith during difficult times?');

INSERT INTO public.discussions (title, content, author_name, likes_count, comments_count, user_id)
SELECT 'Favorite Bible verse and why', 'What''s your favorite Bible verse and what makes it special to you? I''ll start - mine is Jeremiah 29:11 because it reminded me of God''s good plans for me during a difficult season of unemployment.', 'Sarah', 32, 47, NULL
WHERE NOT EXISTS (SELECT 1 FROM public.discussions WHERE title = 'Favorite Bible verse and why');

INSERT INTO public.discussions (title, content, author_name, likes_count, comments_count, user_id)
SELECT 'How do you maintain consistent prayer life?', 'I struggle with maintaining a consistent prayer routine. What practical tips do you have for making prayer a regular habit? Do you use prayer journals, apps, or specific methods?', 'Michael', 18, 29, NULL
WHERE NOT EXISTS (SELECT 1 FROM public.discussions WHERE title = 'How do you maintain consistent prayer life?');

INSERT INTO public.discussions (title, content, author_name, likes_count, comments_count, user_id)
SELECT 'Dealing with doubt in faith', 'I''ve been experiencing doubts about my faith recently. Has anyone else gone through this? How did you work through it while maintaining your relationship with God?', 'Robert', 10, 15, NULL
WHERE NOT EXISTS (SELECT 1 FROM public.discussions WHERE title = 'Dealing with doubt in faith');

-- Insert sample prayer requests
INSERT INTO public.prayer_requests (title, content, author_name, is_public, praying_count, user_id)
SELECT 'Healing for My Father', 'My father was recently diagnosed with cancer and will begin chemotherapy next week. Please pray for healing, strength for our family, and wisdom for his doctors.', 'Sarah', true, 24, NULL
WHERE NOT EXISTS (SELECT 1 FROM public.prayer_requests WHERE title = 'Healing for My Father');

INSERT INTO public.prayer_requests (title, content, author_name, is_public, praying_count, user_id)
SELECT 'Job Opportunity', 'I have a final interview tomorrow for a position that would be perfect for my skills and would allow me to better provide for my family. Pray for clarity, confidence, and God''s will to be done.', 'Michael', true, 17, NULL
WHERE NOT EXISTS (SELECT 1 FROM public.prayer_requests WHERE title = 'Job Opportunity');

INSERT INTO public.prayer_requests (title, content, author_name, is_public, is_answered, praying_count, user_id)
SELECT 'Marriage Restoration', 'Thank you to everyone who prayed for my marriage. After months of separation, my husband and I have decided to pursue counseling and work on our relationship. We still have a long way to go, but this is a miracle answer to prayer!', 'Jessica', true, true, 42, NULL
WHERE NOT EXISTS (SELECT 1 FROM public.prayer_requests WHERE title = 'Marriage Restoration');
