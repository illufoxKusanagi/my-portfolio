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

let cachedGtrScene: THREE.Group | null = null;
let loadPromise: Promise<THREE.Group> | null = null;

export function useGtrModel(
  scene: THREE.Scene,
  loadingManager?: THREE.LoadingManager,
) {
  const materials = createGtrR33MaterialDetails();

  if (cachedGtrScene) {
    const instance = cachedGtrScene.clone(true);
    assignGtrMaterials(instance, materials);
    scene.add(instance);
    notifyModelMounted();
    return;
  }

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
        notifyModelStatus("ATTACHING TELEMETRY");
        const loadedModel = gltf.scene;

        // Ground all 4 tires flush at y = 0 and center X/Z on turntable
        const box = new THREE.Box3().setFromObject(loadedModel);
        const center = new THREE.Vector3();
        box.getCenter(center);
        loadedModel.position.set(-center.x, -box.min.y, -center.z);

        cachedGtrScene = loadedModel;

        const instance = loadedModel.clone(true);
        assignGtrMaterials(instance, materials);
        scene.add(instance);
        notifyModelMounted();
        dracoLoader.dispose();
        resolve(loadedModel);
      },
      (event: ProgressEvent) => {
        notifyModelProgress(event.loaded, event.total);
      },
      (err) => {
        loadPromise = null;
        dracoLoader.dispose();
        console.error("GTR Model loading failed:", err);
        triggerFallbackTo2D("Model download failed");
        reject(err);
      },
    );
  });
}
