export type Language = 'en' | 'it';

export const languages: Record<Language, { name: string; flag: string }> = {
  en: { name: 'English', flag: '🇬🇧' },
  it: { name: 'Italiano', flag: '🇮🇹' }
};

export const defaultLanguage: Language = 'en';

export function detectLanguageFromUrl(url: string): Language {
  // Check localStorage first for saved preference
  if (typeof localStorage !== 'undefined') {
    const saved = localStorage.getItem('language-preference');
    if (saved && saved !== 'manual' && (saved === 'it' || saved === 'en')) {
      return saved as Language;
    }
  }
  
  // Check browser language for first visit
  if (typeof navigator !== 'undefined') {
    const browserLang = navigator.language.toLowerCase();
    if (browserLang.startsWith('it')) {
      return 'it';
    }
  }
  
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
    'footer.copyright': '2025 The Nomad Upupa. A diary of thoughts waiting for their time.',
    'blog.title': 'Travel Archive',
    'blog.subtitle': 'All thoughts, travels, and moments collected through time.',
    'blog.description': 'All thoughts, travels, and moments collected through time.',
    'blog.empty': 'No posts found',
    'blog.sort.newest': 'Sorted: Newest First',
    'blog.sort.oldest': 'Sorted: Oldest First',
    'blog.sort.switchTo.newest': 'Switch to Newest First',
    'blog.sort.switchTo.oldest': 'Switch to Oldest First',
    'about.title': 'About',
    'map.title': 'Journey Map',
    'hero.title': 'The Nomad Upupa',
    'hero.description': 'Moments don\'t ask to be shared while they\'re happening.\n\nThey ask to be lived — fully, quietly, truthfully.\n\nThis journal exists to hold the echoes of those moments, once they\'ve settled into meaning.\n\nIt is a space for reflections that surface not in real-time, but in real depth.\n\nHere, I share stories, places, and thoughts — after time has allowed them to take root.',
    'posts.recent': 'Recent Posts',
    'posts.viewAll': 'View All Posts',
    'posts.readingGuide.title': 'First Time Here?',
    'posts.readingGuide.description': 'These posts are connected by a logical, emotional, and historical flow. For the best experience, start from the oldest posts and read chronologically to follow the journey as it unfolded.',
    'posts.readingGuide.dismiss': 'Got it!',
    'discover.title': 'Discover More',
    'discover.description': 'Explore the journey through stories and maps',
    'discover.map': 'View Map',
    'discover.about': 'About Me',
    'connect.title': 'Connect',
    'connect.telegram': 'Telegram',
    'connect.channel': 'Channel',
    'connect.instagram': 'Instagram',
    'settings.language': 'Language',
    'settings.theme': 'Theme',
  },
  it: {
    'nav.home': 'Casa',
    'nav.archive': 'Archivio',
    'nav.map': 'Mappa',
    'nav.about': 'Chi Sono',
    'page.title': 'The Nomad Upupa - Diario Riflessivo',
    'footer.copyright': '2025 The Nomad Upupa. Un diario di pensieri che aspettano il loro tempo.',
    'blog.title': 'Archivio di Viaggio',
    'blog.subtitle': 'Tutti i pensieri, viaggi e momenti raccolti nel tempo.',
    'blog.description': 'Tutti i pensieri, viaggi e momenti raccolti nel tempo.',
    'blog.empty': 'Nessun post trovato',
    'blog.sort.newest': 'Ordinamento: Più Recenti',
    'blog.sort.oldest': 'Ordinamento: Più Vecchi',
    'blog.sort.switchTo.newest': 'Passa a Più Recenti',
    'blog.sort.switchTo.oldest': 'Passa a Più Vecchi',
    'about.title': 'Chi Sono',
    'map.title': 'Mappa del Viaggio',
    'hero.title': 'The Nomad Upupa',
    'hero.description': 'I momenti non chiedono di essere condivisi subito.\n\nChiedono di essere vissuti — davvero, fino in fondo, senza fretta.\n\nQuesto diario nasce per raccogliere le esperienze quando si sono sedimentate, quando diventano storie, comprensioni, emozioni che restano.\n\nÈ un luogo per riflessioni lente, nate dal viaggio, ma condivise solo quando hanno trovato la loro forma.',
    'posts.recent': 'Post Recenti',
    'posts.viewAll': 'Vedi Tutti i Post',
    'posts.readingGuide.title': 'Prima Volta Qui?',
    'posts.readingGuide.description': 'Questi post sono collegati tra loro con un flusso logico, emozionale e storico. Per la migliore esperienza, inizia dai post più vecchi e leggi in ordine cronologico per seguire il viaggio come si è svolto.',
    'posts.readingGuide.dismiss': 'Tutto chiaro!',
    'discover.title': 'Scopri di Più',
    'discover.description': 'Esplora il viaggio attraverso storie e mappe',
    'discover.map': 'Vedi Mappa',
    'discover.about': 'Chi Sono',
    'connect.title': 'Connessioni',
    'connect.telegram': 'Telegram',
    'connect.channel': 'Canale',
    'connect.instagram': 'Instagram',
    'settings.language': 'Lingua',
    'settings.theme': 'Tema',
  }
} as const;

export function t(key: keyof typeof translations.en, lang: Language = defaultLanguage): string {
  return translations[lang][key] || translations[defaultLanguage][key];
}

export function getAlternateLanguage(currentLang: Language): Language {
  return currentLang === 'en' ? 'it' : 'en';
}

export function switchLanguageInUrl(url: string, newLang: Language): string {
  // Return same URL since we handle language switching dynamically
  return url;
}

export function getCurrentLanguage(): Language {
  if (typeof localStorage !== 'undefined') {
    const saved = localStorage.getItem('language-preference');
    if (saved && (saved === 'it' || saved === 'en')) {
      return saved as Language;
    }
  }
  
  if (typeof navigator !== 'undefined') {
    const browserLang = navigator.language.toLowerCase();
    if (browserLang.startsWith('it')) {
      return 'it';
    }
  }
  
  return 'en';
}

export function setLanguage(lang: Language): void {
  if (typeof localStorage !== 'undefined') {
    localStorage.setItem('language-preference', lang);
  }
}