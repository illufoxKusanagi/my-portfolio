import * as THREE from "three";
import { HDRLoader } from "three/addons/loaders/HDRLoader.js";
import { RoomEnvironment } from "three/addons/environments/RoomEnvironment.js";
import { THREE_SCENE_CONSTANTS } from "./threeSceneConstants";

export function useThreeEnvironment(
  scene: THREE.Scene,
  renderer: THREE.WebGLRenderer,
) {
  scene.fog = new THREE.Fog(THREE_SCENE_CONSTANTS.FOG_COLOR, 10, 50);

  // Instant procedural studio environment map so PBR car paint is never black
  const pmremGenerator = new THREE.PMREMGenerator(renderer);
  pmremGenerator.compileEquirectangularShader();
  const roomEnv = new RoomEnvironment();
  const fallbackEnv = pmremGenerator.fromScene(roomEnv, 0.04);
  scene.environment = fallbackEnv.texture;
  roomEnv.dispose();

  // Ambient Light
  const ambientLight = new THREE.AmbientLight(0xdbeafe, 1.5);
  scene.add(ambientLight);

  // Key Directional Light
  const directionalLight = new THREE.DirectionalLight(0xffffff, 4);
  directionalLight.position.set(8, 12, 8);
  directionalLight.castShadow = true;
  directionalLight.shadow.mapSize.width = 1024;
  directionalLight.shadow.mapSize.height = 1024;
  directionalLight.shadow.camera.near = 0.5;
  directionalLight.shadow.camera.far = 25;
  directionalLight.shadow.camera.left = -4;
  directionalLight.shadow.camera.right = 4;
  directionalLight.shadow.camera.top = 4;
  directionalLight.shadow.camera.bottom = -4;
  directionalLight.shadow.bias = -0.0005;
  scene.add(directionalLight);

  // Rim Light for car silhouette
  const rimLight = new THREE.DirectionalLight(0x47b3ff, 2.0);
  rimLight.position.set(-7, 5, -6);
  scene.add(rimLight);

  // Ground Shadow Plane at y = 0
  const groundMesh = new THREE.Mesh(
    new THREE.PlaneGeometry(40, 40),
    new THREE.ShadowMaterial({ opacity: 0.45 }),
  );
  groundMesh.rotation.x = -Math.PI / 2;
  groundMesh.position.y = 0;
  groundMesh.receiveShadow = true;
  scene.add(groundMesh);

  // Non-blocking optional HDR environment upgrade
  const rgbeLoader = new HDRLoader();
  rgbeLoader.load(
    THREE_SCENE_CONSTANTS.VENICE_SUNSET_HDR_URL,
    (texture) => {
      texture.mapping = THREE.EquirectangularReflectionMapping;
      scene.environment = texture;
    },
    undefined,
    () => {
      // Keep fallback RoomEnvironment if remote HDR fails
    },
  );
}
