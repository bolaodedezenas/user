export function saveRecentItem(item) {
  if (typeof window === 'undefined') return;

  const stored = JSON.parse(localStorage.getItem('recentItems') || '[]');

  // evita duplicados
  const exists = stored.some((i) => i.href === item.href);
  if (!exists) {
    stored.push(item);
  }

  localStorage.setItem('recentItems', JSON.stringify(stored));
}


export function getRecentItems() {
  if (typeof window === 'undefined') return [];
  return JSON.parse(localStorage.getItem('recentItems') || '[]');
}




export function removeRecentItem(href) {
  if (typeof window === 'undefined') return;

  const stored = JSON.parse(localStorage.getItem('recentItems') || '[]');

  const filtered = stored.filter((item) => item.href !== href);

  localStorage.setItem('recentItems', JSON.stringify(filtered));
}
