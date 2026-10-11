// Bolls Bible API wrapper - free, no API key needed
// Docs: https://github.com/Bolls-Bible/bain/blob/master/docs/API.md

const BOLLS_BASE = 'https://bolls.life';

// Book IDs (1-66) matching standard Bible order used by Bolls API
export const BIBLE_BOOKS = [
  { id: 1, name: 'Genesis', testament: 'old', genre: 'law', chapters: 50, verses: 1533, words: 38267 },
  { id: 2, name: 'Exodus', testament: 'old', genre: 'law', chapters: 40, verses: 1213, words: 32692 },
  { id: 3, name: 'Leviticus', testament: 'old', genre: 'law', chapters: 27, verses: 859, words: 24546 },
  { id: 4, name: 'Numbers', testament: 'old', genre: 'law', chapters: 36, verses: 1288, words: 32896 },
  { id: 5, name: 'Deuteronomy', testament: 'old', genre: 'law', chapters: 34, verses: 959, words: 28352 },
  { id: 6, name: 'Joshua', testament: 'old', genre: 'history', chapters: 24, verses: 658, words: 18858 },
  { id: 7, name: 'Judges', testament: 'old', genre: 'history', chapters: 21, verses: 618, words: 18976 },
  { id: 8, name: 'Ruth', testament: 'old', genre: 'history', chapters: 4, verses: 85, words: 2576 },
  { id: 9, name: '1 Samuel', testament: 'old', genre: 'history', chapters: 31, verses: 810, words: 25061 },
  { id: 10, name: '2 Samuel', testament: 'old', genre: 'history', chapters: 24, verses: 695, words: 20619 },
  { id: 11, name: '1 Kings', testament: 'old', genre: 'history', chapters: 22, verses: 816, words: 24524 },
  { id: 12, name: '2 Kings', testament: 'old', genre: 'history', chapters: 25, verses: 719, words: 23532 },
  { id: 13, name: '1 Chronicles', testament: 'old', genre: 'history', chapters: 29, verses: 942, words: 20369 },
  { id: 14, name: '2 Chronicles', testament: 'old', genre: 'history', chapters: 36, verses: 822, words: 26074 },
  { id: 15, name: 'Ezra', testament: 'old', genre: 'history', chapters: 10, verses: 280, words: 7441 },
  { id: 16, name: 'Nehemiah', testament: 'old', genre: 'history', chapters: 13, verses: 406, words: 10483 },
  { id: 17, name: 'Esther', testament: 'old', genre: 'history', chapters: 10, verses: 167, words: 5637 },
  { id: 18, name: 'Job', testament: 'old', genre: 'wisdom', chapters: 42, verses: 1070, words: 18098 },
  { id: 19, name: 'Psalms', testament: 'old', genre: 'wisdom', chapters: 150, verses: 2461, words: 42704 },
  { id: 20, name: 'Proverbs', testament: 'old', genre: 'wisdom', chapters: 31, verses: 915, words: 15038 },
  { id: 21, name: 'Ecclesiastes', testament: 'old', genre: 'wisdom', chapters: 12, verses: 222, words: 5583 },
  { id: 22, name: 'Song of Solomon', testament: 'old', genre: 'wisdom', chapters: 8, verses: 117, words: 2661 },
  { id: 23, name: 'Isaiah', testament: 'old', genre: 'prophecy', chapters: 66, verses: 1292, words: 37044 },
  { id: 24, name: 'Jeremiah', testament: 'old', genre: 'prophecy', chapters: 52, verses: 1364, words: 42659 },
  { id: 25, name: 'Lamentations', testament: 'old', genre: 'prophecy', chapters: 5, verses: 154, words: 3415 },
  { id: 26, name: 'Ezekiel', testament: 'old', genre: 'prophecy', chapters: 48, verses: 1273, words: 39307 },
  { id: 27, name: 'Daniel', testament: 'old', genre: 'prophecy', chapters: 12, verses: 357, words: 11506 },
  { id: 28, name: 'Hosea', testament: 'old', genre: 'prophecy', chapters: 14, verses: 197, words: 5175 },
  { id: 29, name: 'Joel', testament: 'old', genre: 'prophecy', chapters: 3, verses: 73, words: 2034 },
  { id: 30, name: 'Amos', testament: 'old', genre: 'prophecy', chapters: 9, verses: 146, words: 4217 },
  { id: 31, name: 'Obadiah', testament: 'old', genre: 'prophecy', chapters: 1, verses: 21, words: 670 },
  { id: 32, name: 'Jonah', testament: 'old', genre: 'prophecy', chapters: 4, verses: 48, words: 1321 },
  { id: 33, name: 'Micah', testament: 'old', genre: 'prophecy', chapters: 7, verses: 105, words: 3153 },
  { id: 34, name: 'Nahum', testament: 'old', genre: 'prophecy', chapters: 3, verses: 47, words: 1285 },
  { id: 35, name: 'Habakkuk', testament: 'old', genre: 'prophecy', chapters: 3, verses: 56, words: 1475 },
  { id: 36, name: 'Zephaniah', testament: 'old', genre: 'prophecy', chapters: 3, verses: 53, words: 1617 },
  { id: 37, name: 'Haggai', testament: 'old', genre: 'prophecy', chapters: 2, verses: 38, words: 1131 },
  { id: 38, name: 'Zechariah', testament: 'old', genre: 'prophecy', chapters: 14, verses: 211, words: 6444 },
  { id: 39, name: 'Malachi', testament: 'old', genre: 'prophecy', chapters: 4, verses: 55, words: 1782 },
  { id: 40, name: 'Matthew', testament: 'new', genre: 'gospel', chapters: 28, verses: 1071, words: 23243 },
  { id: 41, name: 'Mark', testament: 'new', genre: 'gospel', chapters: 16, verses: 678, words: 15171 },
  { id: 42, name: 'Luke', testament: 'new', genre: 'gospel', chapters: 24, verses: 1151, words: 25983 },
  { id: 43, name: 'John', testament: 'new', genre: 'gospel', chapters: 21, verses: 879, words: 19099 },
  { id: 44, name: 'Acts', testament: 'new', genre: 'history', chapters: 28, verses: 1007, words: 24250 },
  { id: 45, name: 'Romans', testament: 'new', genre: 'epistle', chapters: 16, verses: 433, words: 9446 },
  { id: 46, name: '1 Corinthians', testament: 'new', genre: 'epistle', chapters: 16, verses: 437, words: 9469 },
  { id: 47, name: '2 Corinthians', testament: 'new', genre: 'epistle', chapters: 13, verses: 256, words: 6091 },
  { id: 48, name: 'Galatians', testament: 'new', genre: 'epistle', chapters: 6, verses: 149, words: 3085 },
  { id: 49, name: 'Ephesians', testament: 'new', genre: 'epistle', chapters: 6, verses: 155, words: 3042 },
  { id: 50, name: 'Philippians', testament: 'new', genre: 'epistle', chapters: 4, verses: 104, words: 2185 },
  { id: 51, name: 'Colossians', testament: 'new', genre: 'epistle', chapters: 4, verses: 95, words: 1992 },
  { id: 52, name: '1 Thessalonians', testament: 'new', genre: 'epistle', chapters: 5, verses: 89, words: 1857 },
  { id: 53, name: '2 Thessalonians', testament: 'new', genre: 'epistle', chapters: 3, verses: 47, words: 1023 },
  { id: 54, name: '1 Timothy', testament: 'new', genre: 'epistle', chapters: 6, verses: 113, words: 2269 },
  { id: 55, name: '2 Timothy', testament: 'new', genre: 'epistle', chapters: 4, verses: 83, words: 1703 },
  { id: 56, name: 'Titus', testament: 'new', genre: 'epistle', chapters: 3, verses: 46, words: 921 },
  { id: 57, name: 'Philemon', testament: 'new', genre: 'epistle', chapters: 1, verses: 25, words: 445 },
  { id: 58, name: 'Hebrews', testament: 'new', genre: 'epistle', chapters: 13, verses: 303, words: 6957 },
  { id: 59, name: 'James', testament: 'new', genre: 'epistle', chapters: 5, verses: 108, words: 2314 },
  { id: 60, name: '1 Peter', testament: 'new', genre: 'epistle', chapters: 5, verses: 105, words: 2479 },
  { id: 61, name: '2 Peter', testament: 'new', genre: 'epistle', chapters: 3, verses: 61, words: 1553 },
  { id: 62, name: '1 John', testament: 'new', genre: 'epistle', chapters: 5, verses: 105, words: 2513 },
  { id: 63, name: '2 John', testament: 'new', genre: 'epistle', chapters: 1, verses: 13, words: 303 },
  { id: 64, name: '3 John', testament: 'new', genre: 'epistle', chapters: 1, verses: 14, words: 299 },
  { id: 65, name: 'Jude', testament: 'new', genre: 'epistle', chapters: 1, verses: 25, words: 613 },
  { id: 66, name: 'Revelation', testament: 'new', genre: 'prophecy', chapters: 22, verses: 404, words: 12000 },
];

// Map of common translation abbreviations
export const TRANSLATIONS = [
  { short_name: 'NIV', full_name: 'New International Version' },
  { short_name: 'KJV', full_name: 'King James Version' },
  { short_name: 'ESV', full_name: 'English Standard Version' },
  { short_name: 'NLT', full_name: 'New Living Translation' },
  { short_name: 'NKJV', full_name: 'New King James Version' },
  { short_name: 'WEB', full_name: 'World English Bible' },
  { short_name: 'YLT', full_name: "Young's Literal Translation" },
  { short_name: 'ASV', full_name: 'American Standard Version' },
  { short_name: 'NHEB', full_name: 'New Heart English Bible' },
  { short_name: 'RSV', full_name: 'Revised Standard Version' },
];

// Get book ID by name
export function getBookId(name) {
  const book = BIBLE_BOOKS.find(b => b.name.toLowerCase() === name.toLowerCase());
  return book ? book.id : null;
}

// Get book name by ID
export function getBookName(id) {
  const book = BIBLE_BOOKS.find(b => b.id === id);
  return book ? book.name : null;
}

// Get book info by ID
export function getBookInfo(id) {
  return BIBLE_BOOKS.find(b => b.id === id) || null;
}

// Fetch a chapter from Bolls API
export async function fetchChapter(translation, bookId, chapter) {
  const url = `${BOLLS_BASE}/get-text/${translation}/${bookId}/${chapter}/`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch chapter: ${response.status}`);
  }
  const verses = await response.json();
  return verses.map(v => ({
    pk: v.pk,
    verse: v.verse,
    text: v.text,
  }));
}

// Fetch chapter with commentaries
export async function fetchChapterWithComments(translation, bookId, chapter) {
  const url = `${BOLLS_BASE}/get-chapter/${translation}/${bookId}/${chapter}/`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch chapter: ${response.status}`);
  }
  return response.json();
}

// Search the Bible
export async function searchBible(translation, query, options = {}) {
  const params = new URLSearchParams({
    search: query,
    match_case: options.matchCase ? 'true' : 'false',
    match_whole: options.matchWhole ? 'true' : 'false',
  });
  if (options.page) params.set('page', options.page);
  if (options.limit) params.set('limit', options.limit);
  if (options.book) params.set('book', options.book);

  const url = `${BOLLS_BASE}/v2/find/${translation}/?${params}`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Search failed: ${response.status}`);
  }
  return response.json();
}

// Get a random verse
export async function getRandomVerse(translation = 'NIV') {
  const url = `${BOLLS_BASE}/get-random-verse/${translation}/`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to get random verse: ${response.status}`);
  }
  const verse = await response.json();
  return {
    ...verse,
    bookName: getBookName(verse.book),
  };
}

// Fetch specific verses
export async function fetchVerses(translation, bookId, chapter, verseNumbers) {
  const body = [{
    translation,
    book: bookId,
    chapter,
    verses: verseNumbers,
  }];
  const response = await fetch(`${BOLLS_BASE}/get-verses/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  if (!response.ok) {
    throw new Error(`Failed to fetch verses: ${response.status}`);
  }
  return response.json();
}

// Compare versions (parallel verses)
export async function compareVersions(translations, bookId, chapter, verseNumbers) {
  const body = {
    translations,
    verses: verseNumbers,
    book: bookId,
    chapter,
  };
  const response = await fetch(`${BOLLS_BASE}/get-parallel-verses/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  if (!response.ok) {
    throw new Error(`Failed to compare versions: ${response.status}`);
  }
  return response.json();
}

// Strip HTML tags from verse text
export function stripHtml(text) {
  const tmp = document.createElement('div');
  tmp.innerHTML = text;
  return tmp.textContent || tmp.innerText || '';
}

// Get daily verse (deterministic based on date)
export async function getDailyVerse(translation = 'NIV') {
  try {
    return await getRandomVerse(translation);
  } catch (e) {
    // Fallback to John 3:16
    return {
      book: 43,
      bookName: 'John',
      chapter: 3,
      verse: 16,
      text: 'For God so loved the world, that he gave his one and only Son, that whoever believes in him should not perish, but have eternal life.',
    };
  }
}
