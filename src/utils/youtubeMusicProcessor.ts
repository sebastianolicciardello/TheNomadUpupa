// YouTube Music link processor for markdown content
export function processYouTubeMusicLinks(content: string): string {
  const youtubeMusicRegex = /(?:^|\s)(https?:\/\/(?:music\.youtube\.com\/watch\?v=|(?:www\.)?youtube\.com\/watch\?v=|youtu\.be\/)[\w-]+(?:\S*)?)/gm;
  
  return content.replace(youtubeMusicRegex, (match, url) => {
    // Check if this URL is already inside a link or component
    const beforeMatch = content.substring(0, content.indexOf(match));
    const openBrackets = (beforeMatch.match(/\[/g) || []).length;
    const closeBrackets = (beforeMatch.match(/\]/g) || []).length;
    
    // Skip if we're inside a markdown link
    if (openBrackets > closeBrackets) {
      return match;
    }
    
    // Skip if it's already in a YouTube Music component
    if (beforeMatch.includes('<YouTubeMusicPlayer') && !beforeMatch.includes('</YouTubeMusicPlayer>')) {
      return match;
    }
    
    // Replace with component
    const componentCall = `\n\n<YouTubeMusicPlayer url="${url.trim()}" />\n\n`;
    return match.replace(url, componentCall);
  });
}

// Extract title from YouTube URL (for enhanced player display)
export async function getYouTubeTitle(url: string): Promise<string | null> {
  try {
    // Extract video ID
    const videoIdMatch = url.match(/(?:v=|youtu\.be\/|embed\/)([^&\n?#]+)/);
    if (!videoIdMatch) return null;
    
    const videoId = videoIdMatch[1];
    
    // For now, return a placeholder. In a real implementation, you might want to:
    // 1. Use YouTube API to fetch the title
    // 2. Cache titles in a build step
    // 3. Extract from page metadata during build
    return null;
  } catch (error) {
    console.warn('Failed to fetch YouTube title:', error);
    return null;
  }
}