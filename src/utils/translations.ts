// Translation system for shared components
export type Language = 'en' | 'it';

export interface Translations {
  en: Record<string, string>;
  it: Record<string, string>;
}

export const translations: Translations = {
  en: {
    // Homepage
    'hero.title': 'The Nomad Upupa',
    'hero.description': 'A timeless reflective journal. Thoughts, places, and moments that interweave through time, creating an emotional map of my inner and outer journeys.',
    'posts.recent': 'Recent Reflections',
    'posts.viewAll': 'View all posts',
    'discover.title': 'Discover More',
    'discover.description': 'Explore the complete collection of reflections, discover the places I\'ve visited, or learn more about the journey behind these words.',
    'discover.blog': 'All Reflections',
    'discover.map': 'Journey Map',
    'discover.about': 'About Me',
    
    // Blog
    'blog.title': 'Archive of Reflections',
    'blog.description': 'All thoughts, travels, and moments collected through time.',
    'blog.empty': 'No reflections written yet. Come back soon for new content.',
    'blog.readMore': 'Read more',
    
    // About
    'about.title': 'About Me',
    'connect.title': 'Connect',
    'connect.telegram': 'Telegram',
    'connect.channel': 'Channel',
    'connect.instagram': 'Instagram',
    
    // Map
    'map.title': 'Places Map',
    'map.description': 'An emotional geography of the places that have marked my journey.',
    'map.places': 'Reflection Places',
    'map.empty': 'No georeferenced places yet. The first journeys will arrive soon.',
    'map.readMore': 'Read more →',
  },
  it: {
    // Homepage
    'hero.title': 'The Nomad Upupa',
    'hero.description': 'Un diario riflessivo senza tempo. Pensieri, luoghi e momenti che si intrecciano nel tempo, creando una mappa emotiva dei miei viaggi interiori ed esteriori.',
    'posts.recent': 'Riflessioni Recenti',
    'posts.viewAll': 'Visualizza tutti i post',
    'discover.title': 'Scopri di Più',
    'discover.description': 'Esplora la collezione completa di riflessioni, scopri i luoghi che ho visitato, o impara di più sul viaggio dietro queste parole.',
    'discover.blog': 'Tutte le Riflessioni',
    'discover.map': 'Mappa del Viaggio',
    'discover.about': 'Chi Sono',
    
    // Blog
    'blog.title': 'Archivio delle Riflessioni',
    'blog.description': 'Tutti i pensieri, viaggi e momenti raccolti nel tempo.',
    'blog.empty': 'Nessuna riflessione ancora scritta. Torna presto per nuovi contenuti.',
    'blog.readMore': 'Leggi di più',
    
    // About
    'about.title': 'Chi Sono',
    'connect.title': 'Connettiti',
    'connect.telegram': 'Telegram',
    'connect.channel': 'Canale',
    'connect.instagram': 'Instagram',
    
    // Map
    'map.title': 'Mappa dei Luoghi',
    'map.description': 'Una geografia emotiva dei luoghi che hanno segnato il mio viaggio.',
    'map.places': 'Luoghi di Riflessione',
    'map.empty': 'Ancora nessun luogo georeferenziato. I primi viaggi arriveranno presto.',
    'map.readMore': 'Leggi di più →',
  }
};

export function t(key: string, lang: Language = 'en'): string {
  return translations[lang][key] || key;
}

export function getPostUrl(slug: string, lang: Language = 'en'): string {
  const cleanSlug = slug.replace(lang === 'it' ? 'it/' : 'en/', '');
  return lang === 'it' ? `/it/posts/${cleanSlug}/` : `/posts/${cleanSlug}/`;
}

export function getLocaleString(lang: Language = 'en'): string {
  return lang === 'it' ? 'it-IT' : 'en-US';
}