import * as THREE from "three";
import { EffectComposer } from "three/addons/postprocessing/EffectComposer.js";
import { RenderPass } from "three/addons/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/addons/postprocessing/UnrealBloomPass.js";
import { ShaderPass } from "three/addons/postprocessing/ShaderPass.js";
import { FXAAShader } from "three/addons/shaders/FXAAShader.js";
import { OutputPass } from "three/addons/postprocessing/OutputPass.js";
import { THREE_SCENE_CONSTANTS } from "./threeSceneConstants";

export function usePostProcessing(
  renderer: THREE.WebGLRenderer,
  scene: THREE.Scene,
  camera: THREE.PerspectiveCamera,
  width: number,
  height: number,
) {
  // UnsignedByte + no MSAA — the FXAA pass below handles edge smoothing
  // at a fraction of the cost of 4x hardware MSAA on a HalfFloat target
  const renderTarget = new THREE.WebGLRenderTarget(width, height, {
    type: THREE.UnsignedByteType,
    samples: 0,
  });

  const composer = new EffectComposer(renderer, renderTarget);
  composer.addPass(new RenderPass(scene, camera));

  const bloomPass = new UnrealBloomPass(
    new THREE.Vector2(width / 4, height / 4),
    THREE_SCENE_CONSTANTS.BLOOM_STRENGTH,
    THREE_SCENE_CONSTANTS.BLOOM_RADIUS,
    THREE_SCENE_CONSTANTS.BLOOM_THRESHOLD,
  );
  composer.addPass(bloomPass);

  // FXAA — screen-space anti-aliasing shader pass.
  // Single fullscreen quad, no MSAA memory overhead, resolves jagged edges on
  // car body lines, wheels, and particle streaks after the bloom pass.
  const fxaaPass = new ShaderPass(FXAAShader);
  const pixelRatio = renderer.getPixelRatio();
  const resUniform = fxaaPass.material.uniforms?.["resolution"];
  if (resUniform?.value) {
    resUniform.value.x = 1 / (width * pixelRatio);
    resUniform.value.y = 1 / (height * pixelRatio);
  }
  composer.addPass(fxaaPass);

  composer.addPass(new OutputPass());

  function resizeComposer(w: number, h: number): void {
    composer.setSize(w, h);
    // Keep FXAA resolution uniform in sync on window resize
    const pr = renderer.getPixelRatio();
    const ru = fxaaPass.material.uniforms?.["resolution"];
    if (ru?.value) {
      ru.value.x = 1 / (w * pr);
      ru.value.y = 1 / (h * pr);
    }
  }

  function disposeComposer(): void {
    composer.dispose();
  }

  return {
    composer,
    resizeComposer,
    disposeComposer,
  };
}
