import { ref } from "vue";

export type TransitionPhase = "idle" | "covering" | "covered" | "revealing";

const phase = ref<TransitionPhase>("idle");
const isOpen = ref(false);
const targetPath = ref("/");

let coveredAt = 0;
let resolveCover: (() => void) | null = null;
let watchdog: ReturnType<typeof setTimeout> | null = null;
let holdTimer: ReturnType<typeof setTimeout> | null = null;

function clearTimer(timer: ReturnType<typeof setTimeout> | null) {
  if (timer) clearTimeout(timer);
  return null;
}

/**
 * Initiates the curtain cover.
 * Returns a Promise that only resolves once Vue's native <Transition>
 * has physically finished entering and covering the screen.
 */
function cover(toPath: string): Promise<void> {
  targetPath.value = toPath;

  watchdog = clearTimer(watchdog);
  watchdog = setTimeout(() => {
    reveal();
  }, 6000);

  if (phase.value === "covered" && isOpen.value) return Promise.resolve();

  phase.value = "covering";
  isOpen.value = true;

  return new Promise<void>((resolve) => {
    resolveCover = resolve;

    // Safety timeout: if Vue @after-enter is delayed, force proceed after 700ms
    setTimeout(() => {
      if (resolveCover) {
        onCoverComplete();
      }
    }, 700);
  });
}

function onCoverComplete() {
  phase.value = "covered";
  coveredAt = performance.now();
  if (resolveCover) {
    const cb = resolveCover;
    resolveCover = null;
    cb();
  }
}

/**
 * Lifts the curtain once the destination route has rendered.
 */
function reveal() {
  if (!isOpen.value || phase.value === "revealing") return;

  watchdog = clearTimer(watchdog);

  // If still covering, wait for cover completion before revealing
  if (phase.value === "covering") {
    setTimeout(reveal, 80);
    return;
  }

  const isRoot = targetPath.value === "/" || targetPath.value === "";
  const minHold = isRoot ? 60 : 260; // Minimal hold on root so curtain reveals smoothly
  const elapsed = performance.now() - coveredAt;
  const remainingHold = Math.max(0, minHold - elapsed);

  holdTimer = clearTimer(holdTimer);
  holdTimer = setTimeout(() => {
    phase.value = "revealing";
    isOpen.value = false; // Triggers Vue's native leave transition
  }, remainingHold);
}

function onRevealComplete() {
  phase.value = "idle";
}

export function usePageTransition() {
  return {
    phase,
    isOpen,
    targetPath,
    cover,
    reveal,
    onCoverComplete,
    onRevealComplete,
  };
}
