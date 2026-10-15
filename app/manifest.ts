// app/manifest.ts
import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Portafolio — IanGL',
    short_name: 'IanGL',
    description: 'Portafolio de Ian González: desarrollo web y proyectos.',
    lang: 'es-MX',
    start_url: '/',
    display: 'standalone',
    background_color: '#050b09',
    theme_color: '#050b09',
    icons: [
      { src: '/icons/icon-192.png',      sizes: '192x192', type: 'image/png' },
      { src: '/icons/icon-512.png',      sizes: '512x512', type: 'image/png' },
      { src: '/icons/maskable-192.png',  sizes: '192x192', type: 'image/png', purpose: 'maskable' },
      { src: '/icons/maskable-512.png',  sizes: '512x512', type: 'image/png', purpose: 'maskable' }
    ]
  };
}
