"use client";
import { Suspense, useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { useAvatar } from "@/stores/avatar";

const MODEL_URL = "/models/avatar-scroll.glb";
export function resetAvatarModel() {
  useGLTF.clear(MODEL_URL);
}

function Model({ onReady }: { onReady: () => void }) {
  const root = useRef<THREE.Group>(null);
  // Meshopt's decoder ships with the app; no external Draco CDN is required.
  const { scene } = useGLTF(MODEL_URL, false, true);
  const invalidate = useThree((state) => state.invalidate);
  const normalized = useMemo(() => {
    const copy = scene.clone(true);
    copy.updateMatrixWorld(true);
    const box = new THREE.Box3().setFromObject(copy);
    const size = box.getSize(new THREE.Vector3());
    copy.position.sub(box.getCenter(new THREE.Vector3()));
    return { scene: copy, scale: size.y > 0 ? 1.65 / size.y : 1 };
  }, [scene]);
  const pointer = useRef<[number, number]>([0, 0]);
  useEffect(() => {
    const unsubscribe = useAvatar.subscribe(() => invalidate());
    invalidate();
    return unsubscribe;
  }, [invalidate]);
  useEffect(() => {
    onReady();
  }, [onReady]);
  useFrame((_, delta) => {
    if (!root.current) return;
    const state = useAvatar.getState();
    const factor = state.reducedMotion
      ? 1
      : 1 - Math.exp(-12 * Math.min(delta, 0.1));
    pointer.current[0] += (state.pointer[0] - pointer.current[0]) * factor;
    pointer.current[1] += (state.pointer[1] - pointer.current[1]) * factor;
    root.current.rotation.set(
      state.rotation[0] - pointer.current[1] * 0.08,
      state.rotation[1] + pointer.current[0] * 0.12,
      state.rotation[2],
    );
    root.current.scale.setScalar(normalized.scale * state.scale);
    if (
      Math.abs(pointer.current[0] - state.pointer[0]) +
        Math.abs(pointer.current[1] - state.pointer[1]) >
      0.001
    )
      invalidate();
  });
  // The inner primitive keeps its centering transform; scroll transforms affect the parent only.
  return (
    <group ref={root} scale={normalized.scale} dispose={null}>
      <primitive object={normalized.scene} />
    </group>
  );
}

function ContextGuard({ onError }: { onError: () => void }) {
  const gl = useThree((state) => state.gl);
  useEffect(() => {
    const onLost = () => onError();
    gl.domElement.addEventListener("webglcontextlost", onLost);
    return () => gl.domElement.removeEventListener("webglcontextlost", onLost);
  }, [gl, onError]);
  return null;
}

function WebGLFallback({ onError }: { onError: () => void }) {
  useEffect(() => {
    onError();
  }, [onError]);
  return null;
}

export default function Avatar3D({
  onReady,
  onError,
}: {
  onReady: () => void;
  onError: () => void;
}) {
  return (
    <Canvas
      frameloop="demand"
      camera={{ position: [0, 0, 4.5], fov: 38, near: 0.05, far: 30 }}
      dpr={[1, 1.25]}
      gl={{ antialias: true, alpha: true }}
      fallback={<WebGLFallback onError={onError} />}
    >
      <ambientLight intensity={1.6} />
      <directionalLight position={[3, 5, 4]} intensity={2.5} />
      <directionalLight position={[-3, 1, 1]} intensity={0.7} />
      <ContextGuard onError={onError} />
      <Suspense fallback={null}>
        <Model onReady={onReady} />
      </Suspense>
    </Canvas>
  );
}
