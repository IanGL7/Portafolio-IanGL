'use client';
import { create } from 'zustand';

export type V3 = [number, number, number];
export type V2 = [number, number];

type AvatarState = {
  position: V3;
  rotation: V3;
  scale: number;
  pointer: V2;                 // <- nuevo: [-1..1, -1..1]
  set: (patch: Partial<Omit<AvatarState, 'set'>>) => void;
};

export const useAvatar = create<AvatarState>((set) => ({
  position: [0, -0.1, 0],
  rotation: [0, 0, 0],
  scale: 1,
  pointer: [0, 0],
  set: (patch) => set(patch),
}));
