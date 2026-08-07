# 8 Bits - Buscador Pokémon

PWA (Progressive Web App) de una sola página con buscador Pokémon, torneos, mazos, expansiones y tablón de trueques.

## Tecnología
- HTML, CSS y JavaScript puro (todo en `index.html`)
- Firebase Firestore (vía CDN) para sincronizar datos entre dispositivos
- Service Worker + manifest.json para funcionar como app instalable (PWA)

## Estructura
- `index.html` — la app completa
- `manifest.json` — configuración de la PWA (nombre, íconos, colores)
- `sw.js` — service worker (caché offline del "cascarón" de la app)
- `icon-192.png` / `icon-512.png` — íconos de la app

## Cómo publicarla (GitHub Pages)
1. Subir esta carpeta a un repositorio de GitHub.
2. Ir a Settings > Pages.
3. Elegir la rama `main` y la carpeta `/ (root)`.
4. Guardar. En unos minutos la app queda publicada en `https://tu-usuario.github.io/nombre-repo/`.

## Firebase
La app usa el proyecto de Firestore `bits-b252f` ya configurado dentro del `index.html`.
