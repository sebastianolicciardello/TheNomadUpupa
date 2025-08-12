import type { Language } from './translations';

export interface MultilingualContent {
  frontmatter: Record<string, any>;
  content: Record<Language, string>;
}

export interface ParsedPost {
  frontmatter: Record<string, any>;
  content: string;
  lang: Language;
}

/**
 * Parses multilingual markdown content with language-specific sections
 * Format:
 * ---
 * title: 
 *   en: "English Title"
 *   it: "Titolo Italiano"
 * eventTime: 2024-11-10
 * publishTime: 2024-11-15
 * translationKey: "unique-key"
 * ---
 * 
 * <!-- en -->
 * English content here
 * 
 * <!-- it -->
 * Contenuto italiano qui
 */
export function parseMultilingualMarkdown(content: string): MultilingualContent {
  // Extract frontmatter
  const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---/);
  if (!frontmatterMatch) {
    throw new Error('Invalid markdown: missing frontmatter');
  }

  const frontmatterStr = frontmatterMatch[1];
  const bodyContent = content.slice(frontmatterMatch[0].length).trim();

  // Parse YAML-like frontmatter manually for multilingual support
  const frontmatter: Record<string, any> = {};
  const lines = frontmatterStr.split('\n');
  let currentKey = '';
  let isMultilingual = false;

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) continue;

    // Check for main key
    if (!line.startsWith(' ') && trimmed.includes(':')) {
      const [key, ...valueParts] = trimmed.split(':');
      currentKey = key.trim();
      const value = valueParts.join(':').trim();
      
      if (value) {
        // Simple key-value pair
        frontmatter[currentKey] = parseValue(value);
        isMultilingual = false;
      } else {
        // Start of multilingual or complex object
        isMultilingual = true;
        frontmatter[currentKey] = {};
      }
    } else if (line.startsWith('  ') && isMultilingual) {
      // Nested value in multilingual object
      const nested = trimmed.split(':');
      if (nested.length >= 2) {
        const nestedKey = nested[0].trim();
        const nestedValue = nested.slice(1).join(':').trim();
        
        if (nestedKey === 'en' || nestedKey === 'it') {
          frontmatter[currentKey][nestedKey] = parseValue(nestedValue);
        } else {
          // Handle other nested objects (like coords, locations)
          if (!frontmatter[currentKey][nestedKey]) {
            frontmatter[currentKey][nestedKey] = parseValue(nestedValue);
          }
        }
      }
    }
  }

  // Parse language-specific content sections
  const langSections: Record<Language, string> = { en: '', it: '' };
  
  // Split by language markers
  const sections = bodyContent.split(/<!--\s*(en|it)\s*-->/);
  
  if (sections.length === 1) {
    // No language markers, assume single language
    langSections.en = bodyContent;
    langSections.it = bodyContent;
  } else {
    for (let i = 1; i < sections.length; i += 2) {
      const lang = sections[i].trim() as Language;
      const content = sections[i + 1]?.trim() || '';
      if (lang === 'en' || lang === 'it') {
        langSections[lang] = content;
      }
    }
  }

  return {
    frontmatter,
    content: langSections
  };
}

/**
 * Extracts content for a specific language from multilingual markdown
 */
export function extractLanguageContent(multilingualContent: MultilingualContent, lang: Language): ParsedPost {
  const frontmatter = { ...multilingualContent.frontmatter };
  
  // Resolve multilingual frontmatter fields
  Object.keys(frontmatter).forEach(key => {
    const value = frontmatter[key];
    if (typeof value === 'object' && value !== null && !Array.isArray(value) && !value.lat) {
      if (value[lang]) {
        frontmatter[key] = value[lang];
      } else if (value.en) {
        // Fallback to English if available
        frontmatter[key] = value.en;
      }
    }
  });

  // Set the language
  frontmatter.lang = lang;

  return {
    frontmatter,
    content: multilingualContent.content[lang] || multilingualContent.content.en || '',
    lang
  };
}

/**
 * Creates separate language-specific markdown files from multilingual content
 */
export function generateLanguageMarkdowns(multilingualContent: MultilingualContent): Record<Language, string> {
  const result: Record<Language, string> = { en: '', it: '' };

  (['en', 'it'] as Language[]).forEach(lang => {
    const parsed = extractLanguageContent(multilingualContent, lang);
    
    // Generate frontmatter
    let frontmatterStr = '---\n';
    Object.entries(parsed.frontmatter).forEach(([key, value]) => {
      if (value instanceof Date) {
        frontmatterStr += `${key}: ${value.toISOString().split('T')[0]}\n`;
      } else if (value && typeof value === 'object' && value !== null && value.toISOString) {
        frontmatterStr += `${key}: ${value.toISOString().split('T')[0]}\n`;
      } else if (typeof value === 'object' && value !== null) {
        frontmatterStr += `${key}:\n`;
        if (Array.isArray(value)) {
          value.forEach(item => {
            frontmatterStr += `  - `;
            if (typeof item === 'object') {
              frontmatterStr += '\n';
              Object.entries(item).forEach(([k, v]) => {
                if (typeof v === 'object' && v !== null) {
                  frontmatterStr += `    ${k}:\n`;
                  Object.entries(v).forEach(([k2, v2]) => {
                    frontmatterStr += `      ${k2}: ${v2}\n`;
                  });
                } else {
                  frontmatterStr += `    ${k}: ${v}\n`;
                }
              });
            } else {
              frontmatterStr += `${item}\n`;
            }
          });
        } else {
          Object.entries(value).forEach(([k, v]) => {
            frontmatterStr += `  ${k}: ${v}\n`;
          });
        }
      } else if (typeof value === 'string') {
        frontmatterStr += `${key}: "${value}"\n`;
      } else {
        frontmatterStr += `${key}: ${value}\n`;
      }
    });
    frontmatterStr += '---\n\n';
    
    result[lang] = frontmatterStr + parsed.content;
  });

  return result;
}

function parseValue(value: string): any {
  const trimmed = value.trim();
  
  // Remove quotes if present
  if ((trimmed.startsWith('"') && trimmed.endsWith('"')) || 
      (trimmed.startsWith("'") && trimmed.endsWith("'"))) {
    return trimmed.slice(1, -1);
  }
  
  // Parse numbers
  if (!isNaN(Number(trimmed)) && trimmed !== '') {
    return Number(trimmed);
  }
  
  // Parse booleans
  if (trimmed === 'true') return true;
  if (trimmed === 'false') return false;
  
  // Parse dates (YYYY-MM-DD format)
  if (/^\d{4}-\d{2}-\d{2}$/.test(trimmed)) {
    return new Date(trimmed + 'T00:00:00.000Z');
  }
  
  return trimmed;
}