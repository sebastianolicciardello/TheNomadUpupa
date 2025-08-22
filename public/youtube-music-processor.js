console.log('🎵 YouTube Music processor loaded from external file!');

function processYouTubeMusicLinks() {
  console.log('🔍 Starting YouTube Music processing...');
  
  const article = document.querySelector('article');
  if (!article) {
    console.log('❌ No article found');
    return;
  }
  
  console.log('✅ Article found, content length:', article.innerHTML.length);
  
  const content = article.innerHTML;
  const regex = /https:\/\/music\.youtube\.com\/watch\?v=[^\s<]+/g;
  const matches = content.match(regex);
  
  console.log('🎵 YouTube Music matches:', matches);
  
  if (matches && matches.length > 0) {
    let newContent = content;
    
    matches.forEach(url => {
      console.log('🔧 Processing URL:', url);
      
      const videoIdMatch = url.match(/[?&]v=([^&\s<]+)/);
      if (!videoIdMatch) {
        console.log('❌ No video ID found in URL');
        return;
      }
      
      const videoId = videoIdMatch[1];
      console.log('✅ Video ID extracted:', videoId);
      
      const playerHTML = `
        <div class="youtube-music-player my-6 not-prose max-w-md mx-auto">
          <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden border border-gray-200 dark:border-gray-700">
            <div class="flex items-center gap-3 px-4 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white">
              <svg class="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/>
              </svg>
              <div class="flex-1 min-w-0">
                <p class="text-sm font-medium text-white">🎵 Brano YouTube Music</p>
                <p class="text-xs text-red-100">Clicca per ascoltare</p>
              </div>
            </div>
            <div class="relative bg-gray-100 dark:bg-gray-900">
              <div class="aspect-video relative">
                <img src="https://img.youtube.com/vi/${videoId}/maxresdefault.jpg" alt="Thumbnail" class="w-full h-full object-cover" />
                <div class="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center hover:bg-opacity-30 cursor-pointer" 
                     onclick="window.open('${url}', '_blank');">
                  <div class="bg-red-600 rounded-full p-4 hover:bg-red-700 transition-colors">
                    <svg class="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z"/>
                    </svg>
                  </div>
                </div>
                <div class="absolute inset-0"></div>
              </div>
            </div>
            <div class="px-4 py-2 bg-gray-50 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
              <a href="${url}" target="_blank" rel="noopener noreferrer" 
                 class="text-gray-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 text-sm transition-colors">
                Apri su YouTube Music →
              </a>
            </div>
          </div>
        </div>`;
      
      newContent = newContent.replace(url, playerHTML);
      console.log('✅ URL replaced with player');
    });
    
    console.log('🔄 Updating article content...');
    article.innerHTML = newContent;
    console.log('✅ Content updated successfully!');
  } else {
    console.log('❌ No YouTube Music URLs found in content');
  }
}

// Execute immediately and on DOM ready
console.log('📄 Document ready state:', document.readyState);

if (document.readyState === 'loading') {
  console.log('⏳ Waiting for DOM...');
  document.addEventListener('DOMContentLoaded', function() {
    console.log('✅ DOM loaded, processing...');
    setTimeout(processYouTubeMusicLinks, 500);
  });
} else {
  console.log('✅ DOM already loaded, processing immediately...');
  setTimeout(processYouTubeMusicLinks, 500);
}