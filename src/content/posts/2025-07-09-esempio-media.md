
---
title: "Esempio inserimento immagini e video in Markdown"
date: 2025-07-09
description: "Come inserire immagini remote e video YouTube nei post Markdown."
coords:
  lat: 45.4642
  lon: 9.19
tags:
  - esempio
  - media
  - markdown
---

# Esempio di inserimento immagini e video in Markdown

## Immagine remota

![Logo Astro](https://astro.build/assets/press/astro-icon-dark.svg)

## Video YouTube

[![Thumbnail](https://img.youtube.com/vi/dQw4w9WgXcQ/0.jpg)](https://www.youtube.com/watch?v=dQw4w9WgXcQ)



## Riferimenti di posizione (GeoMap)

Per inserire una mappa con una posizione specifica, puoi aggiungere i dati di latitudine e longitudine nei metadati del post (frontmatter) oppure, se il sistema lo supporta, direttamente nel contenuto. Ad esempio:

```
coords:
  lat: 45.4642
  lon: 9.19
```

Esempio di utilizzo nel frontmatter:

title: "Esempio inserimento immagini e video in Markdown"
date: 2025-07-09
description: "Come inserire immagini remote e video YouTube nei post Markdown."
coords:
  lat: 45.4642
  lon: 9.19
tags:
  - esempio
  - media
  - markdown

Se il componente `GeoMap` è configurato, la mappa verrà visualizzata automaticamente nel post.

Sostituisci le coordinate con quelle desiderate.
