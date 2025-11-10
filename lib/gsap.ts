'use client';
import gsapCore from 'gsap';
import { ScrollTrigger as ST } from 'gsap/ScrollTrigger';

let registered = false;
export const gsap = gsapCore;
export const ScrollTrigger = ST;

export function ensureGsap() {
  if (!registered) {
    gsap.registerPlugin(ScrollTrigger);
    registered = true;
  }
}
