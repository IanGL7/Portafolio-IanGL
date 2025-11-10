'use client';
import { useEffect } from 'react';

export default function ServiceWorker() {
  useEffect(() => {
    if (!('serviceWorker' in navigator)) return;

    if (process.env.NODE_ENV !== 'production') {
      // En desarrollo: asegúrate de no tener SW activos ni cachés
      navigator.serviceWorker.getRegistrations()
        .then(rs => rs.forEach(r => r.unregister()))
        .catch(() => {});
      if ('caches' in window) {
        caches.keys().then(keys => keys.forEach(k => caches.delete(k))).catch(() => {});
      }
      return;
    }

    // Solo producción
    navigator.serviceWorker.register('/sw.js').catch(console.error);
  }, []);

  return null;
}
