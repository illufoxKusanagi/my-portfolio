import { ref } from "vue";
import * as THREE from "three";

const isLoading = ref(true);
const progress = ref(0);
const currentItem = ref("INITIALIZING SHADER PIPELINE");
const isLoaded = ref(false);

const loadingManager = new THREE.LoadingManager();

// Track if progress simulation has started
let isSimulating = false;

const startProgress = () => {
  if (isSimulating || isLoaded.value || import.meta.server) return;
  isSimulating = true;

  // Immediate progressive counter for smooth visual feedback
  let current = 0;
  const interval = setInterval(() => {
    if (current < 40 && isLoading.value) {
      current += 5;
      progress.value = Math.max(progress.value, current);
    } else {
      clearInterval(interval);
    }
  }, 40);

  // Safety fallback timeout: ensure visitor is never locked out
  setTimeout(() => {
    if (isLoading.value) {
      progress.value = 100;
      currentItem.value = "VEHICLE TELEMETRY READY";
      setTimeout(() => {
        isLoading.value = false;
        isLoaded.value = true;
      }, 300);
    }
  }, 3500);
};

loadingManager.onStart = (url, itemsLoaded, itemsTotal) => {
  if (isLoaded.value) return;
  isLoading.value = true;
  const cleanName = url.split("/").pop() || url;
  currentItem.value = `FETCHING // ${cleanName.toUpperCase()}`;
  progress.value = Math.max(progress.value, Math.round((itemsLoaded / Math.max(itemsTotal, 1)) * 100));
};

loadingManager.onProgress = (url, itemsLoaded, itemsTotal) => {
  const cleanName = url.split("/").pop() || url;
  currentItem.value = `DECODING // ${cleanName.toUpperCase()}`;
  const target = Math.round((itemsLoaded / Math.max(itemsTotal, 1)) * 100);
  progress.value = Math.max(progress.value, target);
};

loadingManager.onLoad = () => {
  progress.value = 100;
  currentItem.value = "VEHICLE TELEMETRY READY";
  setTimeout(() => {
    isLoading.value = false;
    isLoaded.value = true;
  }, 400);
};

loadingManager.onError = (url) => {
  const cleanName = url.split("/").pop() || url;
  currentItem.value = `INITIALIZED // ${cleanName.toUpperCase()}`;
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
    loadingManager,
  };
}
