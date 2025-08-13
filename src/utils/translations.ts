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
    'hero.description': `Moments don't ask to be shared while they're happening.

They ask to be lived — fully, quietly, truthfully.

This journal exists to hold the echoes of those moments, once they've settled into meaning.

It is a space for reflections that surface not in real-time, but in real depth.

Here, I share stories, places, and thoughts — after time has allowed them to take root.`,
    'posts.recent': 'Recent Reflections',
    'posts.viewAll': 'View all posts',
    'discover.title': 'Discover More',
    'discover.description': 'Discover the places I\'ve visited, or learn more about the journey behind these words.',
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
    'hero.description': `I momenti non chiedono di essere condivisi subito.

Chiedono di essere vissuti — davvero, fino in fondo, senza fretta.

Questo diario nasce per raccogliere le esperienze quando si sono sedimentate, quando diventano storie, comprensioni, emozioni che restano.

È un luogo per riflessioni lente, nate dal viaggio, ma condivise solo quando hanno trovato la loro forma.`,
    'posts.recent': 'Riflessioni Recenti',
    'posts.viewAll': 'Visualizza tutti i post',
    'discover.title': 'Scopri di Più',
    'discover.description': 'Esplora i luoghi che ho visitato, o impara di più sul viaggio dietro queste parole.',
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