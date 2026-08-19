import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/addons/loaders/DRACOLoader.js";
import { createGtrR33MaterialDetails } from "~/components/three/GtrR33Details";
import { THREE_SCENE_CONSTANTS } from "./threeSceneConstants";
import { assignGtrMaterials } from "./assignGtrMaterials";

export function useGtrModel(scene: THREE.Scene, loadingManager?: THREE.LoadingManager) {
  const materials = createGtrR33MaterialDetails();
  const dracoLoader = new DRACOLoader(loadingManager);
  dracoLoader.setDecoderPath(THREE_SCENE_CONSTANTS.DRACO_DECODER_PATH);

  const gltfLoader = new GLTFLoader(loadingManager);
  gltfLoader.setDRACOLoader(dracoLoader);

  let loadedModel: THREE.Group | null = null;

  gltfLoader.load(THREE_SCENE_CONSTANTS.GTR_R33_MODEL_PATH, (gltf) => {
    loadedModel = gltf.scene;

    // Center model at origin
    const box = new THREE.Box3().setFromObject(loadedModel);
    const center = new THREE.Vector3();
    box.getCenter(center);
    loadedModel.position.sub(center);

    assignGtrMaterials(loadedModel, materials);
    scene.add(loadedModel);
  });
}
