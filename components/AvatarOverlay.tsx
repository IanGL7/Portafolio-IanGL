'use client';
import dynamic from 'next/dynamic';

// Evitamos SSR del Canvas
const Avatar3D = dynamic(() => import('@/components/Avatar3D'), { ssr: false });

export default function AvatarOverlay() {
  return (
    // el overlay cubre todo el viewport
    <div className="fixed inset-0 z-30 pointer-events-none">
      {/* el canvas llenará este contenedor */}
      <div className="absolute inset-0">
        <Avatar3D />
      </div>
    </div>
  );
}
