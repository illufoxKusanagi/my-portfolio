import { ref } from "vue";

export type TransitionPhase = "idle" | "covering" | "covered" | "revealing";

/** Motion timings (ms). Also exposed to CSS as custom properties so JS and CSS never drift. */
const MOTION = {
  cover: 480,
  reveal: 560,
  stagger: 70,
  minHold: 260,
} as const;

const REDUCED_MOTION = {
  cover: 160,
  reveal: 180,
  stagger: 0,
  minHold: 0,
} as const;

/** Only for genuine failures (stalled chunk, router never settling). Never the normal path. */
const WATCHDOG_MS = 6000;

const phase = ref<TransitionPhase>("idle");
const targetPath = ref("/");

let coveredAt = 0;
let coverPromise: Promise<void> | null = null;
let phaseTimer: ReturnType<typeof setTimeout> | null = null;
let watchdog: ReturnType<typeof setTimeout> | null = null;

function prefersReducedMotion(): boolean {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

function timings() {
  return prefersReducedMotion() ? REDUCED_MOTION : MOTION;
}

function clearTimer(timer: ReturnType<typeof setTimeout> | null) {
  if (timer) clearTimeout(timer);
  return null;
}

/**
 * Slides the cover in and resolves once the screen is fully masked.
 * Re-entrant: a navigation fired mid-transition retargets the label
 * and reuses the cover instead of restarting the animation.
 */
function cover(toPath: string): Promise<void> {
  targetPath.value = toPath;

  watchdog = clearTimer(watchdog);
  watchdog = setTimeout(() => reveal(), WATCHDOG_MS);

  if (phase.value === "covered") return Promise.resolve();
  if (phase.value === "covering" && coverPromise) return coverPromise;

  phaseTimer = clearTimer(phaseTimer);
  phase.value = "covering";

  const { cover: coverMs, stagger } = timings();
  coverPromise = new Promise<void>((resolve) => {
    phaseTimer = setTimeout(() => {
      phase.value = "covered";
      coveredAt = performance.now();
      coverPromise = null;
      resolve();
    }, coverMs + stagger);
  });

  return coverPromise;
}

/**
 * Lifts the cover once the destination page is rendered.
 * Holds for a minimum time so the route label is actually readable.
 */
function reveal() {
  if (phase.value === "idle" || phase.value === "revealing") return;

  watchdog = clearTimer(watchdog);

  // Navigation failed/aborted before the cover finished: wait for it, then lift.
  if (phase.value === "covering" && coverPromise) {
    coverPromise.then(reveal);
    return;
  }

  const { reveal: revealMs, stagger, minHold } = timings();
  const remainingHold = Math.max(0, minHold - (performance.now() - coveredAt));

  phaseTimer = clearTimer(phaseTimer);
  phaseTimer = setTimeout(() => {
    phase.value = "revealing";
    phaseTimer = setTimeout(() => {
      phase.value = "idle";
      phaseTimer = null;
    }, revealMs + stagger);
  }, remainingHold);
}

export function usePageTransition() {
  return {
    phase,
    targetPath,
    cover,
    reveal,
    timings,
  };
}
