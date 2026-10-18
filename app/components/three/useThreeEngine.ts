import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { THREE_SCENE_CONSTANTS } from "./threeSceneConstants";

export function useThreeEngine(canvas: HTMLCanvasElement) {
  const width = window.innerWidth;
  const height = window.innerHeight;

  // Scene & Camera
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    THREE_SCENE_CONSTANTS.CAMERA_FOV,
    width / height,
    THREE_SCENE_CONSTANTS.CAMERA_NEAR,
    THREE_SCENE_CONSTANTS.CAMERA_FAR
  );
  camera.position.set(...THREE_SCENE_CONSTANTS.INITIAL_CAMERA_POSITION);

  // Renderer
  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
    alpha: true,
    powerPreference: "high-performance",
  });
  renderer.setSize(width, height);
  // 1.5x: sharp edges on HiDPI, avoids 4K fill-rate cost of 2x on iGPU
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFShadowMap;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.0;

  // Orbit Controls
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enablePan = false;
  controls.enableZoom = false;
  controls.minDistance = 3;
  controls.maxDistance = 12;
  controls.maxPolarAngle = Math.PI / 2 - 0.05;
  controls.autoRotate = true;
  controls.autoRotateSpeed = 0.8;
  controls.enableDamping = true;
  controls.dampingFactor = 0.05;
  controls.target.set(...THREE_SCENE_CONSTANTS.LOOK_AT_TARGET);
  camera.lookAt(...THREE_SCENE_CONSTANTS.LOOK_AT_TARGET);

  return {
    scene,
    camera,
    renderer,
    controls,
    width,
    height,
  };
}
