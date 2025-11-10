'use client';
import { Suspense, useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import Lottie from 'lottie-react';
import anim from '@/public/anim.json';

function Spinner() {
  const ref = useRef<THREE.Mesh>(null!);

  useFrame(() => {
    if (!ref.current) return;
    ref.current.rotation.x += 0.01;
    ref.current.rotation.y += 0.015;
  });

  return (
    <mesh ref={ref}>
      <torusKnotGeometry args={[1, 0.3, 128, 32]} />
      <meshStandardMaterial color="#5af0ff" metalness={0.7} roughness={0.2} />
    </mesh>
  );
}


export default function Hero3D() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);

  if (isMobile) {
    // fallback: animación Lottie en lugar de 3D
    return (
      <div className="absolute inset-0 flex items-center justify-center">
        <Lottie animationData={anim} loop autoplay style={{ width: 260, height: 260 }} />
      </div>
    );
  }

  return (
    <div className="absolute inset-0 pointer-events-none [mask-image:radial-gradient(white,transparent_70%)]">
      <Canvas camera={{ position: [0, 0, 4], fov: 50 }} dpr={[1, 1.5]}>
        <ambientLight intensity={0.5} />
        <directionalLight intensity={1} position={[3, 5, 2]} />
        <Suspense fallback={null}>
          <Spinner />
        </Suspense>
        <OrbitControls enableZoom={false} enablePan={false} />
      </Canvas>
    </div>
  );
}