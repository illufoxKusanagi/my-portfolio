import * as THREE from "three";
import { HDRLoader } from "three/addons/loaders/HDRLoader.js";
import { THREE_SCENE_CONSTANTS } from "./threeSceneConstants";

export function useThreeEnvironment(scene: THREE.Scene, loadingManager?: THREE.LoadingManager) {
  // Fog Setup
  scene.fog = new THREE.Fog(THREE_SCENE_CONSTANTS.FOG_COLOR, 10, 40);

  // Ambient & Directional Lights
  const ambientLight = new THREE.AmbientLight(0xffffff, 2.0);
  scene.add(ambientLight);

  const dirLight = new THREE.DirectionalLight(0xffffff, 4.0);
  dirLight.position.set(8, 12, 8);
  dirLight.castShadow = true;
  dirLight.shadow.mapSize.width = 1024;
  dirLight.shadow.mapSize.height = 1024;
  dirLight.shadow.camera.near = 0.5;
  dirLight.shadow.camera.far = 25;
  dirLight.shadow.bias = -0.0005;
  scene.add(dirLight);

  // Ground Shadow Receiver
  const groundMesh = new THREE.Mesh(
    new THREE.PlaneGeometry(35, 35),
    new THREE.ShadowMaterial({ opacity: 0.4 })
  );
  groundMesh.rotation.x = -Math.PI / 2;
  groundMesh.position.y = -0.01;
  groundMesh.receiveShadow = true;
  scene.add(groundMesh);

  // Environment Map Loading
  const rgbeLoader = new HDRLoader(loadingManager);
  rgbeLoader.load(THREE_SCENE_CONSTANTS.VENICE_SUNSET_HDR_URL, (texture) => {
    texture.mapping = THREE.EquirectangularReflectionMapping;
    scene.environment = texture;
  });
}
