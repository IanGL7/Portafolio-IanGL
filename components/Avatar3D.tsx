'use client';
import { Suspense, useEffect, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import { useAvatar } from '@/stores/avatar';

function Model() {
  const root = useRef<THREE.Group>(null);
  const { scene } = useGLTF('/models/avatar.glb');
  const { position, rotation, scale, pointer } = useAvatar();
  const baseScale = useRef(1);

  useEffect(() => {
    // centra el modelo y calcula una escala base
    const box = new THREE.Box3().setFromObject(scene);
    const center = new THREE.Vector3();
    box.getCenter(center);
    scene.position.sub(center);

    const sphere = new THREE.Sphere();
    box.getBoundingSphere(sphere);
    const targetRadius = 0.7;
    baseScale.current = sphere.radius ? targetRadius / sphere.radius : 1;

    // evita recortes por frustum culling agresivo
    scene.traverse((o: any) => { if (o.isMesh) o.frustumCulled = false; });
  }, [scene]);

  const ROT_X = 0.18, ROT_Y = 0.30, POS_X = 0.12, POS_Y = 0.08, ROLL = 0.05;

  useFrame((_, dt) => {
    if (!root.current) return;
    const k = 1 - Math.pow(0.001, dt * 60);
    const [nx, ny] = pointer;

    const tx = position[0] + nx * POS_X;
    const ty = position[1] - ny * POS_Y;
    const tz = position[2];

    const rx = rotation[0] + (-ny) * ROT_X;
    const ry = rotation[1] + nx * ROT_Y;
    const rz = rotation[2] + nx * ny * ROLL;

    root.current.position.lerp(new THREE.Vector3(tx, ty, tz), k);
    root.current.rotation.x = THREE.MathUtils.lerp(root.current.rotation.x, rx, k);
    root.current.rotation.y = THREE.MathUtils.lerp(root.current.rotation.y, ry, k);
    root.current.rotation.z = THREE.MathUtils.lerp(root.current.rotation.z, rz, k);

    const s = THREE.MathUtils.lerp(root.current.scale.x, baseScale.current * scale, k);
    root.current.scale.setScalar(s);
  });

  return <primitive ref={root} object={scene} />;
}

useGLTF.preload('/models/avatar.glb');

export default function Avatar3D() {
  return (
    <Canvas
      className="absolute inset-0"
      style={{ pointerEvents: 'none' }}                 // no bloquear la UI
      camera={{ position: [0, 0.6, 2.5], fov: 38, near: 0.01, far: 100 }}
      dpr={[1, 1.25]}
      gl={{ antialias: true, alpha: true }}
    >
      <ambientLight intensity={0.7} />
      <directionalLight position={[3, 6, 3]} intensity={1} />
      <Suspense fallback={null}>
        <Model />
      </Suspense>
    </Canvas>
  );
}
