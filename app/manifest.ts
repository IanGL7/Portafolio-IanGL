// app/manifest.ts
import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Portafolio — IanGL',
    short_name: 'Portafolio',
    description: 'Portafolio Digital',
    start_url: '/',
    display: 'standalone',
    background_color: '#05070e',
    theme_color: '#0b1220',
    icons: [
      { src: '/icons/icon-192.png',      sizes: '192x192', type: 'image/png' },
      { src: '/icons/icon-512.png',      sizes: '512x512', type: 'image/png' },
      { src: '/icons/maskable-192.png',  sizes: '192x192', type: 'image/png', purpose: 'maskable' },
      { src: '/icons/maskable-512.png',  sizes: '512x512', type: 'image/png', purpose: 'maskable' }
    ]
  };
}
