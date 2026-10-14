<template>
  <div class="webgl-experience-container w-full h-full">
    <canvas ref="canvasRef" class="webgl-canvas" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch } from "vue";
import * as THREE from "three";
import { useThreeEngine } from "./useThreeEngine";
import { useThreeEnvironment } from "./useThreeEnvironment";
import { useGtrModel } from "./useGtrModel";
import { usePostProcessing } from "./usePostProcessing";
import { useWindTunnelParticles } from "./useWindTunnelParticles";
import { useThreeLoading } from "./useThreeLoading";

const props = withDefaults(
  defineProps<{
    isActive?: boolean;
  }>(),
  {
    isActive: true,
  },
);

const canvasRef = ref<HTMLCanvasElement | null>(null);
const { loadingManager } = useThreeLoading();

let animFrameId: number = 0;
let handleResize: (() => void) | null = null;

onMounted(() => {
  if (!canvasRef.value) return;

  const { scene, camera, renderer, controls, width, height } = useThreeEngine(
    canvasRef.value,
  );

  useThreeEnvironment(scene, renderer);
  useGtrModel(scene, loadingManager);

  const { updateParticles } = useWindTunnelParticles(scene);
  const { composer, resizeComposer } = usePostProcessing(
    renderer,
    scene,
    camera,
    width,
    height,
  );

  handleResize = () => {
    const w = window.innerWidth;
    const h = window.innerHeight;
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h);
    resizeComposer(w, h);
  };
  window.addEventListener("resize", handleResize, { passive: true });

  const nuxtApp = useNuxtApp();
  const clock = new THREE.Clock();

  const tick = () => {
    if (!props.isActive) return;

    const delta = clock.getDelta();
    const time = clock.getElapsedTime();

    const lenis = nuxtApp.$lenis as any;
    const scrollVelocity = lenis?.velocity ? Math.abs(lenis.velocity) : 0;
    const speedMult = 1.0 + Math.min(scrollVelocity * 0.05, 3.0);

    controls.update();
    updateParticles(time, delta, speedMult);
    composer.render(delta);

    animFrameId = requestAnimationFrame(tick);
  };

  watch(
    () => props.isActive,
    (active) => {
      if (active) {
        clock.getDelta();
        cancelAnimationFrame(animFrameId);
        animFrameId = requestAnimationFrame(tick);
      } else {
        cancelAnimationFrame(animFrameId);
      }
    },
  );

  if (props.isActive) {
    animFrameId = requestAnimationFrame(tick);
  }

  onBeforeUnmount(() => {
    cancelAnimationFrame(animFrameId);
    if (handleResize) window.removeEventListener("resize", handleResize);
    controls.dispose();
    renderer.dispose();
  });
});
</script>

<style scoped>
.webgl-experience-container {
  width: 100%;
  height: 100%;
}

.webgl-canvas {
  width: 100%;
  height: 100%;
  display: block;
  pointer-events: auto;
  cursor: grab;
}

.webgl-canvas:active {
  cursor: grabbing;
}
</style>
