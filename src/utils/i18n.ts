export type Language = 'en' | 'it';

export const languages: Record<Language, { name: string; flag: string }> = {
  en: { name: 'English', flag: '🇬🇧' },
  it: { name: 'Italiano', flag: '🇮🇹' }
};

export const defaultLanguage: Language = 'en';

export function detectLanguageFromUrl(url: string): Language {
  const pathname = new URL(url).pathname;
  if (pathname.startsWith('/it/')) return 'it';
  return 'en';
}

export function getLanguageFromSlug(slug: string): Language {
  if (slug.startsWith('it/')) return 'it';
  if (slug.startsWith('en/')) return 'en';
  return defaultLanguage;
}

export function removeLanguageFromSlug(slug: string): string {
  if (slug.startsWith('it/')) return slug.slice(3);
  if (slug.startsWith('en/')) return slug.slice(3);
  return slug;
}

export function addLanguageToPath(path: string, lang: Language): string {
  if (lang === defaultLanguage) return path;
  return `/${lang}${path}`;
}

export const translations = {
  en: {
    'nav.home': 'Home',
    'nav.archive': 'Archive',
    'nav.map': 'Map',
    'nav.about': 'About',
    'page.title': 'The Nomad Upupa - Reflective Journal',
    'footer.copyright': '2025 The Nomad Upupa. A timeless reflective journal.',
    'blog.title': 'Travel Archive',
    'blog.subtitle': 'Chronicles of wandering and discovery',
    'about.title': 'About',
    'map.title': 'Journey Map',
  },
  it: {
    'nav.home': 'Casa',
    'nav.archive': 'Archivio',
    'nav.map': 'Mappa',
    'nav.about': 'Chi Sono',
    'page.title': 'The Nomad Upupa - Diario Riflessivo',
    'footer.copyright': '2025 The Nomad Upupa. Un diario riflessivo senza tempo.',
    'blog.title': 'Archivio di Viaggio',
    'blog.subtitle': 'Cronache di vagabondaggio e scoperta',
    'about.title': 'Chi Sono',
    'map.title': 'Mappa del Viaggio',
  }
} as const;

export function t(key: keyof typeof translations.en, lang: Language = defaultLanguage): string {
  return translations[lang][key] || translations[defaultLanguage][key];
}

export function getAlternateLanguage(currentLang: Language): Language {
  return currentLang === 'en' ? 'it' : 'en';
}

export function switchLanguageInUrl(url: string, newLang: Language): string {
  const urlObj = new URL(url);
  const currentLang = detectLanguageFromUrl(url);
  
  if (currentLang === 'it' && newLang === 'en') {
    // Remove /it/ prefix
    urlObj.pathname = urlObj.pathname.replace(/^\/it\//, '/');
  } else if (currentLang === 'en' && newLang === 'it') {
    // Add /it/ prefix
    urlObj.pathname = `/it${urlObj.pathname}`;
  }
  
  return urlObj.pathname;
}