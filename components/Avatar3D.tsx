"use client";
import { Suspense, useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";

function Model({ onReady }: { onReady: () => void }) {
  const root = useRef<THREE.Group>(null);
  const reducedMotion = useRef(false);
  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => { reducedMotion.current = media.matches; };
    update();
    media.addEventListener('change', update);
    return () => media.removeEventListener('change', update);
  }, []);
  const { scene } = useGLTF("/models/avatar.glb");
  const centered = useMemo(() => {
    const copy = scene.clone(true);
    const box = new THREE.Box3().setFromObject(copy);
    const center = box.getCenter(new THREE.Vector3());
    copy.position.sub(center);
    const sphere = box.getBoundingSphere(new THREE.Sphere());
    return { scene: copy, scale: sphere.radius ? 0.8 / sphere.radius : 1 };
  }, [scene]);
  useEffect(() => {
    onReady();
  }, [onReady]);
  useFrame(({ pointer }, dt) => {
    if (!root.current) return;
    const factor = 1 - Math.exp(-8 * dt);
    const reduced = reducedMotion.current;
    root.current.rotation.y = THREE.MathUtils.lerp(
      root.current.rotation.y,
      reduced ? 0 : pointer.x * 0.25,
      factor,
    );
    root.current.rotation.x = THREE.MathUtils.lerp(
      root.current.rotation.x,
      reduced ? 0 : -pointer.y * 0.12,
      factor,
    );
  });
  return (
    <group ref={root} scale={centered.scale}>
      <primitive object={centered.scene} />
    </group>
  );
}

export default function Avatar3D({ onReady }: { onReady: () => void }) {
  return (
    <Canvas
      camera={{ position: [0, 0, 2.5], fov: 40, near: 0.01, far: 100 }}
      dpr={[1, 1.25]}
      gl={{ antialias: true, alpha: true }}
      fallback={
        <p className="avatar-notice" role="status">
          La vista 3D no está disponible en este dispositivo.
        </p>
      }
    >
      <ambientLight intensity={1.5} />
      <directionalLight position={[3, 6, 3]} intensity={2} />
      <Suspense fallback={null}>
        <Model onReady={onReady} />
      </Suspense>
    </Canvas>
  );
}
