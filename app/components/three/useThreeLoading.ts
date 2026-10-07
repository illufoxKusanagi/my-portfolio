import { ref } from "vue";
import * as THREE from "three";
import { useRenderMode } from "~/composables/useRenderMode";

const isLoading = ref(true);
const progress = ref(0);
const currentItem = ref("INITIALIZING SHADER PIPELINE");
const isLoaded = ref(false);
const hasError = ref(false);
const showFallbackButton = ref(false);

const loadingManager = new THREE.LoadingManager();

let isStarted = false;
let isManagerStarted = false;
let isManagerLoaded = false;
let isModelMounted = false;
let fallbackPromptTimeout: ReturnType<typeof setTimeout> | null = null;
let hardTimeout: ReturnType<typeof setTimeout> | null = null;

function clearSafetyTimeouts() {
  if (fallbackPromptTimeout) {
    clearTimeout(fallbackPromptTimeout);
    fallbackPromptTimeout = null;
  }
  if (hardTimeout) {
    clearTimeout(hardTimeout);
    hardTimeout = null;
  }
}

function checkCompletion() {
  const managerDone = isManagerLoaded || !isManagerStarted;
  if (managerDone && isModelMounted && !isLoaded.value) {
    clearSafetyTimeouts();
    progress.value = 100;
    currentItem.value = "VEHICLE TELEMETRY READY";
    setTimeout(() => {
      isLoading.value = false;
      isLoaded.value = true;
    }, 400);
  }
}

export function notifyModelMounted() {
  isModelMounted = true;
  checkCompletion();
}

export function notifyModelProgress(loadedBytes: number, totalBytes: number) {
  if (isLoaded.value) return;
  if (totalBytes > 0) {
    const bytePct = Math.min(100, Math.round((loadedBytes / totalBytes) * 100));
    // Map download from 15% to 88% range
    const mapped = 15 + Math.round((bytePct / 100) * 73);
    progress.value = Math.max(progress.value, mapped);

    const mbLoaded = (loadedBytes / (1024 * 1024)).toFixed(1);
    const mbTotal = (totalBytes / (1024 * 1024)).toFixed(1);
    currentItem.value = `RECEIVING GEOMETRY // ${mbLoaded}MB / ${mbTotal}MB`;
  } else {
    const mbLoaded = (loadedBytes / (1024 * 1024)).toFixed(1);
    currentItem.value = `RECEIVING GEOMETRY // ${mbLoaded}MB`;
    progress.value = Math.min(85, Math.max(progress.value, progress.value + 2));
  }
}

export function notifyModelStatus(status: string) {
  if (isLoaded.value) return;
  currentItem.value = status;
}

export function triggerFallbackTo2D(reason = "Timeout or asset error") {
  clearSafetyTimeouts();
  hasError.value = true;
  currentItem.value = "FALLBACK // SWITCHING TO 2D MODE";

  try {
    const renderMode = useRenderMode();
    renderMode.value = "2D";
  } catch (err) {
    console.warn("Could not set renderMode to 2D:", err);
  }

  setTimeout(() => {
    isLoading.value = false;
    isLoaded.value = true;
  }, 350);
}

const startProgress = () => {
  if (isStarted || isLoaded.value || import.meta.server) return;
  isStarted = true;

  // Initial progression for visual responsiveness during boot (0 to 15%)
  let current = 0;
  const interval = setInterval(() => {
    if (current < 15 && isLoading.value) {
      current += 3;
      progress.value = Math.max(progress.value, current);
    } else {
      clearInterval(interval);
    }
  }, 40);

  // Soft timeout: after 8s on slow network, reveal "Switch to 2D Mode" button
  fallbackPromptTimeout = setTimeout(() => {
    if (isLoading.value) {
      showFallbackButton.value = true;
    }
  }, 8000);

  // Hard timeout: after 22s, automatically fallback to 2D mode so visitor is never locked out
  hardTimeout = setTimeout(() => {
    if (isLoading.value) {
      triggerFallbackTo2D("Asset network load timed out after 22s");
    }
  }, 22000);
};

loadingManager.onStart = (url, itemsLoaded, itemsTotal) => {
  if (isLoaded.value) return;
  isManagerStarted = true;
  isManagerLoaded = false;
  isLoading.value = true;
  const cleanName = url.split("/").pop() || url;
  if (!cleanName.includes("Skyline-GTR-R33")) {
    currentItem.value = `FETCHING // ${cleanName.toUpperCase()}`;
  }
};

loadingManager.onProgress = (url, itemsLoaded, itemsTotal) => {
  if (isLoaded.value) return;
  const cleanName = url.split("/").pop() || url;
  if (!cleanName.includes("Skyline-GTR-R33")) {
    currentItem.value = `DECODING // ${cleanName.toUpperCase()}`;
  }
};

loadingManager.onLoad = () => {
  isManagerLoaded = true;
  checkCompletion();
};

loadingManager.onError = (url) => {
  const cleanName = url.split("/").pop() || url;
  console.warn(`Three.js asset load error for: ${cleanName}`);
};

export function useThreeLoading() {
  if (!import.meta.server) {
    startProgress();
  }

  return {
    isLoading,
    isLoaded,
    progress,
    currentItem,
    hasError,
    showFallbackButton,
    loadingManager,
    triggerFallbackTo2D,
    notifyModelMounted,
    notifyModelProgress,
    notifyModelStatus,
  };
}
