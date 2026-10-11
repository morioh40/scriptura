import { supabase } from './supabase-client.js';
import { getCurrentUser, getSession } from './auth.js';

// ============ TOAST NOTIFICATION ============
export function showToast(message, type = 'success') {
  const toast = document.createElement('div');
  toast.style.cssText = `
    position: fixed; top: 20px; right: 20px; z-index: 9999;
    padding: 12px 24px; border-radius: 8px; font-size: 0.9rem; font-weight: 500;
    color: white; box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    transition: all 0.3s ease; max-width: 350px;
    background: ${type === 'success' ? '#28a745' : type === 'error' ? '#dc3545' : type === 'warning' ? '#ffc107' : '#3a6b7e'};
  `;
  toast.textContent = message;
  document.body.appendChild(toast);
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(20px)';
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

// ============ NAVIGATION ============
export function navigateTo(page) {
  window.location.href = page;
}

// ============ HEADER USER INFO ============
export async function updateHeaderUser() {
  const session = await getSession();
  if (!session) return;

  const user = await getCurrentUser();
  if (!user) return;

  const profileBtn = document.getElementById('profile-btn');
  if (profileBtn) {
    const { data: profile } = await supabase
      .from('profiles')
      .select('full_name, avatar_url')
      .eq('id', user.id)
      .maybeSingle();

    if (profile && profile.full_name) {
      const initials = profile.full_name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
      profileBtn.innerHTML = `<div style="width:32px;height:32px;border-radius:50%;background:rgba(255,255,255,0.2);display:flex;align-items:center;justify-content:center;font-size:0.8rem;font-weight:600;">${initials}</div>`;
    }
  }
}

// ============ NOTIFICATION BADGE ============
export async function updateNotificationBadge() {
  const session = await getSession();
  if (!session) return;

  const { count } = await supabase
    .from('notifications')
    .select('*', { count: 'exact', head: true })
    .eq('user_id', session.user.id)
    .eq('is_read', false);

  const notifBtn = document.getElementById('notifications-btn');
  if (notifBtn && count > 0) {
    if (!notifBtn.querySelector('.notif-badge')) {
      const badge = document.createElement('span');
      badge.className = 'notif-badge';
      badge.style.cssText = 'position:absolute;top:-5px;right:-5px;background:#dc3545;color:white;border-radius:50%;width:18px;height:18px;font-size:0.65rem;display:flex;align-items:center;justify-content:center;font-weight:600;';
      badge.textContent = count > 9 ? '9+' : count;
      notifBtn.style.position = 'relative';
      notifBtn.appendChild(badge);
    } else {
      notifBtn.querySelector('.notif-badge').textContent = count > 9 ? '9+' : count;
    }
  }
}

// ============ FORMAT TIME ============
export function formatTime(timestamp) {
  const now = Date.now();
  const diff = now - new Date(timestamp).getTime();
  if (diff < 60000) return 'Just now';
  if (diff < 3600000) return `${Math.floor(diff / 60000)} minutes ago`;
  if (diff < 86400000) return `${Math.floor(diff / 3600000)} hours ago`;
  if (diff < 604800000) return `${Math.floor(diff / 86400000)} days ago`;
  return new Date(timestamp).toLocaleDateString();
}

// ============ FORMAT DATE ============
export function formatDate(dateStr) {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}

// ============ HTML ESCAPE ============
export function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

// ============ INITIALIZE COMMON ============
export async function initApp() {
  // Wire up navigation buttons
  const navItems = document.querySelectorAll('.nav-item');
  navItems.forEach(item => {
    const label = item.querySelector('span');
    if (label) {
      const text = label.textContent.toLowerCase();
      item.addEventListener('click', (e) => {
        e.preventDefault();
        const pageMap = {
          'home': 'index.html',
          'bible': 'bible.html',
          'prayer': 'prayer.html',
          'community': 'community.html',
          'profile': 'profile.html',
          'audio': 'audio-bible.html',
          'notifications': 'notifications.html',
          'legal': 'terms-privacy-policy.html',
        };
        if (pageMap[text]) {
          navigateTo(pageMap[text]);
        }
      });
    }
  });

  // Wire up profile button
  const profileBtn = document.getElementById('profile-btn');
  if (profileBtn) {
    profileBtn.addEventListener('click', () => navigateTo('profile.html'));
  }

  // Wire up notifications button
  const notifBtn = document.getElementById('notifications-btn');
  if (notifBtn) {
    notifBtn.addEventListener('click', () => navigateTo('notifications.html'));
  }

  // Wire up search button
  const searchBtn = document.getElementById('search-btn');
  if (searchBtn) {
    searchBtn.addEventListener('click', () => {
      navigateTo('books.html');
    });
  }

  await updateHeaderUser();
  await updateNotificationBadge();
}
