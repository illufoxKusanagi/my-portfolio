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

let animFrameId: number;
let handleResize: (() => void) | null = null;

onMounted(() => {
  if (!canvasRef.value) return;

  const { scene, camera, renderer, controls, stats, width, height } =
    useThreeEngine(canvasRef.value);

  useThreeEnvironment(scene, loadingManager);
  useGtrModel(scene, loadingManager);

  const { updateParticles, disposeParticles } = useWindTunnelParticles(scene);
  const { composer, resizeComposer, disposeComposer } = usePostProcessing(
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
  window.addEventListener("resize", handleResize);

  const nuxtApp = useNuxtApp();
  const clock = new THREE.Clock();

  // Hide the Stats.js overlay outside of development
  // if (import.meta.env.MODE !== "development") {
  //   stats.dom.style.display = "none";
  // }
  stats.dom.style.display = "none";


  const tick = () => {
    // stats.begin();
    // getDelta() must be called BEFORE getElapsedTime() — each call advances the clock;
    // wrong order causes delta=0 on every frame which breaks particle speed
    const delta = clock.getDelta();
    const time = clock.getElapsedTime();

    const lenis = nuxtApp.$lenis as any;
    const scrollVelocity = lenis?.velocity ? Math.abs(lenis.velocity) : 0;
    const speedMult = 1.0 + Math.min(scrollVelocity * 0.05, 3.0);

    controls.update();
    updateParticles(time, speedMult);
    composer.render(delta);
    // stats.end();

    if (props.isActive) {
      animFrameId = requestAnimationFrame(tick);
    }
  };

  watch(
    () => props.isActive,
    (active) => {
      if (active) {
        clock.start();
        tick();
      } else {
        cancelAnimationFrame(animFrameId);
      }
    },
  );

  if (props.isActive) {
    tick();
  }

  onBeforeUnmount(() => {
    cancelAnimationFrame(animFrameId);
    if (handleResize) window.removeEventListener("resize", handleResize);
    controls.dispose();
    stats.dom.remove();
    disposeParticles();
    disposeComposer();

    scene.traverse((obj) => {
      if (obj instanceof THREE.Mesh) obj.geometry?.dispose();
    });

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
}
</style>
