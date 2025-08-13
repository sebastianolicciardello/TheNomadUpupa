// Shared map utility functions

export function createPopupContent(post, lang = 'en') {
  const readMoreText = lang === 'it' ? 'Leggi di più →' : 'Read more →';
  const postUrl = `/posts/${post.slug}/`;
  
  return `
    <div class="p-1 sm:p-2 w-full">
      ${post.cover ? `<img src="${post.cover}" alt="${post.title}" class="w-full h-16 sm:h-20 object-cover rounded mb-1 sm:mb-2">` : ''}
      <h3 class="font-semibold text-xs sm:text-sm mb-1 leading-tight">${post.title}</h3>
      <p class="text-xs text-gray-600 mb-1 sm:mb-2">${new Date(post.date).toLocaleDateString(lang === 'it' ? 'it-IT' : 'en-US')}</p>
      <a href="${postUrl}" class="inline-block text-xs text-blue-600 hover:text-blue-800 font-medium">${readMoreText}</a>
    </div>
  `;
}

export function createLocationPopupContent(location, lang = 'en') {
  return `
    <div class="p-1 w-full">
      <h4 class="font-semibold text-xs sm:text-sm mb-1 leading-tight">${location.name}</h4>
      <p class="text-xs text-gray-600">${location.coords.lat.toFixed(4)}, ${location.coords.lon.toFixed(4)}</p>
    </div>
  `;
}

export function setupMapTheme(map, lightTiles, darkTiles) {
  function updateMapTheme() {
    const isDark = document.documentElement.classList.contains('dark');
    if (isDark) {
      map.removeLayer(lightTiles);
      darkTiles.addTo(map);
    } else {
      map.removeLayer(darkTiles);
      lightTiles.addTo(map);
    }
  }
  
  // Set initial theme
  updateMapTheme();
  
  // Listen for theme changes
  const observer = new MutationObserver(updateMapTheme);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['class']
  });
  
  return updateMapTheme;
}

export function createMapIcons() {
  const lightIcon = L.divIcon({
    className: 'custom-marker light-marker',
    html: `
      <div style="
        width: 18px; 
        height: 18px; 
        background: #dc2626; 
        border: 2px solid white; 
        border-radius: 50%; 
        box-shadow: 0 2px 8px rgba(0,0,0,0.3);
      ">
      </div>
    `,
    iconSize: [18, 18],
    iconAnchor: [9, 9]
  });

  const darkIcon = L.divIcon({
    className: 'custom-marker dark-marker',
    html: `
      <div style="
        width: 18px; 
        height: 18px; 
        background: #e5e7eb; 
        border: 2px solid #374151; 
        border-radius: 50%; 
        box-shadow: 0 2px 8px rgba(0,0,0,0.4);
      ">
      </div>
    `,
    iconSize: [18, 18],
    iconAnchor: [9, 9]
  });

  return { lightIcon, darkIcon };
}

export function getCurrentIcon(lightIcon, darkIcon) {
  const isDark = document.documentElement.classList.contains('dark');
  return isDark ? darkIcon : lightIcon;
}

export function createTileLayers() {
  const lightTiles = L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
    attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors © <a href="https://carto.com/attributions">CARTO</a>'
  });
  
  const darkTiles = L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
    attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors © <a href="https://carto.com/attributions">CARTO</a>'
  });
  
  return { lightTiles, darkTiles };
}