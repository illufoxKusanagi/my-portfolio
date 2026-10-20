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
let cachedGltfAnimations: THREE.AnimationClip[] = [];
let loadPromise: Promise<{
  scene: THREE.Group;
  animations: THREE.AnimationClip[];
}> | null = null;

export function useGtrModel(
  scene: THREE.Scene,
  loadingManager?: THREE.LoadingManager,
) {
  const materials = createGtrR33MaterialDetails();

  let mixer: THREE.AnimationMixer | null = null;
  let wheelAction: THREE.AnimationAction | null = null;
  const wheelPivots: THREE.Object3D[] = [];
  const steerPivots: THREE.Object3D[] = [];
  let isDisposed = false;

  const setupModelInstance = (
    modelGroup: THREE.Group,
    animations: THREE.AnimationClip[],
  ) => {
    if (isDisposed) return;

    const instance = modelGroup.clone(true);
    assignGtrMaterials(instance, materials);
    scene.add(instance);

    // 1. Procedural Pivots (Option B)
    const wheelPivotNames = [
      "Wheel_LF_Pivot",
      "Wheel_RF_Pivot",
      "Wheel_LR_Pivot",
      "Wheel_RR_Pivot",
    ];
    const steerPivotNames = ["Wheel_LF_Steer", "Wheel_RF_Steer"];

    for (const name of wheelPivotNames) {
      const obj = instance.getObjectByName(name);
      if (obj) wheelPivots.push(obj);
    }
    for (const name of steerPivotNames) {
      const obj = instance.getObjectByName(name);
      if (obj) steerPivots.push(obj);
    }

    // 2. AnimationMixer (Option A)
    if (animations && animations.length > 0) {
      mixer = new THREE.AnimationMixer(instance);
      const clip =
        THREE.AnimationClip.findByName(animations, "WheelRotation") ||
        animations[0];
      if (clip) {
        wheelAction = mixer.clipAction(clip);
        wheelAction.play();
      }
    }

    notifyModelMounted();
  };

  const updateGtrAnimation = (delta: number, speedMultiplier: number = 1.0) => {
    if (isDisposed) return;

    if (wheelAction && mixer) {
      wheelAction.timeScale = speedMultiplier;
      mixer.update(delta);
    } else if (wheelPivots.length > 0) {
      const angularDelta = delta * speedMultiplier * (Math.PI * 2);
      for (const pivot of wheelPivots) {
        pivot.rotation.x += angularDelta;
      }
    }
  };

  const disposeGtrAnimation = () => {
    isDisposed = true;
    if (wheelAction) {
      wheelAction.stop();
      wheelAction = null;
    }
    if (mixer) {
      mixer.stopAllAction();
      mixer.uncacheRoot(mixer.getRoot());
      mixer = null;
    }
    wheelPivots.length = 0;
    steerPivots.length = 0;
  };

  if (cachedGtrScene) {
    setupModelInstance(cachedGtrScene, cachedGltfAnimations);
    return {
      updateGtrAnimation,
      disposeGtrAnimation,
    };
  }

  if (loadPromise) {
    loadPromise.then(({ scene: loadedModel, animations }) => {
      setupModelInstance(loadedModel, animations);
    });
    return {
      updateGtrAnimation,
      disposeGtrAnimation,
    };
  }

  const dracoLoader = new DRACOLoader(loadingManager);
  dracoLoader.setDecoderPath(THREE_SCENE_CONSTANTS.DRACO_DECODER_PATH);

  const gltfLoader = new GLTFLoader(loadingManager);
  gltfLoader.setDRACOLoader(dracoLoader);

  loadPromise = new Promise<{
    scene: THREE.Group;
    animations: THREE.AnimationClip[];
  }>((resolve, reject) => {
    gltfLoader.load(
      THREE_SCENE_CONSTANTS.GTR_R33_MODEL_PATH,
      (gltf) => {
        notifyModelStatus("ATTACHING TELEMETRY");
        const loadedModel = gltf.scene;
        const animations = gltf.animations || [];

        // Ground all 4 tires flush at y = 0 and center X/Z on turntable
        const box = new THREE.Box3().setFromObject(loadedModel);
        const center = new THREE.Vector3();
        box.getCenter(center);
        loadedModel.position.set(-center.x, -box.min.y, -center.z);

        cachedGtrScene = loadedModel;
        cachedGltfAnimations = animations;

        setupModelInstance(loadedModel, animations);

        dracoLoader.dispose();
        resolve({ scene: loadedModel, animations });
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

  return {
    updateGtrAnimation,
    disposeGtrAnimation,
  };
}
