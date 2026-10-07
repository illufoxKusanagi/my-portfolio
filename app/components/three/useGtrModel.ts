import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/addons/loaders/DRACOLoader.js";
import { createGtrR33MaterialDetails } from "~/components/three/GtrR33Details";
import { THREE_SCENE_CONSTANTS } from "./threeSceneConstants";
import { assignGtrMaterials } from "./assignGtrMaterials";
import {
  notifyModelMounted,
  notifyModelProgress,
  notifyModelStatus,
  triggerFallbackTo2D,
} from "./useThreeLoading";

// Singleton in-memory cache to guarantee the 3D model is downloaded and decoded only once
let cachedGtrScene: THREE.Group | null = null;
let loadPromise: Promise<THREE.Group> | null = null;

export function useGtrModel(scene: THREE.Scene, loadingManager?: THREE.LoadingManager) {
  const materials = createGtrR33MaterialDetails();

  // If already loaded and cached in memory, clone and mount immediately with zero network/Draco cost
  if (cachedGtrScene) {
    const instance = cachedGtrScene.clone(true);
    assignGtrMaterials(instance, materials);
    scene.add(instance);
    notifyModelMounted();
    return;
  }

  // If download/decoding is already in flight, await the existing promise
  if (loadPromise) {
    loadPromise.then((loadedModel) => {
      const instance = loadedModel.clone(true);
      assignGtrMaterials(instance, materials);
      scene.add(instance);
      notifyModelMounted();
    });
    return;
  }

  const dracoLoader = new DRACOLoader(loadingManager);
  dracoLoader.setDecoderPath(THREE_SCENE_CONSTANTS.DRACO_DECODER_PATH);

  const gltfLoader = new GLTFLoader(loadingManager);
  gltfLoader.setDRACOLoader(dracoLoader);

  loadPromise = new Promise<THREE.Group>((resolve, reject) => {
    gltfLoader.load(
      THREE_SCENE_CONSTANTS.GTR_R33_MODEL_PATH,
      (gltf) => {
        notifyModelStatus("ATTACHING VEHICLE TELEMETRY");
        const loadedModel = gltf.scene;

        // Center model at origin
        const box = new THREE.Box3().setFromObject(loadedModel);
        const center = new THREE.Vector3();
        box.getCenter(center);
        loadedModel.position.sub(center);

        cachedGtrScene = loadedModel;

        const instance = loadedModel.clone(true);
        assignGtrMaterials(instance, materials);
        scene.add(instance);
        notifyModelMounted();
        resolve(loadedModel);
      },
      (event: ProgressEvent) => {
        notifyModelProgress(event.loaded, event.total);
      },
      (err) => {
        loadPromise = null;
        console.error("GTR Model loading failed:", err);
        triggerFallbackTo2D("Model download failed");
        reject(err);
      }
    );
  });
}
