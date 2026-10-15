"use client";
import { useEffect, type RefObject } from "react";
import { useAvatar } from "@/stores/avatar";
import {
  clamp,
  dampAvatarPose,
  poseKeys,
  sampleAvatarPose,
  type AvatarPose,
  type AvatarStop,
} from "@/lib/avatar-motion";

type Props = {
  home: RefObject<HTMLDivElement | null>;
  floating: RefObject<HTMLDivElement | null>;
};
const scenes = [
  { id: "habilidades", rotationX: -0.03, rotationY: 0.48, scale: 0.96 },
  { id: "proyectos", rotationX: 0.04, rotationY: -0.42, scale: 1 },
  { id: "contacto", rotationX: 0, rotationY: 0.12, scale: 1.02 },
];

export default function AvatarDirector({ home, floating }: Props) {
  useEffect(() => {
    const element = floating.current;
    const origin = home.current;
    if (!element || !origin) return;
    const desktop = window.matchMedia("(min-width: 1100px)");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const fine = window.matchMedia("(pointer: fine)");
    let stops: AvatarStop[] = [];
    let current: AvatarPose | null = null;
    let frame = 0;
    let previousTime = 0;
    let pointer: [number, number] = [0, 0];
    let disposed = false;

    const draw = (pose: AvatarPose) => {
      element.style.position = "fixed";
      element.style.left = "0";
      element.style.top = "0";
      element.style.width = `${pose.width}px`;
      element.style.height = `${pose.height}px`;
      element.style.transform = `translate3d(${pose.x}px, ${pose.y}px, 0)`;
      element.style.visibility =
        pose.y + pose.height > 0 && pose.y < window.innerHeight
          ? "visible"
          : "hidden";
      useAvatar
        .getState()
        .set({
          rotation: [pose.rotationX, pose.rotationY, 0],
          scale: pose.scale,
          pointer,
          reducedMotion: reduced.matches,
        });
    };
    const homePose = (): AvatarPose => {
      const rect = origin.getBoundingClientRect();
      const width = Math.min(rect.width, 380);
      const height = Math.min(Math.max(rect.height - 78, 200), 390);
      return {
        x: rect.left + (rect.width - width) / 2,
        y: rect.top + 8,
        width,
        height,
        rotationX: 0,
        rotationY: 0,
        scale: 1,
      };
    };
    const targetPose = () =>
      desktop.matches && !reduced.matches
        ? sampleAvatarPose(stops, Math.max(0, window.scrollY))
        : homePose();
    const tick = (time: number) => {
      frame = 0;
      if (disposed || !stops.length) return;
      const target = targetPose();
      // Mobile and reduced-motion follow the document exactly, with no fixed overlay trailing the scroll.
      const animate = desktop.matches && !reduced.matches;
      const delta = previousTime ? (time - previousTime) / 1000 : 1 / 60;
      current =
        animate && current ? dampAvatarPose(current, target, delta) : target;
      previousTime = time;
      draw(current);
      if (
        animate &&
        poseKeys.some((key) => Math.abs(current![key] - target[key]) > 0.01)
      )
        frame = requestAnimationFrame(tick);
      else previousTime = 0;
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(tick);
    };
    const measure = () => {
      const initial = homePose();
      initial.y += window.scrollY; // Home position at scroll zero, even when loading a #section URL.
      stops = [{ ...initial, scroll: 0 }];
      const maxScroll = Math.max(
        1,
        document.documentElement.scrollHeight - window.innerHeight,
      );
      for (const scene of scenes) {
        const anchor = document.querySelector<HTMLElement>(
          `[data-avatar-anchor="${scene.id}"]`,
        );
        const section = document.getElementById(scene.id);
        if (!anchor || !section) continue;
        const rect = anchor.getBoundingClientRect();
        const width = clamp(rect.width, 180, 290);
        const height = Math.min(360, Math.max(200, window.innerHeight - 190));
        const previous = stops[stops.length - 1].scroll;
        const position = Math.min(
          maxScroll,
          section.getBoundingClientRect().top + window.scrollY - 125,
        );
        stops.push({
          x: rect.left + (rect.width - width) / 2,
          y: Math.max(105, (window.innerHeight - height) / 2),
          width,
          height,
          ...scene,
          scroll: Math.max(previous + 1, position),
        });
      }
      current = targetPose();
      pointer = [0, 0];
      draw(current);
      schedule();
    };
    const onPointer = (event: PointerEvent) => {
      if (reduced.matches || !fine.matches) return;
      pointer = [
        clamp((event.clientX / window.innerWidth) * 2 - 1, -1, 1),
        clamp((event.clientY / window.innerHeight) * 2 - 1, -1, 1),
      ];
      schedule();
    };
    const onLeave = () => {
      pointer = [0, 0];
      schedule();
    };
    const observer = new ResizeObserver(measure);
    document
      .querySelectorAll("#inicio, #habilidades, #proyectos, #contacto")
      .forEach((section) => observer.observe(section));
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", measure, { passive: true });
    window.addEventListener("pointermove", onPointer, { passive: true });
    document.addEventListener("pointerleave", onLeave);
    desktop.addEventListener("change", measure);
    reduced.addEventListener("change", measure);
    document.fonts.ready.then(() => {
      if (!disposed) measure();
    });
    measure();
    return () => {
      disposed = true;
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", measure);
      window.removeEventListener("pointermove", onPointer);
      document.removeEventListener("pointerleave", onLeave);
      desktop.removeEventListener("change", measure);
      reduced.removeEventListener("change", measure);
      element.removeAttribute("style");
    };
  }, [home, floating]);
  return null;
}
