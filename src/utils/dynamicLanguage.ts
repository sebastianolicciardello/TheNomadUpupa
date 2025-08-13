import { getCurrentLanguage, type Language } from './i18n';

export function initLanguageSystem() {
  if (typeof window === 'undefined') return;
  
  const currentLang = getCurrentLanguage();
  document.documentElement.setAttribute('data-language', currentLang);
  
  // Hide/show content based on language
  updateLanguageContent(currentLang);
}

export function updateLanguageContent(lang: Language) {
  if (typeof document === 'undefined') return;
  
  // Hide all language-specific content
  document.querySelectorAll('[data-lang]').forEach(el => {
    (el as HTMLElement).style.display = 'none';
  });
  
  // Show content for current language
  document.querySelectorAll(`[data-lang="${lang}"]`).forEach(el => {
    (el as HTMLElement).style.display = '';
  });
  
  // Update language attribute
  document.documentElement.setAttribute('data-language', lang);
}