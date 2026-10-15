export type AvatarPose = {
  x: number;
  y: number;
  width: number;
  height: number;
  rotationX: number;
  rotationY: number;
  scale: number;
};
export type AvatarStop = AvatarPose & { scroll: number };
export const poseKeys = [
  "x",
  "y",
  "width",
  "height",
  "rotationX",
  "rotationY",
  "scale",
] as const;

export function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

/** Deterministic in either scroll direction; no accumulation of rotation or offsets. */
export function sampleAvatarPose(
  stops: readonly AvatarStop[],
  scroll: number,
): AvatarPose {
  if (!stops.length)
    throw new Error("Avatar motion requires at least one stop.");
  const first = stops[0];
  if (scroll <= first.scroll) return { ...first };
  const last = stops[stops.length - 1];
  if (scroll >= last.scroll) return { ...last };
  const index = stops.findIndex((stop) => stop.scroll >= scroll);
  const from = stops[index - 1];
  const to = stops[index];
  const progress = clamp(
    (scroll - from.scroll) / Math.max(1, to.scroll - from.scroll),
    0,
    1,
  );
  const eased = progress * progress * (3 - 2 * progress);
  const pose = { ...from };
  for (const key of poseKeys)
    pose[key] = from[key] + (to[key] - from[key]) * eased;
  return pose;
}

/** Damping is time based, so 30, 60 and 120 Hz displays follow the same path. */
export function dampAvatarPose(
  current: AvatarPose,
  target: AvatarPose,
  delta: number,
): AvatarPose {
  const factor = 1 - Math.exp(-14 * Math.min(delta, 0.1));
  const next = { ...current };
  for (const key of poseKeys)
    next[key] += (target[key] - current[key]) * factor;
  return next;
}
